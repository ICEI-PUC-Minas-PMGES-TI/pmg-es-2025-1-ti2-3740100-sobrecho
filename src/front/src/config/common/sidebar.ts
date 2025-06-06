import {
	PlusIcon,
	ShoppingBasketIcon,
	StoreIcon,
	StretchHorizontalIcon,
	UserIcon
} from 'lucide-react';

export const sidebarConfig = {
	admin: [
		{
			title: 'Lojas',
			url: '/dashboard/stores',
			icon: StoreIcon
		},
		{
			title: 'Usuários',
			url: '/dashboard/users',
			icon: UserIcon
		}
	],
	seller: [
		{
			title: 'Produtos',
			url: '/dashboard/products',
			icon: StretchHorizontalIcon
		},
		{
			title: 'Criar produto',
			url: '/dashboard/products/new',
			icon: PlusIcon
		},
		{
			title: 'Pedidos',
			url: '/dashboard/orders',
			icon: ShoppingBasketIcon
		}
	]
};
