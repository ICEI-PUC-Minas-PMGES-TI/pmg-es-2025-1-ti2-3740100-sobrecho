import { createActions, createReducer } from 'reduxsauce';

import {
	IAuthCreators,
	IAuthSignInSuccessAction,
	IAuthSignUpSellerSuccessAction,
	IAuthSignUpSuccessAction,
	IAuthState,
	IAuthTypes
} from '@/redux/states';
import { ISession, IUser } from '@/redux/types';
import { cookies } from '@/services';

const session: ISession = cookies.get('sobrecho.session');

const INITIAL_STATE: IAuthState = {
	signed: Boolean(session?.tokens?.access),
	user:
		session?.user?.role === 'ROLE_SELLER'
			? {
					id: session?.user?.id,
					name: session?.user?.name,
					email: session?.user?.email,
					role: session?.user?.role,
					store: session?.user?.store
				}
			: {
					id: session?.user?.id,
					name: session?.user?.name,
					email: session?.user?.email,
					role: session?.user?.role
				},
	loading: false
};

export const { Creators: AuthCreators, Types: AuthTypes } = createActions<
	IAuthTypes,
	IAuthCreators
>({
	authSignUpRequest: ['payload'],
	authSignUpSuccess: ['payload'],
	authSignUpFailure: [],

	authSignUpSellerRequest: ['payload'],
	authSignUpSellerSuccess: ['payload'],
	authSignUpSellerFailure: [],

	authSignInRequest: ['payload'],
	authSignInSuccess: ['payload'],
	authSignInFailure: [],

	authSignOut: []
});

const authSignUpRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: true
});
const authSignUpSuccess = (
	state = INITIAL_STATE,
	{ payload }: IAuthSignUpSuccessAction
): IAuthState => ({
	...state,
	loading: false,
	signed: true,
	user: payload
});
const authSignUpFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});

const authSignUpSellerRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});
const authSignUpSellerSuccess = (
	state = INITIAL_STATE,
	{ payload }: IAuthSignUpSellerSuccessAction
): IAuthState => ({
	...state,
	loading: false,
	signed: true,
	user: payload
});
const authSignUpSellerFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});

const authSignInRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: true
});
const authSignInSuccess = (
	state = INITIAL_STATE,
	{ payload }: IAuthSignInSuccessAction
): IAuthState => ({
	...state,
	loading: false,
	signed: true,
	user: payload
});
const authSignInFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	loading: false
});

const authSignOut = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signed: false,
	user: {} as IUser
});

export const auth = createReducer(INITIAL_STATE, {
	[AuthTypes.AUTH_SIGN_UP_REQUEST]: authSignUpRequest,
	[AuthTypes.AUTH_SIGN_UP_SUCCESS]: authSignUpSuccess,
	[AuthTypes.AUTH_SIGN_UP_FAILURE]: authSignUpFailure,

	[AuthTypes.AUTH_SIGN_UP_SELLER_REQUEST]: authSignUpSellerRequest,
	[AuthTypes.AUTH_SIGN_UP_SELLER_SUCCESS]: authSignUpSellerSuccess,
	[AuthTypes.AUTH_SIGN_UP_SELLER_FAILURE]: authSignUpSellerFailure,

	[AuthTypes.AUTH_SIGN_IN_REQUEST]: authSignInRequest,
	[AuthTypes.AUTH_SIGN_IN_SUCCESS]: authSignInSuccess,
	[AuthTypes.AUTH_SIGN_IN_FAILURE]: authSignInFailure,

	[AuthTypes.AUTH_SIGN_OUT]: authSignOut
});
