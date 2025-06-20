export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface DashboardPage {
	title: string;
	breadcrumbs: BreadcrumbItem[];
}

export const dashboardPages: Record<string, DashboardPage> = {
	// Páginas do Admin
	'/dashboard': {
		title: 'Visão Geral',
		breadcrumbs: [{ label: 'Dashboard' }]
	},
	'/dashboard/products': {
		title: 'Produtos',
		breadcrumbs: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Produtos' }]
	},
	'/dashboard/products/new': {
		title: 'Criar Produto',
		breadcrumbs: [
			{ label: 'Dashboard', href: '/dashboard' },
			{ label: 'Produtos', href: '/dashboard/products' },
			{ label: 'Criar Produto' }
		]
	},
	'/dashboard/products/edit/[id]': {
		title: 'Editar Produto ([id])',
		breadcrumbs: [
			{ label: 'Dashboard', href: '/dashboard' },
			{ label: 'Produtos', href: '/dashboard/products' },
			{ label: 'Editar Produto' }
		]
	},
	'/dashboard/orders': {
		title: 'Pedidos',
		breadcrumbs: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Pedidos' }]
	},
	'/dashboard/orders/[id]': {
		title: 'Detalhes do Pedido',
		breadcrumbs: [
			{ label: 'Dashboard', href: '/dashboard' },
			{ label: 'Pedidos', href: '/dashboard/orders' },
			{ label: 'Detalhes do Pedido' }
		]
	},
	'/dashboard/settings': {
		title: 'Configurações',
		breadcrumbs: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Configurações' }]
	}
};

export function getDashboardPageInfo(pathname: string): DashboardPage {
	// Primeiro tenta encontrar uma correspondência exata
	if (dashboardPages[pathname]) {
		return dashboardPages[pathname];
	}

	const dynamicRoutes = Object.keys(dashboardPages).filter((route) =>
		route.includes('[')
	);

	for (const route of dynamicRoutes) {
		// Constrói regex e extrai nomes dos parâmetros
		const paramNames = [...route.matchAll(/\[(.*?)\]/g)].map((m) => m[1]);
		const routePattern = route.replace(/\[(.*?)\]/g, '([^/]+)');
		const regex = new RegExp(`^${routePattern}$`);
		const match = pathname.match(regex);

		if (match) {
			const params: Record<string, string> = {};
			paramNames.forEach((name, i) => {
				params[name] = match[i + 1];
			});

			const page = dashboardPages[route];

			// Substitui os valores no title e breadcrumbs
			const title = page.title.replace(
				/\[(.*?)\]/g,
				(_, param) => params[param] ?? `[${param}]`
			);

			const breadcrumbs = page.breadcrumbs.map((breadcrumb) => ({
				label: breadcrumb.label.replace(
					/\[(.*?)\]/g,
					(_, param) => params[param] ?? `[${param}]`
				),
				href: breadcrumb.href?.replace(
					/\[(.*?)\]/g,
					(_, param) => params[param] ?? `[${param}]`
				)
			}));

			return {
				title,
				breadcrumbs
			};
		}
	}

	// Fallback
	return {
		title: 'Página',
		breadcrumbs: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Página' }]
	};
}
