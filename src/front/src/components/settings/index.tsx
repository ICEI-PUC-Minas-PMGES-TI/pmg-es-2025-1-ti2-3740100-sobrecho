'use client';
import { User, Globe, Moon, Sun, ShieldIcon, StoreIcon, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
	Avatar,
	AvatarFallback,
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Label,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { cn } from '@/lib/utils';

export function SettingsPage() {
	const { theme, setTheme } = useTheme();

	const { user } = useTypedSelector((state) => state.auth);

	return (
		<div className="min-h-screen p-4 md:p-8">
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
					<p className="text-muted-foreground">
						Gerencie suas configurações de conta e preferências do aplicativo.
					</p>
				</div>

				<Tabs defaultValue="account" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="account" className="flex items-center gap-2">
							<User className="h-4 w-4" />
							Conta
						</TabsTrigger>
						<TabsTrigger value="preferences" className="flex items-center gap-2">
							<Globe className="h-4 w-4" />
							Preferências
						</TabsTrigger>
					</TabsList>

					<TabsContent value="account" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Informações da Conta</CardTitle>
								<CardDescription>
									Suas informações pessoais e detalhes da conta.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center space-x-4">
									<Avatar className="h-20 w-20">
										<AvatarFallback className="text-lg">
											{user?.name
												? (
														user.name.split(' ')[0][0] +
														user.name.split(' ').slice(-1)[0][0]
													).toUpperCase()
												: 'U'}
										</AvatarFallback>
									</Avatar>
									<div className="space-y-1">
										<h3 className="text-lg font-medium">{user?.name}</h3>
										<p className="text-muted-foreground text-sm">{user?.email}</p>
										<Badge
											className={cn(
												'bg-primary text-white',
												user?.role === 'ROLE_ADMIN'
													? 'bg-amber-500 dark:bg-amber-600'
													: user?.role === 'ROLE_SELLER'
														? 'bg-green-500 dark:bg-green-600'
														: ''
											)}
										>
											{user?.role === 'ROLE_ADMIN' ? (
												<>
													<ShieldIcon strokeWidth={3} />
													Administrador
												</>
											) : user?.role === 'ROLE_SELLER' ? (
												<>
													<StoreIcon strokeWidth={3} />
													Vendedor
												</>
											) : (
												<>
													<UserIcon strokeWidth={3} />
													Usuário
												</>
											)}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="preferences" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Preferências</CardTitle>
								<CardDescription>
									Personalize sua experiência no aplicativo.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label className="text-base">Tema</Label>
										<p className="text-muted-foreground text-sm">
											Escolha entre tema claro ou escuro
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Sun className="h-4 w-4" />
										<Switch
											checked={theme === 'dark'}
											onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
										/>
										<Moon className="h-4 w-4" />
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
