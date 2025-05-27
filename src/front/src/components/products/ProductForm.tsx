'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface Product {
  id: number; name: string; price: number; image?: string;
}

interface ProductFormProps {
  initialData?: Product | null;
  onSave: (productData: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

export function ProductForm({ initialData, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    } else {
      setName('');
      setPrice(0);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { name, price: Number(price) };
    if (initialData) {
      onSave({ ...initialData, ...productData });
    } else {
      onSave(productData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-2xl font-bold">{initialData ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" />
      </div>
      <div>
        <Label htmlFor="price">Preço</Label>
        <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Preço" />
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}