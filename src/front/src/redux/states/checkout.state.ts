import { AnyAction } from 'redux-saga';

import { IAddress, ICheckout, ICheckoutItem } from '@/redux/types';

export interface ICheckoutState {
	create: {
		loading: boolean;
		success: boolean;
		id: string;
	};
	update: {
		loading: boolean;
		success: boolean;
	};
	getById: {
		loading: boolean;
		data: ICheckout;
	};
	getAddress: {
		loading: boolean;
		data: IAddress | null;
	};
}

export interface ICheckoutTypes {
	CHECKOUT_CREATE_REQUEST: string;
	CHECKOUT_CREATE_SUCCESS: string;
	CHECKOUT_CREATE_FAILURE: string;

	CHECKOUT_UPDATE_REQUEST: string;
	CHECKOUT_UPDATE_SUCCESS: string;
	CHECKOUT_UPDATE_FAILURE: string;

	CHECKOUT_GET_BY_ID_REQUEST: string;
	CHECKOUT_GET_BY_ID_SUCCESS: string;
	CHECKOUT_GET_BY_ID_FAILURE: string;

	CHECKOUT_GET_ADDRESS_REQUEST: string;
	CHECKOUT_GET_ADDRESS_SUCCESS: string;
	CHECKOUT_GET_ADDRESS_FAILURE: string;
}

export interface ICheckoutCreateRequestAction extends AnyAction {
	payload: {
		items: ICheckoutItem[];
		method: 'credit-card' | 'pix';
		total: number;
	};
}
export interface ICheckoutCreateSuccessAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface ICheckoutCreateFailureAction extends AnyAction {}

export interface ICheckoutUpdateRequestAction extends AnyAction {
	payload: {
		id: string;
		status: 'canceled' | 'paid';
	};
}
export interface ICheckoutUpdateSuccessAction extends AnyAction {}
export interface ICheckoutUpdateFailureAction extends AnyAction {}

export interface ICheckoutGetByIdRequestAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface ICheckoutGetByIdSuccessAction extends AnyAction {
	payload: {
		id: string;
		items: ICheckoutItem[];
		method: 'credit-card' | 'pix';
		total: number;
		status: 'canceled' | 'paid';
		createdAt: string;
	};
}
export interface ICheckoutGetByIdFailureAction extends AnyAction {}

export interface ICheckoutGetAddressRequestAction extends AnyAction {
	payload: {
		cep: string;
	};
}
export interface ICheckoutGetAddressSuccessAction extends AnyAction {
	payload: IAddress;
}
export interface ICheckoutGetAddressFailureAction extends AnyAction {}

export interface ICheckoutCreators {
	checkoutCreateRequest: (
		payload: ICheckoutCreateRequestAction['payload']
	) => ICheckoutCreateRequestAction;
	checkoutCreateSuccess: (
		payload: ICheckoutCreateSuccessAction['payload']
	) => ICheckoutCreateSuccessAction;
	checkoutCreateFailure: () => ICheckoutCreateFailureAction;

	checkoutUpdateRequest: (
		payload: ICheckoutUpdateRequestAction['payload']
	) => ICheckoutUpdateRequestAction;
	checkoutUpdateSuccess: () => ICheckoutUpdateSuccessAction;
	checkoutUpdateFailure: () => ICheckoutUpdateFailureAction;

	checkoutGetByIdRequest: (
		payload: ICheckoutGetByIdRequestAction['payload']
	) => ICheckoutGetByIdRequestAction;
	checkoutGetByIdSuccess: (
		payload: ICheckoutGetByIdSuccessAction['payload']
	) => ICheckoutGetByIdSuccessAction;
	checkoutGetByIdFailure: () => ICheckoutGetByIdFailureAction;

	checkoutGetAddressRequest: (
		payload: ICheckoutGetAddressRequestAction['payload']
	) => ICheckoutGetAddressRequestAction;
	checkoutGetAddressSuccess: (
		payload: ICheckoutGetAddressSuccessAction['payload']
	) => ICheckoutGetAddressSuccessAction;
	checkoutGetAddressFailure: () => ICheckoutGetAddressFailureAction;
}
