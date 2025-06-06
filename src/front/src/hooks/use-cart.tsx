'use client';

import { useState, useEffect, useMemo } from 'react';

import { useTypedSelector } from './typed-selector';

import type { CartItem } from '@/types/cart';

const CART_STORAGE_PREFIX = 'shopping-cart';

export function useCart() {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	const { user } = useTypedSelector((state) => state.auth);

	// Usar o ID do usuário diretamente do Redux
	const userId = user?.id || '';
	const cartStorageKey = `${CART_STORAGE_PREFIX}_${userId}`;

	// Carregar carrinho do localStorage apenas quando userId estiver disponível
	useEffect(() => {
		if (!userId || isInitialized) return;

		const savedCart = localStorage.getItem(cartStorageKey);
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart);
				setItems(parsedCart);
			} catch (error) {
				console.error(`Erro ao carregar carrinho do usuário ${userId}:`, error);
				setItems([]);
			}
		} else {
			// Se não existe carrinho para este usuário, inicializa vazio
			setItems([]);
		}

		setIsInitialized(true);
	}, [userId, cartStorageKey, isInitialized]);

	// Salvar carrinho no localStorage sempre que mudar (apenas se inicializado e com userId válido)
	useEffect(() => {
		if (!userId || !isInitialized) return;
		localStorage.setItem(cartStorageKey, JSON.stringify(items));
	}, [items, cartStorageKey, userId, isInitialized]);

	// Reset quando o usuário mudar (login/logout)
	useEffect(() => {
		if (userId && isInitialized) {
			// Quando o userId muda, recarrega o carrinho
			setIsInitialized(false);
		}
	}, [userId]);

	const addItem = (productId: string, size: string, quantity = 1) => {
		if (!userId) {
			console.warn('Usuário não logado, não é possível adicionar ao carrinho');
			return;
		}

		setItems((currentItems) => {
			const existingItemIndex = currentItems.findIndex(
				(item) => item.productId === productId && item.size === size
			);

			if (existingItemIndex >= 0) {
				const updatedItems = [...currentItems];
				updatedItems[existingItemIndex].quantity += quantity;
				return updatedItems;
			} else {
				return [...currentItems, { productId, size, quantity }];
			}
		});
	};

	const removeItem = (productId: string, size: string) => {
		setItems((currentItems) =>
			currentItems.filter((item) => !(item.productId === productId && item.size === size))
		);
	};

	const updateQuantity = (productId: string, size: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(productId, size);
			return;
		}

		setItems((currentItems) =>
			currentItems.map((item) =>
				item.productId === productId && item.size === size ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const totalItems = useMemo(() => {
		return items.reduce((total, item) => total + item.quantity, 0);
	}, [items]);

	const isInCart = (productId: string, size: string) => {
		return items.some((item) => item.productId === productId && item.size === size);
	};

	const getItemQuantity = (productId: string, size: string) => {
		const item = items.find((item) => item.productId === productId && item.size === size);
		return item?.quantity || 0;
	};

	return {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		totalItems,
		isInCart,
		getItemQuantity,
		userId,
		isInitialized // Expõe se o carrinho foi inicializado
	};
}
