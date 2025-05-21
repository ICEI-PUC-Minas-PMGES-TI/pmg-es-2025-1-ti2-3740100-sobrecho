import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	IPostAuthForgotPasswordRequestAction,
	IPostAuthLoginRequestAction,
	IPostAuthRegisterRequestAction,
	IPostAuthResetPasswordRequestAction
} from '@/redux/types';
import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

function* postAuthLoginRequest({ email, password }: IPostAuthLoginRequestAction) {
	try {
		console.log('(REDUX) postAuthLoginRequest: ', email, password);
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthLoginFailure());
	}
}

function* postAuthRegisterRequest({
	name,
	email,
	password
}: IPostAuthRegisterRequestAction) {
	try {
		console.log('(REDUX) postAuthRegisterRequest: ', name, email, password);
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthRegisterFailure());
	}
}

function* postAuthForgotPasswordRequest({ email }: IPostAuthForgotPasswordRequestAction) {
	try {
		console.log('(REDUX) postAuthForgotPasswordRequest: ', email);
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthForgotPasswordFailure());
	}
}

function* postAuthResetPasswordRequest({
	token,
	password,
	passwordConfirm
}: IPostAuthResetPasswordRequestAction) {
	try {
		console.log(
			'(REDUX) postAuthResetPasswordRequest: ',
			token,
			password,
			passwordConfirm
		);
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthResetPasswordFailure());
	}
}

export const auth = all([
	takeLatest(AuthTypes.POST_AUTH_LOGIN_REQUEST, postAuthLoginRequest),
	takeLatest(AuthTypes.POST_AUTH_REGISTER_REQUEST, postAuthRegisterRequest),
	takeLatest(AuthTypes.POST_AUTH_FORGOT_PASSWORD_REQUEST, postAuthForgotPasswordRequest),
	takeLatest(AuthTypes.POST_AUTH_RESET_PASSWORD_REQUEST, postAuthResetPasswordRequest)
]);
