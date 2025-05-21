import { AnyAction } from 'redux-saga';

export interface IUserSession {}

export interface ILoggedUserInfo {
	id: number;
	name: string;
	email: string;
	role: string;
}

export interface IAuthState {
	signed: boolean;
	user: ILoggedUserInfo;

	signIn: {
		loading: boolean;
	};

	signUp: {
		loading: boolean;
	};

	forgotPassword: {
		loading: boolean;
	};
	resetPassword: {
		loading: boolean;
	};
}

export interface IAuthTypes {
	POST_AUTH_LOGIN_REQUEST: string;
	POST_AUTH_LOGIN_SUCCESS: string;
	POST_AUTH_LOGIN_FAILURE: string;

	POST_AUTH_REGISTER_REQUEST: string;
	POST_AUTH_REGISTER_SUCCESS: string;
	POST_AUTH_REGISTER_FAILURE: string;

	POST_AUTH_FORGOT_PASSWORD_REQUEST: string;
	POST_AUTH_FORGOT_PASSWORD_SUCCESS: string;
	POST_AUTH_FORGOT_PASSWORD_FAILURE: string;

	POST_AUTH_RESET_PASSWORD_REQUEST: string;
	POST_AUTH_RESET_PASSWORD_SUCCESS: string;
	POST_AUTH_RESET_PASSWORD_FAILURE: string;
}

export interface IPostAuthLoginRequestAction extends AnyAction {
	email: string;
	password: string;
}
export interface IPostAuthLoginSuccessAction extends AnyAction {
	user: ILoggedUserInfo;
}
export interface IPostAuthLoginFailureAction extends AnyAction {}

export interface IPostAuthRegisterRequestAction extends AnyAction {
	name: string;
	email: string;
	password: string;
}
export interface IPostAuthRegisterSuccessAction extends AnyAction {
	user: ILoggedUserInfo;
}
export interface IPostAuthRegisterFailureAction extends AnyAction {}

export interface IPostAuthForgotPasswordRequestAction extends AnyAction {
	email: string;
}
export interface IPostAuthForgotPasswordSuccessAction extends AnyAction {}
export interface IPostAuthForgotPasswordFailureAction extends AnyAction {}

export interface IPostAuthResetPasswordRequestAction extends AnyAction {
	token: string;
	password: string;
	passwordConfirm: string;
}
export interface IPostAuthResetPasswordSuccessAction extends AnyAction {}
export interface IPostAuthResetPasswordFailureAction extends AnyAction {}

export interface IAuthCreators {
	postAuthLoginRequest: (email: string, password: string) => IPostAuthLoginRequestAction;
	postAuthLoginSuccess: (user: ILoggedUserInfo) => IPostAuthLoginSuccessAction;
	postAuthLoginFailure: () => IPostAuthLoginFailureAction;

	postAuthRegisterRequest: (
		name: string,
		email: string,
		password: string
	) => IPostAuthRegisterRequestAction;
	postAuthRegisterSuccess: (user: ILoggedUserInfo) => IPostAuthRegisterSuccessAction;
	postAuthRegisterFailure: () => IPostAuthRegisterFailureAction;

	postAuthForgotPasswordRequest: (email: string) => IPostAuthForgotPasswordRequestAction;
	postAuthForgotPasswordSuccess: () => IPostAuthForgotPasswordSuccessAction;
	postAuthForgotPasswordFailure: () => IPostAuthForgotPasswordFailureAction;

	postAuthResetPasswordRequest: (
		token: string,
		password: string,
		passwordConfirm: string
	) => IPostAuthResetPasswordRequestAction;
	postAuthResetPasswordSuccess: () => IPostAuthResetPasswordSuccessAction;
	postAuthResetPasswordFailure: () => IPostAuthResetPasswordFailureAction;
}
