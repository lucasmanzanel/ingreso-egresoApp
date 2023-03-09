import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs:Subscription;

  ingresosSubs:any;

  constructor(
    private store:Store<AppState>,
    private ingresoEgreso:IngresoEgresoService
    ) { }

  ngOnInit() {

    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) =>{
      
      this.ingresosSubs = this.ingresoEgreso.initIngresosEgresosListeener(user.uid)
        .subscribe((ingresosEgresos:any) => {
          this.store.dispatch(setItems({items:ingresosEgresos}))
        
        })
    })
  }

  ngOnDestroy(): void {

    this.ingresosSubs.unsubscribe();

    this.userSubs.unsubscribe();


    
  }

}
