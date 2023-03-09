import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActios from '../ingreso-egreso/ingreso-egreso.actions';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs$:Subscription;
  ingresosSub$:Subscription;

  constructor(
    private store:Store<AppState>,
    private ingresoEgreso:IngresoEgresoService
    ) { }

  ngOnInit() {

    this.userSubs$ = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe((user:any) =>{ 
      this.ingresoEgreso.initIngresosEgresosListeener(user.user.uid)
        .subscribe((ingresosEgresos:any) => {
          this.store.dispatch(ingresoEgresoActios.setItems({items: ingresosEgresos}))
        })
    })
  }

  ngOnDestroy(): void {

    this.userSubs$.unsubscribe();
    
  }

}
