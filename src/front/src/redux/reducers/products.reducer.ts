import { createActions, createReducer } from 'reduxsauce';

import {
	IProductsCreators,
	IProductsGetAllSuccessAction,
	IProductsGetByIdSuccessAction,
	IProductsGetByStoreIdSuccessAction,
	IProductsState,
	IProductsTypes
} from '@/redux/states';
import { IProduct } from '@/redux/types';

const INITIAL_STATE: IProductsState = {
	create: {
		loading: false,
		success: false
	},
	getAll: {
		loading: false,
		data: [] as IProduct[]
	},
	getByStoreId: {
		loading: false,
		data: [] as IProduct[]
	},
	getById: {
		loading: false,
		data: {} as IProduct
	},
	update: {
		loading: false,
		success: false
	},
	delete: {
		loading: false
	}
};

export const { Creators: ProductsCreators, Types: ProductsTypes } = createActions<
	IProductsTypes,
	IProductsCreators
>({
	productsCreateRequest: ['payload'],
	productsCreateSuccess: [],
	productsCreateFailure: [],

	productsGetAllRequest: [],
	productsGetAllSuccess: ['payload'],
	productsGetAllFailure: [],

	productsGetByStoreIdRequest: ['payload'],
	productsGetByStoreIdSuccess: ['payload'],
	productsGetByStoreIdFailure: [],

	productsGetByIdRequest: ['payload'],
	productsGetByIdSuccess: ['payload'],
	productsGetByIdFailure: [],

	productsUpdateRequest: ['payload'],
	productsUpdateSuccess: [],
	productsUpdateFailure: [],

	productsDeleteRequest: ['payload'],
	productsDeleteSuccess: [],
	productsDeleteFailure: []
});

const productsCreateRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	create: {
		...state.create,
		loading: true
	}
});
const productsCreateSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	create: {
		...state.create,
		success: true,
		loading: false
	}
});
const productsCreateFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	create: {
		...state.create,
		success: false,
		loading: false
	}
});

const productsGetAllRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getAll: {
		...state.getAll,
		loading: true
	}
});
const productsGetAllSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductsGetAllSuccessAction
): IProductsState => ({
	...state,
	getAll: {
		...state.getAll,
		loading: false,
		data: payload
	}
});
const productsGetAllFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getAll: {
		...state.getAll,
		loading: false
	}
});

const productsGetByStoreIdRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getByStoreId: {
		...state.getByStoreId,
		loading: true
	}
});
const productsGetByStoreIdSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductsGetByStoreIdSuccessAction
): IProductsState => ({
	...state,
	getByStoreId: {
		...state.getByStoreId,
		loading: false,
		data: payload
	}
});
const productsGetByStoreIdFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getByStoreId: {
		...state.getByStoreId,
		loading: false
	}
});

const productsGetByIdRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getById: {
		...state.getById,
		loading: true
	}
});
const productsGetByIdSuccess = (
	state = INITIAL_STATE,
	{ payload }: IProductsGetByIdSuccessAction
): IProductsState => ({
	...state,
	getById: {
		...state.getById,
		loading: false,
		data: payload
	}
});
const productsGetByIdFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	getById: {
		...state.getById,
		loading: false
	}
});

const productsUpdateRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	update: {
		...state.update,
		loading: true
	}
});
const productsUpdateSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	update: {
		...state.update,
		success: true,
		loading: false
	}
});
const productsUpdateFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	update: {
		...state.update,
		success: false,
		loading: false
	}
});

const productsDeleteRequest = (state = INITIAL_STATE): IProductsState => ({
	...state,
	delete: {
		...state.delete,
		loading: true
	}
});
const productsDeleteSuccess = (state = INITIAL_STATE): IProductsState => ({
	...state,
	delete: {
		...state.delete,
		loading: false
	}
});
const productsDeleteFailure = (state = INITIAL_STATE): IProductsState => ({
	...state,
	delete: {
		...state.delete,
		loading: false
	}
});

export const products = createReducer(INITIAL_STATE, {
	[ProductsTypes.PRODUCTS_CREATE_REQUEST]: productsCreateRequest,
	[ProductsTypes.PRODUCTS_CREATE_SUCCESS]: productsCreateSuccess,
	[ProductsTypes.PRODUCTS_CREATE_FAILURE]: productsCreateFailure,

	[ProductsTypes.PRODUCTS_GET_ALL_REQUEST]: productsGetAllRequest,
	[ProductsTypes.PRODUCTS_GET_ALL_SUCCESS]: productsGetAllSuccess,
	[ProductsTypes.PRODUCTS_GET_ALL_FAILURE]: productsGetAllFailure,

	[ProductsTypes.PRODUCTS_GET_BY_STORE_ID_REQUEST]: productsGetByStoreIdRequest,
	[ProductsTypes.PRODUCTS_GET_BY_STORE_ID_SUCCESS]: productsGetByStoreIdSuccess,
	[ProductsTypes.PRODUCTS_GET_BY_STORE_ID_FAILURE]: productsGetByStoreIdFailure,

	[ProductsTypes.PRODUCTS_GET_BY_ID_REQUEST]: productsGetByIdRequest,
	[ProductsTypes.PRODUCTS_GET_BY_ID_SUCCESS]: productsGetByIdSuccess,
	[ProductsTypes.PRODUCTS_GET_BY_ID_FAILURE]: productsGetByIdFailure,

	[ProductsTypes.PRODUCTS_UPDATE_REQUEST]: productsUpdateRequest,
	[ProductsTypes.PRODUCTS_UPDATE_SUCCESS]: productsUpdateSuccess,
	[ProductsTypes.PRODUCTS_UPDATE_FAILURE]: productsUpdateFailure,

	[ProductsTypes.PRODUCTS_DELETE_REQUEST]: productsDeleteRequest,
	[ProductsTypes.PRODUCTS_DELETE_SUCCESS]: productsDeleteSuccess,
	[ProductsTypes.PRODUCTS_DELETE_FAILURE]: productsDeleteFailure
});
