import { AuthCreators, AuthTypes } from '@/redux/reducers';
import {
	ILoggedUserInfo,
	IPostAuthSignInRequestAction,
	IPostAuthSignUpRequestAction,
	IPostAuthSignUpSellerRequestAction
} from '@/redux/types';
import { cookies } from '@/services';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

type ILocalStorageUser = {
	id: string;
	name: string;
	email: string;
	role: 'user' | 'admin' | 'seller';
	password: string;
	phone?: string;
	birthdate?: string;
	store?: {
		id: string;
		name: string;
		description: string;
		image: string;
	};
};

function omitSensitive(user: ILocalStorageUser): ILoggedUserInfo {
	const { password, phone, birthdate, ...safeData } = user;

	void password;
	void phone;
	void birthdate;

	return safeData as ILoggedUserInfo;
}

function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
		const random = (Math.random() * 16) | 0;
		const value = char === 'x' ? random : (random & 0x3) | 0x8;
		return value.toString(16);
	});
}

function setMockCookies(user: ILoggedUserInfo) {
	cookies.set(
		'sobrecho.session',
		JSON.stringify({
			user,
			tokens: {
				access: 'mock-access-token',
				refresh: 'mock-refresh-token',
				access_expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
				refresh_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
			}
		})
	);
}

function* signUpRequest({ payload }: IPostAuthSignUpRequestAction) {
	try {
		yield delay(2000);

		const usersJSON = localStorage.getItem('users');
		const users: ILocalStorageUser[] = usersJSON ? JSON.parse(usersJSON) : [];

		const userExists = users.some((user) => user.email === payload.email);
		if (userExists) throw new Error('Este e-mail já está cadastrado.');

		const isAdmin = payload.email.toLowerCase().includes('admin');
		const role: ILocalStorageUser['role'] = isAdmin ? 'admin' : 'user';

		const newUser: ILocalStorageUser = {
			id: uuidv4(),
			name: payload.name,
			email: payload.email,
			role,
			password: payload.password,
			phone: payload.phone,
			birthdate: payload.birthdate
		};

		const updatedUsers = [...users, newUser];
		localStorage.setItem('users', JSON.stringify(updatedUsers));

		const safeUser = omitSensitive(newUser);
		setMockCookies(safeUser);
		yield put(AuthCreators.postAuthSignUpSuccess(safeUser));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthSignUpFailure());
	}
}

function* signUpSellerRequest({ payload }: IPostAuthSignUpSellerRequestAction) {
	try {
		yield delay(2000);

		const usersJSON = localStorage.getItem('users');
		const users: ILocalStorageUser[] = usersJSON ? JSON.parse(usersJSON) : [];

		const userExists = users.some((user) => user.email === payload.email);
		if (userExists) throw new Error('Este e-mail já está cadastrado.');

		const newUser: ILocalStorageUser = {
			id: uuidv4(),
			name: payload.name,
			email: payload.email,
			role: 'seller',
			password: payload.password,
			phone: payload.phone,
			birthdate: payload.birthdate,
			store: {
				id: uuidv4(),
				name: payload.store.name,
				description: payload.store.description,
				image: '/placeholder.svg'
			}
		};

		const updatedUsers = [...users, newUser];
		localStorage.setItem('users', JSON.stringify(updatedUsers));

		const safeUser = omitSensitive(newUser);
		setMockCookies(safeUser);
		yield put(AuthCreators.postAuthSignUpSuccess(safeUser));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthSignUpFailure());
	}
}

function* signInRequest({ payload }: IPostAuthSignInRequestAction) {
	try {
		yield delay(2000);

		const usersJSON = localStorage.getItem('users');
		const users: ILocalStorageUser[] = usersJSON ? JSON.parse(usersJSON) : [];

		const user = users.find(
			(user) => user.email === payload.email && user.password === payload.password
		);

		if (!user) throw new Error('E-mail ou senha inválidos.');

		const safeUser = omitSensitive(user);
		setMockCookies(safeUser);
		yield put(AuthCreators.postAuthSignInSuccess(safeUser));
	} catch (error) {
		toast.error(String(error));
		yield put(AuthCreators.postAuthSignInFailure());
	}
}

function signOut() {
	cookies.remove('sobrecho.session', { path: '/' });
}

export const auth = all([
	takeLatest(AuthTypes.POST_AUTH_SIGN_UP_REQUEST, signUpRequest),
	takeLatest(AuthTypes.POST_AUTH_SIGN_UP_SELLER_REQUEST, signUpSellerRequest),
	takeLatest(AuthTypes.POST_AUTH_SIGN_IN_REQUEST, signInRequest),
	takeLatest(AuthTypes.AUTH_SIGN_OUT, signOut)
]);
