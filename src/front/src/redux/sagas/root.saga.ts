import { all } from 'redux-saga/effects';

import { auth, cart, checkout, dashboard, products } from '@/redux/sagas';

export function* sagas() {
	yield all([auth, cart, products, dashboard, checkout]);
}
