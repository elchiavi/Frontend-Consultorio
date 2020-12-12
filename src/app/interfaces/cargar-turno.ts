import { CalendarEvent } from 'angular-calendar';
import { Turno } from '../models/turno.model';
export interface CargarTurno {
    total: number;
    turnos: CalendarEvent[];
}
