import { Footer, Header } from '@/components/common';
import { AccessGuard } from '@/guards';

export default function UserLayout({ children }: React.PropsWithChildren) {
	return (
		<AccessGuard roles="ROLE_USER">
			<Header />
			{children}
			<Footer />
		</AccessGuard>
	);
}
