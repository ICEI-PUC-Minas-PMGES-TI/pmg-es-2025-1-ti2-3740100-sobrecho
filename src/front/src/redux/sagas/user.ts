import { UserCreators, UserTypes } from '@/redux/reducers';
import { IUser, IUserFetchByIdRequestAction } from '@/redux/types';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

function* userListRequest() {
	try {
		const usersJSON = localStorage.getItem('users');
		const users: IUser[] = usersJSON ? JSON.parse(usersJSON) : [];

		yield delay(1000);
		yield put(UserCreators.userListSuccess(users));
	} catch (error) {
		toast.error('Erro ao listar usuários');
		yield put(UserCreators.userListFailure());
	}
}

function* userFetchByIdRequest({ payload }: IUserFetchByIdRequestAction) {
	try {
		const usersJSON = localStorage.getItem('users');
		const users: IUser[] = usersJSON ? JSON.parse(usersJSON) : [];

		const user = users.find((u) => u.id === payload.userId);
		if (!user) throw new Error('Usuário não encontrado');

		yield delay(1000);
		yield put(UserCreators.userFetchByIdSuccess(user));
	} catch (error) {
		toast.error(String(error));
		yield put(UserCreators.userFetchByIdFailure());
	}
}

export const user = all([
	takeLatest(UserTypes.USER_LIST_REQUEST, userListRequest),
	takeLatest(UserTypes.USER_FETCH_BY_ID_REQUEST, userFetchByIdRequest)
]);
