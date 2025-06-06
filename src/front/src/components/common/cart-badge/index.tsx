'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

// Você pode passar o userId como prop quando tiver a lógica de autenticação
export function CartBadge() {
	const { totalItems } = useCart();

	return (
		<Link href="/cart">
			<Button variant="ghost" size="sm" className="relative">
				<ShoppingCart className="h-5 w-5" />
				{totalItems > 0 && (
					<Badge
						variant="destructive"
						className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
					>
						{totalItems > 99 ? '99+' : totalItems}
					</Badge>
				)}
			</Button>
		</Link>
	);
}
