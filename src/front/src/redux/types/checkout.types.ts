export interface ICheckoutItem {
	id: string;
	size: string;
	price: number;
}

export interface ICheckout {
	items: ICheckoutItem[];
	total: number;
	method: 'credit-card' | 'debit-card' | 'pix';
}

export interface IAddress {
	cep: string;
	street: string;
	number: string;
	complement: string;
	district: string;
	city: string;
	state: string;
}
