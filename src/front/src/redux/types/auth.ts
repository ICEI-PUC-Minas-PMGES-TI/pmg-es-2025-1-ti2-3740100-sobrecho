import { AnyAction } from 'redux-saga';

export interface ISession {
	tokens: {
		refresh: string;
		refresh_expires_at: string;
		access: string;
		access_expires_at: string;
	};
	user: {
		id: string;
		name: string;
		email: string;
		role: 'user' | 'seller' | 'admin';
	};
}

export type ILoggedUserInfo =
	| {
			role: 'user' | 'admin';
			id: string;
			name: string;
			email: string;
	  }
	| {
			role: 'seller';
			id: string;
			name: string;
			email: string;
			store: {
				id: string;
				name: string;
				description: string;
				image: string; // URL image path
			};
	  };

export interface IAuthState {
	signed: boolean;
	user: ILoggedUserInfo;

	signUp: {
		loading: boolean;
	};

	signUpSeller: {
		loading: boolean;
	};

	signIn: {
		loading: boolean;
	};
}

export interface IAuthTypes {
	POST_AUTH_SIGN_UP_REQUEST: string;
	POST_AUTH_SIGN_UP_SUCCESS: string;
	POST_AUTH_SIGN_UP_FAILURE: string;

	POST_AUTH_SIGN_UP_SELLER_REQUEST: string;
	POST_AUTH_SIGN_UP_SELLER_SUCCESS: string;
	POST_AUTH_SIGN_UP_SELLER_FAILURE: string;

	POST_AUTH_SIGN_IN_REQUEST: string;
	POST_AUTH_SIGN_IN_SUCCESS: string;
	POST_AUTH_SIGN_IN_FAILURE: string;

	AUTH_SIGN_OUT: string;
}

export interface IPostAuthSignUpRequestAction extends AnyAction {
	payload: {
		name: string;
		email: string;
		birthdate: string;
		phone: string;
		password: string;
	};
}
export interface IPostAuthSignUpSuccessAction extends AnyAction {
	payload: ILoggedUserInfo;
}
export interface IPostAuthSignUpFailureAction extends AnyAction {}

export interface IPostAuthSignUpSellerRequestAction extends AnyAction {
	payload: {
		name: string;
		email: string;
		birthdate: string;
		phone: string;
		password: string;
		document: string;
		store: {
			name: string;
			description: string;
			image?: File;
		};
	};
}
export interface IPostAuthSignUpSellerSuccessAction extends AnyAction {
	payload: ILoggedUserInfo;
}
export interface IPostAuthSignUpSellerFailureAction extends AnyAction {}

export interface IPostAuthSignInRequestAction extends AnyAction {
	payload: {
		email: string;
		password: string;
	};
}
export interface IPostAuthSignInSuccessAction extends AnyAction {
	payload: ILoggedUserInfo;
}
export interface IPostAuthSignInFailureAction extends AnyAction {}

export interface IAuthSignOutAction extends AnyAction {}

export interface IAuthCreators {
	postAuthSignUpRequest: (
		payload: IPostAuthSignUpRequestAction['payload']
	) => IPostAuthSignUpRequestAction;
	postAuthSignUpSuccess: (
		payload: IPostAuthSignUpSuccessAction['payload']
	) => IPostAuthSignUpSuccessAction;
	postAuthSignUpFailure: () => IPostAuthSignUpFailureAction;

	postAuthSignUpSellerRequest: (
		payload: IPostAuthSignUpSellerRequestAction['payload']
	) => IPostAuthSignUpSellerRequestAction;
	postAuthSignUpSellerSuccess: (
		payload: IPostAuthSignUpSellerSuccessAction['payload']
	) => IPostAuthSignUpSellerSuccessAction;
	postAuthSignUpSellerFailure: () => IPostAuthSignUpSellerFailureAction;

	postAuthSignInRequest: (
		payload: IPostAuthSignInRequestAction['payload']
	) => IPostAuthSignInRequestAction;
	postAuthSignInSuccess: (
		payload: IPostAuthSignInSuccessAction['payload']
	) => IPostAuthSignInSuccessAction;
	postAuthSignInFailure: () => IPostAuthSignInFailureAction;

	authSignOut: () => IAuthSignOutAction;
}
