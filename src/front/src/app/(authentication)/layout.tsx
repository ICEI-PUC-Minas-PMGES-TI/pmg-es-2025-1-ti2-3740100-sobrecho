'use client';

import { usePathname } from 'next/navigation';

import { Logo } from '@/components/ui';
import { AccessGuard } from '@/guards';

export default function AuthenticationLayout({ children }: React.PropsWithChildren) {
	const pathname = usePathname();

	if (pathname === '/sign-out') return children;

	return (
		<AccessGuard roles="ROLE_GUEST">
			<main className="flex min-h-[100dvh] w-full items-center justify-center p-6">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<Logo href="/" className="mx-auto" />
					{children}
				</div>
				<div className="text-muted-foreground fixed bottom-4 w-full text-center text-sm">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</main>
		</AccessGuard>
	);
}
