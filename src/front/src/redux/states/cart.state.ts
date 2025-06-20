import { AnyAction } from 'redux-saga';

import { ICart, ICartItem } from '@/redux/types';

export interface ICartState {
	add: {
		loading: boolean;
	};
	remove: {
		loading: boolean;
	};
	clear: {
		loading: boolean;
	};
	get: {
		loading: boolean;
		data: ICart | null;
	};
}

export interface ICartTypes {
	CART_ADD_ITEM_REQUEST: string;
	CART_ADD_ITEM_SUCCESS: string;
	CART_ADD_ITEM_FAILURE: string;

	CART_REMOVE_ITEM_REQUEST: string;
	CART_REMOVE_ITEM_SUCCESS: string;
	CART_REMOVE_ITEM_FAILURE: string;

	CART_CLEAR_REQUEST: string;
	CART_CLEAR_SUCCESS: string;
	CART_CLEAR_FAILURE: string;

	CART_GET_REQUEST: string;
	CART_GET_SUCCESS: string;
	CART_GET_FAILURE: string;
}

export interface ICartAddItemRequestAction extends AnyAction {
	payload: {
		userId: string;
		item: ICartItem;
	};
}
export interface ICartAddItemSuccessAction extends AnyAction {}
export interface ICartAddItemFailureAction extends AnyAction {}

export interface ICartRemoveItemRequestAction extends AnyAction {
	payload: {
		id: string;
		userId: string;
	};
}
export interface ICartRemoveItemSuccessAction extends AnyAction {}
export interface ICartRemoveItemFailureAction extends AnyAction {}

export interface ICartClearRequestAction extends AnyAction {
	payload: {
		userId: string;
	};
}
export interface ICartClearSuccessAction extends AnyAction {}
export interface ICartClearFailureAction extends AnyAction {}

export interface ICartGetRequestAction extends AnyAction {
	payload: {
		userId: string;
	};
}
export interface ICartGetSuccessAction extends AnyAction {
	payload: ICart;
}
export interface ICartGetFailureAction extends AnyAction {}

export interface ICartCreators {
	cartAddItemRequest(
		payload: ICartAddItemRequestAction['payload']
	): ICartAddItemRequestAction;
	cartAddItemSuccess(): ICartAddItemSuccessAction;
	cartAddItemFailure(): ICartAddItemFailureAction;

	cartRemoveItemRequest(
		payload: ICartRemoveItemRequestAction['payload']
	): ICartRemoveItemRequestAction;
	cartRemoveItemSuccess(): ICartRemoveItemSuccessAction;
	cartRemoveItemFailure(): ICartRemoveItemFailureAction;

	cartClearRequest(payload: ICartClearRequestAction['payload']): ICartClearRequestAction;
	cartClearSuccess(): ICartClearSuccessAction;
	cartClearFailure(): ICartClearFailureAction;

	cartGetRequest(payload: ICartGetRequestAction['payload']): ICartGetRequestAction;
	cartGetSuccess(payload: ICartGetSuccessAction['payload']): ICartGetSuccessAction;
	cartGetFailure(): ICartGetFailureAction;
}
