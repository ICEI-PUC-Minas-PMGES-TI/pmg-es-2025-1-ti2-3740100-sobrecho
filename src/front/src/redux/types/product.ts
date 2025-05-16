import { AnyAction } from "redux-saga";

export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	user: { 
		id: number 
	};
}

export interface IProductState {
	loading: boolean;
	fetchedProducts: {
		loading: boolean;
		data: IProduct[];
	}
}

export interface IProductTypes {
	POST_PRODUCT_CREATE_REQUEST: string;
	POST_PRODUCT_CREATE_SUCCESS: string;
	POST_PRODUCT_CREATE_FAILURE: string;

	GET_PRODUCT_LIST_REQUEST: string;
	GET_PRODUCT_LIST_SUCCESS: string;
	GET_PRODUCT_LIST_FAILURE: string;

	PUT_PRODUCT_UPDATE_REQUEST: string;
	PUT_PRODUCT_UPDATE_SUCCESS: string;
	PUT_PRODUCT_UPDATE_FAILURE: string;

	DELETE_PRODUCT_REQUEST: string;
	DELETE_PRODUCT_SUCCESS: string;
	DELETE_PRODUCT_FAILURE: string;
}

export interface IPostProductCreateRequestAction extends AnyAction {
	product: IProduct;
}
export interface IPostProductCreateSuccessAction extends AnyAction {
	data: IProduct;
}
export interface IPostProductCreateFailureAction extends AnyAction {}

export interface IGetProductListRequestAction extends AnyAction {}
export interface IGetProductListSuccessAction extends AnyAction {
	data: IProduct[];
}
export interface IGetProductListFailureAction extends AnyAction {}

export interface IPutProductUpdateRequestAction extends AnyAction {
	product: IProduct;
}
export interface IPutProductUpdateSuccessAction extends AnyAction {
	data: IProduct;
}
export interface IPutProductUpdateFailureAction extends AnyAction {}

export interface IDeleteProductRequestAction extends AnyAction {
	id: number;
	productId: number;
}
export interface IDeleteProductSuccessAction extends AnyAction {}
export interface IDeleteProductFailureAction extends AnyAction {}

export interface IProductCreators {
	postProductCreateRequest: (product: IProduct) => IPostProductCreateRequestAction
	postProductCreateSuccess: (data: IProduct) => IPostProductCreateSuccessAction
	postProductCreateFailure: () => IPostProductCreateFailureAction

	getProductListRequest: () => IGetProductListRequestAction
	getProductListSuccess: (data: IProduct[]) => IGetProductListSuccessAction
	getProductListFailure: () => IGetProductListFailureAction

	putProductUpdateRequest: (product: IProduct) => IPutProductUpdateRequestAction
	putProductUpdateSuccess: (data: IProduct) => IPutProductUpdateSuccessAction
	putProductUpdateFailure: () => IPutProductUpdateFailureAction

	deleteProductRequest: (id: number, productId: number) => IDeleteProductRequestAction
	deleteProductSuccess: () => IDeleteProductSuccessAction
	deleteProductFailure: () => IDeleteProductFailureAction
}