import { IAuthState, IProductState } from '@/redux/types';

export interface IRootState {
	auth: IAuthState;
	product: IProductState;
}
