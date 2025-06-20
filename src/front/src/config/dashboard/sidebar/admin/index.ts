import {
	ShoppingBag,
	Users,
	UserCheck,
	PackageSearch,
	ShieldAlert,
	Tags,
	Star,
	Megaphone,
	FileBarChart2,
	Settings
} from 'lucide-react';

export const sidebarAdminConfig = [
	{
		title: 'Anúncios',
		url: '',
		icon: ShoppingBag,
		items: [
			{ title: 'Todos os Anúncios', url: '' },
			{ title: 'Pendentes', url: '' },
			{ title: 'Removidos', url: '' }
		]
	},
	{
		title: 'Usuários',
		url: '',
		icon: Users,
		items: [
			{ title: 'Todos os Usuários', url: '' },
			{ title: 'Banidos', url: '' }
		]
	},
	{
		title: 'Vendedores',
		url: '',
		icon: UserCheck,
		items: [
			{ title: 'Todos os Vendedores', url: '' },
			{ title: 'Aguardando Aprovação', url: '' }
		]
	},
	{
		title: 'Transações',
		url: '',
		icon: PackageSearch,
		items: [
			{ title: 'Todas as Transações', url: '' },
			{ title: 'Pendentes', url: '' },
			{ title: 'Estornadas', url: '' }
		]
	},
	{
		title: 'Denúncias',
		url: '',
		icon: ShieldAlert,
		items: [
			{ title: 'Listar Denúncias', url: '' },
			{ title: 'Resolvidas', url: '' }
		]
	},
	{
		title: 'Categorias',
		url: '',
		icon: Tags,
		items: [
			{ title: 'Todas as Categorias', url: '' },
			{ title: 'Nova Categoria', url: '' }
		]
	},
	{
		title: 'Avaliações',
		url: '',
		icon: Star,
		items: [{ title: 'Ver Avaliações', url: '' }]
	},
	{
		title: 'Banners',
		url: '',
		icon: Megaphone,
		items: [
			{ title: 'Listar Banners', url: '' },
			{ title: 'Novo Banner', url: '' }
		]
	},
	{
		title: 'Relatórios',
		url: '',
		icon: FileBarChart2,
		items: [
			{ title: 'Visão Geral', url: '' },
			{ title: 'Exportar Relatórios', url: '' }
		]
	},
	{
		title: 'Configurações',
		url: '',
		icon: Settings,
		items: [
			{ title: 'Geral', url: '' },
			{ title: 'Permissões', url: '' }
		]
	}
];
