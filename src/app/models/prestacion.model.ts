interface _PrestacionlUser {
    id: string;
    nombre: string;
}

export class Prestacion {


    constructor(
        public nombre: string,
        public _id?: string,
        public activo?: boolean,
        public usuario?: _PrestacionlUser,
        ) {}
}