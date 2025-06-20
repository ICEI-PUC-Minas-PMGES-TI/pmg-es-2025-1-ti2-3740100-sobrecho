'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Skeleton,
	ToggleGroup,
	ToggleGroupItem
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { useIsMobile } from '@/hooks/use-mobile';
import { IDashboardAdminChart } from '@/redux/types';

export const description = 'An interactive area chart';

const chartConfig = {
	user: {
		label: 'Usuários',
		color: 'var(--primary)'
	},
	seller: {
		label: 'Vendedores',
		color: 'hsl(120, 60%, 67%)'
	}
} satisfies ChartConfig;

export function AdminDashboardChart() {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = useState('90d');
	const [chartData, setChartData] = useState([] as IDashboardAdminChart[]);

	const {
		admin: {
			chart: { data: fetchedChart, loading }
		}
	} = useTypedSelector((state) => state.dashboard);

	useEffect(() => {
		if (isMobile) {
			setTimeRange('7d');
		}
	}, [isMobile]);

	useEffect(() => {
		if (!fetchedChart) return;
		setChartData(fetchedChart);
	}, [fetchedChart]);

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date('2024-06-30');
		let daysToSubtract = 90;
		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<div className="*:data-[slot=card]:from-primary/5 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardTitle>Total de acessos</CardTitle>
					<CardDescription>
						<span className="hidden @[540px]/card:block">
							Total de acessos pelos últimos 3 meses
						</span>
						<span className="@[540px]/card:hidden">Ultimos 3 meses</span>
					</CardDescription>
					<CardAction>
						<ToggleGroup
							type="single"
							value={timeRange}
							onValueChange={setTimeRange}
							variant="outline"
							className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
						>
							<ToggleGroupItem value="90d">Ultimos 3 meses</ToggleGroupItem>
							<ToggleGroupItem value="30d">Ultimos 30 dias</ToggleGroupItem>
							<ToggleGroupItem value="7d">Ultimos 7 dias</ToggleGroupItem>
						</ToggleGroup>
						<Select value={timeRange} onValueChange={setTimeRange}>
							<SelectTrigger
								className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
								size="sm"
								aria-label="Select a value"
							>
								<SelectValue placeholder="Ultimos 3 meses" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem value="90d" className="rounded-lg">
									Ultimos 3 meses
								</SelectItem>
								<SelectItem value="30d" className="rounded-lg">
									Ultimos 30 dias
								</SelectItem>
								<SelectItem value="7d" className="rounded-lg">
									Ultimos 7 dias
								</SelectItem>
							</SelectContent>
						</Select>
					</CardAction>
				</CardHeader>
				<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
					{loading ? (
						<Skeleton className="h-64 w-full" />
					) : (
						<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
							<AreaChart data={filteredData}>
								<defs>
									<linearGradient id="fillUser" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-user)" stopOpacity={1.0} />
										<stop offset="95%" stopColor="var(--color-user)" stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="fillSeller" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="var(--color-seller)" stopOpacity={0.8} />
										<stop
											offset="95%"
											stopColor="var(--color-seller)"
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="date"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									minTickGap={32}
									tickFormatter={(value) => {
										const date = new Date(value);
										return date.toLocaleDateString('pt-BR', {
											month: 'short',
											day: 'numeric'
										});
									}}
								/>
								<ChartTooltip
									cursor={false}
									defaultIndex={isMobile ? -1 : 10}
									content={
										<ChartTooltipContent
											labelFormatter={(value) => {
												return new Date(value).toLocaleDateString('pt-BR', {
													month: 'short',
													day: 'numeric'
												});
											}}
											indicator="dot"
										/>
									}
								/>
								<Area
									dataKey="seller"
									type="natural"
									fill="url(#fillSeller)"
									stroke="var(--color-seller)"
									stackId="a"
								/>
								<Area
									dataKey="user"
									type="natural"
									fill="url(#fillUser)"
									stroke="var(--color-user)"
									stackId="a"
								/>
							</AreaChart>
						</ChartContainer>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
