import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { UsuarioI } from '../models/usuario.models';

export interface State {
    user: UsuarioI; 
}

export const initialState: State = {
    user: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: {...user}})),
    on(unSetUser, (state) => ({ ...state, user:null}))


);

export function authReducer(state, action) {
    return _authReducer(state, action);
}