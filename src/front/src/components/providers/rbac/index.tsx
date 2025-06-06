'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTypedSelector } from '@/hooks';
import { UserRoleType } from '@/types/auth/roles';

type RoleOrGuest = UserRoleType | 'guest';

interface IRBACProviderProps {
	children: React.ReactNode;
	allowedRoles?: RoleOrGuest[];
	fallback?: string;
}

export function RBACProvider({
	children,
	allowedRoles,
	fallback = '/'
}: IRBACProviderProps) {
	const router = useRouter();
	const { signed, user } = useTypedSelector((state) => state.auth);
	const [checkingAccess, setCheckingAccess] = useState(true);

	useEffect(() => {
		const userRole: RoleOrGuest = signed ? (user?.role as UserRoleType) : 'guest';

		// Fallback dinâmico
		const dynamicFallback =
			fallback === '/' && ['admin', 'seller'].includes(userRole)
				? '/dashboard'
				: fallback;

		// Verifica se o papel atual está permitido
		if (allowedRoles && !allowedRoles.includes(userRole)) {
			router.replace(dynamicFallback);
			return;
		}

		setCheckingAccess(false);
	}, [signed, user?.role, allowedRoles, fallback, router]);

	if (checkingAccess) return null;

	return <>{children}</>;
}
