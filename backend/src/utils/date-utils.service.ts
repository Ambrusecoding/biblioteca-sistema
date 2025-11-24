import { Injectable } from '@nestjs/common';
import { TipoUsuario } from '../prestamo/dto/create-prestamo.dto';
import { USER_TYPES, DEVOLUTION_DAYS } from '../models/user.models';

@Injectable()
export class DateUtilsService {
  1;
  /**
   * Determina los días hábiles a sumar según el tipo de usuario.
   * @param tipoUsuario Tipo de usuario (1: Afiliado, 2: Empleado, 3: Invitado)
   * @returns Número de días hábiles a sumar.
   */
  private getDaysToSum(tipoUsuario: TipoUsuario): number {
    switch (tipoUsuario) {
      case USER_TYPES.AFILIADO:
        return DEVOLUTION_DAYS.AFILIADO_DAYS;
      case USER_TYPES.EMPLEADO:
        return DEVOLUTION_DAYS.EMPLEADO_DAYS;
      case USER_TYPES.INVITADO:
        return DEVOLUTION_DAYS.INVITADO_DAYS;
      default:
        // Esto no debería pasar gracias a la validación del DTO
        throw new Error(
          'Tipo de usuario no reconocido para el cálculo de fecha.',
        );
    }
  }

  /**
   * Calcula la fecha máxima de devolución, excluyendo sábados (6) y domingos (0).
   * @param tipoUsuario El tipo de usuario.
   * @returns La fecha máxima de devolución (Date).
   */
  public calculateReturnDate(tipoUsuario: TipoUsuario): Date {
    const currentDate = new Date();
    let workingDays = this.getDaysToSum(tipoUsuario);

    // 1. Empezamos a contar desde el día siguiente
    currentDate.setDate(currentDate.getDate() + 1);

    // 2. Iteramos la cantidad de días hábiles requeridos
    while (workingDays > 0) {
      const dayOfWeek = currentDate.getDay(); // 0 (Domingo) a 6 (Sábado)

      // Si no es Sábado (6) ni Domingo (0), es un día hábil.
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays--;
      }

      // Si aún quedan días por contar, o si acabamos de contar un día hábil (workingDays--),
      // y no hemos llegado al final, avanzamos al siguiente día.
      if (workingDays > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      } else {
        // Si workingDays es 0, hemos encontrado la fecha, pero el bucle
        // necesita un último ajuste para manejar el caso donde el último día
        // cae en Sábado/Domingo (aunque el algoritmo evita contarlos,
        // nos aseguramos de que el último avance de fecha no fue un salto innecesario).
        break; // La fecha actual es la de devolución.
      }
    }

    // Devolvemos la fecha final
    // Nota: Es mejor devolver la fecha a medianoche para que sea un "día completo" de devolución.
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }
}
