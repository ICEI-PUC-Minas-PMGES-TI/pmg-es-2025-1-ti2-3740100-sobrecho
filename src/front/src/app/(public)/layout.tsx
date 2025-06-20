import React from 'react';

import { Footer, Header } from '@/components/common';
import { AccessGuard } from '@/guards';

export default function PublicLayout({ children }: React.PropsWithChildren) {
	return (
		<AccessGuard roles="ROLE_GUEST">
			<Header />
			{children}
			<Footer />
		</AccessGuard>
	);
}
