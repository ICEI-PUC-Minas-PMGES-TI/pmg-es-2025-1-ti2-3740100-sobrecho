import { AccessGuard } from '@/guards';

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
	return (
		<AccessGuard roles={['ROLE_ADMIN', 'ROLE_SELLER', 'ROLE_USER']}>
			{children}
		</AccessGuard>
	);
}
