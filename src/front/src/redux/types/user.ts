import { AnyAction } from 'redux-saga';

export interface IUser {
	id: string;
	name: string;
	email: string;
	role: string;
}

export interface IUserState {
	listUsers: {
		loading: boolean;
		data: IUser[];
	};
	fetchUserById: {
		loading: boolean;
		data: IUser | null;
	};
}

export interface IUserTypes {
	USER_LIST_REQUEST: string;
	USER_LIST_SUCCESS: string;
	USER_LIST_FAILURE: string;

	USER_FETCH_BY_ID_REQUEST: string;
	USER_FETCH_BY_ID_SUCCESS: string;
	USER_FETCH_BY_ID_FAILURE: string;
}

export interface IUserListRequestAction extends AnyAction {}
export interface IUserListSuccessAction extends AnyAction {
	payload: {
		users: IUser[];
	};
}
export interface IUserListFailureAction extends AnyAction {}

export interface IUserFetchByIdRequestAction extends AnyAction {
	payload: {
		userId: string;
	};
}
export interface IUserFetchByIdSuccessAction extends AnyAction {
	payload: {
		user: IUser;
	};
}
export interface IUserFetchByIdFailureAction extends AnyAction {}

export interface IUserCreators {
	userListRequest: () => IUserListRequestAction;
	userListSuccess: (users: IUser[]) => IUserListSuccessAction;
	userListFailure: () => IUserListFailureAction;

	userFetchByIdRequest: (userId: string) => IUserFetchByIdRequestAction;
	userFetchByIdSuccess: (user: IUser) => IUserFetchByIdSuccessAction;
	userFetchByIdFailure: () => IUserFetchByIdFailureAction;
}
