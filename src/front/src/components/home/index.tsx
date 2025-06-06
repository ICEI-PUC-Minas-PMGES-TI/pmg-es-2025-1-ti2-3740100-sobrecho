'use client';

import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ProductCard, ProductFilterSidebar } from './product';

import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import type { IProduct } from '@/redux/types';

// Constante de categorias disponíveis
const AVAILABLE_CATEGORIES = [
	{ value: 'roupas-femininas', label: 'Roupas Femininas' },
	{ value: 'roupas-masculinas', label: 'Roupas Masculinas' },
	{ value: 'acessorios', label: 'Acessórios' },
	{ value: 'calcados', label: 'Calçados' },
	{ value: 'bolsas', label: 'Bolsas' },
	{ value: 'joias', label: 'Joias' },
	{ value: 'decoracao', label: 'Decoração' },
	{ value: 'livros', label: 'Livros' }
];

type ProductForDashboard = {
	id: string;
	storeId: string;
	name: string;
	category: string; // ex: "Roupas Masculinas" (label)
	categoryValue: string; // ex: "roupas-masculinas" (value original)
	price: string; // ex: "R$ 0,00"
	priceValue: number;
	description: string;
	quantity: string;
	size: string[]; // ex: ["P", "M"]
	images: string[];
	createdAt: string;
};

function normalizeProduct(product: IProduct): ProductForDashboard {
	const priceValue =
		Number.parseFloat(
			product.price
				.replace(/\./g, '')
				.replace(',', '.')
				.replace(/[^\d.]/g, '')
		) || 0;

	const categoryData = AVAILABLE_CATEGORIES.find((c) => c.value === product.category);
	const categoryLabel = categoryData?.label || product.category;

	return {
		...product,
		price: `R$ ${priceValue.toFixed(2).replace('.', ',')}`,
		priceValue,
		quantity: String(product.quantity),
		size: product.size.map((s) => s.toUpperCase()),
		category: categoryLabel,
		categoryValue: product.category // Mantém o valor original
	};
}

export function HomePage() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
	const [sortBy, setSortBy] = useState('name');
	const [products, setProducts] = useState<ProductForDashboard[]>([]);

	const {
		listAllProducts: { data: productsFetched, loading }
	} = useTypedSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ProductsCreators.productListAllRequest());
	}, [dispatch]);

	useEffect(() => {
		if (!productsFetched) return;
		const normalized = productsFetched.map(normalizeProduct);
		setProducts(normalized);
	}, [productsFetched]);

	useEffect(() => {
		console.log('Products state:', products);
		console.log('Products fetched:', productsFetched);
	}, [products, productsFetched]);

	// Extrair categorias que realmente existem nos produtos
	const availableCategories = useMemo(() => {
		if (products.length === 0) {
			// Se não há produtos carregados, retorna todas as categorias disponíveis
			return AVAILABLE_CATEGORIES.map((cat) => cat.label);
		}

		// Extrai as categorias únicas dos produtos carregados
		const productCategoryValues = Array.from(
			new Set(products.map((product) => product.categoryValue))
		);

		// Mapeia para os labels correspondentes
		return productCategoryValues
			.map((value) => AVAILABLE_CATEGORIES.find((cat) => cat.value === value)?.label)
			.filter(Boolean) as string[];
	}, [products]);

	// Calcular range de preços dinâmico baseado nos produtos
	const priceRangeFromProducts = useMemo(() => {
		if (products.length === 0) {
			return { min: 0, max: 500 }; // Valores padrão quando não há produtos
		}

		const prices = products.map((product) => product.priceValue);
		const minPrice = Math.min(...prices);
		const maxPrice = Math.max(...prices);

		// Arredonda para baixo o mínimo e para cima o máximo para valores mais "limpos"
		const roundedMin = Math.floor(minPrice / 10) * 10;
		const roundedMax = Math.ceil(maxPrice / 10) * 10;

		return {
			min: Math.max(0, roundedMin), // Garante que não seja negativo
			max: Math.max(roundedMax, roundedMin + 10) // Garante que max > min
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
			// Filtro por categoria - usa o label da categoria
			const categoryMatch =
				selectedCategories.length === 0 || selectedCategories.includes(product.category);

			// Filtro por preço
			const priceMatch =
				product.priceValue >= priceRange[0] && product.priceValue <= priceRange[1];

			return categoryMatch && priceMatch;
		});

		// Ordenação
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'price-asc':
					return a.priceValue - b.priceValue;
				case 'price-desc':
					return b.priceValue - a.priceValue;
				case 'name':
				default:
					return a.name.localeCompare(b.name);
			}
		});

		return filtered;
	}, [products, selectedCategories, priceRange, sortBy]);

	const clearFilters = () => {
		setSelectedCategories([]);
		setPriceRange([priceRangeFromProducts.min, priceRangeFromProducts.max]);
		setSortBy('name');
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mb-6 flex flex-col justify-center">
				<h1 className="text-3xl font-bold">Destaques</h1>
				<h3 className="text-lg text-muted-foreground">
					Produtos mais vendidos nas ultimas semanas
				</h3>
			</div>

			<div className="flex flex-col gap-6 md:flex-row">
				{/* Sidebar de Filtros */}
				<div className="w-full flex-shrink-0 md:w-64">
					<ProductFilterSidebar
						categories={availableCategories}
						selectedCategories={selectedCategories}
						priceRange={priceRange}
						sortBy={sortBy}
						onCategoryChange={setSelectedCategories}
						onPriceRangeChange={setPriceRange}
						onSortChange={setSortBy}
						minPrice={priceRangeFromProducts.min}
						maxPrice={priceRangeFromProducts.max}
						clearFilters={clearFilters}
					/>
				</div>

				{/* Grid de Produtos */}
				<div className="flex-1">
					<div className="mb-4 text-sm text-muted-foreground">
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
