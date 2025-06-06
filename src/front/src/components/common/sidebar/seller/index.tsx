'use client';

import Link from 'next/link';

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar';

import { sidebarConfig } from '@/config/common';

export function NavSeller() {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{sidebarConfig.seller.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild tooltip={item.title}>
							<Link href={item.url}>
								<item.icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
