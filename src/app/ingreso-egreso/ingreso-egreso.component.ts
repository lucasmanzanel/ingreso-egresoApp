import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoI } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm:FormGroup;
  tipo:string = 'ingreso';
  loading:boolean = false;
  loadingSubs$:Subscription;

  constructor(
    private fb:FormBuilder,
    private egresoIngresoService:IngresoEgresoService,
    private store:Store<AppState>
    ) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['',Validators.required],
      monto:['', Validators.required]
    })

    this.loadingSubs$ = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy(): void {

    this.loadingSubs$.unsubscribe()
    
  }

  guardar(){

    if(this.ingresoForm.invalid){return}

    this.store.dispatch(isLoading())

    const {descripcion,monto} = this.ingresoForm.value

    const ingresoEgreso = new IngresoEgresoI(descripcion,monto,this.tipo)
    this.egresoIngresoService.crearIngresoEgreso({...ingresoEgreso})
      .then(() => {
        this.ingresoForm.reset()
        Swal.fire('Registro creado',descripcion, 'success')
      })
      .catch( (err) => 
        {Swal.fire(`${err.message}`,'','error');
        this.store.dispatch(stopLoading());
      })
  }

}
