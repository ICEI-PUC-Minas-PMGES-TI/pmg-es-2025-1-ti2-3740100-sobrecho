'use client';

import {
	ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState
} from '@tanstack/react-table';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	LayoutDashboardIcon,
	Loader2Icon,
	MoreHorizontalIcon
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui';
import { AVAILABLE_CATEGORIES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';

const getCategoryColor = (category: string) => {
	const categoryColors: Record<string, string> = {
		'roupas-femininas': 'bg-pink-300 text-pink-950 border-pink-400',
		'roupas-masculinas': 'bg-blue-300 text-blue-950 border-blue-400',
		acessorios: 'bg-purple-300 text-purple-950 border-purple-400',
		calcados: 'bg-orange-300 text-orange-950 border-orange-400',
		bolsas: 'bg-emerald-300 text-emerald-950 border-emerald-400',
		joias: 'bg-rose-300 text-rose-950 border-rose-400',
		decoracao: 'bg-amber-300 text-amber-950 border-amber-400',
		livros: 'bg-indigo-300 text-indigo-950 border-indigo-400'
	};

	return categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const columnLabels: Record<string, string> = {
	name: 'Nome',
	category: 'Categoria',
	size: 'Tamanho',
	price: 'Preço',
	actions: 'Ações'
};

export const productSchema = z.object({
	id: z.string(),
	name: z.string(),
	category: z.string(),
	size: z.string(),
	price: z.number(),
	description: z.string(),
	createdAt: z.string(),
	image: z.string()
});

type Product = z.infer<typeof productSchema>;

export function ProductsTable() {
	const {
		getByStoreId: { data }
	} = useTypedSelector((state) => state.products);

	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10
	});

	const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
	const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);

	function handleDeleteClick(product: Product) {
		setProductToDelete(product);
		setDeleteDialogOpen(true);
	}

	const dispatch = useDispatch();

	function confirmDelete() {
		if (productToDelete) {
			dispatch(ProductsCreators.productsDeleteRequest({ id: productToDelete.id }));
			setDeleteDialogOpen(false);
			setProductToDelete(null);
		}
	}
	const columns: ColumnDef<Product>[] = [
		{
			id: 'name',
			accessorKey: 'name',
			header: 'Nome',
			enableHiding: false,
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<Avatar className="h-10 w-10 rounded-md">
						<AvatarImage
							src={row.original.image || '/placeholder.svg'}
							alt={row.original.name}
							className="object-cover"
						/>
						<AvatarFallback>
							<Loader2Icon className="text-muted-foreground h-4 w-4 animate-spin" />
						</AvatarFallback>
					</Avatar>

					<div className="font-medium">{row.original.name}</div>
				</div>
			)
		},
		{
			id: 'category',
			accessorKey: 'category',
			header: 'Categoria',
			enableHiding: true,
			cell: ({ row }) => {
				const category = AVAILABLE_CATEGORIES.find(
					(c) => c.value === row.original.category
				);
				return (
					<Badge variant="outline" className={getCategoryColor(row.original.category)}>
						{category?.label}
					</Badge>
				);
			}
		},
		{
			id: 'size',
			accessorKey: 'size',
			header: 'Tamanho',
			enableHiding: true,
			cell: ({ row }) => (
				<Badge variant="secondary">{row.original.size.toUpperCase()}</Badge>
			)
		},
		{
			id: 'price',
			accessorKey: 'price',
			header: 'Preço',
			enableHiding: false,
			cell: ({ row }) => (
				<div className="font-medium">
					{row.original.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					})}
				</div>
			)
		},
		{
			id: 'createdAt',
			accessorKey: 'createdAt',
			header: 'Criado em',
			enableHiding: false,
			cell: ({ row }) => (
				<div className="font-medium">
					{new Date(row.original.createdAt).toLocaleString('pt-BR', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					})}
				</div>
			)
		},
		{
			id: 'actions',
			header: 'Ações',
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0" size="icon">
							<MoreHorizontalIcon className="h-4 w-4" />
							<span className="sr-only">Abrir menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-40">
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(row.original.id);
								toast.success('ID copiado com sucesso!');
							}}
						>
							Copiar ID
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/products/edit/${row.original.id}`}>Editar</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-destructive"
							onClick={() => handleDeleteClick(row.original)}
						>
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	];

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination
		},
		getRowId: (row) => row.id,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	});

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between px-4 lg:px-6">
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<LayoutDashboardIcon className="h-4 w-4" />
								<span className="hidden lg:inline">Personalizar Colunas</span>
								<span className="lg:hidden">Colunas</span>
								<ChevronDownIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !== 'undefined' && column.getCanHide()
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{columnLabels[column.id] || column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="relative overflow-auto px-4 lg:px-6">
				<div className="overflow-hidden rounded-lg border">
					<Table>
						<TableHeader className="bg-muted">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-24 text-center">
										Nenhum produto encontrado.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="flex items-center justify-between px-4 lg:px-6">
				<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
					{table.getFilteredSelectedRowModel().rows.length} de{' '}
					{table.getFilteredRowModel().rows.length} produto(s) selecionado(s).
				</div>
				<div className="flex w-full items-center gap-8 lg:w-fit">
					<div className="hidden items-center gap-2 lg:flex">
						<Label htmlFor="rows-per-page" className="text-sm font-medium">
							Linhas por página
						</Label>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value));
							}}
						>
							<SelectTrigger size="sm" className="w-20" id="rows-per-page">
								<SelectValue placeholder={table.getState().pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex w-fit items-center justify-center text-sm font-medium">
						Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
					</div>
					<div className="ml-auto flex items-center gap-2 lg:ml-0">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Ir para primeira página</span>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Página anterior</span>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Próxima página</span>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Ir para última página</span>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
						<AlertDialogDescription>
							Tem certeza que deseja excluir o produto &quot;{productToDelete?.name}
							&quot;? Esta ação não pode ser desfeita.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
