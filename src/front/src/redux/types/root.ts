import { IAuthState, IProductsState } from '@/redux/types';

export interface IRootState {
	auth: IAuthState;
	products: IProductsState;
}
