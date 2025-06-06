'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

import { resetPasswordFormSchema } from '@/schemas/auth/forms';
import { ResetPasswordFormType } from '@/types/auth/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon, Loader2Icon } from 'lucide-react';

export function ResetPasswordForm() {
	const form = useForm<ResetPasswordFormType>({
		resolver: zodResolver(resetPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			password: '',
			passwordConfirm: ''
		}
	});

	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token');

	const [loading, setLoading] = useState(false);

	function onSubmit({ password }: ResetPasswordFormType) {
		setLoading(true);

		const payload = {
			password,
			token
		};

		console.log('Form submitted:', payload);
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar senha</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? <Loader2Icon className="animate-spin" /> : 'Alterar senha'}
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
