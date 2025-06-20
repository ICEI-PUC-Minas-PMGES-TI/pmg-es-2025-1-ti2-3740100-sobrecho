import { AccessGuard } from '@/guards';

export default function SellerLayout({ children }: React.PropsWithChildren) {
	return <AccessGuard roles="ROLE_SELLER">{children}</AccessGuard>;
}
