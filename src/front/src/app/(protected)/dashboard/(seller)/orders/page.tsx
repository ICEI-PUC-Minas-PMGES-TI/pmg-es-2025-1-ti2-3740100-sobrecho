'use client';

import { useState } from 'react';

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui';

import { Eye, MessageCircle, MoreHorizontal, Package, Search, Truck } from 'lucide-react';

export default function Page() {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');

	const orders = [
		{
			id: '#3462',
			customer: 'Ana Costa',
			product: 'Vestido Vintage Azul',
			amount: 'R$ 45,00',
			status: 'Pendente',
			date: '2024-01-20',
			paymentMethod: 'PIX',
			shipping: 'Retirada no local'
		},
		{
			id: '#3461',
			customer: 'Carlos Silva',
			product: 'Jaqueta de Couro Preta',
			amount: 'R$ 120,00',
			status: 'Pago',
			date: '2024-01-19',
			paymentMethod: 'Cartão',
			shipping: 'Correios'
		},
		{
			id: '#3460',
			customer: 'Lucia Santos',
			product: 'Bolsa Vintage Marrom',
			amount: 'R$ 35,00',
			status: 'Enviado',
			date: '2024-01-18',
			paymentMethod: 'PIX',
			shipping: 'Correios'
		},
		{
			id: '#3459',
			customer: 'Pedro Oliveira',
			product: 'Saia Midi Floral',
			amount: 'R$ 28,00',
			status: 'Entregue',
			date: '2024-01-17',
			paymentMethod: 'Dinheiro',
			shipping: 'Retirada no local'
		},
		{
			id: '#3458',
			customer: 'Maria Fernanda',
			product: 'Tênis Vintage Branco',
			amount: 'R$ 65,00',
			status: 'Cancelado',
			date: '2024-01-16',
			paymentMethod: 'PIX',
			shipping: 'Correios'
		}
	];

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.id.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Pendente':
				return <Badge variant="secondary">Pendente</Badge>;
			case 'Pago':
				return <Badge variant="default">Pago</Badge>;
			case 'Enviado':
				return <Badge className="bg-blue-600">Enviado</Badge>;
			case 'Entregue':
				return <Badge className="bg-green-600">Entregue</Badge>;
			case 'Cancelado':
				return <Badge variant="destructive">Cancelado</Badge>;
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const getStatusCount = (status: string) => {
		return orders.filter((order) => order.status === status).length;
	};

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pendentes</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getStatusCount('Pendente')}</div>
						<p className="text-xs text-muted-foreground">Aguardando pagamento</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pagos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getStatusCount('Pago')}</div>
						<p className="text-xs text-muted-foreground">Prontos para envio</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Enviados</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getStatusCount('Enviado')}</div>
						<p className="text-xs text-muted-foreground">Em trânsito</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Entregues</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getStatusCount('Entregue')}</div>
						<p className="text-xs text-muted-foreground">Concluídos</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Cancelados</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getStatusCount('Cancelado')}</div>
						<p className="text-xs text-muted-foreground">Este mês</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de Pedidos</CardTitle>
					<CardDescription>Gerencie todos os pedidos do seu brechó</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-6 flex items-center gap-4">
						<div className="relative max-w-sm flex-1">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Buscar pedidos..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filtrar por status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos os status</SelectItem>
								<SelectItem value="pendente">Pendente</SelectItem>
								<SelectItem value="pago">Pago</SelectItem>
								<SelectItem value="enviado">Enviado</SelectItem>
								<SelectItem value="entregue">Entregue</SelectItem>
								<SelectItem value="cancelado">Cancelado</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Pedido</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead>Produto</TableHead>
								<TableHead>Valor</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Pagamento</TableHead>
								<TableHead>Entrega</TableHead>
								<TableHead className="text-right">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredOrders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>
										<div>
											<div className="font-medium">{order.customer}</div>
											<div className="text-sm text-muted-foreground">
												{new Date(order.date).toLocaleDateString('pt-BR')}
											</div>
										</div>
									</TableCell>
									<TableCell>{order.product}</TableCell>
									<TableCell className="font-medium">{order.amount}</TableCell>
									<TableCell>{getStatusBadge(order.status)}</TableCell>
									<TableCell>{order.paymentMethod}</TableCell>
									<TableCell>{order.shipping}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Abrir menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuItem>
													<Eye className="mr-2 h-4 w-4" />
													Ver detalhes
												</DropdownMenuItem>
												<DropdownMenuItem>
													<MessageCircle className="mr-2 h-4 w-4" />
													Contatar cliente
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												{order.status === 'Pago' && (
													<DropdownMenuItem>
														<Package className="mr-2 h-4 w-4" />
														Marcar como enviado
													</DropdownMenuItem>
												)}
												{order.status === 'Enviado' && (
													<DropdownMenuItem>
														<Truck className="mr-2 h-4 w-4" />
														Marcar como entregue
													</DropdownMenuItem>
												)}
												{(order.status === 'Pendente' || order.status === 'Pago') && (
													<DropdownMenuItem className="text-red-600">
														Cancelar pedido
													</DropdownMenuItem>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
