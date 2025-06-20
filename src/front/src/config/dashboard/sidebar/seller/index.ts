import { ShoppingBag, PackageSearch, Star, FileBarChart2 } from 'lucide-react';

export const sidebarSellerConfig = [
	{
		title: 'Meus Produtos',
		url: '/dashboard/products',
		icon: ShoppingBag,
		isActive: true,
		items: [
			{ title: 'Todos os produtos', url: '/dashboard/products' },
			{ title: 'Criar Novo', url: '/dashboard/products/new' }
		]
	},
	{
		title: 'Pedidos',
		url: '/dashboard/orders',
		icon: PackageSearch,
		items: [{ title: 'Todos os pedidos', url: '/dashboard/orders' }]
	},
	{
		title: 'Avaliações',
		url: '/dashboard/reviews',
		icon: Star,
		items: [{ title: 'Minhas Avaliações', url: '/dashboard/reviews' }]
	},
	{
		title: 'Relatórios',
		url: '',
		icon: FileBarChart2,
		items: [
			{ title: 'Resumo de Vendas', url: '' },
			{ title: 'Exportar Dados', url: '' }
		]
	}
];
