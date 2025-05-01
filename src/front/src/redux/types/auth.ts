import { AnyAction } from 'redux-saga';

export interface ILoggedUserInfo {
	name: string;
	email: string;
}

export interface IAuthState {
	loading: boolean;
	signed: boolean;
	user: ILoggedUserInfo;
}

export interface IAuthTypes {
	POST_AUTH_LOGIN_REQUEST: string;
	POST_AUTH_LOGIN_SUCCESS: string;
	POST_AUTH_LOGIN_FAILURE: string;

	POST_AUTH_REGISTER_REQUEST: string;
	POST_AUTH_REGISTER_SUCCESS: string;
	POST_AUTH_REGISTER_FAILURE: string;
}

// AnyAction -> Tive que utilizar para não dar erro de tipagem no Action<string> (ainda tenho que entender como funciona melhor isso)

export interface IPostAuthLoginRequestAction extends AnyAction {
	email: string;
	password: string;
}
export interface IPostAuthLoginSuccessAction extends AnyAction {
	user: ILoggedUserInfo;
}
export interface IPostAuthLoginFailureAction extends AnyAction {}

export interface IPostAuthRegisterRequestAction extends AnyAction {
	email: string;
	password: string;
}
export interface IPostAuthRegisterSuccessAction extends AnyAction {
	user: ILoggedUserInfo;
}
export interface IPostAuthRegisterFailureAction extends AnyAction {}

export interface IAuthCreators {
	postAuthLoginRequest: (email: string, password: string) => IPostAuthLoginRequestAction;
	postAuthLoginSuccess: (user: ILoggedUserInfo) => IPostAuthLoginSuccessAction;
	postAuthLoginFailure: (error: string) => IPostAuthLoginFailureAction;

	postAuthRegisterRequest: (
		email: string,
		password: string
	) => IPostAuthRegisterRequestAction;
	postAuthRegisterSuccess: (user: ILoggedUserInfo) => IPostAuthRegisterSuccessAction;
	postAuthRegisterFailure: (error: string) => IPostAuthRegisterFailureAction;
}
