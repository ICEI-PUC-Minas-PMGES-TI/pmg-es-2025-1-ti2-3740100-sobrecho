'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ProductsCards } from '@/components/dashboard/seller/products/cards';
import { ProductsTable } from '@/components/dashboard/seller/products/table';
import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';

export function ProductsPage() {
	const dispatch = useDispatch();

	const { user } = useTypedSelector((state) => state.auth);

	useEffect(() => {
		if (user?.role !== 'ROLE_SELLER') return;
		dispatch(ProductsCreators.productsGetByStoreIdRequest({ storeId: user.store.id }));
	}, [dispatch, user]);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<ProductsCards />
					<div className="px-4 lg:px-6"></div>
					<ProductsTable />
				</div>
			</div>
		</div>
	);
}
