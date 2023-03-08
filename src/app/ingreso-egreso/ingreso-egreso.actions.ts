import { createAction, props } from '@ngrx/store';
import { IngresoEgresoI } from '../models/ingreso-egreso.model';

export const setItems = createAction(
    '[Ingreso Egreso] setItems',
    props<{items: IngresoEgresoI[]}>()
    
    );


export const unSetItems = createAction('[Ingreso Egreso] unSetItems');