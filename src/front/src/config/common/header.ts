import { HeaderItems } from '@/types/common';
import { User, ShoppingBag, Settings, LogOut } from 'lucide-react';

export const headerConfig: HeaderItems = {
	navigation: {
		guest: [
			{ label: 'Destaques', href: '/explore' },
			{ label: 'Vender', href: '/sell' },
			{ label: 'Sobre nós', href: '/about' },
			{ label: 'FAQ', href: '/faq' }
		],
		logged: [{ label: 'Destaques', href: '/explore' }]
	},
	auth: {
		guest: [
			{ label: 'Entrar', href: '/sign-in' },
			{ label: 'Cadastrar', href: '/sign-up' }
		],
		logged: [
			{ label: 'Perfil', href: '/profile', icon: User },
			{ label: 'Pedidos', href: '/orders', icon: ShoppingBag },
			{ label: 'Configurações', href: '/settings', icon: Settings },
			{ label: 'Sair', href: '/sign-out', icon: LogOut, className: 'text-red-500' }
		]
	}
};
