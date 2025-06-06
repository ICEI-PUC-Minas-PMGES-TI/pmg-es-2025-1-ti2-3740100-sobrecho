import { RBACProvider } from '@/components/providers';

interface IUserLayoutProps {
	children: React.ReactNode;
}

export default function UserLayout({ children }: IUserLayoutProps) {
	return <RBACProvider allowedRoles={['user']}>{children}</RBACProvider>;
}
