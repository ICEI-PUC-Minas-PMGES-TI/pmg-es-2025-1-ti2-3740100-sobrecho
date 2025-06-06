'use client';

import { HomePage } from '@/components/home';
import { LandingPage } from '@/components/landing';
import { RBACProvider } from '@/components/providers';

import { useTypedSelector } from '@/hooks';

export default function Page() {
	const { signed, user } = useTypedSelector((state) => state.auth);

	return (
		<RBACProvider allowedRoles={['guest', 'user']} fallback="/dashboard">
			{signed && user.role === 'user' ? <HomePage /> : <LandingPage />}
		</RBACProvider>
	);
}
