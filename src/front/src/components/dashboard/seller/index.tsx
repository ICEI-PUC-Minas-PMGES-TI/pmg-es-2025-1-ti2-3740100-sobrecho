'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SellerDashboardCards } from '@/components/dashboard/seller/cards';
import { SellerDashboardChart } from '@/components/dashboard/seller/chart';
import { useTypedSelector } from '@/hooks';
import { DashboardCreators } from '@/redux/reducers';

export function SellerDashboard() {
	const dispatch = useDispatch();

	const { user } = useTypedSelector((state) => state.auth);
	const userId = user?.id;

	useEffect(() => {
		dispatch(DashboardCreators.dashboardSellerCardsRequest({ storeId: userId }));
		dispatch(DashboardCreators.dashboardSellerChartRequest({ storeId: userId }));
	}, [dispatch, userId]);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SellerDashboardCards />
					<div className="px-4 lg:px-6">
						<SellerDashboardChart />
					</div>
				</div>
			</div>
		</div>
	);
}
