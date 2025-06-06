import { RBACProvider } from '@/components/providers';

interface ISellerLayoutProps {
	children: React.ReactNode;
}

export default function SellerLayout({ children }: ISellerLayoutProps) {
	return <RBACProvider allowedRoles={['seller']}>{children}</RBACProvider>;
}
