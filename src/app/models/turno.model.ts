import { Paciente } from './paciente.model';

export class Turno {

    constructor(
        public title: string,
        public tipo: string,
        public start: Date,
        public end: Date,
        public asistio: boolean,
        public paciente: Paciente,
        public usuario: string,
        public _id: string
    ){}

}
