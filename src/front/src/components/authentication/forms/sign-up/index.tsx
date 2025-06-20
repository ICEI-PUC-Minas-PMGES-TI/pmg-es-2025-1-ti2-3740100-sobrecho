'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2Icon, X } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { mask, unmask } from 'remask';

import { AuthenticationLayout } from '@/components/authentication/layout';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { AuthCreators } from '@/redux/reducers';
import { signUpFormSchema } from '@/schemas/authentication';
import { SignUpFormType } from '@/types/authentication/forms';

export function SignUpForm() {
	// Regras de validação da senha
	const passwordValidationRules = [
		{
			label: 'Pelo menos 8 caracteres',
			test: (password: string) => password.length >= 8
		},
		{
			label: 'Pelo menos uma letra maiúscula',
			test: (password: string) => /[A-Z]/.test(password)
		},
		{
			label: 'Pelo menos uma letra minúscula',
			test: (password: string) => /[a-z]/.test(password)
		},
		{
			label: 'Pelo menos um número',
			test: (password: string) => /[0-9]/.test(password)
		},
		{
			label: 'Pelo menos um caractere especial',
			test: (password: string) => /[^a-zA-Z0-9]/.test(password)
		}
	];

	const form = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			birthdate: '',
			phone: ''
		}
	});

	const passwordValue = form.watch('password');

	const { loading } = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();

	function onSubmit(data: SignUpFormType) {
		dispatch(AuthCreators.authSignUpRequest(data));
	}

	return (
		<>
			<AuthenticationLayout
				title="Criar conta"
				description="Digite suas informações para criar uma conta."
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Nome</FormLabel>
									<FormControl>
										<Input placeholder="João Silva Santos" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<div className="flex h-4 items-center justify-between">
										<FormLabel required>E-mail</FormLabel>
										<FormMessage />
									</div>
									<FormControl>
										<Input type="email" placeholder="exemplo@email.com" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Telefone</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="(99) 99999-9999"
												value={mask(field.value, ['(99) 99999-9999'])}
												onChange={(e) => field.onChange(unmask(e.target.value))}
												type="tel"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="birthdate"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Data de nascimento</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="DD/MM/AAAA"
												value={mask(field.value, ['99/99/9999'])}
												onChange={(e) => field.onChange(unmask(e.target.value))}
												type="tel"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Senha</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Digite sua senha" {...field} />
									</FormControl>
									<div className="mt-2 space-y-2">
										<p className="text-muted-foreground text-sm font-medium">
											Sua senha deve conter:
										</p>
										<ul className="space-y-1">
											{passwordValidationRules.map((rule, index) => {
												const isValid = rule.test(passwordValue);
												return (
													<li key={index} className="flex items-center gap-2 text-sm">
														<div
															className={cn(
																'flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-300',
																isValid
																	? 'bg-green-500/25 text-green-600'
																	: 'bg-red-500/25 text-red-600'
															)}
														>
															{isValid ? (
																<Check className="h-3 w-3" />
															) : (
																<X className="h-3 w-3" />
															)}
														</div>
														<span
															className={cn(
																'transition-colors duration-300',
																isValid ? 'text-foreground' : 'text-muted-foreground'
															)}
														>
															{rule.label}
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? <Loader2Icon className="size-4 animate-spin" /> : 'Cadastrar'}
						</Button>
					</form>
				</Form>
			</AuthenticationLayout>
			<div className="text-center text-sm">
				Já tem uma conta?{' '}
				<Link
					href="/sign-in"
					className="text-primary hover:underline hover:underline-offset-4"
				>
					Entrar
				</Link>
			</div>
		</>
	);
}

export default SignUpForm;
