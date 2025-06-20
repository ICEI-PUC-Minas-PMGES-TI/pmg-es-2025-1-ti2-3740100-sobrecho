'use client';

import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, PropsWithChildren } from 'react';

import { useTypedSelector } from '@/hooks';

// Types
type SignedRoles = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_SELLER';
type GuestRole = 'ROLE_GUEST';
type Roles = SignedRoles | GuestRole;

interface AccessGuardProps extends PropsWithChildren {
	roles?: Roles | Roles[];
	fallback?: string;
}

interface AccessSwitchProps extends PropsWithChildren {
	roles: Roles | Roles[];
}

export function AccessGuard({ children, roles, fallback = '/' }: AccessGuardProps) {
	const router = useRouter();
	const { signed, user } = useTypedSelector((state) => state.auth);
	const [checkingAccess, setCheckingAccess] = useState(true);

	useEffect(() => {
		const userRole: Roles = signed ? (user?.role as SignedRoles) : 'ROLE_GUEST';
		const allowedRoles = roles ? (Array.isArray(roles) ? roles : [roles]) : undefined;

		const dynamicFallback =
			fallback === '/' && ['ROLE_ADMIN', 'ROLE_SELLER'].includes(userRole)
				? '/dashboard'
				: fallback;

		if (allowedRoles && !allowedRoles.includes(userRole)) {
			router.replace(dynamicFallback);
			return;
		}

		setCheckingAccess(false);
	}, [signed, user?.role, roles, fallback, router]);

	if (checkingAccess) {
		return (
			<div className="z-50 flex min-h-[100dvh] w-full items-center justify-center">
				<Loader2Icon className="size-10 animate-spin" />
			</div>
		);
	}

	return <>{children}</>;
}

export function AccessSwitch({ roles, children }: AccessSwitchProps) {
	const { signed, user } = useTypedSelector((state) => state.auth);
	const userRole: Roles = signed ? (user?.role as SignedRoles) : 'ROLE_GUEST';
	const allowedRoles = Array.isArray(roles) ? roles : [roles];

	if (!allowedRoles.includes(userRole)) return null;

	return <>{children}</>;
}
