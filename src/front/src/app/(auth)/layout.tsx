'use client';

import { usePathname } from 'next/navigation';

import { RBACProvider } from '@/components/providers';
import { Logo } from '@/components/ui';

interface IAuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
	const pathname = usePathname();

	if (pathname === '/sign-out') {
		return children;
	}

	return (
		<RBACProvider allowedRoles={['guest']}>
			<main className="flex min-h-dvh w-full items-center justify-center p-6">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<Logo href="/" className="mx-auto" />
					{children}
				</div>
				<div className="fixed bottom-4 w-full text-center text-sm text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</main>
		</RBACProvider>
	);
}
