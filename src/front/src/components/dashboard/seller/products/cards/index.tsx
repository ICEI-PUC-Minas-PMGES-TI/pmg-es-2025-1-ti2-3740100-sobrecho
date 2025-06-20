'use client';

import { isSameWeek, parseISO, subWeeks } from 'date-fns';

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton
} from '@/components/ui';
import { AVAILABLE_CATEGORIES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { IProduct } from '@/redux/types';

export function getProductsCreatedThisWeek(products: IProduct[]) {
	const now = new Date();

	let currentWeek = 0;
	let lastWeek = 0;

	for (const product of products) {
		const date = parseISO(product.createdAt);
		if (isSameWeek(date, now, { weekStartsOn: 1 })) {
			currentWeek++;
		} else if (isSameWeek(date, subWeeks(now, 1), { weekStartsOn: 1 })) {
			lastWeek++;
		}
	}

	const diff = currentWeek - lastWeek;

	return {
		value: currentWeek,
		diff // quantidade a mais ou a menos que a semana passada
	};
}

export function getProductsQuantityByCategory(products: IProduct[]) {
	const now = new Date();
	const lastWeekStart = subWeeks(now, 1);

	// Quantidade total de produtos criados nesta semana (válidos)
	const currentWeekTotal = products.filter((product) => {
		const date = parseISO(product.createdAt);
		const isValidCategory = AVAILABLE_CATEGORIES.some(
			(c) => c.value === product.category
		);
		return isValidCategory && isSameWeek(date, now, { weekStartsOn: 1 });
	}).length;

	// Quantidade total da semana passada (válidos)
	const lastWeekTotal = products.filter((product) => {
		const date = parseISO(product.createdAt);
		const isValidCategory = AVAILABLE_CATEGORIES.some(
			(c) => c.value === product.category
		);
		return isValidCategory && isSameWeek(date, lastWeekStart, { weekStartsOn: 1 });
	}).length;

	// Média por categoria (usando todas as disponíveis, mesmo que sem produtos)
	const totalCategories = AVAILABLE_CATEGORIES.length;
	const currentAverage = totalCategories === 0 ? 0 : currentWeekTotal / totalCategories;
	const lastAverage = totalCategories === 0 ? 0 : lastWeekTotal / totalCategories;

	const diff = currentAverage - lastAverage;

	return {
		value: parseFloat(currentAverage.toFixed(2)), // ex: 0.5
		diff: parseFloat(diff.toFixed(2)) // ex: +0.25
	};
}

export function ProductsCards() {
	const {
		getByStoreId: { data: fetchedProducts, loading }
	} = useTypedSelector((state) => state.products);

	const cardsData = {
		productsQuantity: getProductsCreatedThisWeek(fetchedProducts || []),
		productsQuantityByCategory: getProductsQuantityByCategory(fetchedProducts || [])
	};

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
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
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.productsQuantity?.diff > 0 ? '+' : ''}
							{cardsData?.productsQuantity?.diff} esta semana
						</div>
					)}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Quantidade de produtos por categoria</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{loading ? (
							<Skeleton className="mt-2 h-7 w-40" />
						) : (
							cardsData?.productsQuantityByCategory?.value
						)}
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					{loading ? (
						<Skeleton className="mt-2 h-4 w-50" />
					) : (
						<div className="text-muted-foreground line-clamp-1 flex gap-2 font-medium">
							{cardsData?.productsQuantityByCategory?.diff > 0 ? '+' : ''}
							{cardsData?.productsQuantityByCategory?.diff}% esta semana
						</div>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
