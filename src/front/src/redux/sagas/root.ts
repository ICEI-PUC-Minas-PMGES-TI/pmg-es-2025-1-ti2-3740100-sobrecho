import { auth, products } from '@/redux/sagas';
import { all } from 'redux-saga/effects';

export function* sagas() {
	yield all([auth, products]);
}
