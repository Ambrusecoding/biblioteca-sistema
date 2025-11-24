import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { PrestamoResponseDto } from './dto/prestamo-response.dto';
import { DateUtilsService } from '../utils/date-utils.service';
import { PrestamoRepository } from './prestamo.repository';
import { USER_TYPES } from '../models/user.models';
import { UsuarioRepository } from '../usuario/usuario.repository'; // 1. IMPORTAR

@Injectable()
export class PrestamoService {
  constructor(
    // Inyección de dependencias por constructor
    private readonly dateUtils: DateUtilsService,
    private readonly prestamoRepository: PrestamoRepository,
    private readonly usuarioRepository: UsuarioRepository, // 2. INYECTAR NUEVO REPOSITORIO
  ) {} /**
   * Lógica principal para crear un préstamo.
   */

  async create(
    createPrestamoDto: CreatePrestamoDto,
  ): Promise<PrestamoResponseDto> {
    // 3. El DTO solo contiene isbn e identificacionUsuario
    const { isbn, identificacionUsuario } = createPrestamoDto;

    // 4. OBTENER EL TIPO DE USUARIO DESDE LA BASE DE DATOS
    let tipoUsuario: number;
    try {
      tipoUsuario = await this.usuarioRepository.findTipoUsuario(
        identificacionUsuario,
      );
    } catch (error) {
      // El UsuarioRepository lanza NotFoundException si no existe.
      // Propagamos el error 404 para el usuario.

      if (error instanceof NotFoundException) {
        throw error;
      }
      // Manejo genérico de otros errores de la BD/servicio de usuario
      throw new BadRequestException('Error al validar el usuario.');
    } // 5. Validar restricción para Usuario Invitado (tipoUsuario = 3)

    if (tipoUsuario === (USER_TYPES.INVITADO as number)) {
      await this.validateInvitedUserLimit(identificacionUsuario);
    } // 6. Calcular fecha máxima de devolución

    const fechaMaximaDevolucion = this.dateUtils.calculateReturnDate(
      tipoUsuario as
        | USER_TYPES.AFILIADO
        | USER_TYPES.EMPLEADO
        | USER_TYPES.INVITADO,
    ); // Usamos el tipo obtenido
    // 7. Crear el objeto de datos para guardar, incluyendo fechaPrestamo

    const prestamoData = {
      isbn,
      identificacionUsuario,
      fechaPrestamo: new Date(), // NUEVO CAMPO: Se registra la fecha actual
      fechaMaximaDevolucion,
    }; // 8. Guardar en el repositorio de manera asíncrona

    const prestamo = await this.prestamoRepository.save(prestamoData); // 9. Devolver la respuesta formateada

    return new PrestamoResponseDto(prestamo);
  } /**
   * Valida que un usuario invitado no tenga más de un préstamo activo.
   */

  private async validateInvitedUserLimit(
    identificacionUsuario: string,
  ): Promise<void> {
    // El resto de este método no cambia, ya que solo depende del PrestamoRepository
    const activeLoans = await this.prestamoRepository.countActiveLoansByUser(
      identificacionUsuario,
    );

    if (activeLoans >= 1) {
      throw new BadRequestException('El usuario ya tiene un libro prestado');
    }
  } /**
   * Consulta un préstamo por su ID.
   */

  async findAll(): Promise<PrestamoResponseDto[]> {
    const prestamos = await this.prestamoRepository.findAll();
    return prestamos.map((prestamo) => new PrestamoResponseDto(prestamo));
  }

  async findOne(id: string): Promise<PrestamoResponseDto> {
    // Este método no cambia
    const prestamo = await this.prestamoRepository.findById(id);

    return new PrestamoResponseDto(prestamo);
  }
}
