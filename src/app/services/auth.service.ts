import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { UsuarioI } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;

  userSubscription:any;

  private _user: UsuarioI;

  get user(){
    return {...this._user};
  }

  constructor(
    public auth:AngularFireAuth,
    public firestore:AngularFirestore,
    private router:Router,
    private store:Store<AppState>
    
    ) { }


  initAuthListener(){

    this.auth.authState.subscribe( fUser => {

      this.currentUser = fUser

      if (this.currentUser){

        this.userSubscription = this.firestore.doc(`${this.currentUser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser:any) => {

            const user = UsuarioI.fromFirebase(firestoreUser);

            this._user = user

            this.store.dispatch(authActions.setUser({user}));
          })



      }else{

        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unSetItems())

      }





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
