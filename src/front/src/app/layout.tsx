import '@/styles/global.css';

import { RootProvider } from '@/components/providers';

import { cn } from '@/lib/utils';
import { GeistMono as Mono } from 'geist/font/mono';
import { GeistSans as Sans } from 'geist/font/sans';

interface IRootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					Sans.variable,
					Mono.variable
				)}
			>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
