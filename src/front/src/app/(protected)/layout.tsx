import { RBACProvider } from '@/components/providers';

interface IProtectedLayoutProps {
	children: React.ReactNode;
}

export default function ProtectedLayout({ children }: IProtectedLayoutProps) {
	return (
		<RBACProvider allowedRoles={['admin', 'seller', 'user']}>{children}</RBACProvider>
	);
}
