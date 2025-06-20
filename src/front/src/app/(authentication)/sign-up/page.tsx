'use client';

import { useSearchParams } from 'next/navigation';

import { SignUpForm, SignUpSellerForm } from '@/components/authentication/forms';

export default function Page() {
	const params = useSearchParams();
	const as = params.get('as');

	if (as === 'seller') return <SignUpSellerForm />;

	return <SignUpForm />;
}
