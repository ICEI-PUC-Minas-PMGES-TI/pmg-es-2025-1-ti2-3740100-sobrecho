import {
	IAuthState,
	ICartState,
	ICheckoutState,
	IDashboardState,
	IProductsState
} from '@/redux/states';

export interface IRootState {
	auth: IAuthState;
	cart: ICartState;
	products: IProductsState;
	dashboard: IDashboardState;
	checkout: ICheckoutState;
}
