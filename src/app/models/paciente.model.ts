import { ObraSocial } from './obra-social.model';
export class Paciente {


    constructor(
        public nombre: string,
        public apellido: string,
        public dni: string,
        public email: string,
        public fechaNac: string,
        public sexo: string,
        public direccion: string,
        public telefono: string,
        public ciudad: string,
        public obraSocial: ObraSocial,
        public numeroAfiliado: string,
        public historiaClinica: string,
        public activo: boolean,
        public usuario: string,
        public _id?: string,
    ) {}
}
