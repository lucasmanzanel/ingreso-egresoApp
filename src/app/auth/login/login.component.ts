import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ErrorI } from '../interface/error.interface';
import { Router } from '@angular/router';

import {Subscription} from 'rxjs'

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;

  error:ErrorI[];

  loading:boolean = false

  uiSubcription:Subscription;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private store:Store<AppState>,
    private router:Router
    ) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      correo: ['lucas1@gmail.com', [Validators.required, Validators.email]],
      password:['123456', Validators.required]
    })

    this.uiSubcription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(): void {

    this.uiSubcription.unsubscribe();
    
  }



  loginUser(){

    const {correo,password} = this.loginForm.value

    if (this.loginForm.invalid){return}

    this.store.dispatch(ui.isLoading());


    // Swal.fire({
    //   title: 'Await please!',
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.auth.loginUser(correo,password)
      .then(info => {

        // Swal.close()
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/'])
          }).catch(
          (data) => {

            this.store.dispatch(ui.stopLoading());
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: data
            })

        }
      )
      
  }


}
