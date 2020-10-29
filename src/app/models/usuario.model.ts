export class Usuario {

    constructor(

        public nombre: string,
        public email: string,
        public password?: string,
        public activo?: boolean,
        public google?: boolean,
        public rol?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string

    ) {}
}
