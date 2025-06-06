'use client';
import { useFormContext } from 'react-hook-form';

import { Input, FormField, FormItem, FormLabel, FormControl } from '@/components/ui';

import { mask, unmask } from 'remask';

export function UserStep() {
	const { control } = useFormContext();

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
						<FormLabel>Senha</FormLabel>
						<FormControl>
							<Input type="password" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	);
}
