'use client';
import { useState, useEffect } from 'react';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';

interface Product {
  id: number; name: string; price: number; image?: string;
}

export default function GestaoDeProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const mockData: Product[] = [
      { id: 1, name: 'Camiseta Pokémon', price: 89.9, image: 'https://i.imgur.com/kYq2aH6.jpeg' },
      { id: 2, name: 'Moletom Gengar', price: 150.0, image: 'https://i.imgur.com/J3oA5aH.jpeg' },
    ];
    setProducts(mockData);
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setView('form');
  };

  const handleDelete = (productId: number) => {
    alert(`Simulando exclusão do produto ${productId}`);
    setProducts(products.filter(p => p.id !== productId));
  };
  
  const handleSave = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      alert(`Simulando atualização do produto ${productData.name}`);
      setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
      alert(`Simulando criação do produto ${productData.name}`);
      const newProduct = { ...productData, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setView('table');
    setEditingProduct(null);
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    setView('form');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
        {view === 'table' && (
          <Button onClick={handleAddNew}>Cadastrar Produto</Button>
        )}
      </div>

      {view === 'table' ? (
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <ProductForm initialData={editingProduct} onSave={handleSave} onCancel={() => setView('table')} />
      )}
    </div>
  );
}