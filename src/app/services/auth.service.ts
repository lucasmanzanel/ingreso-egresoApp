import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

import {authState} from '@angular/fire/auth';
import { UsuarioI } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;

  constructor(
    public auth:AngularFireAuth,
    public firestore:AngularFirestore,
    private router:Router
    
    ) { }


  initAuthListener(){

    this.auth.authState.subscribe( fUser => {

      this.currentUser = fUser
      console.log(this.currentUser)
      // console.log(fUser?.uid)
      // console.log(fUser?.email)




    })
  }


  createUser(nombre:string,email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
      .then(({user}) => {

        const newUser = new UsuarioI(user.uid,nombre,user.email);

        return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});

      })
  }

  loginUser(correo:string,password:string){
    return this.auth.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(): boolean {
    
    if (!this.currentUser){
      this.router.navigate(['/login'])
      return false
    }
    return true
  }


}
