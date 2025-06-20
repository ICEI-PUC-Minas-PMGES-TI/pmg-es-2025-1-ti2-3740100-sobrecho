'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getDashboardPageInfo } from '@/config/dashboard/pages';

export function DashboardHeader() {
	const pathname = usePathname();
	const pageInfo = getDashboardPageInfo(pathname);

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setScrolled(scrollTop > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className={`bg-background sticky top-0 z-40 border-b transition-all duration-200 ease-out ${
				scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm' : 'shadow-none'
			}`}
			style={{
				background: scrolled ? 'rgba(var(--background), 0.95)' : 'hsl(var(--background))'
			}}
		>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							{pageInfo.breadcrumbs.map((item, index) => (
								<div key={index} className="flex items-center gap-2">
									{index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
									<BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
										{item.href && index < pageInfo.breadcrumbs.length - 1 ? (
											<BreadcrumbLink asChild>
												<Link href={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										) : (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										)}
									</BreadcrumbItem>
								</div>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>

			<div className="px-4 pb-4">
				<h1 className="text-3xl font-bold tracking-tight">{pageInfo.title}</h1>
			</div>
		</div>
	);
}
