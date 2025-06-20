'use client';

import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useState, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

interface IFilterSidebarProps {
	categories: string[];
	sizes: string[];
	onCategoryChange: (categories: string[]) => void;
	onSizeChange: (sizes: string[]) => void;
	onPriceRangeChange: (range: [number, number]) => void;
	onSortChange: (sort: string) => void;
	selectedCategories: string[];
	selectedSizes: string[];
	priceRange: [number, number];
	sortBy: string;
	minPrice: number;
	maxPrice: number;
	clearFilters: () => void;
}

export function ProductFilterSidebar({
	categories = [],
	sizes = [],
	onCategoryChange,
	onSizeChange,
	onPriceRangeChange,
	onSortChange,
	selectedCategories = [],
	selectedSizes = [],
	priceRange = [0, 500],
	sortBy = 'name',
	minPrice = 0,
	maxPrice = 500,
	clearFilters
}: IFilterSidebarProps) {
	const [showCategories, setShowCategories] = useState(true);
	const [showSizes, setShowSizes] = useState(true);
	const [showPrice, setShowPrice] = useState(true);
	const [showSort, setShowSort] = useState(true);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const handleCategoryToggle = useCallback(
		(category: string) => {
			if (!selectedCategories || !onCategoryChange) return;

			const updatedCategories = selectedCategories.includes(category)
				? selectedCategories.filter((c) => c !== category)
				: [...selectedCategories, category];
			onCategoryChange(updatedCategories);
		},
		[selectedCategories, onCategoryChange]
	);

	const handleSizeToggle = useCallback(
		(size: string) => {
			if (!selectedSizes || !onSizeChange) return;

			const updatedSizes = selectedSizes.includes(size)
				? selectedSizes.filter((s) => s !== size)
				: [...selectedSizes, size];
			onSizeChange(updatedSizes);
		},
		[selectedSizes, onSizeChange]
	);

	// Função otimizada para o slider com debounce implícito
	const handlePriceChange = useCallback(
		(value: number[]) => {
			if (onPriceRangeChange && value.length === 2) {
				onPriceRangeChange([value[0], value[1]]);
			}
		},
		[onPriceRangeChange]
	);

	const activeFiltersCount =
		(selectedCategories?.length || 0) +
		(selectedSizes?.length || 0) +
		(priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0);

	const getSortLabel = (value: string) => {
		switch (value) {
			case 'name':
				return 'Nome A-Z';
			case 'price-asc':
				return 'Menor preço';
			case 'price-desc':
				return 'Maior preço';
			default:
				return 'Nome A-Z';
		}
	};

	// Componente de filtros reutilizável
	const FilterContent = () => (
		<div className="space-y-4">
			{/* Categorias */}
			<Card className="gap-2">
				<CardHeader>
					<CardTitle
						className="flex cursor-pointer items-center justify-between text-sm"
						onClick={() => setShowCategories(!showCategories)}
					>
						<span>
							Categorias
							{selectedCategories && selectedCategories.length > 0 && (
								<span className="text-primary ml-1 text-xs">
									({selectedCategories.length})
								</span>
							)}
						</span>
						{showCategories ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</CardTitle>
				</CardHeader>
				{showCategories && (
					<CardContent className="pt-0">
						{!categories || categories.length === 0 ? (
							<p className="text-muted-foreground text-sm">
								Nenhuma categoria disponível
							</p>
						) : (
							<div className="max-h-48 space-y-2 overflow-y-auto">
								{categories.map((category) => (
									<div key={category} className="flex items-center space-x-2">
										<Checkbox
											id={`category-${category}`}
											checked={selectedCategories?.includes(category) || false}
											onCheckedChange={() => handleCategoryToggle(category)}
										/>
										<Label
											htmlFor={`category-${category}`}
											className="cursor-pointer text-sm"
										>
											{category}
										</Label>
									</div>
								))}
							</div>
						)}
					</CardContent>
				)}
			</Card>

			{/* Tamanhos */}
			<Card className="gap-2">
				<CardHeader className="pb-2">
					<CardTitle
						className="flex cursor-pointer items-center justify-between text-sm"
						onClick={() => setShowSizes(!showSizes)}
					>
						<span>
							Tamanhos
							{selectedSizes && selectedSizes.length > 0 && (
								<span className="text-primary ml-1 text-xs">
									({selectedSizes.length})
								</span>
							)}
						</span>
						{showSizes ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</CardTitle>
				</CardHeader>
				{showSizes && (
					<CardContent className="pt-0">
						{!sizes || sizes.length === 0 ? (
							<p className="text-muted-foreground text-sm">Nenhum tamanho disponível</p>
						) : (
							<div className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto">
								{sizes.map((size) => (
									<div key={size} className="flex items-center space-x-1">
										<Checkbox
											id={`size-${size}`}
											checked={selectedSizes?.includes(size) || false}
											onCheckedChange={() => handleSizeToggle(size)}
										/>
										<Label htmlFor={`size-${size}`} className="cursor-pointer text-xs">
											{size}
										</Label>
									</div>
								))}
							</div>
						)}
					</CardContent>
				)}
			</Card>

			{/* Preço */}
			<Card className="gap-2">
				<CardHeader>
					<CardTitle
						className="flex cursor-pointer items-center justify-between text-sm"
						onClick={() => setShowPrice(!showPrice)}
					>
						<span>
							Preço
							{(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
								<span className="text-primary ml-1 text-xs">(filtrado)</span>
							)}
						</span>
						{showPrice ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</CardTitle>
				</CardHeader>
				{showPrice && (
					<CardContent className="pt-0">
						<div className="space-y-4">
							{/* Container com padding para evitar conflitos de clique */}
							<div className="px-2 py-4">
								<Slider
									value={priceRange}
									onValueChange={handlePriceChange}
									max={maxPrice}
									min={minPrice}
									step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
									className="w-full touch-none"
								/>
							</div>
							<div className="text-muted-foreground flex justify-between text-xs">
								<span>R$ {priceRange[0]?.toFixed(0) || '0'}</span>
								<span>R$ {priceRange[1]?.toFixed(0) || '500'}</span>
							</div>
							<div className="text-muted-foreground mt-1 text-center text-xs">
								Faixa: R$ {minPrice.toFixed(0)} - R$ {maxPrice.toFixed(0)}
							</div>
						</div>
					</CardContent>
				)}
			</Card>

			{/* Ordenação */}
			<Card className="gap-2">
				<CardHeader>
					<CardTitle
						className="flex cursor-pointer items-center justify-between text-sm"
						onClick={() => setShowSort(!showSort)}
					>
						Ordenar por
						{showSort ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</CardTitle>
				</CardHeader>
				{showSort && (
					<CardContent>
						<RadioGroup value={sortBy} onValueChange={onSortChange}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="name" id="name" />
								<Label htmlFor="name" className="cursor-pointer text-sm">
									Nome A-Z
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="price-asc" id="price-asc" />
								<Label htmlFor="price-asc" className="cursor-pointer text-sm">
									Menor preço
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="price-desc" id="price-desc" />
								<Label htmlFor="price-desc" className="cursor-pointer text-sm">
									Maior preço
								</Label>
							</div>
						</RadioGroup>
					</CardContent>
				)}
			</Card>
		</div>
	);

	return (
		<>
			{/* Mobile: Header horizontal com filtros */}
			<div className="block md:hidden">
				<div className="mb-4 flex flex-wrap items-center gap-2 p-2">
					{/* Botão de filtros */}
					<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
						<SheetTrigger asChild>
							<Button variant="outline" size="sm" className="relative">
								<Filter className="mr-2 h-4 w-4" />
								Filtros
								{activeFiltersCount > 0 && (
									<Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
										{activeFiltersCount}
									</Badge>
								)}
							</Button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="w-80 overflow-y-auto px-4"
							onPointerDownOutside={(e) => {
								// Previne o fechamento quando interagindo com o slider
								const target = e.target as Element;
								if (target.closest('[data-radix-slider-root]')) {
									e.preventDefault();
								}
							}}
						>
							<SheetHeader className="mt-5">
								<SheetTitle className="flex items-center justify-between">
									Filtros
									<Button
										variant="ghost"
										size="sm"
										onClick={clearFilters}
										disabled={activeFiltersCount === 0}
									>
										Limpar
									</Button>
								</SheetTitle>
							</SheetHeader>
							<div className="mt-4">
								<FilterContent />
							</div>
						</SheetContent>
					</Sheet>

					{/* Badges dos filtros ativos */}
					<div className="flex flex-wrap gap-1">
						{/* Ordenação ativa */}
						{sortBy !== 'name' && (
							<Badge variant="secondary" className="text-xs">
								{getSortLabel(sortBy)}
								<Button
									variant="ghost"
									size="sm"
									className="ml-1 h-auto p-0"
									onClick={() => onSortChange('name')}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						)}

						{/* Categorias ativas */}
						{selectedCategories.map((category) => (
							<Badge key={category} variant="secondary" className="text-xs">
								{category}
								<Button
									variant="ghost"
									size="sm"
									className="ml-1 h-auto p-0"
									onClick={() => handleCategoryToggle(category)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}

						{/* Tamanhos ativos */}
						{selectedSizes.map((size) => (
							<Badge key={size} variant="secondary" className="text-xs">
								{size}
								<Button
									variant="ghost"
									size="sm"
									className="ml-1 h-auto p-0"
									onClick={() => handleSizeToggle(size)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}

						{/* Preço ativo */}
						{(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
							<Badge variant="secondary" className="text-xs">
								R$ {priceRange[0]} - R$ {priceRange[1]}
								<Button
									variant="ghost"
									size="sm"
									className="ml-1 h-auto p-0"
									onClick={() => onPriceRangeChange([minPrice, maxPrice])}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						)}
					</div>
				</div>
			</div>

			{/* Desktop: Sidebar tradicional */}
			<div className="hidden md:block">
				<div className="sticky top-[calc(4rem+1px)] h-[calc(100vh-4rem-1px)] w-64 overflow-y-auto pr-4 pb-8">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">
							Filtros
							{activeFiltersCount > 0 && (
								<span className="bg-primary text-primary-foreground ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs">
									{activeFiltersCount}
								</span>
							)}
						</h2>
						<Button
							variant="ghost"
							size="sm"
							onClick={clearFilters}
							disabled={activeFiltersCount === 0}
						>
							Limpar
						</Button>
					</div>

					<div className="mt-4">
						<FilterContent />
					</div>
				</div>
			</div>
		</>
	);
}
