'use client';

import { useEffect, useState, ReactNode } from 'react';

interface IClientOnlyProviderProps {
	children: ReactNode;
}

export function ClientOnlyProvider({ children }: IClientOnlyProviderProps) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;

	return <>{children}</>;
}
