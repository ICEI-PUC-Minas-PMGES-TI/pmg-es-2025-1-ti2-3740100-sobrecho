import { createActions, createReducer } from 'reduxsauce';

import {
	ICheckoutCreateSuccessAction,
	ICheckoutCreators,
	ICheckoutGetAddressSuccessAction,
	ICheckoutGetByIdSuccessAction,
	ICheckoutState,
	ICheckoutTypes
} from '@/redux/states';
import { IAddress, ICheckout } from '@/redux/types';

const INITIAL_STATE: ICheckoutState = {
	create: {
		loading: false,
		success: false,
		id: ''
	},
	update: {
		loading: false,
		success: false
	},
	getById: {
		loading: false,
		data: {} as ICheckout
	},
	getAddress: {
		loading: false,
		data: {} as IAddress
	}
};

export const { Creators: CheckoutCreators, Types: CheckoutTypes } = createActions<
	ICheckoutTypes,
	ICheckoutCreators
>({
	checkoutCreateRequest: ['payload'],
	checkoutCreateSuccess: ['payload'],
	checkoutCreateFailure: [],

	checkoutUpdateRequest: ['payload'],
	checkoutUpdateSuccess: [],
	checkoutUpdateFailure: [],

	checkoutGetByIdRequest: ['payload'],
	checkoutGetByIdSuccess: ['payload'],
	checkoutGetByIdFailure: [],

	checkoutGetAddressRequest: ['payload'],
	checkoutGetAddressSuccess: ['payload'],
	checkoutGetAddressFailure: []
});

const checkoutCreateRequest = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	create: {
		...state.create,
		loading: true
	}
});
const checkoutCreateSuccess = (
	state = INITIAL_STATE,
	{ payload }: ICheckoutCreateSuccessAction
): ICheckoutState => ({
	...state,
	create: {
		...state.create,
		loading: false,
		success: true,
		id: payload.id
	}
});
const checkoutCreateFailure = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	create: {
		...state.create,
		loading: false
	}
});

const checkoutUpdateRequest = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	update: {
		...state.update,
		success: true,
		loading: true
	}
});
const checkoutUpdateSuccess = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	update: {
		...state.update,
		loading: false
	}
});
const checkoutUpdateFailure = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	update: {
		...state.update,
		loading: false
	}
});

const checkoutGetByIdRequest = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	getById: {
		...state.getById,
		loading: true
	}
});
const checkoutGetByIdSuccess = (
	state = INITIAL_STATE,
	{ payload }: ICheckoutGetByIdSuccessAction
): ICheckoutState => ({
	...state,
	getById: {
		...state.getById,
		loading: false,
		data: payload
	}
});
const checkoutGetByIdFailure = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	getById: {
		...state.getById,
		loading: false
	}
});

const checkoutGetAddressRequest = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	getAddress: {
		...state.getAddress,
		loading: true
	}
});
const checkoutGetAddressSuccess = (
	state = INITIAL_STATE,
	{ payload }: ICheckoutGetAddressSuccessAction
): ICheckoutState => ({
	...state,
	getAddress: {
		...state.getAddress,
		loading: false,
		data: payload
	}
});
const checkoutGetAddressFailure = (state = INITIAL_STATE): ICheckoutState => ({
	...state,
	getAddress: {
		...state.getAddress,
		loading: false
	}
});

export const checkout = createReducer(INITIAL_STATE, {
	[CheckoutTypes.CHECKOUT_CREATE_REQUEST]: checkoutCreateRequest,
	[CheckoutTypes.CHECKOUT_CREATE_SUCCESS]: checkoutCreateSuccess,
	[CheckoutTypes.CHECKOUT_CREATE_FAILURE]: checkoutCreateFailure,

	[CheckoutTypes.CHECKOUT_UPDATE_REQUEST]: checkoutUpdateRequest,
	[CheckoutTypes.CHECKOUT_UPDATE_SUCCESS]: checkoutUpdateSuccess,
	[CheckoutTypes.CHECKOUT_UPDATE_FAILURE]: checkoutUpdateFailure,

	[CheckoutTypes.CHECKOUT_GET_BY_ID_REQUEST]: checkoutGetByIdRequest,
	[CheckoutTypes.CHECKOUT_GET_BY_ID_SUCCESS]: checkoutGetByIdSuccess,
	[CheckoutTypes.CHECKOUT_GET_BY_ID_FAILURE]: checkoutGetByIdFailure,

	[CheckoutTypes.CHECKOUT_GET_ADDRESS_REQUEST]: checkoutGetAddressRequest,
	[CheckoutTypes.CHECKOUT_GET_ADDRESS_SUCCESS]: checkoutGetAddressSuccess,
	[CheckoutTypes.CHECKOUT_GET_ADDRESS_FAILURE]: checkoutGetAddressFailure
});
