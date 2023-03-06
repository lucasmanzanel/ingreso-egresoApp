import { Component, OnInit, OnDestroy } from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms'

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

import * as ui from '../../shared/ui.actions'
import { stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  registroForm: UntypedFormGroup;
  loading:boolean = false
  uiSubcription:Subscription;

  constructor(
    private fb:UntypedFormBuilder,
    private store:Store<AppState>,
    private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['pedro', Validators.required],
      correo: ['lucas1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    })

    this.uiSubcription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(): void {
    this.uiSubcription.unsubscribe();
  }


  crearUsuario(){

    const {nombre,correo,password} = this.registroForm.value


    if (this.registroForm.invalid){return}


    // Swal.fire({
    //   title: 'Await please!',
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.store.dispatch(ui.isLoading());


    this.auth.createUser(nombre,correo,password)
      .then(info => {

        // Swal.close()
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/'])
          }).catch(
          (data) => {

            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: data
            })

        }
      )
      
  }

}
