'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ClientOnlyProvider } from '@/components/providers';
import { Logo } from '@/components/ui';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { CartBadge } from '../cart-badge';

import { useTypedSelector } from '@/hooks';
import { User, LogOut, Menu, X, Package } from 'lucide-react';

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const { signed, user } = useTypedSelector((state) => state.auth);

	const navigation = [
		{ name: 'Vender', href: '/sell' },
		{ name: 'Sobre nós', href: '/about' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Contato', href: '/contact' },
		{ name: 'Como funciona', href: '/how-it-works' }
	];

	return (
		<ClientOnlyProvider>
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
								<CartBadge userId={user?.id} />

								{/* Avatar do usuário */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="relative h-9 w-9 rounded-full">
											<Avatar className="h-9 w-9">
												<AvatarFallback className="text-xs">
													{user?.name
														?.split(' ')
														.map((n) => n[0])
														.join('')
														.toUpperCase() || 'U'}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="end" forceMount>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-1">
												<p className="text-sm font-medium leading-none">{user?.name}</p>
												<p className="text-xs leading-none text-muted-foreground">
													{user?.email}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link href="/account" className="flex items-center">
												<User className="mr-2 h-4 w-4" />
												<span>Conta</span>
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
											<Link href="/sign-out" className="flex items-center text-red-500">
												<LogOut className="mr-2 h-4 w-4" />
												<span>Sair</span>
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
					<div className="absolute left-0 right-0 top-16 z-40 border-t bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/95 md:hidden">
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
		</ClientOnlyProvider>
	);
}
