interface IAuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
	return (
		<>
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				{children}
			</div>
		</>
	);
}