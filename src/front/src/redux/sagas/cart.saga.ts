import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

import { CartCreators, CartTypes } from '@/redux/reducers';
import {
	ICartAddItemRequestAction,
	ICartClearRequestAction,
	ICartGetRequestAction,
	ICartRemoveItemRequestAction
} from '@/redux/states';
import { ICart } from '@/redux/types';

function getCartKey(id: string): string {
	return `SHOPPING_CART_${id}`;
}

function getCartFromStorage(id: string): ICart {
	const cartKey = getCartKey(id);
	const cart = localStorage.getItem(cartKey);

	if (cart) {
		try {
			const parsed = JSON.parse(cart);
			return { items: Array.isArray(parsed.items) ? parsed.items : [] };
		} catch {
			return { items: [] };
		}
	}

	return { items: [] };
}

function setCartToStorage(userId: string, cart: ICart) {
	const cartKey = getCartKey(userId);
	localStorage.setItem(cartKey, JSON.stringify(cart));
}

const NOT_AUTHENTICATED_ERROR = 'Usuário não autenticado.';

function* cartAddItemRequest({ payload }: ICartAddItemRequestAction) {
	try {
		if (!payload.userId) throw new Error(NOT_AUTHENTICATED_ERROR);

		const currentCart = getCartFromStorage(payload.userId);

		const alreadyExists = currentCart.items.some(
			(item) => item.id === payload.item.id && item.size === payload.item.size
		);

		if (alreadyExists) {
			throw new Error('Este item já está no carrinho.');
		}

		const updatedCart: ICart = {
			items: [...currentCart.items, payload.item]
		};

		setCartToStorage(payload.userId, updatedCart);

		yield put(CartCreators.cartAddItemSuccess());
		yield put(CartCreators.cartGetRequest({ userId: payload.userId }));

		toast.success('Item adicionado ao carrinho.');
	} catch (error) {
		yield put(CartCreators.cartAddItemFailure());
		toast.error(String(error));
	}
}

function* cartRemoveItemRequest({ payload }: ICartRemoveItemRequestAction) {
	try {
		if (!payload.userId) throw new Error(NOT_AUTHENTICATED_ERROR);

		const currentCart = getCartFromStorage(payload.userId);

		const updatedCart: ICart = {
			items: currentCart.items.filter((item) => !(item.id === payload.id))
		};

		setCartToStorage(payload.userId, updatedCart);

		yield put(CartCreators.cartRemoveItemSuccess());
		yield put(CartCreators.cartGetRequest({ userId: payload.userId }));

		toast.success('Item removido do carrinho.');
	} catch (error) {
		yield put(CartCreators.cartRemoveItemFailure());
		toast.error(String(error));
	}
}

function* cartClearRequest({ payload }: ICartClearRequestAction) {
	try {
		if (!payload.userId) throw new Error(NOT_AUTHENTICATED_ERROR);

		setCartToStorage(payload.userId, { items: [] });

		yield put(CartCreators.cartClearSuccess());
		yield put(CartCreators.cartGetRequest({ userId: payload.userId }));
	} catch (error) {
		yield put(CartCreators.cartClearFailure());
		toast.error(String(error));
	}
}

function* cartGetRequest({ payload }: ICartGetRequestAction) {
	try {
		if (!payload.userId) throw new Error(NOT_AUTHENTICATED_ERROR);

		const cart = getCartFromStorage(payload.userId);

		yield put(CartCreators.cartGetSuccess(cart));
	} catch (error) {
		yield put(CartCreators.cartGetFailure());
		toast.error(String(error));
	}
}

export const cart = all([
	takeLatest(CartTypes.CART_ADD_ITEM_REQUEST, cartAddItemRequest),
	takeLatest(CartTypes.CART_REMOVE_ITEM_REQUEST, cartRemoveItemRequest),
	takeLatest(CartTypes.CART_CLEAR_REQUEST, cartClearRequest),
	takeLatest(CartTypes.CART_GET_REQUEST, cartGetRequest)
]);
