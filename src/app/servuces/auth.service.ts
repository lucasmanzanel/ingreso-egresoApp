import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { }


  createUser(nombre:string,email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }

  loginUser(correo:string,password:string){
    return this.auth.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    return this.auth.signOut();
  }
}
