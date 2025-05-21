'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import {
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui';
import { Button, buttonVariants } from '@/components/ui/button';

import { useTypedSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import {
  ShirtIcon,
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  LogOutIcon,
  SearchIcon,
  MenuIcon
} from 'lucide-react';

interface IHeaderProps extends ComponentProps<'header'> {}

export function Header({ className, ...props }: IHeaderProps) {
	const { user, signed } = useTypedSelector((state) => state.auth);

	const mainNavigation = [
		{ label: 'Início', href: '/' },
		{ label: 'Produtos', href: '/produtos' },
		{ label: 'Categorias', href: '/categorias' },
		{ label: 'Ofertas', href: '/ofertas' },
		{ label: 'Sobre', href: '/sobre' }
	];

	const authNavigation = [
		{ label: 'Entrar', href: '/sign-in' },
		{ label: 'Cadastrar', href: '/sign-up' }
	];

	const userNavigation = [
		{ label: 'Meu Perfil', href: '/perfil', icon: <UserIcon className="mr-2 size-4" /> },
		{
			label: 'Meus Pedidos',
			href: '/pedidos',
			icon: <ShoppingCartIcon className="mr-2 size-4" />
		},
		{
			label: 'Favoritos',
			href: '/favoritos',
			icon: <HeartIcon className="mr-2 size-4" />
		}
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50 flex w-full items-center justify-between border-b bg-background p-4',
				className
			)}
			{...props}
		>
			{/* Logo */}
			<Link
				href="/"
				className="flex items-center justify-center gap-2 text-lg font-semibold"
			>
				<div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<ShirtIcon className="size-5" />
				</div>
				SoBrechó
			</Link>

			{/* Navegação principal - visível apenas em telas maiores */}
			<div className="hidden items-center justify-center gap-2 md:flex">
				{mainNavigation.map((item, index) => (
					<Link
						key={index}
						href={item.href}
						className={cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')}
					>
						{item.label}
					</Link>
				))}
			</div>

			{/* Ações do usuário */}
			<div className="flex items-center justify-center gap-2">
				{/* Botão de busca */}
				<Button variant="ghost" size="icon" aria-label="Buscar">
					<SearchIcon className="size-5" />
				</Button>

				{signed ? (
					<>
						{/* Usuário logado: Carrinho, Favoritos e Menu de Perfil */}
						<Link
							href="/carrinho"
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
							aria-label="Carrinho"
						>
							<ShoppingCartIcon className="size-5" />
						</Link>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" aria-label="Menu do usuário">
									<UserIcon className="size-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<div className="px-2 py-1.5 text-sm font-medium">
									<p className="truncate">{user?.name || 'Usuário'}</p>
									<p className="truncate text-xs text-muted-foreground">
										{user?.email || ''}
									</p>
								</div>
								<DropdownMenuSeparator />
								{userNavigation.map((item, index) => (
									<DropdownMenuItem key={index} asChild>
										<Link href={item.href} className="flex items-center">
											{item.icon}
											{item.label}
										</Link>
									</DropdownMenuItem>
								))}
								{user?.role === 'admin' && (
									<>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link href="/admin" className="flex items-center">
												<ShirtIcon className="mr-2 size-4" />
												Painel Admin
											</Link>
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-destructive">
									<LogOutIcon className="mr-2 size-4" />
									Sair
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				) : (
					<>
						{/* Usuário não logado: Botões de Login e Cadastro */}
						<div className="hidden items-center gap-2 sm:flex">
							{authNavigation.map((item, index) => (
								<Link
									key={index}
									href={item.href}
									className={
										index < authNavigation.length - 1
											? cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')
											: buttonVariants({ variant: 'default' })
									}
								>
									{item.label}
								</Link>
							))}
						</div>
					</>
				)}

				{/* Menu mobile */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
							<MenuIcon className="size-5" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" aria-describedby={undefined}>
						<DialogTitle className="sr-only">Menu de navegação</DialogTitle>
						<div className="mt-8 flex flex-col gap-4">
							{/* Links de navegação principal para mobile */}
							<div className="flex flex-col space-y-2">
								{mainNavigation.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
									>
										{item.label}
									</Link>
								))}
							</div>

							<div className="border-t pt-4">
								{signed ? (
									<div className="flex flex-col space-y-2">
										{userNavigation.map((item, index) => (
											<Link
												key={index}
												href={item.href}
												className={cn(
													buttonVariants({ variant: 'ghost' }),
													'justify-start'
												)}
											>
												{item.icon}
												{item.label}
											</Link>
										))}
										{user?.role === 'admin' && (
											<Link
												href="/admin"
												className={cn(
													buttonVariants({ variant: 'ghost' }),
													'justify-start'
												)}
											>
												<ShirtIcon className="mr-2 size-4" />
												Painel Admin
											</Link>
										)}
										<Button variant="ghost" className="justify-start text-destructive">
											<LogOutIcon className="mr-2 size-4" />
											Sair
										</Button>
									</div>
								) : (
									<div className="flex flex-col space-y-2 sm:hidden">
										{authNavigation.map((item, index) => (
											<Link
												key={index}
												href={item.href}
												className={
													index < authNavigation.length - 1
														? cn(buttonVariants({ variant: 'ghost' }), 'justify-start')
														: cn(buttonVariants({ variant: 'default' }), 'justify-start')
												}
											>
												{item.label}
											</Link>
										))}
									</div>
								)}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
