import { AdminDashboard } from '@/components/dashboard/admin';
import { SellerDashboard } from '@/components/dashboard/seller';
import { AccessSwitch } from '@/guards';

export function DashboardPage() {
	return (
		<>
			<AccessSwitch roles="ROLE_SELLER">
				<SellerDashboard />
			</AccessSwitch>
			<AccessSwitch roles="ROLE_ADMIN">
				<AdminDashboard />
			</AccessSwitch>
		</>
	);
}
