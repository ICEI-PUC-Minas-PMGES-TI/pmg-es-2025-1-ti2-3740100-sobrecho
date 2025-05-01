import { Toaster } from '@/components/ui/sonner';

interface IToasterProviderProps {
	children: React.ReactNode;
}

export function ToasterProvider({ children }: IToasterProviderProps) {
	return (
		<>
			{children}
			<Toaster position="top-center" />
		</>
	);
}
