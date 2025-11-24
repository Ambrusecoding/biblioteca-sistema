import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTipoUsuario(identificacionUsuario: string): Promise<number> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { identificacionUsuario },
      select: { tipoUsuario: true },
    });

    if (!usuario) {
      // Requisito: Si el usuario no existe, es un error de negocio.
      throw new NotFoundException('Usuario no encontrado.');
    }

    return usuario.tipoUsuario;
  }
}
