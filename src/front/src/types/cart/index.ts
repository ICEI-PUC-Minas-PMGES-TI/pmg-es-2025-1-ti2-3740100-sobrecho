export interface CartItem {
	productId: string;
	size: string;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
}

export interface CartProduct {
	id: string;
	name: string;
	category: string;
	price: string;
	priceValue: number;
	images: string[];
	size: string;
	quantity: number;
}
