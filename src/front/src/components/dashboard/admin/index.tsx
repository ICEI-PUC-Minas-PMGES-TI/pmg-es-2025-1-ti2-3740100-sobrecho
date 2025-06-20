'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AdminDashboardCards } from '@/components/dashboard/admin/cards';
import { AdminDashboardChart } from '@/components/dashboard/admin/chart';
import { DashboardCreators } from '@/redux/reducers';

export function AdminDashboard() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(DashboardCreators.dashboardAdminCardsRequest());
		dispatch(DashboardCreators.dashboardAdminChartRequest());
	}, [dispatch]);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<AdminDashboardCards />
					<div className="px-4 lg:px-6">
						<AdminDashboardChart />
					</div>
				</div>
			</div>
		</div>
	);
}
