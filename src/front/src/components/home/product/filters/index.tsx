'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface IFilterSidebarProps {
	categories: string[];
	onCategoryChange: (categories: string[]) => void;
	onPriceRangeChange: (range: [number, number]) => void;
	onSortChange: (sort: string) => void;
	selectedCategories: string[];
	priceRange: [number, number];
	sortBy: string;
	minPrice: number;
	maxPrice: number;
	clearFilters: () => void;
}

export function ProductFilterSidebar({
	categories,
	onCategoryChange,
	onPriceRangeChange,
	onSortChange,
	selectedCategories,
	priceRange,
	sortBy,
	minPrice,
	maxPrice,
	clearFilters
}: IFilterSidebarProps) {
	const [showCategories, setShowCategories] = useState(true);
	const [showPrice, setShowPrice] = useState(true);
	const [showSort, setShowSort] = useState(true);

	const handleCategoryToggle = (category: string) => {
		const updatedCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];
		onCategoryChange(updatedCategories);
	};

	return (
		<div className="sticky top-[calc(4rem+1px)] h-[calc(100vh-4rem-1px)] w-64 overflow-y-auto pb-8 pr-4">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Filtros</h2>
				<Button variant="ghost" size="sm" onClick={clearFilters}>
					Limpar
				</Button>
			</div>

			<div className="mt-4 space-y-4">
				{/* Categorias */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle
							className="flex cursor-pointer items-center justify-between text-sm"
							onClick={() => setShowCategories(!showCategories)}
						>
							Categorias ({categories.length})
							{showCategories ? (
								<ChevronUp className="h-4 w-4" />
							) : (
								<ChevronDown className="h-4 w-4" />
							)}
						</CardTitle>
					</CardHeader>
					{showCategories && (
						<CardContent className="pt-0">
							{categories.length === 0 ? (
								<p className="text-sm text-muted-foreground">
									Nenhuma categoria disponível
								</p>
							) : (
								<div className="space-y-2">
									{categories.map((category) => (
										<div key={category} className="flex items-center space-x-2">
											<Checkbox
												id={category}
												checked={selectedCategories.includes(category)}
												onCheckedChange={() => handleCategoryToggle(category)}
											/>
											<Label htmlFor={category} className="cursor-pointer text-sm">
												{category}
											</Label>
										</div>
									))}
								</div>
							)}
						</CardContent>
					)}
				</Card>

				{/* Preço */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle
							className="flex cursor-pointer items-center justify-between text-sm"
							onClick={() => setShowPrice(!showPrice)}
						>
							Preço
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
								<Slider
									value={priceRange}
									onValueChange={(value) => onPriceRangeChange(value as [number, number])}
									max={maxPrice}
									min={minPrice}
									step={Math.max(1, Math.floor((maxPrice - minPrice) / 50))} // Step dinâmico baseado no range
									className="w-full"
								/>
								<div className="flex justify-between text-xs text-muted-foreground">
									<span>R$ {priceRange[0].toFixed(0)}</span>
									<span>R$ {priceRange[1].toFixed(0)}</span>
								</div>
								<div className="mt-1 text-center text-xs text-muted-foreground">
									Faixa: R$ {minPrice.toFixed(0)} - R$ {maxPrice.toFixed(0)}
								</div>
							</div>
						</CardContent>
					)}
				</Card>

				{/* Ordenação */}
				<Card>
					<CardHeader className="pb-2">
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
						<CardContent className="pt-0">
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
		</div>
	);
}
