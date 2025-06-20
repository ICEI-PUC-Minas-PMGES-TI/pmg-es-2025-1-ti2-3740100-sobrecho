'use client';

import { Check, X } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { mask, unmask } from 'remask';

import { Input, FormField, FormItem, FormLabel, FormControl } from '@/components/ui';
import { cn } from '@/lib/utils';

export function UserStep() {
	const { control } = useFormContext();
	const passwordValue = useWatch({ name: 'password' });

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
		{ label: 'Pelo menos um número', test: (password: string) => /[0-9]/.test(password) },
		{
			label: 'Pelo menos um caractere especial',
			test: (password: string) => /[^a-zA-Z0-9]/.test(password)
		}
	];

	return (
		<>
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nome</FormLabel>
						<FormControl>
							<Input type="text" placeholder="João Silva Santos" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>E-mail</FormLabel>
						<FormControl>
							<Input type="email" placeholder="joao@email.com" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<FormField
					control={control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefone</FormLabel>
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
					control={control}
					name="birthdate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data de nascimento</FormLabel>
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
				control={control}
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
									const isValid = rule.test(passwordValue ?? '');
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
		</>
	);
}
