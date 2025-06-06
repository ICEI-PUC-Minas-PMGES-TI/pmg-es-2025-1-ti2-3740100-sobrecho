import { DashboardSidebar } from '@/components/common/sidebar';
import { RBACProvider } from '@/components/providers';
import { SidebarProvider } from '@/components/ui';

interface IDashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
	return (
		<RBACProvider allowedRoles={['admin', 'seller']}>
			<SidebarProvider>
				<DashboardSidebar />
				{children}
			</SidebarProvider>
		</RBACProvider>
	);
}
