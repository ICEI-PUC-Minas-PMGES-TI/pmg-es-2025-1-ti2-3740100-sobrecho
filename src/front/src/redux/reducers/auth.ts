import {
	IAuthCreators,
	IAuthState,
	IAuthTypes,
	ILoggedUserInfo,
	IPostAuthLoginRequestAction
} from '@/redux/types';
import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE: IAuthState = {
	signed: false,
	user: {} as ILoggedUserInfo,

	signIn: {
		loading: false
	},

	signUp: {
		loading: false
	},

	forgotPassword: {
		loading: false
	},

	resetPassword: {
		loading: false
	}
};

export const { Creators: AuthCreators, Types: AuthTypes } = createActions<
	IAuthTypes,
	IAuthCreators
>({
	postAuthLoginRequest: ['email', 'password'],
	postAuthLoginSuccess: ['user'],
	postAuthLoginFailure: [],

	postAuthRegisterRequest: ['name', 'email', 'password'],
	postAuthRegisterSuccess: ['user'],
	postAuthRegisterFailure: [],

	postAuthForgotPasswordRequest: ['email'],
	postAuthForgotPasswordSuccess: [],
	postAuthForgotPasswordFailure: [],

	postAuthResetPasswordRequest: ['token', 'password', 'passwordConfirm'],
	postAuthResetPasswordSuccess: [],
	postAuthResetPasswordFailure: []
});

const postAuthLoginRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signIn: {
		...state.signIn,
		loading: true
	}
});
const postAuthLoginSuccess = (
	state = INITIAL_STATE,
	{ user }: IPostAuthLoginRequestAction
): IAuthState => ({
	...state,
	signIn: {
		...state.signIn,
		loading: false
	},
	signed: true,
	user
});
const postAuthLoginFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signIn: {
		...state.signIn,
		loading: false
	}
});

const postAuthRegisterRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUp: {
		...state.signUp,
		loading: true
	}
});
const postAuthRegisterSuccess = (
	state = INITIAL_STATE,
	{ user }: IPostAuthLoginRequestAction
): IAuthState => ({
	...state,
	signUp: {
		...state.signUp,
		loading: false
	},
	signed: true,
	user
});
const postAuthRegisterFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUp: {
		...state.signUp,
		loading: false
	}
});

const postAuthForgotPasswordRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	forgotPassword: {
		...state.forgotPassword,
		loading: true
	}
});
const postAuthForgotPasswordSuccess = (state = INITIAL_STATE): IAuthState => ({
	...state,
	forgotPassword: {
		...state.forgotPassword,
		loading: false
	}
});
const postAuthForgotPasswordFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	forgotPassword: {
		...state.forgotPassword,
		loading: false
	}
});

const postAuthResetPasswordRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	resetPassword: {
		...state.resetPassword,
		loading: true
	}
});
const postAuthResetPasswordSuccess = (state = INITIAL_STATE): IAuthState => ({
	...state,
	resetPassword: {
		...state.resetPassword,
		loading: false
	}
});
const postAuthResetPasswordFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	resetPassword: {
		...state.resetPassword,
		loading: false
	}
});

export const auth = createReducer(INITIAL_STATE, {
	[AuthTypes.POST_AUTH_LOGIN_REQUEST]: postAuthLoginRequest,
	[AuthTypes.POST_AUTH_LOGIN_SUCCESS]: postAuthLoginSuccess,
	[AuthTypes.POST_AUTH_LOGIN_FAILURE]: postAuthLoginFailure,

	[AuthTypes.POST_AUTH_REGISTER_REQUEST]: postAuthRegisterRequest,
	[AuthTypes.POST_AUTH_REGISTER_SUCCESS]: postAuthRegisterSuccess,
	[AuthTypes.POST_AUTH_REGISTER_FAILURE]: postAuthRegisterFailure,

	[AuthTypes.POST_AUTH_FORGOT_PASSWORD_REQUEST]: postAuthForgotPasswordRequest,
	[AuthTypes.POST_AUTH_FORGOT_PASSWORD_SUCCESS]: postAuthForgotPasswordSuccess,
	[AuthTypes.POST_AUTH_FORGOT_PASSWORD_FAILURE]: postAuthForgotPasswordFailure,

	[AuthTypes.POST_AUTH_RESET_PASSWORD_REQUEST]: postAuthResetPasswordRequest,
	[AuthTypes.POST_AUTH_RESET_PASSWORD_SUCCESS]: postAuthResetPasswordSuccess,
	[AuthTypes.POST_AUTH_RESET_PASSWORD_FAILURE]: postAuthResetPasswordFailure
});
