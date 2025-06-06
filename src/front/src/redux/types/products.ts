import { AnyAction } from 'redux-saga';

export interface IProduct {
	id: string;
	storeId: string;
	name: string;
	category: string;
	price: string;
	description: string;
	quantity: string;
	size: string[];
	images: string[];
	createdAt: string;
}

export interface IProductsState {
	productCreate: {
		loading: boolean;
	};
	listProducts: {
		loading: boolean;
		data: IProduct[];
	};
	listAllProducts: {
		loading: boolean;
		data: IProduct[];
	};
	fetchProductById: {
		loading: boolean;
		data: IProduct | null;
	};
	updateProduct: {
		loading: boolean;
	};
	deleteProduct: {
		loading: boolean;
	};
}

export interface IProductsTypes {
	PRODUCT_CREATE_REQUEST: string;
	PRODUCT_CREATE_SUCCESS: string;
	PRODUCT_CREATE_FAILURE: string;

	PRODUCT_LIST_REQUEST: string;
	PRODUCT_LIST_SUCCESS: string;
	PRODUCT_LIST_FAILURE: string;

	PRODUCT_LIST_ALL_REQUEST: string;
	PRODUCT_LIST_ALL_SUCCESS: string;
	PRODUCT_LIST_ALL_FAILURE: string;

	PRODUCT_FETCH_BY_ID_REQUEST: string;
	PRODUCT_FETCH_BY_ID_SUCCESS: string;
	PRODUCT_FETCH_BY_ID_FAILURE: string;

	PRODUCT_UPDATE_REQUEST: string;
	PRODUCT_UPDATE_SUCCESS: string;
	PRODUCT_UPDATE_FAILURE: string;

	PRODUCT_DELETE_REQUEST: string;
	PRODUCT_DELETE_SUCCESS: string;
	PRODUCT_DELETE_FAILURE: string;
}

export interface IProductCreateRequestAction extends AnyAction {
	payload: {
		storeId: string;
		name: string;
		category: string;
		price: string;
		description: string;
		quantity: string;
		size: string[];
		images: File[];
	};
}
export interface IProductCreateSuccessAction extends AnyAction {}
export interface IProductCreateFailureAction extends AnyAction {}

export interface IProductListRequestAction extends AnyAction {
	payload: {
		storeId: string;
	};
}
export interface IProductListSuccessAction extends AnyAction {
	payload: IProduct[];
}
export interface IProductListFailureAction extends AnyAction {}

export interface IProductListAllRequestAction extends AnyAction {}
export interface IProductListAllSuccessAction extends AnyAction {
	payload: IProduct[];
}
export interface IProductListAllFailureAction extends AnyAction {}

export interface IProductFetchByIdRequestAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface IProductFetchByIdSuccessAction extends AnyAction {
	payload: IProduct | null;
}
export interface IProductFetchByIdFailureAction extends AnyAction {}

export interface IProductUpdateRequestAction extends AnyAction {
	payload: {
		id: string;
		storeId: string;
		name: string;
		category: string;
		price: string;
		description: string;
		size: string[];
		images: (File | string)[];
	};
}
export interface IProductUpdateSuccessAction extends AnyAction {}
export interface IProductUpdateFailureAction extends AnyAction {}

export interface IProductDeleteRequestAction extends AnyAction {
	payload: {
		id: string;
	};
}
export interface IProductDeleteSuccessAction extends AnyAction {}
export interface IProductDeleteFailureAction extends AnyAction {}

export interface IProductsCreators {
	productCreateRequest: (
		payload: IProductCreateRequestAction['payload']
	) => IProductCreateRequestAction;
	productCreateSuccess: () => IProductCreateSuccessAction;
	productCreateFailure: () => IProductCreateFailureAction;

	productListRequest: (
		payload: IProductListRequestAction['payload']
	) => IProductListRequestAction;
	productListSuccess: (
		payload: IProductListSuccessAction['payload']
	) => IProductListSuccessAction;
	productListFailure: () => IProductListFailureAction;

	productListAllRequest: () => IProductListAllRequestAction;
	productListAllSuccess: (
		payload: IProductListAllSuccessAction['payload']
	) => IProductListAllSuccessAction;
	productListAllFailure: () => IProductListAllFailureAction;

	productFetchByIdRequest: (
		payload: IProductFetchByIdRequestAction['payload']
	) => IProductFetchByIdRequestAction;
	productFetchByIdSuccess: (
		payload: IProductFetchByIdSuccessAction['payload']
	) => IProductFetchByIdSuccessAction;
	productFetchByIdFailure: () => IProductFetchByIdFailureAction;

	productUpdateRequest: (
		payload: IProductUpdateRequestAction['payload']
	) => IProductUpdateRequestAction;
	productUpdateSuccess: () => IProductUpdateSuccessAction;
	productUpdateFailure: () => IProductUpdateFailureAction;

	productDeleteRequest: (
		payload: IProductDeleteRequestAction['payload']
	) => IProductDeleteRequestAction;
	productDeleteSuccess: () => IProductDeleteSuccessAction;
	productDeleteFailure: () => IProductDeleteFailureAction;
}
