'use client';

import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useTypedSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { CartCreators } from '@/redux/reducers';
import { ICartItem } from '@/redux/types';

interface IProductCardProps {
	product: {
		id: string;
		name: string;
		category: string;
		price: number;
		description: string;
		size: string;
		image: string;
	};
}

export function ProductCard({ product }: IProductCardProps) {
	const dispatch = useDispatch();

	const {
		add: { loading },
		get: { data: cartData }
	} = useTypedSelector((state) => state.cart);

	const { user } = useTypedSelector((state) => state.auth);

	const isProductInCart = useMemo(() => {
		if (!cartData?.items) return false;
		return cartData.items.some(
			(item: ICartItem) => item.id === product.id && item.size === product.size
		);
	}, [cartData?.items, product.id, product.size]);

	const handleAddToCart = () => {
		if (!user?.id) {
			toast.error('É necessário estar logado para adicionar ao carrinho.');
			return;
		}

		const item = {
			id: product.id,
			size: product.size,
			price: product.price
		};

		dispatch(CartCreators.cartAddItemRequest({ item, userId: user.id }));
	};

	useEffect(() => {
		if (!user?.id || cartData) return;

		dispatch(CartCreators.cartGetRequest({ userId: user.id }));
	}, [user?.id, cartData, dispatch]);

	return (
		<Card className="flex h-full flex-col gap-4 overflow-hidden py-0">
			<div className="relative aspect-square">
				<Image
					src={product.image || '/placeholder.svg?height=300&width=300'}
					alt={product.name}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="flex h-40 flex-1 flex-col justify-between">
				<CardHeader className="m-0 p-0 px-4">
					<div className="flex items-start justify-between gap-2">
						<div className="flex-1">
							<h3 className="line-clamp-2 text-sm leading-tight font-medium">
								{product.name}
							</h3>
						</div>
						<div className="flex-shrink-0">
							<p className="font-mono text-sm font-bold whitespace-nowrap">
								{product.price.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								})}
							</p>
						</div>
					</div>
				</CardHeader>
				<div className="mt-auto">
					<CardContent className="p-4 pt-2 pb-0">
						<div className="flex flex-wrap gap-1">
							<Badge
								variant="outline"
								className="flex h-6 min-w-[32px] items-center justify-center px-2 py-0.5 text-xs"
							>
								{product.category}
							</Badge>
							<Badge
								variant="outline"
								className="flex h-6 min-w-[32px] items-center justify-center px-2 py-0.5 text-xs"
							>
								{product.size}
							</Badge>
						</div>
					</CardContent>
					<CardFooter className="p-4 pt-2">
						<Button
							className={cn('w-full', !isProductInCart ? 'cursor-pointer' : '')}
							size="sm"
							onClick={handleAddToCart}
							variant={isProductInCart ? 'secondary' : 'default'}
							disabled={isProductInCart || loading}
						>
							{isProductInCart ? (
								<>
									<Check className="mr-2 h-4 w-4" />
									No carrinho
								</>
							) : (
								<>
									<ShoppingCart className="mr-2 h-4 w-4" />
									Adicionar ao carrinho
								</>
							)}
						</Button>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
}
