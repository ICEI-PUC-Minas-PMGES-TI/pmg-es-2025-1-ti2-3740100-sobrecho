import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	ILoggedUserInfo,
	IPostAuthLoginRequestAction,
	IPostAuthRegisterRequestAction
} from '@/redux/types';
import { api } from '@/services';
import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

function fakeLoginMock({
	email,
	password
}: {
	email: string;
	password: string;
}): Promise<ILoggedUserInfo> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email === 'test@example.com' && password === '123456') {
				resolve({
					name: 'Test User',
					email: 'text@example.com'
				});
			} else {
				reject(new Error('Email ou senha incorretos'));
			}
		}, 1000);
	});
}

function* postAuthLoginRequest({ email, password }: IPostAuthLoginRequestAction) {
	try {
		const { name, id } = yield fakeLoginMock({ email, password });
		toast.success('Login realizado com sucesso');
		yield put(AuthCreators.postAuthLoginSuccess({ id, name, email }));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthLoginFailure(String(error)));
	}
}

function* postAuthRegisterRequest({
	name,
	email,
	password
}: IPostAuthRegisterRequestAction) {
	try {
		const { data } = yield api.post('user', { name, email, password });
		toast.success('Cadastro realizado com sucesso');
		yield put(AuthCreators.postAuthRegisterSuccess(data));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthRegisterFailure(String(error)));
	}
}

export const auth = all([
	takeLatest(AuthTypes.POST_AUTH_LOGIN_REQUEST, postAuthLoginRequest),
	takeLatest(AuthTypes.POST_AUTH_REGISTER_REQUEST, postAuthRegisterRequest)
]);
