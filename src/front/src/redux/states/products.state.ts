import { AnyAction } from 'redux-saga';

import { IProduct } from '@/redux/types';

export interface IProductsState {
	create: {
		loading: boolean;
		success: boolean;
	};
	getAll: {
		loading: boolean;
		data: IProduct[];
	};
	getByStoreId: {
		loading: boolean;
		data: IProduct[];
	};
	getById: {
		loading: boolean;
		data: IProduct;
	};
	update: {
		loading: boolean;
		success: boolean;
	};
	delete: {
		loading: boolean;
	};
}

export interface IProductsTypes {
	PRODUCTS_CREATE_REQUEST: string;
	PRODUCTS_CREATE_SUCCESS: string;
	PRODUCTS_CREATE_FAILURE: string;

	PRODUCTS_GET_ALL_REQUEST: string;
	PRODUCTS_GET_ALL_SUCCESS: string;
	PRODUCTS_GET_ALL_FAILURE: string;

	PRODUCTS_GET_BY_STORE_ID_REQUEST: string;
	PRODUCTS_GET_BY_STORE_ID_SUCCESS: string;
	PRODUCTS_GET_BY_STORE_ID_FAILURE: string;

	PRODUCTS_GET_BY_ID_REQUEST: string;
	PRODUCTS_GET_BY_ID_SUCCESS: string;
	PRODUCTS_GET_BY_ID_FAILURE: string;

	PRODUCTS_UPDATE_REQUEST: string;
	PRODUCTS_UPDATE_SUCCESS: string;
	PRODUCTS_UPDATE_FAILURE: string;

	PRODUCTS_DELETE_REQUEST: string;
	PRODUCTS_DELETE_SUCCESS: string;
	PRODUCTS_DELETE_FAILURE: string;
}

export interface IProductsCreateRequestAction extends AnyAction {
	payload: {
		name: string;
		description: string;
		category: string;
		price: number;
		size: string;
		image: File;
	};
}
export interface IProductsCreateSuccessAction extends AnyAction {}
export interface IProductsCreateFailureAction extends AnyAction {}

export interface IProductsGetAllRequestAction extends AnyAction {}
export interface IProductsGetAllSuccessAction extends AnyAction {
	payload: IProduct[];
}
export interface IProductsGetAllFailureAction extends AnyAction {}

export interface IProductsGetByStoreIdRequestAction extends AnyAction {
	payload: {
		storeId: string;
	};
}
export interface IProductsGetByStoreIdSuccessAction extends AnyAction {
	payload: IProduct[];
}
export interface IProductsGetByStoreIdFailureAction extends AnyAction {}

export interface IProductsGetByIdRequestAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface IProductsGetByIdSuccessAction extends AnyAction {
	payload: IProduct;
}
export interface IProductsGetByIdFailureAction extends AnyAction {}

export interface IProductsUpdateRequestAction extends AnyAction {
	payload: {
		id: string;
		name: string;
		description: string;
		category: string;
		price: number;
		size: string;
	};
}
export interface IProductsUpdateSuccessAction extends AnyAction {}
export interface IProductsUpdateFailureAction extends AnyAction {}

export interface IProductsDeleteRequestAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface IProductsDeleteSuccessAction extends AnyAction {}
export interface IProductsDeleteFailureAction extends AnyAction {}

export interface IProductsCreators {
	productsCreateRequest: (
		payload: IProductsCreateRequestAction['payload']
	) => IProductsCreateRequestAction;
	productsCreateSuccess: () => IProductsCreateSuccessAction;
	productsCreateFailure: () => IProductsCreateFailureAction;

	productsGetAllRequest: () => IProductsGetAllRequestAction;
	productsGetAllSuccess: (
		payload: IProductsGetAllSuccessAction['payload']
	) => IProductsGetAllSuccessAction;
	productsGetAllFailure: () => IProductsGetAllFailureAction;

	productsGetByStoreIdRequest: (
		payload: IProductsGetByStoreIdRequestAction['payload']
	) => IProductsGetByStoreIdRequestAction;
	productsGetByStoreIdSuccess: (
		payload: IProductsGetByStoreIdSuccessAction['payload']
	) => IProductsGetByStoreIdSuccessAction;
	productsGetByStoreIdFailure: () => IProductsGetByStoreIdFailureAction;

	productsGetByIdRequest: (
		payload: IProductsGetByIdRequestAction['payload']
	) => IProductsGetByIdRequestAction;
	productsGetByIdSuccess: (
		payload: IProductsGetByIdSuccessAction['payload']
	) => IProductsGetByIdSuccessAction;
	productsGetByIdFailure: () => IProductsGetByIdFailureAction;

	productsUpdateRequest: (
		payload: IProductsUpdateRequestAction['payload']
	) => IProductsUpdateRequestAction;
	productsUpdateSuccess: () => IProductsUpdateSuccessAction;
	productsUpdateFailure: () => IProductsUpdateFailureAction;

	productsDeleteRequest: (
		payload: IProductsDeleteRequestAction['payload']
	) => IProductsDeleteRequestAction;
	productsDeleteSuccess: () => IProductsDeleteSuccessAction;
	productsDeleteFailure: () => IProductsDeleteFailureAction;
}
