import { LucideIcon } from 'lucide-react';

export type HeaderItem = {
	label: string;
	href: string;
	icon?: LucideIcon;
	className?: string;
};

export type HeaderItems = {
	navigation: {
		guest: HeaderItem[];
		logged: HeaderItem[];
	};
	auth: {
		guest: HeaderItem[];
		logged: HeaderItem[];
	};
};
