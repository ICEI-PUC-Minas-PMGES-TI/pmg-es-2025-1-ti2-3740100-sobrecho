import {
	IUser,
	IUserCreators,
	IUserFetchByIdSuccessAction,
	IUserListRequestAction,
	IUserState,
	IUserTypes
} from '@/redux/types';
import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE: IUserState = {
	listUsers: {
		loading: false,
		data: {} as IUser[]
	},
	fetchUserById: {
		loading: false,
		data: {} as IUser
	}
};

export const { Creators: UserCreators, Types: UserTypes } = createActions<
	IUserTypes,
	IUserCreators
>({
	userListRequest: [],
	userListSuccess: ['users'],
	userListFailure: [],
	userFetchByIdRequest: ['userId'],
	userFetchByIdSuccess: ['user'],
	userFetchByIdFailure: []
});

const userListRequest = (state = INITIAL_STATE): IUserState => ({
	...state,
	listUsers: {
		...state.listUsers,
		loading: true
	}
});
const userListSuccess = (
	state = INITIAL_STATE,
	{ payload }: IUserListRequestAction
): IUserState => ({
	...state,
	listUsers: {
		...state.listUsers,
		loading: false,
		data: payload.users
	}
});
const userListFailure = (state = INITIAL_STATE): IUserState => ({
	...state,
	listUsers: {
		...state.listUsers,
		loading: false
	}
});

const fetchUserByIdRequest = (state = INITIAL_STATE): IUserState => ({
	...state,
	fetchUserById: {
		...state.fetchUserById,
		loading: true
	}
});
const fetchUserByIdSuccess = (
	state = INITIAL_STATE,
	{ payload }: IUserFetchByIdSuccessAction
): IUserState => ({
	...state,
	fetchUserById: {
		...state.fetchUserById,
		loading: false,
		data: payload.user
	}
});
const fetchUserByIdFailure = (state = INITIAL_STATE): IUserState => ({
	...state,
	fetchUserById: {
		...state.fetchUserById,
		loading: false
	}
});

export const user = createReducer(INITIAL_STATE, {
	[UserTypes.USER_LIST_REQUEST]: userListRequest,
	[UserTypes.USER_LIST_SUCCESS]: userListSuccess,
	[UserTypes.USER_LIST_FAILURE]: userListFailure,

	[UserTypes.USER_FETCH_BY_ID_REQUEST]: fetchUserByIdRequest,
	[UserTypes.USER_FETCH_BY_ID_SUCCESS]: fetchUserByIdSuccess,
	[UserTypes.USER_FETCH_BY_ID_FAILURE]: fetchUserByIdFailure
});
