import { Toaster } from '@/components/ui';

interface IToasterProviderProps {
	children: React.ReactNode;
}

export function ToasterProvider({ children }: IToasterProviderProps) {
	return (
		<>
			{children}
			<Toaster richColors position="top-center" />
		</>
	);
}
