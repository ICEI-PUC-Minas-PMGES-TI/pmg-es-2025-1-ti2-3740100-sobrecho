'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { EditProductForm } from '@/components/dashboard/seller/products/forms';

import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import { Loader2Icon } from 'lucide-react';

export default function Page() {
	const params = useParams();
	const id = params.id as string;

	const {
		fetchProductById: { data: product, loading }
	} = useTypedSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!id) return;
		dispatch(ProductsCreators.productFetchByIdRequest({ id }));
	}, []);

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Loader2Icon className="size-7 animate-spin" />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<p>Produto não encontrado</p>
			</div>
		);
	}

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Editar Produto</h2>
			</div>

			<EditProductForm product={product} />
		</div>
	);
}
