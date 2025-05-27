
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  tipo?: string;
  tamanho?: string;
  quantidadeDisponivel?: number;
}

interface ProductFormProps {
  initialData?: Product | null;
  onSave: (productData: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

export function ProductForm({ initialData, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [tipo, setTipo] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState<number | string>('');
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setDescription(initialData.description || '');
      setTipo(initialData.tipo || '');
      setTamanho(initialData.tamanho || '');
      setQuantidadeDisponivel(initialData.quantidadeDisponivel !== undefined ? initialData.quantidadeDisponivel : '');
    } else {
      setName('');
      setPrice('');
      setDescription('');
      setTipo('');
      setTamanho('');
      setQuantidadeDisponivel('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    const productData = { 
      name, 
      price: Number(price),
      description,
      tipo,
      tamanho,
      quantidadeDisponivel: Number(quantidadeDisponivel)
    };

    if (initialData) {
      onSave({ ...initialData, ...productData });
    } else {
      onSave(productData as Omit<Product, 'id'>); 
    }
  };

  // Tipagem explícita para os eventos 'e' nos onChange
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
  const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => setTipo(e.target.value);
  const handleTamanhoChange = (e: React.ChangeEvent<HTMLInputElement>) => setTamanho(e.target.value);
  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantidadeDisponivel(e.target.value);


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg p-4 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-center mb-6">{initialData ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
      
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</Label>
        <Input id="name" value={name} onChange={handleNameChange} placeholder="Nome do produto" className="mt-1 block w-full"/>
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</Label>
        <Textarea 
            id="description" 
            value={description} 
            onChange={handleDescriptionChange} 
            placeholder="Descrição detalhada do produto" 
            className="mt-1 block w-full"
        />
      </div>
      
      <div>
        <Label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</Label>
        <Input id="price" type="number" value={price} onChange={handlePriceChange} placeholder="Ex: 29.99" className="mt-1 block w-full" step="0.01"/>
      </div>

      <div>
        <Label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</Label>
        <Input id="tipo" value={tipo} onChange={handleTipoChange} placeholder="Ex: Camiseta, Calça" className="mt-1 block w-full"/>
      </div>

      <div>
        <Label htmlFor="tamanho" className="block text-sm font-medium text-gray-700">Tamanho</Label>
        <Input id="tamanho" value={tamanho} onChange={handleTamanhoChange} placeholder="Ex: P, M, G, 38, 40" className="mt-1 block w-full"/>
      </div>

      <div>
        <Label htmlFor="quantidadeDisponivel" className="block text-sm font-medium text-gray-700">Quantidade Disponível</Label>
        <Input id="quantidadeDisponivel" type="number" value={quantidadeDisponivel} onChange={handleQuantidadeChange} placeholder="Ex: 10" className="mt-1 block w-full"/>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Produto</Button>
      </div>
    </form>
  );
}