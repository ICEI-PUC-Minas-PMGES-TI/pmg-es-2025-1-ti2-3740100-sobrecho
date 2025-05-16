import { all, put, takeLatest } from "redux-saga/effects";
import { toast } from "sonner";
import { ProductCreators } from "@/redux/reducers";
import { IDeleteProductRequestAction, IPostProductCreateRequestAction, IPutProductUpdateRequestAction } from "@/redux/types";
import { api } from "@/services";

function* postProductCreateRequest(product: IPostProductCreateRequestAction) {
    try {
      const { data } = yield api.post('product', product);
      toast.success('Produto criado com sucesso');
      yield put(ProductCreators.postProductCreateSuccess(data));  
    } catch (error) {
        toast.error(String(error));
        yield put(ProductCreators.postProductCreateFailure());
    }
}

function* getProductListRequest() {
    try {
        const { data } = yield api.get('product');
        yield put(ProductCreators.getProductListSuccess(data));
    } catch (error) {
        toast.error(String(error));
        yield put(ProductCreators.getProductListFailure());
    }
}

function* putProductUpdateRequest(product: IPutProductUpdateRequestAction) {
    try {
        const { data } = yield api.put(`product/${product.id}`, product);
        toast.success('Produto atualizado com sucesso');
        yield put(ProductCreators.putProductUpdateSuccess(data));
    } catch (error) {
        toast.error(String(error));
        yield put(ProductCreators.putProductUpdateFailure());
    }
}

function* deleteProductRequest({ id, productId }: IDeleteProductRequestAction) {
    try {
        yield api.delete(`product/${productId}`);
        toast.success('Produto deletado com sucesso');
        yield put(ProductCreators.deleteProductSuccess());
    } catch (error) {
        toast.error(String(error));
        yield put(ProductCreators.deleteProductFailure());
    }
}

export const product = all([
    takeLatest(ProductCreators.postProductCreateRequest, postProductCreateRequest),

    takeLatest(ProductCreators.getProductListRequest, getProductListRequest),

    takeLatest(ProductCreators.putProductUpdateRequest,putProductUpdateRequest),
    
    takeLatest(ProductCreators.deleteProductRequest,deleteProductRequest)
])