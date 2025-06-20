'use client';

import {
	SidebarAdminContent,
	SidebarSellerContent
} from '@/components/dashboard/sidebar/content';
import {
	SidebarAdminFooter,
	SidebarSellerFooter
} from '@/components/dashboard/sidebar/footer';
import {
	SidebarAdminHeader,
	SidebarSellerHeader
} from '@/components/dashboard/sidebar/header';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui';
import { AccessSwitch } from '@/guards';

export function DashboardSidebar() {
	return (
		<Sidebar side="left" collapsible="icon">
			<SidebarHeader>
				<AccessSwitch roles="ROLE_SELLER">
					<SidebarSellerHeader />
				</AccessSwitch>
				<AccessSwitch roles="ROLE_ADMIN">
					<SidebarAdminHeader />
				</AccessSwitch>
			</SidebarHeader>
			<SidebarContent>
				<AccessSwitch roles="ROLE_SELLER">
					<SidebarSellerContent />
				</AccessSwitch>
				<AccessSwitch roles="ROLE_ADMIN">
					<SidebarAdminContent />
				</AccessSwitch>
			</SidebarContent>
			<SidebarFooter>
				<AccessSwitch roles="ROLE_SELLER">
					<SidebarSellerFooter />
				</AccessSwitch>
				<AccessSwitch roles="ROLE_ADMIN">
					<SidebarAdminFooter />
				</AccessSwitch>
			</SidebarFooter>
		</Sidebar>
	);
}
