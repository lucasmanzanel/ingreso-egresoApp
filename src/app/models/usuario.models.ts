export class UsuarioI {

    static fromFirebase({email,uui,nombre}){

        return new UsuarioI(uui,nombre,email)
    }

    constructor(
        public uui:string,
        public nombre:string,
        public email:string
    ){}

}