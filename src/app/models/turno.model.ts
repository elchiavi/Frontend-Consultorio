import { Paciente } from './paciente.model';
import { Prestacion } from './prestacion.model';

export class Turno {

    constructor(
        public title: string,
        public prestacion: Prestacion,
        public start: Date,
        public end: Date,
        public asistio: boolean,
        public paciente: Paciente,
        public usuario: string,
        public _id: string
    ){}

}
