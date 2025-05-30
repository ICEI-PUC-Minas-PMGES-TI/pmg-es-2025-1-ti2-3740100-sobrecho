import { createActions, createReducer } from "reduxsauce";
import { IGetProductByIdSuccessAction, IProduct, IProductCreators, IProductState, IProductTypes } from "../types";

const INITIAL_STATE: IProductState = {
    fetchedProduct: {
        loading: false,
        data: {} as IProduct
    }
}

export const { Creators: ProductCreators, Types: ProductTypes } = createActions<IProductTypes, IProductCreators>({
    getProductByIdRequest: ['id'],
    getProductByIdSuccess: ['product'],
    getProductByIdFailure: []
})

const getProductByIdRequest = (state = INITIAL_STATE): IProductState => ({
    ...state,
    fetchedProduct: {
        ...state.fetchedProduct,
        loading: true
    }
})
const getProductByIdSuccess = (state = INITIAL_STATE, { data }: IGetProductByIdSuccessAction): IProductState => ({
    ...state,
    fetchedProduct: {
        ...state.fetchedProduct,
        loading: false,
        data
    }
})
const getProductByIdFailure = (state = INITIAL_STATE): IProductState => ({
    ...state,
    fetchedProduct: {
        ...state.fetchedProduct,
        loading: false
    }
})

export const product = createReducer(INITIAL_STATE, {
    [ProductTypes.GET_PRODUCT_BY_ID_REQUEST]: getProductByIdRequest,
    [ProductTypes.GET_PRODUCT_BY_ID_SUCCESS]: getProductByIdSuccess,
    [ProductTypes.GET_PRODUCT_BY_ID_FAILURE]: getProductByIdFailure
});