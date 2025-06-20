import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import { AccessGuard } from '@/guards';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<AccessGuard roles={['ROLE_ADMIN', 'ROLE_SELLER']}>
			<SidebarProvider>
				<DashboardSidebar />
				<SidebarInset>
					<DashboardHeader />
					{children}
				</SidebarInset>
			</SidebarProvider>
		</AccessGuard>
	);
}
