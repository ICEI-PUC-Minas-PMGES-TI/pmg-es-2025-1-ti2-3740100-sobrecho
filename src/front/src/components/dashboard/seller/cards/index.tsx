'use client';

import { useEffect, useState } from 'react';

import {
	Badge,
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { IDashboardSellerCards } from '@/redux/types';

export function SellerDashboardCards() {
	const {
		seller: {
			cards: { data: fetchedCards, loading }
		}
	} = useTypedSelector((state) => state.dashboard);

	const [cardsData, setCardsData] = useState({} as IDashboardSellerCards);

	useEffect(() => {
		if (!fetchedCards) return;
		setCardsData(fetchedCards);
	}, [fetchedCards]);

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Receita total</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{loading ? (
							<Skeleton className="mt-2 h-7 w-40" />
						) : (
							<>
								{cardsData?.totalRevenue?.value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								})}
							</>
						)}
					</CardTitle>
					<CardAction>
						{loading ? (
							<Skeleton className="mt-1 h-4 w-14" />
						) : (
							<Badge variant="outline">
								{cardsData?.totalRevenue?.percentual > 0 ? (
									<div className="flex items-center text-green-700/75 dark:text-green-400/75">
										+{cardsData?.totalRevenue?.percentual.toFixed(1)}%
									</div>
								) : (
									<div className="text-red-700/75 dark:text-red-400/75">
										{cardsData?.totalRevenue?.percentual.toFixed(1)}%
									</div>
								)}
							</Badge>
						)}
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.totalRevenue?.percentual > 0 ? '+' : ''}
							{cardsData?.totalRevenue?.percentual.toFixed(1)}% desde o último período
						</div>
					)}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Quantidade de produtos</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{loading ? (
							<Skeleton className="mt-2 h-7 w-40" />
						) : (
							cardsData?.productsQuantity?.value
						)}
					</CardTitle>
					<CardAction>
						{loading ? (
							<Skeleton className="mt-1 h-4 w-14" />
						) : (
							<Badge variant="outline">
								{cardsData?.productsQuantity?.percentual > 0 ? (
									<div className="flex items-center text-green-700/75 dark:text-green-400/75">
										+{cardsData?.productsQuantity?.percentual.toFixed(1)}%
									</div>
								) : (
									<div className="text-red-700/75 dark:text-red-400/75">
										{cardsData?.productsQuantity?.percentual.toFixed(1)}%
									</div>
								)}
							</Badge>
						)}
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.productsQuantity?.percentual > 0 ? '+' : ''}
							{cardsData?.productsQuantity?.percentual.toFixed(1)}% desde o último período
						</div>
					)}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Avaliação da loja</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{loading ? (
							<Skeleton className="mt-2 h-7 w-40" />
						) : (
							cardsData?.storeRating?.value
						)}
					</CardTitle>
					<CardAction>
						{loading ? (
							<Skeleton className="mt-1 h-4 w-14" />
						) : (
							<Badge variant="outline">
								{cardsData?.storeRating?.percentual > 0 ? (
									<div className="flex items-center text-green-700/75 dark:text-green-400/75">
										+{cardsData?.storeRating?.percentual.toFixed(1)}%
									</div>
								) : (
									<div className="text-red-700/75 dark:text-red-400/75">
										{cardsData?.storeRating?.percentual.toFixed(1)}%
									</div>
								)}
							</Badge>
						)}
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.storeRating?.percentual > 0 ? '+' : ''}
							{cardsData?.storeRating?.percentual.toFixed(1)}% desde o último período
						</div>
					)}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Receita média por produto</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{loading ? (
							<Skeleton className="mt-2 h-7 w-40" />
						) : (
							<>
								{cardsData?.revenuePerProduct?.value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								})}
							</>
						)}
					</CardTitle>
					<CardAction>
						{loading ? (
							<Skeleton className="mt-1 h-4 w-14" />
						) : (
							<Badge variant="outline">
								{cardsData?.revenuePerProduct?.percentual > 0 ? (
									<div className="flex items-center text-green-700/75 dark:text-green-400/75">
										+{cardsData?.revenuePerProduct?.percentual.toFixed(1)}%
									</div>
								) : (
									<div className="text-red-700/75 dark:text-red-400/75">
										{cardsData?.revenuePerProduct?.percentual.toFixed(1)}%
									</div>
								)}
							</Badge>
						)}
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.revenuePerProduct?.percentual > 0 ? '+' : ''}
							{cardsData?.revenuePerProduct?.percentual.toFixed(1)}% desde o último
							período
						</div>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
