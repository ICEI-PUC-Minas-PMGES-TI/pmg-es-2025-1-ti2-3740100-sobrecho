import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: React.PropsWithChildren) {
	return (
		<NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</NextThemeProvider>
	);
}
