import { ReduxProvider, ThemeProvider, ToasterProvider } from '@/components/providers';

interface IRootProviderProps {
	children: React.ReactNode;
}

export function RootProvider({ children }: IRootProviderProps) {
	return (
		<>
			<ReduxProvider>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					<ToasterProvider>{children}</ToasterProvider>
				</ThemeProvider>
			</ReduxProvider>
		</>
	);
}
