import { ProductsCreators, ProductsTypes } from '@/redux/reducers';
import {
	IProduct,
	IProductCreateRequestAction,
	IProductDeleteRequestAction,
	IProductFetchByIdRequestAction,
	IProductListRequestAction,
	IProductUpdateRequestAction
} from '@/redux/types';
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
		const random = (Math.random() * 16) | 0;
		const value = char === 'x' ? random : (random & 0x3) | 0x8;
		return value.toString(16);
	});
}

// Helper para criar array de placeholders do tamanho necessário
function createPlaceholdersArray(count: number): string[] {
	return Array(count).fill('/placeholder.svg');
}

function* productCreateRequest({ payload }: IProductCreateRequestAction) {
	try {
		console.log('Creating product with payload:', payload);
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		const newId = uuidv4();

		// Conta quantos arquivos tem no payload.images (se existir)
		const imagesCount = Array.isArray(payload.images) ? payload.images.length : 1;

		const newProduct: IProduct = {
			...payload,
			id: newId,
			images: createPlaceholdersArray(imagesCount),
			createdAt: new Date().toISOString()
		};

		const updatedProducts = [...products, newProduct];
		localStorage.setItem('products', JSON.stringify(updatedProducts));

		yield delay(2000);
		toast.success('Produto criado com sucesso');
		yield put(ProductsCreators.productCreateSuccess());
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productCreateFailure());
	}
}

function* productListRequest({ payload }: IProductListRequestAction) {
	try {
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		const storeProducts = products.filter(
			(product) => product.storeId === payload.storeId
		);

		yield delay(2000);
		yield put(ProductsCreators.productListSuccess(storeProducts));
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productListFailure());
	}
}

function* productListAllRequest() {
	try {
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];
		yield delay(2000);
		yield put(ProductsCreators.productListAllSuccess(products));
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productListAllFailure());
	}
}

function* productFetchByIdRequest({ payload }: IProductFetchByIdRequestAction) {
	try {
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		const product = products.find((p) => p.id === payload.id);
		if (!product) throw new Error('Produto não encontrado');

		yield delay(2000);
		yield put(ProductsCreators.productFetchByIdSuccess(product));
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productFetchByIdFailure());
	}
}

function* productUpdateRequest({ payload }: IProductUpdateRequestAction) {
	try {
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		const index = products.findIndex((p) => p.id === payload.id);
		if (index === -1) throw new Error('Produto não encontrado');

		const imagesCount = Array.isArray(payload.images) ? payload.images.length : 1;

		products[index] = {
			...products[index],
			...payload,
			images: createPlaceholdersArray(imagesCount)
		};

		localStorage.setItem('products', JSON.stringify(products));

		yield delay(2000);
		toast.success('Produto atualizado com sucesso');
		yield put(ProductsCreators.productUpdateSuccess());
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productUpdateFailure());
	}
}

function* productDeleteRequest({ payload }: IProductDeleteRequestAction) {
	try {
		const productsJSON = localStorage.getItem('products');
		const products: IProduct[] = productsJSON ? JSON.parse(productsJSON) : [];

		yield delay(2000);

		const updatedProducts = products.filter((p) => p.id !== payload.id);
		localStorage.setItem('products', JSON.stringify(updatedProducts));

		toast.success('Produto excluído com sucesso');
		yield put(ProductsCreators.productDeleteSuccess());
	} catch (error) {
		toast.error(String(error));
		yield put(ProductsCreators.productDeleteFailure());
	}
}

export const products = all([
	takeLatest(ProductsTypes.PRODUCT_CREATE_REQUEST, productCreateRequest),
	takeLatest(ProductsTypes.PRODUCT_LIST_REQUEST, productListRequest),
	takeLatest(ProductsTypes.PRODUCT_LIST_ALL_REQUEST, productListAllRequest),
	takeLatest(ProductsTypes.PRODUCT_FETCH_BY_ID_REQUEST, productFetchByIdRequest),
	takeLatest(ProductsTypes.PRODUCT_UPDATE_REQUEST, productUpdateRequest),
	takeLatest(ProductsTypes.PRODUCT_DELETE_REQUEST, productDeleteRequest)
]);
