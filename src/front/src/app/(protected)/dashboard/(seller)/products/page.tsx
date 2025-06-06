'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import { IProduct } from '@/redux/types';
import { Edit, Loader2Icon, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [productToDelete, setProductToDelete] = useState<IProduct>({} as IProduct);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const {
		listProducts: { data: products },
		deleteProduct: { loading: deleting }
	} = useTypedSelector((state) => state.products);
	const { user } = useTypedSelector((state) => state.auth);

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesSearch;
	});

	const dispatch = useDispatch();

	const handleDeleteClick = (product: IProduct) => {
		setProductToDelete(product);
		setIsDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (productToDelete) {
			if (user.role !== 'seller') return;
			dispatch(ProductsCreators.productDeleteRequest({ id: productToDelete.id }));
			setProductToDelete({} as IProduct);
			dispatch(ProductsCreators.productListRequest({ storeId: user.store.id }));
			if (deleting === false) {
				setIsDeleteDialogOpen(false);
			}
		}
	};

	const handleDeleteCancel = () => {
		setIsDeleteDialogOpen(false);
		setProductToDelete({} as IProduct);
	};

	useEffect(() => {
		if (!user) return;
		if (user.role !== 'seller') return;

		const { id: storeId } = user.store;

		dispatch(ProductsCreators.productListRequest({ storeId }));
	}, [dispatch, user]);

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Meus Produtos</h2>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{products.length}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">15</div>
						<p className="text-xs text-muted-foreground">Este mês</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex w-full items-center justify-between">
						Lista de Produtos
						<Button asChild>
							<Link href="/dashboard/products/new">
								<Plus className="mr-2 h-4 w-4" />
								Adicionar Produto
							</Link>
						</Button>
					</CardTitle>
					<CardDescription>
						Gerencie todos os seus produtos em um só lugar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-6 flex items-center gap-4">
						<div className="relative max-w-sm flex-1">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Buscar produtos..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead>Categoria</TableHead>
								<TableHead>Preço</TableHead>
								<TableHead className="text-right">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProducts.map((product) => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-3">
											<Image
												src={product.images[0] || '/placeholder.svg'}
												alt={product.name}
												width={60}
												height={60}
												className="rounded-md object-cover"
											/>
											<div>
												<div className="font-medium">{product.name}</div>
												<div className="text-sm text-muted-foreground">
													Criado em{' '}
													{new Date(product.createdAt).toLocaleDateString('pt-BR')}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell className="font-medium">{product.price}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Abrir menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuItem asChild>
													<Link href={`/dashboard/products/${product.id}/edit`}>
														<Edit className="mr-2 h-4 w-4" />
														Editar
													</Link>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													className="text-red-600 focus:text-red-600"
													onClick={() => handleDeleteClick(product)}
												>
													{deleting ? (
														<>
															<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
															Excluindo...
														</>
													) : (
														<>
															<Trash2 className="mr-2 h-4 w-4" />
															Excluir
														</>
													)}
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Modal de Confirmação de Exclusão */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
						<AlertDialogDescription>
							Tem certeza que deseja excluir o produto{' '}
							<span className="font-semibold">&quot;{productToDelete?.name}&quot;</span>?
							<br />
							<br />
							Esta ação não pode ser desfeita. O produto será removido permanentemente do
							seu catálogo.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={handleDeleteCancel}>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Excluir Produto
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
