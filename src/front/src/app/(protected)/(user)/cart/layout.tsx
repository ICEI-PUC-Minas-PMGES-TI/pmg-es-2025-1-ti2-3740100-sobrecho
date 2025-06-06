import { Footer, Header } from '@/components/common';

interface ICartLayout {
	children: React.ReactNode;
}

export default function CartLayout({ children }: ICartLayout) {
	return (
		<>
			<Header />
			{children}
			<Footer onlyCopyright />
		</>
	);
}
