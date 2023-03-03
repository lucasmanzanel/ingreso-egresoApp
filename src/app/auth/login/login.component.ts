import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../servuces/auth.service';
import { ErrorI } from '../interface/error.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  error:ErrorI[];

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router
    ) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      correo: ['lucas1@gmail.com', [Validators.required, Validators.email]],
      password:['123456', Validators.required]
    })
  }



  loginUser(){

    const {correo,password} = this.loginForm.value

    if (this.loginForm.invalid){return}


    Swal.fire({
      title: 'Await please!',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    this.auth.loginUser(correo,password)
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
