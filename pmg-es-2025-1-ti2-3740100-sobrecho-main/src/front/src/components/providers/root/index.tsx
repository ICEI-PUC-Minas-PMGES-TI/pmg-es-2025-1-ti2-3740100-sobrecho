import { ReduxProvider, ThemeProvider, ToasterProvider } from '@/components/providers';

interface IRootProviderProps {
	children: React.ReactNode;
}

export function RootProvider({ children }: IRootProviderProps) {
	return (
		<>
			<ReduxProvider>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<ToasterProvider>{children}</ToasterProvider>
				</ThemeProvider>
			</ReduxProvider>
		</>
	);
}
