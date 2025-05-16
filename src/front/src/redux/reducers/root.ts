import { auth } from '@/redux/reducers/auth';
import { product } from '@/redux/reducers/product';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
	auth,
	product
});
