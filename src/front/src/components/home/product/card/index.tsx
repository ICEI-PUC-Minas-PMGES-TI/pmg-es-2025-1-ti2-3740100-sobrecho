'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';

interface IProductCardProps {
	product: {
		id: string;
		name: string;
		category: string;
		price: string;
		description: string;
		size: string[];
		images: string[];
	};
	userId?: string; // Adicionado userId como prop opcional
}

export function ProductCard({ product }: IProductCardProps) {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const { addItem, isInCart } = useCart();

	const handleAddToCart = () => {
		if (selectedSize) {
			addItem(product.id, selectedSize);
			toast.message('Produto adicionado!', {
				description: `${product.name} (${selectedSize}) foi adicionado ao carrinho.`
			});
			setSelectedSize(null); // Reset size selection after adding
		}
	};

	const isProductInCart = selectedSize ? isInCart(product.id, selectedSize) : false;

	return (
		<Card className="flex h-full flex-col overflow-hidden">
			<div className="relative aspect-square">
				<Image
					src={product.images[0] || '/placeholder.svg?height=300&width=300'}
					alt={product.name}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>

			<div className="flex flex-1 flex-col justify-between">
				{/* Seção superior - Categoria, Título e Preço */}
				<CardHeader className="p-4 pb-0">
					<div className="flex min-h-[60px] items-start justify-between gap-2">
						<div className="flex-1">
							<p className="text-xs text-muted-foreground">{product.category}</p>
							<h3 className="mt-1 line-clamp-2 text-sm font-medium leading-tight">
								{product.name}
							</h3>
						</div>
						<div className="flex-shrink-0">
							<p className="whitespace-nowrap text-sm font-bold">{product.price}</p>
						</div>
					</div>
				</CardHeader>

				{/* Seção inferior - Tamanhos e Botão */}
				<div className="mt-auto">
					<CardContent className="p-4 pb-0 pt-2">
						<div>
							<p className="mb-1 text-xs">Tamanhos:</p>
							<div className="flex flex-wrap gap-1">
								{product.size.map((size) => (
									<Badge
										key={size}
										variant={selectedSize === size ? 'default' : 'outline'}
										className="flex h-6 min-w-[32px] cursor-pointer items-center justify-center px-2 py-0.5 text-xs"
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>

					<CardFooter className="p-4 pt-2">
						<Button
							className="w-full"
							size="sm"
							disabled={!selectedSize}
							onClick={handleAddToCart}
							variant={isProductInCart ? 'secondary' : 'default'}
						>
							{isProductInCart ? (
								<>
									<Check className="mr-2 h-4 w-4" />
									No carrinho
								</>
							) : (
								<>
									<ShoppingCart className="mr-2 h-4 w-4" />
									{selectedSize ? 'Adicionar ao carrinho' : 'Selecione um tamanho'}
								</>
							)}
						</Button>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
}
