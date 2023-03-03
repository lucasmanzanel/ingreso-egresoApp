import { Component, OnInit } from '@angular/core';

import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  
  registroForm: UntypedFormGroup;

  constructor(private fb:UntypedFormBuilder) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  crearUsuario(){
    
  }

}
