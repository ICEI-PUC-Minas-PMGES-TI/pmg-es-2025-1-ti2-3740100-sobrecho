import { Footer, Header } from '@/components/common';

interface IPublicLayoutProps {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: IPublicLayoutProps) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
