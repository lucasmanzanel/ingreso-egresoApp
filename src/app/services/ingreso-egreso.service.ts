import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgresoI } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore:AngularFirestore,
    private authService:AuthService) { }

  crearIngresoEgreso(ingresoEgreso:IngresoEgresoI){

    // const uid = this.authService.user.uid as string;

    // return this.firestore.collection(`${uid}/ingresos-egresos/Items`).add({...ingresoEgreso})
    //   .catch(e => console.log(e))

    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso})
      // .then( (m) => console.log('EXITOSO', m))
      // .catch(err => console.warn(err))

  }
}
