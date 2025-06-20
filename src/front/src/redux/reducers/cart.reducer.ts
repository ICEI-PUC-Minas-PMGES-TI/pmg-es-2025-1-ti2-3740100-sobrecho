import { createActions, createReducer } from 'reduxsauce';

import {
	ICartCreators,
	ICartGetSuccessAction,
	ICartState,
	ICartTypes
} from '@/redux/states';
import { ICart } from '@/redux/types';

const INITIAL_STATE: ICartState = {
	add: {
		loading: false
	},
	remove: {
		loading: false
	},
	clear: {
		loading: false
	},
	get: {
		loading: false,
		data: {} as ICart
	}
};

export const { Creators: CartCreators, Types: CartTypes } = createActions<
	ICartTypes,
	ICartCreators
>({
	cartAddItemRequest: ['payload'],
	cartAddItemSuccess: [],
	cartAddItemFailure: [],

	cartRemoveItemRequest: ['payload'],
	cartRemoveItemSuccess: [],
	cartRemoveItemFailure: [],

	cartClearRequest: ['payload'],
	cartClearSuccess: [],
	cartClearFailure: [],

	cartGetRequest: ['payload'],
	cartGetSuccess: ['payload'],
	cartGetFailure: []
});

const cartAddItemRequest = (state = INITIAL_STATE): ICartState => ({
	...state,
	add: {
		...state.add,
		loading: true
	}
});
const cartAddItemSuccess = (state = INITIAL_STATE): ICartState => ({
	...state,
	add: {
		...state.add,
		loading: false
	}
});
const cartAddItemFailure = (state = INITIAL_STATE): ICartState => ({
	...state,
	add: {
		...state.add,
		loading: false
	}
});

const cartRemoveItemRequest = (state = INITIAL_STATE): ICartState => ({
	...state,
	remove: {
		...state.remove,
		loading: true
	}
});
const cartRemoveItemSuccess = (state = INITIAL_STATE): ICartState => ({
	...state,
	remove: {
		...state.remove,
		loading: false
	}
});
const cartRemoveItemFailure = (state = INITIAL_STATE): ICartState => ({
	...state,
	remove: {
		...state.remove,
		loading: false
	}
});

const cartClearRequest = (state = INITIAL_STATE): ICartState => ({
	...state,
	clear: {
		...state.clear,
		loading: true
	}
});
const cartClearSuccess = (state = INITIAL_STATE): ICartState => ({
	...state,
	clear: {
		...state.clear,
		loading: false
	}
});
const cartClearFailure = (state = INITIAL_STATE): ICartState => ({
	...state,
	clear: {
		...state.clear,
		loading: false
	}
});

const cartGetRequest = (state = INITIAL_STATE): ICartState => ({
	...state,
	get: {
		...state.get,
		loading: true
	}
});
const cartGetSuccess = (
	state = INITIAL_STATE,
	{ payload }: ICartGetSuccessAction
): ICartState => ({
	...state,
	get: {
		...state.get,
		loading: false,
		data: payload
	}
});
const cartGetFailure = (state = INITIAL_STATE): ICartState => ({
	...state,
	get: {
		...state.get,
		loading: false
	}
});

export const cart = createReducer(INITIAL_STATE, {
	[CartTypes.CART_ADD_ITEM_REQUEST]: cartAddItemRequest,
	[CartTypes.CART_ADD_ITEM_SUCCESS]: cartAddItemSuccess,
	[CartTypes.CART_ADD_ITEM_FAILURE]: cartAddItemFailure,

	[CartTypes.CART_REMOVE_ITEM_REQUEST]: cartRemoveItemRequest,
	[CartTypes.CART_REMOVE_ITEM_SUCCESS]: cartRemoveItemSuccess,
	[CartTypes.CART_REMOVE_ITEM_FAILURE]: cartRemoveItemFailure,

	[CartTypes.CART_CLEAR_REQUEST]: cartClearRequest,
	[CartTypes.CART_CLEAR_SUCCESS]: cartClearSuccess,
	[CartTypes.CART_CLEAR_FAILURE]: cartClearFailure,

	[CartTypes.CART_GET_REQUEST]: cartGetRequest,
	[CartTypes.CART_GET_SUCCESS]: cartGetSuccess,
	[CartTypes.CART_GET_FAILURE]: cartGetFailure
});
