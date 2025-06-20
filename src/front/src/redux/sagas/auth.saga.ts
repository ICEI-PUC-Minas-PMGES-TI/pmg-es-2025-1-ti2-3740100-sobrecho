import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	IAuthSignInRequestAction,
	IAuthSignUpRequestAction,
	IAuthSignUpSellerRequestAction
} from '@/redux/states';
import { ISession } from '@/redux/types';
import { api, cookies } from '@/services';

function setCookie(data: ISession) {
	cookies.set('sobrecho.session', JSON.stringify(data), {
		expires: new Date(data.tokens.refresh_expires_at),
		path: '/'
	});
}

function* authSignUpRequest({ payload }: IAuthSignUpRequestAction) {
	try {
		const { data } = yield call(api.post, '/auth/sign-up', payload, { skipAuth: true });

		setCookie(data);

		yield put(AuthCreators.authSignUpSuccess(data.user));
	} catch (error) {
		yield put(AuthCreators.authSignUpFailure());
		toast.error(String(error));
	}
}

function* authSignUpSellerRequest({ payload }: IAuthSignUpSellerRequestAction) {
	try {
		const formData = new FormData();

		const { image: imageFile, ...storeWithoutImage } = payload.store;

		// Recria o payload sem a imagem
		const cleanedPayload = {
			...payload,
			store: storeWithoutImage
		};

		// Checar se imagem é válida
		if (!(imageFile instanceof File)) {
			throw new Error('Imagem da loja está ausente ou inválida.');
		}

		// Verifique o tamanho da imagem (opcional)
		if (imageFile.size > 5 * 1024 * 1024) {
			throw new Error('A imagem não pode ter mais que 5MB.');
		}

		formData.append('data', JSON.stringify(cleanedPayload));
		formData.append('image', imageFile);

		const { data } = yield call(api.post, '/auth/sign-up-seller', formData, {
			skipAuth: true
		});

		setCookie(data);

		yield put(AuthCreators.authSignUpSellerSuccess(data.user));
	} catch (error) {
		yield put(AuthCreators.authSignUpSellerFailure());
		toast.error(String(error));
	}
}

function* authSignInRequest({ payload }: IAuthSignInRequestAction) {
	try {
		const { data } = yield call(api.post, '/auth/sign-in', payload, { skipAuth: true });

		setCookie(data);

		yield put(AuthCreators.authSignInSuccess(data.user));
	} catch (error) {
		yield put(AuthCreators.authSignInFailure());
		toast.error(String(error));
	}
}

function authSignOut() {
	cookies.remove('sobrecho.session', { path: '/' });
}

export const auth = all([
	takeLatest(AuthTypes.AUTH_SIGN_UP_REQUEST, authSignUpRequest),
	takeLatest(AuthTypes.AUTH_SIGN_UP_SELLER_REQUEST, authSignUpSellerRequest),
	takeLatest(AuthTypes.AUTH_SIGN_IN_REQUEST, authSignInRequest),
	takeLatest(AuthTypes.AUTH_SIGN_OUT, authSignOut)
]);
