import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';

import { CheckoutCreators, CheckoutTypes } from '@/redux/reducers';
import {
	ICheckoutCreateRequestAction,
	ICheckoutUpdateRequestAction,
	ICheckoutGetByIdRequestAction,
	ICheckoutGetAddressRequestAction
} from '@/redux/states';
import { IAddress } from '@/redux/types';
import { api } from '@/services';

function* checkoutCreateRequest({ payload }: ICheckoutCreateRequestAction) {
	try {
		const { data } = yield call(api.post, '/checkout', payload);

		yield put(CheckoutCreators.checkoutCreateSuccess(data.id));
		toast.success('Checkout criado com sucesso.');
	} catch (error) {
		yield put(CheckoutCreators.checkoutCreateFailure());
		toast.error(String(error));
	}
}
function* checkoutUpdateRequest({ payload }: ICheckoutUpdateRequestAction) {
	try {
		yield call(api.put, `/checkout/${payload.id}`, payload);

		yield put(CheckoutCreators.checkoutUpdateSuccess());
	} catch (error) {
		yield put(CheckoutCreators.checkoutUpdateFailure());
		toast.error(String(error));
	}
}
function* checkoutGetByIdRequest({ payload }: ICheckoutGetByIdRequestAction) {
	try {
		const { data } = yield call(api.get, `/checkout/${payload.id}`);

		yield put(CheckoutCreators.checkoutGetByIdSuccess(data));
	} catch (error) {
		yield put(CheckoutCreators.checkoutGetByIdFailure());
		toast.error(String(error));
	}
}

function* checkoutGetAddressRequest({ payload }: ICheckoutGetAddressRequestAction) {
	try {
		const { data: rawData } = yield call(
			axios.get,
			`https://viacep.com.br/ws/${payload.cep}/json/`
		);

		if (rawData.erro) {
			throw new Error('CEP não encontrado.');
		}

		const data: IAddress = {
			cep: rawData.cep,
			street: rawData.logradouro,
			number: '', // o usuário preenche depois
			complement: rawData.complemento,
			district: rawData.bairro,
			city: rawData.localidade,
			state: rawData.uf
		};

		console.log('sagas', data);

		yield put(CheckoutCreators.checkoutGetAddressSuccess(data));
	} catch (error) {
		yield put(CheckoutCreators.checkoutGetAddressFailure());
		toast.error(String(error));
	}
}

export const checkout = all([
	takeLatest(CheckoutTypes.CHECKOUT_CREATE_REQUEST, checkoutCreateRequest),
	takeLatest(CheckoutTypes.CHECKOUT_UPDATE_REQUEST, checkoutUpdateRequest),
	takeLatest(CheckoutTypes.CHECKOUT_GET_BY_ID_REQUEST, checkoutGetByIdRequest),
	takeLatest(CheckoutTypes.CHECKOUT_GET_ADDRESS_REQUEST, checkoutGetAddressRequest)
]);
