import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { IngresoEgresoI } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos:IngresoEgresoI[] = []
  ingresosSub:Subscription;

  constructor(
    private store:Store<AppState>,
    private ingresoEgresoService:IngresoEgresoService
  ) { }

  ngOnInit() {
    this.ingresosSub = this.store.select('ingresosEgresos').subscribe(({items}) => {

      this.ingresosEgresos = items
      
    })
  }

  ngOnDestroy(): void {

    this.ingresosSub.unsubscribe();
    
  }

  borrar(id){
    this.ingresoEgresoService.borrarIngresoEgreso(id)
      .then(() => Swal.fire(`Borrado con exito`,'','success'))
      .catch((info) => Swal.fire(`${info.message}`,'','error'))
  }

}
