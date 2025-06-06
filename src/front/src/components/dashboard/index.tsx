'use client';

import { AdminDashboard } from '@/components/dashboard/admin';
import { SellerDashboard } from '@/components/dashboard/seller';
import { RBACProvider } from '@/components/providers';

import { useTypedSelector } from '@/hooks';
import { Loader2Icon } from 'lucide-react';

export function DashboardPage() {
	const { user } = useTypedSelector((state) => state.auth);

	if (!user) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Loader2Icon className="size-7 animate-spin" />
			</div>
		);
	}

	return (
		<RBACProvider allowedRoles={['admin', 'seller']}>
			{user.role === 'admin' && <AdminDashboard />}
			{user.role === 'seller' && <SellerDashboard />}
		</RBACProvider>
	);
}
