import { RBACProvider } from '@/components/providers';

interface IAdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: IAdminLayoutProps) {
	return <RBACProvider allowedRoles={['admin']}>{children}</RBACProvider>;
}
