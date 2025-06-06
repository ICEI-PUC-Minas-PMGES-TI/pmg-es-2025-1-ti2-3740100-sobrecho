import { auth } from '@/redux/reducers/auth';
import { products } from '@/redux/reducers/products';
import { user } from '@/redux/reducers/user';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
	auth,
	products,
	user
});
