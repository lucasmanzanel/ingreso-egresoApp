import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

import {authState, beforeAuthStateChanged} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;

  constructor(public auth:AngularFireAuth) { }


  initAuthListener(){

    this.auth.authState.subscribe( fUser => {

      this.currentUser = fUser
      console.log(fUser)
      // console.log(fUser?.uid)
      // console.log(fUser?.email)




    })
  }


  createUser(nombre:string,email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }

  loginUser(correo:string,password:string){
    return this.auth.signInWithEmailAndPassword(correo,password)
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    
    return authState(this.currentUser).pipe(
      map((firebaseUser) => 
      firebaseUser !== null
      )
    );
  }


}
