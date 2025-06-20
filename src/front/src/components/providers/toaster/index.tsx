import { Toaster } from 'sonner';

export function ToasterProvider({ children }: React.PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster position="top-center" />
		</>
	);
}
