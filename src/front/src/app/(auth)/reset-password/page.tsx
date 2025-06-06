import { notFound } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/forms';

interface IPageProps {
	searchParams: {
		token: number;
	};
}

export default async function Page({ searchParams }: IPageProps) {
	const { token } = await searchParams;

	if (token) {
		return <ResetPasswordForm />;
	}

	return notFound();
}
