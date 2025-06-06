'use client';

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

import { ILoggedUserInfo } from '@/redux/types';
import { ChevronsUpDown, LogOutIcon, SettingsIcon } from 'lucide-react';

interface INavUserProps {
	user: ILoggedUserInfo;
}

export function NavUser({ user }: INavUserProps) {
	const { isMobile } = useSidebar();

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
								<AvatarFallback className="rounded-lg text-xs">
									{user?.name
										?.split(' ')
										.map((n) => n[0])
										.join('')
										.toUpperCase() || 'U'}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
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
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarFallback className="text-xs">
										{user?.name
											?.split(' ')
											.map((n) => n[0])
											.join('')
											.toUpperCase() || 'U'}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/dashboard/account" className="flex items-center">
								<DropdownMenuItem className="w-full hover:cursor-pointer">
									<SettingsIcon className="mr-2 size-4" />
									<span>Configurações</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator />
							<Link href="/sign-out" className="flex items-center">
								<DropdownMenuItem className="w-full hover:cursor-pointer">
									<LogOutIcon className="mr-2 size-4" />
									<span>Sair</span>
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
