/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

import { ProductsCreators, ProductsTypes } from '@/redux/reducers';
import {
	IProductsCreateRequestAction,
	IProductsDeleteRequestAction,
	IProductsGetByIdRequestAction,
	IProductsGetByStoreIdRequestAction,
	IProductsUpdateRequestAction
} from '@/redux/states';
import { api } from '@/services';

function* productsCreateRequest({ payload }: IProductsCreateRequestAction) {
	try {
		const formData = new FormData();
		formData.append('name', payload.name);
		formData.append('description', payload.description);
		formData.append('price', String(payload.price));
		formData.append('size', payload.size);
		formData.append('category', payload.category);
		formData.append('images', payload.image);

		yield call(api.post, '/product', formData);

		yield put(ProductsCreators.productsCreateSuccess());
		toast.success('Produto criado com sucesso.');
	} catch (error) {
		yield put(ProductsCreators.productsCreateFailure());
		toast.error(String(error));
	}
}

function* productsGetAllRequest() {
	try {
		const { data } = yield call(api.get, '/product/');

		const sanitizedData = data.map((product: any) => {
			// remove user
			const { user, images, createdAt, updatedAt, ...rest } = product;
			void user;
			void updatedAt;
			// pega só a primeira imagem, se existir
			const firstImageUrl = images && images.length > 0 ? images[0].url : null;

			return {
				...rest,
				image: firstImageUrl, // renomeia e só 1 string
				createdAt: new Date(createdAt * 1000).toISOString()
			};
		});

		yield put(ProductsCreators.productsGetAllSuccess(sanitizedData));
	} catch (error) {
		yield put(ProductsCreators.productsGetAllFailure());
		toast.error(String(error));
	}
}

function* productsGetByStoreIdRequest({ payload }: IProductsGetByStoreIdRequestAction) {
	try {
		const { data } = yield call(api.get, `/product/store/${payload.storeId}`);

		const sanitizedData = data.map((product: any) => {
			// remove user
			const { user, images, createdAt, updatedAt, ...rest } = product;
			void user;
			void updatedAt;
			// pega só a primeira imagem, se existir
			const firstImageUrl = images && images.length > 0 ? images[0].url : null;

			return {
				...rest,
				image: firstImageUrl, // renomeia e só 1 string
				createdAt: new Date(createdAt * 1000).toISOString()
			};
		});

		yield put(ProductsCreators.productsGetByStoreIdSuccess(sanitizedData));
	} catch (error) {
		yield put(ProductsCreators.productsGetByStoreIdFailure());
		toast.error(String(error));
	}
}

function* productsGetByIdRequest({ payload }: IProductsGetByIdRequestAction) {
	try {
		const { data } = yield call(api.get, `/product/${payload.id}`);

		// remove user
		const { user, images, createdAt, updatedAt, ...rest } = data;
		void user;
		void updatedAt;

		const firstImageUrl = images && images.length > 0 ? images[0].url : null;

		const sanitizedData = {
			...rest,
			image: firstImageUrl,
			createdAt: new Date(createdAt * 1000).toISOString()
		};

		yield put(ProductsCreators.productsGetByIdSuccess(sanitizedData));
	} catch (error) {
		yield put(ProductsCreators.productsGetByIdFailure());
		toast.error(String(error));
	}
}

function* productsUpdateRequest({ payload }: IProductsUpdateRequestAction) {
	try {
		yield call(api.put, `/product/${payload.id}`, payload);

		yield put(ProductsCreators.productsUpdateSuccess());
		toast.success('Produto atualizado com sucesso.');
	} catch (error) {
		yield put(ProductsCreators.productsUpdateFailure());
		toast.error(String(error));
	}
}

function* productsDeleteRequest({ payload }: IProductsDeleteRequestAction) {
	try {
		yield call(api.delete, `/product/${payload.id}`);

		yield put(ProductsCreators.productsDeleteSuccess());
		yield put(ProductsCreators.productsGetAllRequest());
		toast.success('Produto deletado com sucesso.');
	} catch (error) {
		yield put(ProductsCreators.productsDeleteFailure());
		toast.error(String(error));
	}
}

export const products = all([
	takeLatest(ProductsTypes.PRODUCTS_CREATE_REQUEST, productsCreateRequest),
	takeLatest(ProductsTypes.PRODUCTS_GET_ALL_REQUEST, productsGetAllRequest),
	takeLatest(ProductsTypes.PRODUCTS_GET_BY_STORE_ID_REQUEST, productsGetByStoreIdRequest),
	takeLatest(ProductsTypes.PRODUCTS_GET_BY_ID_REQUEST, productsGetByIdRequest),
	takeLatest(ProductsTypes.PRODUCTS_UPDATE_REQUEST, productsUpdateRequest),
	takeLatest(ProductsTypes.PRODUCTS_DELETE_REQUEST, productsDeleteRequest)
]);
