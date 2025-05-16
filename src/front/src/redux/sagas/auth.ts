import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	ILoggedUserInfo,
	IPostAuthLoginRequestAction,
	IPostAuthRegisterRequestAction
} from '@/redux/types';
import { api } from '@/services';
import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';


function* postAuthLoginRequest({ email, password }: IPostAuthLoginRequestAction) {
	try {
		// const { name, id } = yield fakeLoginMock({ email, password });
		toast.success('Login realizado com sucesso');
		// yield put(AuthCreators.postAuthLoginSuccess({ id, name, email }));
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
