'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Progress,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui';

import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import { isWithinInterval, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users
} from 'lucide-react';

export function countProductsThisWeek(products: { createdAt: string }[]) {
	const now = new Date();

	const start = startOfWeek(now, { weekStartsOn: 1 });
	const end = endOfWeek(now, { weekStartsOn: 1 });

	return products.filter((product) => {
		const createdDate =
			typeof product.createdAt === 'string'
				? parseISO(product.createdAt)
				: new Date(product.createdAt);

		return isWithinInterval(createdDate, { start, end });
	}).length;
}

export function SellerDashboard() {
	const recentOrders = [
		{
			id: '#3462',
			customer: 'Ana Costa',
			product: 'Vestido Vintage Azul',
			amount: 'R$ 45,00',
			status: 'Pendente',
			date: '2 min atrás'
		},
		{
			id: '#3461',
			customer: 'Carlos Silva',
			product: 'Jaqueta de Couro',
			amount: 'R$ 120,00',
			status: 'Pago',
			date: '5 min atrás'
		},
		{
			id: '#3460',
			customer: 'Lucia Santos',
			product: 'Bolsa Vintage',
			amount: 'R$ 35,00',
			status: 'Enviado',
			date: '10 min atrás'
		}
	];

	const topProducts = [
		{
			name: 'Vestido Floral Vintage',
			views: 234,
			sales: 12,
			image: '/placeholder.svg?height=40&width=40'
		},
		{
			name: 'Jaqueta Jeans Clássica',
			views: 189,
			sales: 8,
			image: '/placeholder.svg?height=40&width=40'
		},
		{
			name: 'Saia Midi Retrô',
			views: 156,
			sales: 6,
			image: '/placeholder.svg?height=40&width=40'
		}
	];

	const {
		listProducts: { loading, data: products }
	} = useTypedSelector((state) => state.products);
	const { user } = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!user || user.role !== 'seller') return;

		dispatch(ProductsCreators.productListRequest({ storeId: user.store.id }));
	}, []);

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div className="flex items-center space-x-2">
					<Button asChild>
						<Link href="/dashboard/products/new">
							<Package className="mr-2 h-4 w-4" />
							Adicionar Produto
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent className="space-y-2">
						{loading ? (
							<div className="flex flex-col justify-center space-y-4">
								<Skeleton className="mt-1 h-6 w-[50px]" />
								<Skeleton className="h-4 w-[125px]" />
							</div>
						) : (
							<>
								<div className="text-2xl font-bold">{products?.length}</div>
								<p className="text-xs text-muted-foreground">
									<span className="text-blue-600">
										+{countProductsThisWeek(products)}
									</span>{' '}
									novos esta semana
								</p>
							</>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="text-2xl font-bold">5</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-red-600">Produtos</span> com menos de 3 unidades
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="text-2xl font-bold">3.2%</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+0.5%</span> em relação à semana anterior
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="text-2xl font-bold">R$ 1.234,56</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+20.1%</span> em relação ao mês anterior
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Pedidos Recentes</CardTitle>
						<CardDescription>
							Você tem {recentOrders.length} pedidos pendentes de atenção.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Pedido</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead>Produto</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Valor</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentOrders.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="font-medium">{order.id}</TableCell>
										<TableCell>{order.customer}</TableCell>
										<TableCell>{order.product}</TableCell>
										<TableCell>
											<Badge
												variant={
													order.status === 'Pago'
														? 'default'
														: order.status === 'Pendente'
															? 'secondary'
															: 'outline'
												}
											>
												{order.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">{order.amount}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Produtos Mais Populares</CardTitle>
						<CardDescription>
							Seus produtos com melhor performance esta semana.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{topProducts.map((product, index) => (
								<div key={index} className="flex items-center space-x-4">
									<Image
										src={product.image || '/placeholder.svg'}
										alt={product.name}
										width={40}
										height={40}
										className="rounded-md object-cover"
									/>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">{product.name}</p>
										<p className="text-sm text-muted-foreground">
											{product.views} visualizações • {product.sales} vendas
										</p>
									</div>
									<div className="text-sm font-medium">
										<ArrowUpRight className="h-4 w-4 text-green-600" />
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Meta de Vendas Mensal</CardTitle>
						<CardDescription>
							Progresso em direção à sua meta de R$ 2.000,00
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Progress value={61.7} className="w-full" />
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>R$ 1.234,56</span>
								<span>R$ 2.000,00</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Ações Rápidas</CardTitle>
						<CardDescription>Tarefas importantes para o seu brechó</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Button variant="secondary" className="w-full justify-start" asChild>
							<Link href="/dashboard/add-product">
								<Package className="mr-2 h-4 w-4" />
								Adicionar novo produto
							</Link>
						</Button>
						<Button variant="secondary" className="w-full justify-start" asChild>
							<Link href="/dashboard/orders">
								<ShoppingCart className="mr-2 h-4 w-4" />
								Verificar pedidos pendentes
							</Link>
						</Button>
						<Button variant="secondary" className="w-full justify-start" asChild>
							<Link href="/dashboard/customers">
								<Users className="mr-2 h-4 w-4" />
								Responder mensagens de clientes
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
