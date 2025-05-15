'use client';

import { useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

const produtosMock = new Array(8).fill(null).map((_, i) => {
  const categoria = i % 2 === 0 ? 'camiseta' : 'calca';
  const nome =
    categoria === 'camiseta' ? `Camiseta Pokémon ${i + 1}` : `Calça Jeans ${i + 1}`;
  const descricao =
    categoria === 'camiseta'
      ? 'Camiseta Infantil Pokémon estampada'
      : 'Calça jeans azul clara com corte reto';

  return {
    id: i,
    nome,
    descricao,
    tamanho: i % 3 === 0 ? 'P' : i % 3 === 1 ? 'M' : 'G',
    quantidade: Math.floor(Math.random() * 10) + 1,
    preco: 20 + i * 5,
    categoria,
    imagem: '/produto.png',
  };
});

export default function GestaoProdutos() {
  const [produtos] = useState(produtosMock);
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria =
      !categoriaSelecionada || produto.categoria === categoriaSelecionada;

    const correspondePesquisa = [produto.nome, produto.descricao, produto.categoria]
      .some((campo) =>
        campo.toLowerCase().includes(pesquisa.toLowerCase())
      );

    return correspondeCategoria && correspondePesquisa;
  });

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'menorPreco':
        return a.preco - b.preco;
      case 'maiorPreco':
        return b.preco - a.preco;
      case 'tamanho':
        return a.tamanho.localeCompare(b.tamanho);
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-[#F8F4FF] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Título e Navegação */}
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
        <p className="text-sm text-purple-700 mt-1 mb-6">
          <a href="#" className="hover:underline">Central de gestão</a> &gt; <a href="#" className="hover:underline">Gestão de Produtos</a>
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Filtro de categoria */}
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
          >
            <option value="">Categorias</option>
            <option value="camiseta">Camiseta</option>
            <option value="calca">Calça</option>
            <option value="sapato">Sapato</option>
          </select>

          {/* Ordenação */}
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="bg-purple-500 text-white px-2 py-2 rounded hover:bg-purple-600"
          >
            <option value="">Ordenar por</option>
            <option value="menorPreco">Menor Preço</option>
            <option value="maiorPreco">Maior Preço</option>
            <option value="tamanho">Tamanho (A-Z)</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Cadastrar Produto</button>

          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Pesquisar Produto"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="ml-auto border px-3 py-2 rounded w-full md:w-64"
          />
        </div>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtosOrdenados.map((produto) => (
            <div key={produto.id} className="bg-white border rounded p-4 flex gap-4 items-center shadow-sm">
              <img src={produto.imagem} alt={produto.nome} className="w-24 h-24 object-contain rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-black">{produto.nome}</h2>
                <p className="text-sm text-purple-600">{produto.descricao}</p>
                <p className="text-sm text-purple-600">Tamanho: {produto.tamanho}</p>
                <p className="text-sm text-purple-600">Preço: R$ {produto.preco.toFixed(2)}</p>
                <p className="text-sm text-purple-600">Quantidade Disponível: {produto.quantidade}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-cyan-500 text-white px-4 py-1 rounded hover:bg-cyan-600 flex items-center gap-1">
                  <FiEdit2 size={16} /> Atualizar
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                  <FiTrash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
