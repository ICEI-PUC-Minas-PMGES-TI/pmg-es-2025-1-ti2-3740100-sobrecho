import {
	IAuthCreators,
	IAuthState,
	IAuthTypes,
	ILoggedUserInfo,
	IPostAuthSignInSuccessAction,
	IPostAuthSignUpSellerSuccessAction,
	IPostAuthSignUpSuccessAction
} from '@/redux/types';
import { cookies } from '@/services';
import { createActions, createReducer } from 'reduxsauce';

const session = cookies.get('sobrecho.session');

const sessionUser = session?.user;

let user: ILoggedUserInfo;

if (sessionUser?.role === 'seller') {
	if (!sessionUser.store) {
		throw new Error('User with role seller must have store data');
	}

	user = {
		id: sessionUser.id,
		name: sessionUser.name,
		email: sessionUser.email,
		role: 'seller',
		store: sessionUser.store
	};
} else {
	user = {
		id: sessionUser?.id || '',
		name: sessionUser?.name || '',
		email: sessionUser?.email || '',
		role:
			sessionUser?.role === 'user' || sessionUser?.role === 'admin'
				? sessionUser.role
				: 'user'
	};
}

const INITIAL_STATE: IAuthState = {
	signed: Boolean(session?.tokens?.access),
	user,
	signUp: { loading: false },
	signUpSeller: { loading: false },
	signIn: { loading: false }
};

export const { Creators: AuthCreators, Types: AuthTypes } = createActions<
	IAuthTypes,
	IAuthCreators
>({
	postAuthSignUpRequest: ['payload'],
	postAuthSignUpSuccess: ['payload'],
	postAuthSignUpFailure: [],

	postAuthSignUpSellerRequest: ['payload'],
	postAuthSignUpSellerSuccess: ['payload'],
	postAuthSignUpSellerFailure: [],

	postAuthSignInRequest: ['payload'],
	postAuthSignInSuccess: ['payload'],
	postAuthSignInFailure: [],

	authSignOut: []
});

const signUpRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUp: {
		loading: true
	}
});
const signUpSuccess = (
	state = INITIAL_STATE,
	{ payload }: IPostAuthSignUpSuccessAction
): IAuthState => ({
	...state,
	signUp: {
		loading: false
	},
	signed: true,
	user: payload
});
const signUpFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUp: {
		loading: false
	}
});

const signUpSellerRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUpSeller: {
		loading: true
	}
});
const signUpSellerSuccess = (
	state = INITIAL_STATE,
	{ payload }: IPostAuthSignUpSellerSuccessAction
): IAuthState => ({
	...state,
	signUpSeller: {
		loading: false
	},
	signed: true,
	user: payload
});
const signUpSellerFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signUpSeller: {
		loading: false
	}
});

const signInRequest = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signIn: {
		loading: true
	}
});
const signInSuccess = (
	state = INITIAL_STATE,
	{ payload }: IPostAuthSignInSuccessAction
): IAuthState => ({
	...state,
	signIn: {
		loading: false
	},
	signed: true,
	user: payload
});
const signInFailure = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signIn: {
		loading: false
	}
});

const authSignOut = (state = INITIAL_STATE): IAuthState => ({
	...state,
	signed: false,
	user: {} as ILoggedUserInfo
});

export const auth = createReducer(INITIAL_STATE, {
	[AuthTypes.POST_AUTH_SIGN_UP_REQUEST]: signUpRequest,
	[AuthTypes.POST_AUTH_SIGN_UP_SUCCESS]: signUpSuccess,
	[AuthTypes.POST_AUTH_SIGN_UP_FAILURE]: signUpFailure,

	[AuthTypes.POST_AUTH_SIGN_UP_SELLER_REQUEST]: signUpSellerRequest,
	[AuthTypes.POST_AUTH_SIGN_UP_SELLER_SUCCESS]: signUpSellerSuccess,
	[AuthTypes.POST_AUTH_SIGN_UP_SELLER_FAILURE]: signUpSellerFailure,

	[AuthTypes.POST_AUTH_SIGN_IN_REQUEST]: signInRequest,
	[AuthTypes.POST_AUTH_SIGN_IN_SUCCESS]: signInSuccess,
	[AuthTypes.POST_AUTH_SIGN_IN_FAILURE]: signInFailure,

	[AuthTypes.AUTH_SIGN_OUT]: authSignOut
});
