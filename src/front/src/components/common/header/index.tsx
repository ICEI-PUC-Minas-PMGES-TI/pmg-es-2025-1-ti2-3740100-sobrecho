'use client';

import { LogOut, Menu, X, Package, ShoppingCart, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	buttonVariants,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Logo
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { CartCreators } from '@/redux/reducers';

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { signed, user } = useTypedSelector((state) => state.auth);

	const navigation = [
		{ name: 'Vender', href: '/sell' },
		{ name: 'Sobre nós', href: '/about' },
		{ name: 'FAQ', href: '/faq' }
	];

	if (!isMounted) return null;

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Logo href="/" />

				{/* Navegação Central - Apenas para usuários deslogados */}
				{!signed && (
					<nav className="hidden items-center gap-1 text-lg md:flex">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={buttonVariants({ variant: 'ghost' })}
							>
								{item.name}
							</Link>
						))}
					</nav>
				)}

				{/* Ações do lado direito */}
				<div className="flex items-center space-x-4">
					{!signed ? (
						// Modo deslogado - Botões de entrar e cadastrar (sempre visíveis)
						<div className="flex items-center space-x-2">
							<Button variant="ghost" asChild>
								<Link href="/sign-in">Entrar</Link>
							</Button>
							<Button asChild>
								<Link href="/sign-up">Cadastrar</Link>
							</Button>
						</div>
					) : (
						// Modo logado - Carrinho e avatar do usuário
						<div className="flex items-center space-x-3">
							{/* Carrinho */}
							<CartBadge />

							{/* Avatar do usuário */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="size-9 cursor-pointer rounded-full">
										<Avatar className="flex size-9 items-center justify-center">
											<AvatarFallback className="text-xs">
												{user?.name
													? (
															user.name.split(' ')[0][0] +
															user.name.split(' ').slice(-1)[0][0]
														).toUpperCase()
													: 'U'}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm leading-none font-medium">
												{user?.name
													? (() => {
															const parts = user.name.trim().split(' ').filter(Boolean);
															const first = parts[0] ?? '';
															const last = parts.at(-1) ?? '';
															return first + (first !== last ? ` ${last}` : '');
														})()
													: ''}
											</p>
											<p className="text-muted-foreground text-xs leading-none">
												{user?.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/settings" className="flex items-center">
											<SettingsIcon className="mr-2 h-4 w-4" />
											<span>Configurações</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/orders" className="flex items-center">
											<Package className="mr-2 h-4 w-4" />
											<span>Pedidos</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/sign-out" className="flex items-center">
											<LogOut className="mr-2 h-4 w-4 text-red-500" />
											<span className="text-red-500">Sair</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}

					{!signed && (
						<Button
							variant="ghost"
							className="md:hidden"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					)}
				</div>
			</div>

			{/* Menu mobile - sobrepondo o conteúdo */}
			{isMobileMenuOpen && (
				<div className="bg-background/95 supports-[backdrop-filter]:bg-background/95 absolute top-16 right-0 left-0 z-40 border-t shadow-lg backdrop-blur md:hidden">
					<div className="container px-4 py-4">
						<nav className="flex flex-col space-y-2">
							{/* Links de navegação no mobile (apenas para deslogados) */}
							{!signed && (
								<>
									{navigation.map((item) => (
										<Button
											key={item.name}
											variant="ghost"
											onClick={() => setIsMobileMenuOpen(false)}
											className="flex items-center justify-start"
											asChild
										>
											<Link href={item.href}>{item.name}</Link>
										</Button>
									))}
								</>
							)}
						</nav>
					</div>
				</div>
			)}
		</header>
	);
}

// Você pode passar o userId como prop quando tiver a lógica de autenticação
export function CartBadge() {
	const [totalItems, setTotalItems] = useState(0);

	const {
		get: { data }
	} = useTypedSelector((state) => state.cart);
	const { user } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!data) return;
		setTotalItems(data?.items?.length);
	}, [data]);

	useEffect(() => {
		if (!user?.id) return;
		dispatch(CartCreators.cartGetRequest({ userId: user.id }));
	}, [dispatch, user?.id]);

	return (
		<Link href="/cart">
			<Button variant="ghost" size="sm" className="relative">
				<ShoppingCart className="h-5 w-5" />
				{totalItems > 0 && (
					<Badge
						variant="destructive"
						className="absolute -top-2 -right-2 flex size-4 items-center justify-center p-0 text-[10px]"
					>
						{totalItems > 99 ? '99+' : totalItems}
					</Badge>
				)}
			</Button>
		</Link>
	);
}
