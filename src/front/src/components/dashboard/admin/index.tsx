import Link from 'next/link';

import {
	ChartConfig,
	Button,
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	Badge
} from '@/components/ui';

import { cn } from '@/lib/utils';
import { Progress } from '@radix-ui/react-progress';
import { Users, Store, DollarSign, Package, Shield, AlertTriangle } from 'lucide-react';
import {
	CartesianGrid,
	XAxis,
	Line,
	Pie,
	Cell,
	Bar,
	Area,
	LineChart,
	PieChart,
	BarChart,
	AreaChart
} from 'recharts';

export function AdminDashboard() {
	const platformStats = [
		{ label: 'Total de Usuários', value: '12,543', change: '+8.2%', icon: Users },
		{ label: 'Vendedores Ativos', value: '1,234', change: '+12.5%', icon: Store },
		{
			label: 'Receita da Plataforma',
			value: 'R$ 45.678,90',
			change: '+15.3%',
			icon: DollarSign
		},
		{ label: 'Produtos Publicados', value: '8,765', change: '+5.7%', icon: Package }
	];

	const recentActivity = [
		{
			type: 'Novo vendedor',
			description: 'João Silva se cadastrou como vendedor',
			time: '2 min atrás',
			status: 'success'
		},
		{
			type: 'Produto reportado',
			description: 'Produto #1234 foi reportado por conteúdo inadequado',
			time: '5 min atrás',
			status: 'warning'
		},
		{
			type: 'Transação',
			description: 'Venda de R$ 89,90 realizada com sucesso',
			time: '8 min atrás',
			status: 'success'
		},
		{
			type: 'Usuário banido',
			description: 'Usuário @spammer foi banido por violação de termos',
			time: '15 min atrás',
			status: 'error'
		}
	];

	const topSellers = [
		{ name: 'Maria dos Brechós', sales: 156, revenue: 'R$ 4.567,89', rating: 4.9 },
		{ name: 'Vintage Store', sales: 134, revenue: 'R$ 3.890,45', rating: 4.8 },
		{ name: 'Retro Fashion', sales: 98, revenue: 'R$ 2.345,67', rating: 4.7 }
	];

	// Dados para os gráficos
	const monthlyGrowthData = [
		{ month: 'Janeiro', usuarios: 8500, vendedores: 890, receita: 28500 },
		{ month: 'Fevereiro', usuarios: 9200, vendedores: 945, receita: 32100 },
		{ month: 'Março', usuarios: 9800, vendedores: 1020, receita: 35800 },
		{ month: 'Abril', usuarios: 10500, vendedores: 1105, receita: 39200 },
		{ month: 'Maio', usuarios: 11200, vendedores: 1180, receita: 42600 },
		{ month: 'Junho', usuarios: 12543, vendedores: 1234, receita: 45678 }
	];

	const categoryRevenueData = [
		{ category: 'Roupas Femininas', revenue: 15420 },
		{ category: 'Acessórios', revenue: 9890 },
		{ category: 'Calçados', revenue: 8760 },
		{ category: 'Bolsas', revenue: 6540 },
		{ category: 'Roupas Masculinas', revenue: 4980 }
	];

	const userDistributionData = [
		{ name: 'Compradores', value: 11309, fill: '#F1C40F' },
		{ name: 'Vendedores', value: 1234, fill: '#9B59B6' }
	];

	const dailyTransactionsData = [
		{ day: 'Segunda', transactions: 145, revenue: 4200 },
		{ day: 'Terça', transactions: 189, revenue: 5600 },
		{ day: 'Quarta', transactions: 234, revenue: 6800 },
		{ day: 'Quinta', transactions: 198, revenue: 5900 },
		{ day: 'Sexta', transactions: 267, revenue: 7800 },
		{ day: 'Sábado', transactions: 312, revenue: 9200 },
		{ day: 'Domingo', transactions: 278, revenue: 8100 }
	];

	// Configurações dos gráficos
	const growthChartConfig = {
		usuarios: {
			label: 'Usuários',
			color: '#4DA6FF'
		},
		vendedores: {
			label: 'Vendedores',
			color: '#9B59B6'
		},
		receita: {
			label: 'Receita',
			color: '#2ECC71'
		}
	} satisfies ChartConfig;

	const userDistributionConfig = {
		compradores: {
			label: 'Compradores',
			color: 'hsl(var(--chart-1))'
		},
		vendedores: {
			label: 'Vendedores',
			color: 'hsl(var(--chart-2))'
		}
	} satisfies ChartConfig;

	const categoryRevenueConfig = {
		revenue: {
			label: 'Receita',
			color: '#2ECC71'
		}
	} satisfies ChartConfig;

	const transactionsConfig = {
		transactions: {
			label: 'Transações',
			color: '#E67E22'
		},
		revenue: {
			label: 'Receita',
			color: '#2ECC71'
		}
	} satisfies ChartConfig;

	const sellerBgCollors = ['bg-green-500/50', 'bg-yellow-500/50', 'bg-orange-500/50'];

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div className="flex items-center space-x-2">
					<Button variant="outline" asChild>
						<Link href="/dashboard/moderation">
							<Shield className="mr-2 h-4 w-4" />
							Moderação
						</Link>
					</Button>
					<Button asChild>
						<Link href="/dashboard/reports">
							<AlertTriangle className="mr-2 h-4 w-4" />
							Relatórios
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{platformStats.map((stat, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
							<stat.icon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="font-mono text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-muted-foreground">
								<span className="text-green-600">{stat.change}</span> em relação ao mês
								anterior
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
						<div className="grid flex-1 gap-1">
							<CardTitle>Crescimento da Plataforma</CardTitle>
							<CardDescription>
								Evolução de usuários, vendedores e receita nos últimos 6 meses
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
						<ChartContainer
							config={growthChartConfig}
							className="aspect-auto h-[250px] w-full"
						>
							<LineChart data={monthlyGrowthData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => value}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											labelFormatter={(value) => `Mês: ${value}`}
											formatter={(value, name) => {
												if (name === 'receita')
													return (
														<span className="flex w-full items-center justify-between gap-4">
															<span className="font-medium">Receita:</span>
															<span className="font-mono">
																{value.toLocaleString('pt-BR', {
																	style: 'currency',
																	currency: 'BRL'
																})}
															</span>
														</span>
													);
												return (
													<span className="flex w-full items-center justify-between">
														<span className="font-medium">
															{String(name).charAt(0).toUpperCase() +
																String(name).slice(1).toLowerCase()}
															:
														</span>
														<span className="font-mono">
															{value.toLocaleString('pt-BR')}
														</span>
													</span>
												);
											}}
										/>
									}
								/>
								<Line
									dataKey="usuarios"
									type="monotone"
									stroke="var(--color-usuarios)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									dataKey="vendedores"
									type="monotone"
									stroke="var(--color-vendedores)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									dataKey="receita"
									type="monotone"
									stroke="var(--color-receita)"
									strokeWidth={2}
									dot={false}
								/>
								<ChartLegend content={<ChartLegendContent />} />
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Distribuição de Usuários</CardTitle>
						<CardDescription>Proporção entre compradores e vendedores</CardDescription>
					</CardHeader>
					<CardContent className="flex-1 pb-0">
						<ChartContainer
							config={userDistributionConfig}
							className="mx-auto aspect-square max-h-[250px]"
						>
							<PieChart>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											hideLabel
											formatter={(value, name) => (
												<span className="flex w-full items-center justify-between gap-4">
													<span className="font-medium">
														{String(name).charAt(0).toUpperCase() +
															String(name).slice(1).toLowerCase()}
														:
													</span>
													<span className="font-mono">
														{value.toLocaleString('pt-BR')}
													</span>
												</span>
											)}
										/>
									}
								/>
								<Pie
									data={userDistributionData}
									dataKey="value"
									nameKey="name"
									innerRadius={60}
									strokeWidth={5}
								>
									{userDistributionData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Pie>
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Receita por Categoria</CardTitle>
						<CardDescription>
							Performance de vendas por categoria de produto
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={categoryRevenueConfig} className="h-[300px] w-full">
							<BarChart data={categoryRevenueData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.split(' ')[0]}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											hideLabel
											formatter={(value) => (
												<span className="flex w-full items-center justify-between gap-4">
													<span className="font-medium">Receita:</span>
													<span className="font-mono">
														{value.toLocaleString('pt-BR')}
													</span>
												</span>
											)}
										/>
									}
								/>
								<Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Transações da Semana</CardTitle>
						<CardDescription>Volume de transações e receita por dia</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={transactionsConfig} className="h-[300px] w-full">
							<AreaChart data={dailyTransactionsData}>
								<defs>
									<linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-transactions)"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-transactions)"
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="var(--color-revenue)"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="var(--color-revenue)"
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="day"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => value}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											labelFormatter={(value) => `${value}`}
											formatter={(value, name) => {
												if (name === 'revenue')
													return (
														<span className="flex w-full items-center justify-between gap-4">
															<span className="font-medium">Receita:</span>
															<span className="font-mono">
																{value.toLocaleString('pt-BR', {
																	style: 'currency',
																	currency: 'BRL'
																})}
															</span>
														</span>
													);
												return (
													<span className="flex w-full items-center justify-between">
														<span className="font-medium">Transações:</span>
														<span className="font-mono">
															{value.toLocaleString('pt-BR')}
														</span>
													</span>
												);
											}}
										/>
									}
								/>
								<Area
									dataKey="transactions"
									type="natural"
									fill="url(#fillTransactions)"
									stroke="var(--color-transactions)"
									stackId="a"
								/>
								<Area
									dataKey="revenue"
									type="natural"
									fill="url(#fillRevenue)"
									stroke="var(--color-revenue)"
									stackId="a"
								/>
								<ChartLegend content={<ChartLegendContent />} />
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Atividade Recente</CardTitle>
						<CardDescription>
							Últimas atividades na plataforma que requerem atenção.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity, index) => (
								<div key={index} className="flex items-center space-x-4">
									<div
										className={`h-2 w-2 rounded-full ${
											activity.status === 'success'
												? 'bg-green-500'
												: activity.status === 'warning'
													? 'bg-yellow-500'
													: 'bg-red-500'
										}`}
									/>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">{activity.type}</p>
										<p className="text-sm text-muted-foreground">
											{activity.description}
										</p>
									</div>
									<div className="text-xs text-muted-foreground">{activity.time}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Top Vendedores</CardTitle>
						<CardDescription>Vendedores com melhor performance este mês.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{topSellers.map((seller, index) => (
								<div key={index} className="flex items-center space-x-4">
									<div
										className={cn(
											'flex h-8 w-8 items-center justify-center rounded-full',
											sellerBgCollors[index] || 'bg-gray-500/50'
										)}
									>
										<span className="text-sm font-medium">{index + 1}</span>
									</div>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">{seller.name}</p>
										<span className="flex flex-col justify-center text-sm text-muted-foreground">
											{seller.sales} vendas
											<p className="font-mono">{seller.revenue}</p>
										</span>
									</div>
									<Badge variant="outline">{seller.rating}★</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Moderação Pendente</CardTitle>
						<CardDescription>Itens que precisam de revisão</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="items-between flex-col justify-between space-y-4">
							<div className="flex justify-between">
								<span className="text-sm">Produtos reportados</span>
								<Badge variant="destructive">23</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-sm">Vendedores pendentes</span>
								<Badge variant="default" className="bg-orange-500/50">
									12
								</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-sm">Comentários flagados</span>
								<Badge variant="secondary">8</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Performance da Plataforma</CardTitle>
						<CardDescription>Indicadores técnicos</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div>
								<div className="mb-1 flex justify-between text-sm">
									<span>Uptime</span>
									<span>99.9%</span>
								</div>
								<Progress value={99.9} className="h-2" />
							</div>
							<div>
								<div className="mb-1 flex justify-between text-sm">
									<span>Velocidade média</span>
									<span>1.2s</span>
								</div>
								<Progress value={85} className="h-2" />
							</div>
							<div>
								<div className="mb-1 flex justify-between text-sm">
									<span>Satisfação do usuário</span>
									<span>4.6/5</span>
								</div>
								<Progress value={92} className="h-2" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
