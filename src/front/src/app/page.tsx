import { Footer, Header } from '@/components/common';
import { HomePage } from '@/components/home';
import { LandingPage } from '@/components/landing';
import { AccessGuard, AccessSwitch } from '@/guards';

export default function Page() {
	return (
		<AccessGuard roles={['ROLE_GUEST', 'ROLE_USER']}>
			<Header />
			<AccessSwitch roles="ROLE_GUEST">
				<LandingPage />
			</AccessSwitch>
			<AccessSwitch roles="ROLE_USER">
				<HomePage />
			</AccessSwitch>
			<Footer />
		</AccessGuard>
	);
}
