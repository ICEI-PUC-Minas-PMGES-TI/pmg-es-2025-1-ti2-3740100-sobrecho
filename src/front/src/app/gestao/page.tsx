'use client';
import { useState, useEffect, useMemo } from 'react';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Header } from '@/components/common';
import { buttonVariants } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ShirtIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const navigation = {
    main: [
        { label: 'Sobre', href: '/about' },
        { label: 'Destaques', href: '/featured' },
        { label: 'Gestão', href: '/gestao' }
    ],
    auth: [
        { label: 'Entrar', href: '/sign-in' },
        { label: 'Cadastrar', href: '/sign-up' }
    ]
};

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

export default function GestaoDeProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [ordenacao, setOrdenacao] = useState<string>('');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const mockData: Product[] = [
      { id: 1, name: 'Camiseta Pokémon Retrô', price: 89.9, image: 'https://i.imgur.com/kYq2aH6.jpeg', tipo: 'Camiseta', tamanho: 'M Infantil', quantidadeDisponivel: 2 },
      { id: 2, name: 'Moletom Gengar Tie-Dye', price: 150.0, image: 'https://i.imgur.com/J3oA5aH.jpeg', tipo: 'Moletom', tamanho: 'G Adulto', quantidadeDisponivel: 1 },
      { id: 3, name: 'Calça Jeans Skinny Black', price: 129.90, image: 'https://i.imgur.com/kYq2aH6.jpeg', tipo: 'Calça', tamanho: '40 Adulto', quantidadeDisponivel: 1 },
      { id: 4, name: 'Tênis Esportivo RunnerMax', price: 299.00, image: 'https://i.imgur.com/J3oA5aH.jpeg', tipo: 'Calçado', tamanho: '42 Adulto', quantidadeDisponivel: 1 },
      { id: 5, name: 'Vestido Midi Estampado', price: 145.50, image: 'https://i.imgur.com/kYq2aH6.jpeg', tipo: 'Vestido', tamanho: 'M Adulto', quantidadeDisponivel: 2 },
      { id: 6, name: 'Saia Jeans Clássica', price: 95.00, image: 'https://i.imgur.com/J3oA5aH.jpeg', tipo: 'Saia', tamanho: '38 Adulto', quantidadeDisponivel: 3 },
      { id: 7, name: 'Jaqueta Corta-Vento Neon', price: 199.99, image: 'https://i.imgur.com/kYq2aH6.jpeg', tipo: 'Jaqueta', tamanho: 'P Adulto', quantidadeDisponivel: 4 },
      { id: 8, name: 'Bermuda Tactel Estampada Verão', price: 69.90, image: 'https://i.imgur.com/J3oA5aH.jpeg', tipo: 'Bermuda', tamanho: 'M Adulto', quantidadeDisponivel: 1 }
    ];
    setProducts(mockData);

    const action = searchParams.get('action');
    if (action === 'add') {
      handleAddNew();
    }
  }, [searchParams]);

  const uniqueTipos = useMemo(() => {
    const tipos = products.map(p => p.tipo).filter(Boolean) as string[];
    return ['Todos os Tipos', ...new Set(tipos)];
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    if (!filtroTipo || filtroTipo === 'Todos os Tipos') { return products; }
    return products.filter(product => product.tipo === filtroTipo);
  }, [products, filtroTipo]);

  const produtosOrdenados = useMemo(() => {
    const produtosSensiveisAOrdenacao = [...produtosFiltrados];
    switch (ordenacao) {
      case 'preco-asc': produtosSensiveisAOrdenacao.sort((a, b) => a.price - b.price); break;
      case 'preco-desc': produtosSensiveisAOrdenacao.sort((a, b) => b.price - a.price); break;
      case 'nome-asc': produtosSensiveisAOrdenacao.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'nome-desc': produtosSensiveisAOrdenacao.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }
    return produtosSensiveisAOrdenacao;
  }, [produtosFiltrados, ordenacao]);

  const handleEdit = (product: Product) => { setEditingProduct(product); setView('form'); };
  const handleDelete = (productId: number) => { alert(`Simulando exclusão do produto ${productId}`); setProducts(products.filter(p => p.id !== productId)); };
  const handleSave = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) { alert(`Simulando atualização do produto ${productData.name}`); setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else { alert(`Simulando criação do produto ${productData.name}`); const newProduct = { ...productData, id: Date.now() }; setProducts([...products, newProduct]); }
    setView('table'); setEditingProduct(null);
  };
  
  const handleAddNew = () => { setEditingProduct(null); setView('form'); };

  return (
    <div className="pt-16 md:pt-20">
      <Header className="fixed top-0 left-0 right-0 flex w-full items-center justify-between p-4 z-50 bg-background border-b">
          <Link href="/" className="flex items-center justify-center gap-2 text-lg font-semibold">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground"> <ShirtIcon className="size-5" /> </div> SoBrechó
          </Link>
          <div className="flex items-center justify-center gap-2"> 
            {navigation.main.map((item, index) => ( 
              <Link key={index} href={item.href} className={cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')}> 
                {item.label} 
              </Link> 
            ))} 
          </div>
          <div className="flex items-center justify-center gap-2"> 
            {navigation.auth.map((item, index) => ( 
              <Link key={index} href={item.href} className={ index < navigation.auth.length - 1 ? cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal') : buttonVariants({ variant: 'default' }) }> 
                {item.label} 
              </Link> 
            ))} 
          </div>
      </Header>
      
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
          {view === 'table' && ( <Button onClick={handleAddNew}>Cadastrar Produto</Button> )}
        </div>

        {view === 'table' && (
          <div className="flex space-x-4 mb-6">
            <div>
              <Label htmlFor="filtro-tipo" className="mr-2 text-sm font-medium text-gray-700">Filtrar por Tipo:</Label>
              <select id="filtro-tipo" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" >
                {uniqueTipos.map(tipo => ( <option key={tipo} value={tipo === 'Todos os Tipos' ? '' : tipo}> {tipo} </option> ))}
              </select>
            </div>
            <div>
              <Label htmlFor="ordenacao" className="mr-2 text-sm font-medium text-gray-700">Ordenar por:</Label>
              <select id="ordenacao" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} className="border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" >
                <option value="">Padrão</option>
                <option value="preco-asc">Preço: Menor para Maior</option>
                <option value="preco-desc">Preço: Maior para Menor</option>
                <option value="nome-asc">Nome: A-Z</option>
                <option value="nome-desc">Nome: Z-A</option>
              </select>
            </div>
          </div>
        )}

        {view === 'table' ? (
          <ProductTable products={produtosOrdenados} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <ProductForm initialData={editingProduct} onSave={handleSave} onCancel={() => setView('table')} />
        )}
      </div>
    </div>
  );
}