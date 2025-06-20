'use client';

import { ChevronsUpDown, LogOut, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '@/components/ui/sidebar';
import { useTypedSelector } from '@/hooks';

export function SidebarSellerFooter() {
	const { isMobile } = useSidebar();

	const { user } = useTypedSelector((state) => state.auth);

	if (!user || user.role !== 'ROLE_SELLER') return null;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-lg">
									{user?.name
										? (
												user.name.split(' ')[0][0] + user.name.split(' ').slice(-1)[0][0]
											).toUpperCase()
										: 'U'}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{user?.name
										? (() => {
												const parts = user.name.trim().split(' ').filter(Boolean);
												const first = parts[0] ?? '';
												const last = parts.at(-1) ?? '';
												return first + (first !== last ? ` ${last}` : '');
											})()
										: ''}
								</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="size-8 rounded-lg">
									<AvatarFallback className="rounded-lg">
										{user?.name
											? (
													user.name.split(' ')[0][0] +
													user.name.split(' ').slice(-1)[0][0]
												).toUpperCase()
											: 'U'}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user?.name
											? (() => {
													const parts = user.name.trim().split(' ').filter(Boolean);
													const first = parts[0] ?? '';
													const last = parts.at(-1) ?? '';
													return first + (first !== last ? ` ${last}` : '');
												})()
											: ''}
									</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link href="/dashboard/settings" className="flex items-center">
									<SettingsIcon className="mr-2 size-4" />
									<span>Configurações</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/sign-out" className="flex items-center">
								<LogOut className="mr-2 size-4 text-red-500" />
								<span className="text-red-500">Sair</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
