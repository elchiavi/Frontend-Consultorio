// tslint:disable-next-line: class-name
interface _ObraSocialUser {
    id: string;
    nombre: string;
}

export class ObraSocial {


    constructor(
        public nombre: string,
        public _id?: string,
        public activo?: boolean,
        public usuario?: _ObraSocialUser,
        ) {}
}
