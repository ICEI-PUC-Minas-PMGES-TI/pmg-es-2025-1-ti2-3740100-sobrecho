'use client';

import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTypedSelector } from '@/hooks';

export function SidebarSellerHeader() {
	const { user } = useTypedSelector((state) => state.auth);

	if (user?.role !== 'ROLE_SELLER') return null;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" asChild>
					<Link href="/dashboard">
						<Avatar className="aspect-square size-8 rounded-lg">
							<AvatarImage src={user?.store?.image} alt="Logo da loja" />
							<AvatarFallback>
								<Loader2Icon className="size-4 animate-spin" />
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="ml-2 truncate font-medium">{user?.store?.name}</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
