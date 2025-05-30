import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	IPostAuthForgotPasswordRequestAction,
	IPostAuthLoginRequestAction,
	IPostAuthRegisterRequestAction,
	IPostAuthResetPasswordRequestAction
} from '@/redux/types';
import { api } from '@/services';
import { redirect } from 'next/navigation';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

function* postAuthLoginRequest({ email, password }: IPostAuthLoginRequestAction) {
	try {
		console.log('(REDUX) postAuthLoginRequest: ', email, password);
		const { data } = yield call(api.post, 'login', {
			email,
			password
		});
		toast.success('Login realizado com sucesso!')
		yield put(AuthCreators.postAuthLoginSuccess(data));
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
		// const { data } = yield call(api.post, 'register', { name, email, password });
		const { data } = yield call(api.post, 'user', { name, email, password });
		toast.success('Cadastro realizado com sucesso!');
		yield put(AuthCreators.postAuthRegisterSuccess(data));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthRegisterFailure());
	}
}

function* postAuthForgotPasswordRequest({ email }: IPostAuthForgotPasswordRequestAction) {
	try {
		console.log('(REDUX) postAuthForgotPasswordRequest: ', email);
		yield call(api.post, 'forgot-password', { email });
		toast.success('Email de recuperação enviado com sucesso!');
		yield put(AuthCreators.postAuthForgotPasswordSuccess());
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
		yield call(api.post, 'reset-password', { token, password, passwordConfirm });
		toast.success('Senha alterada com sucesso!');
		yield put(AuthCreators.postAuthResetPasswordSuccess());
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
