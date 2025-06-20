export interface ICartItem {
	id: string;
	size: string;
	price: number;
}

export interface ICart {
	items: ICartItem[];
}
