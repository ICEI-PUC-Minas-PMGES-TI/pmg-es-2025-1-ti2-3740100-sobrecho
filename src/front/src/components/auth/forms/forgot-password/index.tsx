'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/components/auth/layout';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/components/ui';

import { forgotPasswordFormSchema } from '@/schemas/auth/forms';
import { ForgotPasswordFormType } from '@/types/auth/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';

export function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordFormType>({
		resolver: zodResolver(forgotPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: ''
		}
	});

	const router = useRouter();

	const [loading, setLoading] = useState(false);

	function onSubmit(data: ForgotPasswordFormType) {
		setLoading(true);
		console.log('Form submitted:', data);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}

	return (
		<>
			<AuthLayout
				title="Esquerceu sua senha?"
				description="Digite seu e-mail para recuperar sua senha."
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="exemplo@email.com" type="email" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? <Loader2Icon className="animate-spin" /> : 'Enviar'}
						</Button>
					</form>
				</Form>
			</AuthLayout>
			<div className="text-center text-sm">
				<Link
					href=""
					onClick={() => router.back()}
					className="group flex items-center justify-center gap-2 text-muted-foreground hover:underline hover:underline-offset-4"
				>
					<ChevronLeftIcon className="size-4 text-primary transition-transform duration-200 group-hover:-translate-x-1" />
					Voltar
				</Link>
			</div>
		</>
	);
}
