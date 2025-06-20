'use client';

import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ProductCard, ProductFilterSidebar } from '@/components/home/product';
import { AVAILABLE_CATEGORIES, AVAILABLE_SIZES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';

import type { IProduct } from '@/redux/types';

// Interface simplificada para o produto
interface ProductForDisplay {
	id: string;
	storeId: string;
	name: string;
	category: string;
	categoryValue: string;
	price: number;
	description: string;
	size: string;
	sizeValue: string;
	image: string;
	createdAt: string;
}

function normalizeProduct(product: IProduct): ProductForDisplay {
	const categoryData = AVAILABLE_CATEGORIES.find((c) => c.value === product.category);
	const categoryLabel = categoryData?.label || product.category;

	const sizeData = AVAILABLE_SIZES.find((s) => s.value === product.size.toLowerCase());
	const sizeLabel = sizeData?.label || product.size.toUpperCase();

	return {
		...product,
		category: categoryLabel,
		categoryValue: product.category,
		size: sizeLabel,
		sizeValue: product.size.toLowerCase()
	};
}

export function HomePage() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
	const [sortBy, setSortBy] = useState('name');
	const [products, setProducts] = useState<ProductForDisplay[]>([]);

	const {
		getAll: { data: productsFetched, loading }
	} = useTypedSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ProductsCreators.productsGetAllRequest());
	}, [dispatch]);

	useEffect(() => {
		if (!productsFetched) return;
		const normalized = productsFetched.map(normalizeProduct);
		setProducts(normalized);
	}, [productsFetched]);

	// Extrair categorias que realmente existem nos produtos
	const availableCategories = useMemo(() => {
		if (products.length === 0) {
			return AVAILABLE_CATEGORIES.map((cat) => cat.label);
		}

		const productCategoryValues = Array.from(
			new Set(products.map((product) => product.categoryValue))
		);

		return productCategoryValues
			.map((value) => AVAILABLE_CATEGORIES.find((cat) => cat.value === value)?.label)
			.filter(Boolean) as string[];
	}, [products]);

	// Extrair tamanhos que realmente existem nos produtos
	const availableSizes = useMemo(() => {
		if (products.length === 0) {
			return AVAILABLE_SIZES.map((size) => size.label);
		}

		const productSizeValues = Array.from(
			new Set(products.map((product) => product.sizeValue))
		);

		return productSizeValues
			.map((value) => AVAILABLE_SIZES.find((size) => size.value === value)?.label)
			.filter(Boolean) as string[];
	}, [products]);

	// Calcular range de preços dinâmico baseado nos produtos
	const priceRangeFromProducts = useMemo(() => {
		if (products.length === 0) {
			return { min: 0, max: 500 };
		}

		const prices = products.map((product) => product.price);
		const minPrice = Math.min(...prices);
		const maxPrice = Math.max(...prices);

		// Arredonda para valores mais "limpos"
		const roundedMin = Math.floor(minPrice / 10) * 10;
		const roundedMax = Math.ceil(maxPrice / 10) * 10;

		return {
			min: Math.max(0, roundedMin),
			max: Math.max(roundedMax, roundedMin + 10)
		};
	}, [products]);

	// Atualizar o price range quando os produtos mudarem
	useEffect(() => {
		if (products.length > 0) {
			setPriceRange([priceRangeFromProducts.min, priceRangeFromProducts.max]);
		}
	}, [products, priceRangeFromProducts.min, priceRangeFromProducts.max]);

	// Filtrar e ordenar produtos
	const filteredProducts = useMemo(() => {
		const filtered = products.filter((product) => {
			const categoryMatch =
				selectedCategories.length === 0 || selectedCategories.includes(product.category);

			const sizeMatch =
				selectedSizes.length === 0 || selectedSizes.includes(product.size);

			const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

			return categoryMatch && sizeMatch && priceMatch;
		});

		// Ordenação
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'price-asc':
					return a.price - b.price;
				case 'price-desc':
					return b.price - a.price;
				case 'name':
				default:
					return a.name.localeCompare(b.name);
			}
		});

		return filtered;
	}, [products, selectedCategories, selectedSizes, priceRange, sortBy]);

	const clearFilters = () => {
		setSelectedCategories([]);
		setSelectedSizes([]);
		setPriceRange([priceRangeFromProducts.min, priceRangeFromProducts.max]);
		setSortBy('name');
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6 flex flex-col justify-center">
				<h1 className="text-3xl font-bold">Produtos</h1>
				<h3 className="text-muted-foreground text-lg">
					Produtos mais vendidos nas últimas semanas
				</h3>
			</div>

			<div className="flex flex-col gap-6 md:flex-row">
				{/* Sidebar de Filtros */}
				<div className="w-full flex-shrink-0 md:w-64">
					<ProductFilterSidebar
						categories={availableCategories}
						sizes={availableSizes}
						selectedCategories={selectedCategories}
						selectedSizes={selectedSizes}
						priceRange={priceRange}
						sortBy={sortBy}
						onCategoryChange={setSelectedCategories}
						onSizeChange={setSelectedSizes}
						onPriceRangeChange={setPriceRange}
						onSortChange={setSortBy}
						minPrice={priceRangeFromProducts.min}
						maxPrice={priceRangeFromProducts.max}
						clearFilters={clearFilters}
					/>
				</div>

				{/* Grid de Produtos */}
				<div className="flex-1">
					<div className="text-muted-foreground mb-4 text-sm">
						{filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}{' '}
						encontrado
						{filteredProducts.length !== 1 ? 's' : ''}
					</div>

					{loading ? (
						<div className="py-12 text-center">
							<p className="text-muted-foreground">Carregando produtos...</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{filteredProducts.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>

							{filteredProducts.length === 0 && (
								<div className="py-12 text-center">
									<p className="text-muted-foreground">Nenhum produto foi encontrado.</p>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
