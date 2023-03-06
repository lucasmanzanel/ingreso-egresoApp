import { createAction, props } from '@ngrx/store';
import { UsuarioI } from '../models/usuario.models';

export const setUser = createAction(
    '[Auth] setUser',
    props<{user:UsuarioI}>()
);

export const unSetUser = createAction(
    '[Auth] unUser');