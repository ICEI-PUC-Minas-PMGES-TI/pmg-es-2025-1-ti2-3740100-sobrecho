import {
	IProduct,
	IProductFetchByIdSuccessAction,
	IProductListSuccessAction,
	IProductsCreators,
	IProductsState,
	IProductsTypes
} from '@/redux/types';
import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE: IProductsState = {
	productCreate: {
		loading: false
	},
	listProducts: {
		loading: false,
		data: [] as IProduct[]
	},
	listAllProducts: {
		loading: false,
		data: [] as IProduct[]
	},
	fetchProductById: {
		loading: false,
		data: {} as IProduct
	},
	updateProduct: {
		loading: false
	},
	deleteProduct: {
		loading: false
	}
};

export const { Creators: ProductsCreators, Types: ProductsTypes } = createActions<
	IProductsTypes,
	IProductsCreators
>({
	productCreateRequest: ['payload'],
	productCreateSuccess: [],
	productCreateFailure: [],

	productListRequest: ['payload'],
	productListSuccess: ['payload'],
	productListFailure: [],

	productListAllRequest: [],
	productListAllSuccess: ['payload'],
	productListAllFailure: [],

	productFetchByIdRequest: ['payload'],
	productFetchByIdSuccess: ['payload'],
	productFetchByIdFailure: [],

	productUpdateRequest: ['payload'],
	productUpdateSuccess: [],
	productUpdateFailure: [],

	productDeleteRequest: ['payload'],
	productDeleteSuccess: [],
	productDeleteFailure: []
});

const productCreateRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	productCreate: {
		loading: true
	}
});
const productCreateSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	productCreate: {
		loading: false
	}
});
const productCreateFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	productCreate: {
		loading: false
	}
});

const productListRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	listProducts: {
		...state.listProducts,
		loading: true
	}
});
const productListSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductListSuccessAction
): IProductsState => ({
	...state,
	listProducts: {
		...state.listProducts,
		loading: false,
		data: payload
	}
});
const productListFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	listProducts: {
		...state.listProducts,
		loading: false
	}
});

const productListAllRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	listAllProducts: {
		...state.listAllProducts,
		loading: true
	}
});
const productListAllSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductListSuccessAction
): IProductsState => ({
	...state,
	listAllProducts: {
		...state.listAllProducts,
		loading: false,
		data: payload
	}
});
const productListAllFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	listAllProducts: {
		...state.listAllProducts,
		loading: false
	}
});

const productFetchByIdRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	fetchProductById: {
		...state.fetchProductById,
		loading: true
	}
});
const productFetchByIdSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductFetchByIdSuccessAction
): IProductsState => ({
	...state,
	fetchProductById: {
		...state.fetchProductById,
		loading: false,
		data: payload
	}
});
const productFetchByIdFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	fetchProductById: {
		...state.fetchProductById,
		loading: false
	}
});

const productUpdateRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	updateProduct: {
		...state.updateProduct,
		loading: true
	}
});
const productUpdateSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	updateProduct: {
		...state.updateProduct,
		loading: false
	}
});
const productUpdateFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	updateProduct: {
		...state.updateProduct,
		loading: false
	}
});

const productDeleteRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	deleteProduct: {
		...state.deleteProduct,
		loading: true
	}
});
const productDeleteSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	deleteProduct: {
		...state.deleteProduct,
		loading: false
	}
});
const productDeleteFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	deleteProduct: {
		...state.deleteProduct,
		loading: false
	}
});

export const products = createReducer(INITIAL_STATE, {
	[ProductsTypes.PRODUCT_CREATE_REQUEST]: productCreateRequest,
	[ProductsTypes.PRODUCT_CREATE_SUCCESS]: productCreateSuccess,
	[ProductsTypes.PRODUCT_CREATE_FAILURE]: productCreateFailure,

	[ProductsTypes.PRODUCT_LIST_REQUEST]: productListRequest,
	[ProductsTypes.PRODUCT_LIST_SUCCESS]: productListSuccess,
	[ProductsTypes.PRODUCT_LIST_FAILURE]: productListFailure,

	[ProductsTypes.PRODUCT_LIST_ALL_REQUEST]: productListAllRequest,
	[ProductsTypes.PRODUCT_LIST_ALL_SUCCESS]: productListAllSuccess,
	[ProductsTypes.PRODUCT_LIST_ALL_FAILURE]: productListAllFailure,

	[ProductsTypes.PRODUCT_FETCH_BY_ID_REQUEST]: productFetchByIdRequest,
	[ProductsTypes.PRODUCT_FETCH_BY_ID_SUCCESS]: productFetchByIdSuccess,
	[ProductsTypes.PRODUCT_FETCH_BY_ID_FAILURE]: productFetchByIdFailure,

	[ProductsTypes.PRODUCT_UPDATE_REQUEST]: productUpdateRequest,
	[ProductsTypes.PRODUCT_UPDATE_SUCCESS]: productUpdateSuccess,
	[ProductsTypes.PRODUCT_UPDATE_FAILURE]: productUpdateFailure,

	[ProductsTypes.PRODUCT_DELETE_REQUEST]: productDeleteRequest,
	[ProductsTypes.PRODUCT_DELETE_SUCCESS]: productDeleteSuccess,
	[ProductsTypes.PRODUCT_DELETE_FAILURE]: productDeleteFailure
});
