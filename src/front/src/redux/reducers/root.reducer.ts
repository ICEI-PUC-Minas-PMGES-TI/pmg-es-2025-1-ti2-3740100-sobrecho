import { combineReducers } from 'redux';

import { auth, cart, checkout, dashboard, products } from '@/redux/reducers';

export default combineReducers({
	auth,
	cart,
	products,
	dashboard,
	checkout
});
