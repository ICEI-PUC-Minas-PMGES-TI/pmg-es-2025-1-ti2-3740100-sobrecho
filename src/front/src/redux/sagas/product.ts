import { all, call, put, takeLatest } from "redux-saga/effects";
import { IGetProductByIdRequestAction } from "../types";
import {  ProductCreators, ProductTypes } from "../reducers";
import { toast } from "sonner";
import { api } from "@/services";

function* getProductByIdRequest({ id }: IGetProductByIdRequestAction) {
    try {
        const { data } = yield call(api.get, 'product/' + id);
        yield put(ProductCreators.getProductByIdSuccess(data));
    } catch (error) {
        toast.error(String(error));
        yield put(ProductCreators.getProductByIdFailure());
    }
}

export const product = all([
    takeLatest(ProductTypes.GET_PRODUCT_BY_ID_REQUEST, getProductByIdRequest)
])