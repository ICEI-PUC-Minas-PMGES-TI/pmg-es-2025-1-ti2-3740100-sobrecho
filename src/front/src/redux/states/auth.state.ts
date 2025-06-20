import { AnyAction } from 'redux-saga';

import { IUser } from '@/redux/types';

export interface IAuthState {
	signed: boolean;
	user: IUser;

	loading: boolean;
}

export interface IAuthTypes {
	AUTH_SIGN_UP_REQUEST: string;
	AUTH_SIGN_UP_SUCCESS: string;
	AUTH_SIGN_UP_FAILURE: string;

	AUTH_SIGN_UP_SELLER_REQUEST: string;
	AUTH_SIGN_UP_SELLER_SUCCESS: string;
	AUTH_SIGN_UP_SELLER_FAILURE: string;

	AUTH_SIGN_IN_REQUEST: string;
	AUTH_SIGN_IN_SUCCESS: string;
	AUTH_SIGN_IN_FAILURE: string;

	AUTH_SIGN_OUT: string;
}

export interface IAuthSignUpRequestAction extends AnyAction {
	payload: {
		name: string;
		email: string;
		phone: string;
		birthdate: string;
		password: string;
	};
}
export interface IAuthSignUpSuccessAction extends AnyAction {
	payload: IUser;
}
export interface IAuthSignUpFailureAction extends AnyAction {}

export interface IAuthSignUpSellerRequestAction extends AnyAction {
	payload: {
		name: string;
		email: string;
		phone: string;
		birthdate: string;
		password: string;
		store: {
			name: string;
			description: string;
			image: File;
		};
	};
}
export interface IAuthSignUpSellerSuccessAction extends AnyAction {
	payload: IUser;
}
export interface IAuthSignUpSellerFailureAction extends AnyAction {}

export interface IAuthSignInRequestAction extends AnyAction {
	payload: {
		email: string;
		password: string;
	};
}
export interface IAuthSignInSuccessAction extends AnyAction {
	payload: IUser;
}
export interface IAuthSignInFailureAction extends AnyAction {}

export interface IAuthSignOutAction extends AnyAction {}

export interface IAuthCreators {
	authSignUpRequest(
		payload: IAuthSignUpRequestAction['payload']
	): IAuthSignUpRequestAction;
	authSignUpSuccess(
		payload: IAuthSignUpSuccessAction['payload']
	): IAuthSignUpSuccessAction;
	authSignUpFailure(): IAuthSignUpFailureAction;

	authSignUpSellerRequest(
		payload: IAuthSignUpSellerRequestAction['payload']
	): IAuthSignUpSellerRequestAction;
	authSignUpSellerSuccess(
		payload: IAuthSignUpSellerSuccessAction['payload']
	): IAuthSignUpSellerSuccessAction;
	authSignUpSellerFailure(): IAuthSignUpSellerFailureAction;

	authSignInRequest(
		payload: IAuthSignInRequestAction['payload']
	): IAuthSignInRequestAction;
	authSignInSuccess(
		payload: IAuthSignInSuccessAction['payload']
	): IAuthSignInSuccessAction;
	authSignInFailure(): IAuthSignInFailureAction;

	authSignOut(): IAuthSignOutAction;
}
