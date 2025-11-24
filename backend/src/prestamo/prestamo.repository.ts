import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prestamo } from '@prisma/client';

@Injectable()
export class PrestamoRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo préstamo en la base de datos de manera asíncrona.
   * La data ahora incluye fechaPrestamo y excluye tipoUsuario.
   */
  async save(data: {
    isbn: string;
    identificacionUsuario: string;
    fechaPrestamo: Date;
    fechaMaximaDevolucion: Date;
  }): Promise<Prestamo & { libro: { nombre: string } }> {
    try {
      const prestamo = await this.prisma.prestamo.create({
        data,
        include: {
          libro: true,
        },
      });

      // 4. Retornamos con el tipo correcto
      return prestamo as Prestamo & { libro: { nombre: string } };
    } catch (error) {
      console.error('Error al guardar el préstamo en la base de datos:', error);
      throw new InternalServerErrorException(
        'Error al guardar el préstamo en la base de datos.',
      );
    }
  }
  /**
   * Consulta un préstamo por su ID.
   */
  async findById(
    id: string,
  ): Promise<Prestamo & { libro: { nombre: string } }> {
    const prestamo = await this.prisma.prestamo.findUnique({
      where: { id },
      // 👇 ESTO ES LO QUE TIENES QUE AGREGAR:
      include: {
        libro: true, // "Oye Prisma, tráeme también los datos del Libro asociado"
      },
    });

    if (!prestamo) {
      throw new NotFoundException('El préstamo no existe');
    }

    return prestamo as Prestamo & { libro: { nombre: string } };
  }
  /**
   * Cuenta el número de préstamos activos para un usuario.
   */

  async countActiveLoansByUser(identificacionUsuario: string): Promise<number> {
    // Este método permanece igual, ya que solo busca la identificacionUsuario.
    return await this.prisma.prestamo.count({
      where: {
        identificacionUsuario: identificacionUsuario,
      },
    });
  }

  /**
   * Obtiene todos los préstamos con información del libro.
   */
  async findAll(): Promise<
    (Prestamo & {
      libro: { nombre: string };
      usuario: { identificacionUsuario: string; tipoUsuario: number };
    })[]
  > {
    return this.prisma.prestamo.findMany({
      include: {
        libro: true,
        usuario: true,
      },
      orderBy: {
        fechaPrestamo: 'desc',
      },
    });
  }
}
