import { Component, OnInit } from '@angular/core';

import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  
  registroForm: UntypedFormGroup;

  constructor(
    private fb:UntypedFormBuilder,
    private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['pedro', Validators.required],
      correo: ['lucas1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    })
  }


  crearUsuario(){

    const {nombre,correo,password} = this.registroForm.value


    if (this.registroForm.invalid){return}


    Swal.fire({
      title: 'Await please!',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    this.auth.createUser(nombre,correo,password)
      .then(info => {

        Swal.close()
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
