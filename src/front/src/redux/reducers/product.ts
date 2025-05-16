import { IGetProductListSuccessAction, IProduct, IProductCreators, IProductState, IProductTypes } from "@/redux/types";
import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE: IProductState = {
    loading: false,
    fetchedProducts: {
        loading: false,
        data: {} as IProduct[]
    }
}

export const { Creators: ProductCreators, Types: ProductTypes } = createActions<IProductTypes, IProductCreators>({
    postProductCreateRequest: ['product'],
    postProductCreateSuccess: ['data'],
    postProductCreateFailure: [],

    getProductListRequest: [],
    getProductListSuccess: ['data'],
    getProductListFailure: [],

    putProductUpdateRequest: ['product'],
    putProductUpdateSuccess: ['data'],
    putProductUpdateFailure: [],

    deleteProductRequest: ['id', 'productId'],
    deleteProductSuccess: [],
    deleteProductFailure: []
})

const postProductCreateRequest = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: true,
})
const postProductCreateSuccess = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})
const postProductCreateFailure = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})

const getProductListRequest = (state = INITIAL_STATE): IProductState => ({
    ...state,
    fetchedProducts: {
        ...state.fetchedProducts,
        loading: true,
    },
})
const getProductListSuccess = (state = INITIAL_STATE, { data } : IGetProductListSuccessAction): IProductState => ({
    ...state,
    fetchedProducts: {
        ...state.fetchedProducts,
        loading: false,
        data,
    },
})
const getProductListFailure = (state = INITIAL_STATE): IProductState => ({
    ...state,
    fetchedProducts: {
        ...state.fetchedProducts,
        loading: false,
    },
})

const putProductUpdateRequest = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: true,
})
const putProductUpdateSuccess = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})
const putProductUpdateFailure = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})

const deleteProductRequest = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: true,
})
const deleteProductSuccess = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})
const deleteProductFailure = (state = INITIAL_STATE): IProductState => ({
    ...state,
    loading: false,
})

export const product = createReducer(INITIAL_STATE, {
    [ProductTypes.POST_PRODUCT_CREATE_REQUEST]: postProductCreateRequest,
    [ProductTypes.POST_PRODUCT_CREATE_SUCCESS]: postProductCreateSuccess,
    [ProductTypes.POST_PRODUCT_CREATE_FAILURE]: postProductCreateFailure,

    [ProductTypes.GET_PRODUCT_LIST_REQUEST]: getProductListRequest,
    [ProductTypes.GET_PRODUCT_LIST_SUCCESS]: getProductListSuccess,
    [ProductTypes.GET_PRODUCT_LIST_FAILURE]: getProductListFailure,

    [ProductTypes.PUT_PRODUCT_UPDATE_REQUEST]: putProductUpdateRequest,
    [ProductTypes.PUT_PRODUCT_UPDATE_SUCCESS]: putProductUpdateSuccess,
    [ProductTypes.PUT_PRODUCT_UPDATE_FAILURE]: putProductUpdateFailure,

    [ProductTypes.DELETE_PRODUCT_REQUEST]: deleteProductRequest,
    [ProductTypes.DELETE_PRODUCT_SUCCESS]: deleteProductSuccess,
    [ProductTypes.DELETE_PRODUCT_FAILURE]: deleteProductFailure,
})