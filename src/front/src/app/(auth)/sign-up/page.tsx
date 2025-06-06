import { SignUpForm } from '@/components/auth/forms';
import { SellerSignUpForm } from '@/components/auth/forms/sign-up/seller';

interface IPageProps {
	searchParams: {
		as: string;
	};
}

export default async function Page({ searchParams }: IPageProps) {
	const { as } = await searchParams;

	if (as === 'seller') {
		return <SellerSignUpForm />;
	}

	return <SignUpForm />;
}
