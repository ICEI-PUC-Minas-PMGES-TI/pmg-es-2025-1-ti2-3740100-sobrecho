'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { NavAdmin } from '@/components/common/sidebar/admin';
import { NavSeller } from '@/components/common/sidebar/seller';
import { NavUser } from '@/components/common/sidebar/user';
import {
	Badge,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui';

import { useTypedSelector } from '@/hooks';
import { BadgeCheckIcon, ShieldIcon, Store } from 'lucide-react';

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useTypedSelector((state) => state.auth);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						{user.role === 'seller' && (
							<SidebarMenuButton size="lg" asChild>
								<Link href="/dashboard">
									<div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-muted">
										{user.store?.image ? (
											<Image
												src={user.store?.image}
												alt={user.store?.name}
												width={32}
												height={32}
												className="size-8 rounded-lg object-cover"
											/>
										) : (
											<Store className="size-4" />
										)}
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="flex w-fit items-center justify-center gap-1 truncate font-semibold">
											{user.store?.name}
											<Tooltip>
												<TooltipTrigger asChild>
													<Badge variant="default" className="p-[1.75px]">
														<BadgeCheckIcon className="size-3" strokeWidth={2.5} />
													</Badge>
												</TooltipTrigger>
												<TooltipContent>Loja verificada</TooltipContent>
											</Tooltip>
										</span>
									</div>
								</Link>
							</SidebarMenuButton>
						)}
						{user.role === 'admin' && (
							<SidebarMenuButton size="lg" asChild>
								<Link href="/dashboard">
									<div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-muted">
										<ShieldIcon className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="flex w-fit items-center justify-center gap-1 truncate font-semibold">
											Administrador
										</span>
									</div>
								</Link>
							</SidebarMenuButton>
						)}
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{user.role === 'admin' && <NavAdmin />}
				{user.role === 'seller' && <NavSeller />}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
