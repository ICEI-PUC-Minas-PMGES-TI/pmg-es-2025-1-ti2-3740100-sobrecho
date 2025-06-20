import { Geist, Geist_Mono } from 'next/font/google';

import { cn } from '@/lib/utils';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist'
});
const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
});

export function FontProvider({ children }: React.PropsWithChildren) {
	return (
		<div className={cn('font-sans', geist.variable, geistMono.variable)}>{children}</div>
	);
}
