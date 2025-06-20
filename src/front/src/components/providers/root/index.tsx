import {
	FontProvider,
	ReduxProvider,
	ThemeProvider,
	ToasterProvider
} from '@/components/providers';

export function RootProvider({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider>
			<FontProvider>
				<ReduxProvider>
					<ToasterProvider>{children}</ToasterProvider>
				</ReduxProvider>
			</FontProvider>
		</ThemeProvider>
	);
}
