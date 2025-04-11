import { ThemeProvider } from '@/components/providers';

interface IRootProviderProps {
	children: React.ReactNode;
}

export function RootProvider({ children }: IRootProviderProps) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				{children}
			</ThemeProvider>
		</>
	);
}
