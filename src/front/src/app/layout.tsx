import '@/styles/global.css';

import { RootProvider } from '@/components/providers';

import { cn } from '@/lib/utils';
import { GeistMono as FontMono } from 'geist/font/mono';
import { GeistSans as FontSans } from 'geist/font/sans';

export interface IRootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body
				className={cn('bg-background font-sans antialised', FontSans.variable, FontMono.variable)}
			>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
