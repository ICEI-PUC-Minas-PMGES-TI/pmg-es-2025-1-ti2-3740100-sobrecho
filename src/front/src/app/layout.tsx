import { Metadata } from 'next';

import { RootProvider } from '@/components/providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'SoBrechó'
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className="bg-background antialised min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
