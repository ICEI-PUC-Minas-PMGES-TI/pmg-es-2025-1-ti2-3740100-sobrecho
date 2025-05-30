import { AnyAction } from 'redux-saga';

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface IProductState {
    fetchedProduct: {
        loading: boolean;
        data: IProduct | null;
    };
}

export interface IProductTypes {
    GET_PRODUCT_BY_ID_REQUEST: string;
    GET_PRODUCT_BY_ID_SUCCESS: string;
    GET_PRODUCT_BY_ID_FAILURE: string;
}

export interface IGetProductByIdRequestAction extends AnyAction {
    id: number;
}
export interface IGetProductByIdSuccessAction extends AnyAction {
    data: IProduct;
}
export interface IGetProductByIdFailureAction extends AnyAction {}

export interface IProductCreators {
    getProductByIdRequest: (id: number) => IGetProductByIdRequestAction;
    getProductByIdSuccess: (data: IProduct) => IGetProductByIdSuccessAction;
    getProductByIdFailure: () => IGetProductByIdFailureAction;
}