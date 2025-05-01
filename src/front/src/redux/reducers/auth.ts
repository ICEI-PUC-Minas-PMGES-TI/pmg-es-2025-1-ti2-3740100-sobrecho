import {
	IAuthCreators,
	IAuthState,
	IAuthTypes,
	ILoggedUserInfo,
	IPostAuthLoginRequestAction
} from '@/redux/types';
import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE: IAuthState = {
	loading: false,
	signed: false,
	user: {} as ILoggedUserInfo
};

export const { Creators: AuthCreators, Types: AuthTypes } = createActions<
	IAuthTypes,
	IAuthCreators
>({
	postAuthLoginRequest: ['email', 'password'],
	postAuthLoginSuccess: ['user'],
	postAuthLoginFailure: [],

	postAuthRegisterRequest: ['email', 'password'],
	postAuthRegisterSuccess: ['user'],
	postAuthRegisterFailure: ['error']
});

const postAuthLoginRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: true
});
const postAuthLoginSuccess = (
	state = INITIAL_STATE,
	{ user }: IPostAuthLoginRequestAction
): IAuthState => ({
	...state,
	loading: false,
	signed: true,
	user
});
const postAuthLoginFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});

const postAuthRegisterRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: true
});
const postAuthRegisterSuccess = (
	state = INITIAL_STATE,
	{ user }: IPostAuthLoginRequestAction
): IAuthState => ({
	...state,
	loading: false,
	signed: true,
	user
});
const postAuthRegisterFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});

export const auth = createReducer(INITIAL_STATE, {
	[AuthTypes.POST_AUTH_LOGIN_REQUEST]: postAuthLoginRequest,
	[AuthTypes.POST_AUTH_LOGIN_SUCCESS]: postAuthLoginSuccess,
	[AuthTypes.POST_AUTH_LOGIN_FAILURE]: postAuthLoginFailure,

	[AuthTypes.POST_AUTH_REGISTER_REQUEST]: postAuthRegisterRequest,
	[AuthTypes.POST_AUTH_REGISTER_SUCCESS]: postAuthRegisterSuccess,
	[AuthTypes.POST_AUTH_REGISTER_FAILURE]: postAuthRegisterFailure
});
