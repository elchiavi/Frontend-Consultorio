import { Prestacion } from '../models/prestacion.model'
export interface CargarPrestacion {
    total: number;
    prestaciones: Prestacion[];
}
