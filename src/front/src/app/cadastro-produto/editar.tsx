// src/front/src/app/cadastro-produto/editar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditarProduto() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    preco: '0.00',
    tamanho: '',
    imagens: [] as File[],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setFormData({ ...formData, imagens: [...formData.imagens, ...Array.from(files)] });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Produto atualizado:', formData);
    setTimeout(() => {
      router.push('/cadastro-produto');
    }, 500);
  }

  return (
    <main className="min-h-screen bg-[#F8F4FF] py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded p-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Editar Produto</h1>
          <p className="text-sm text-purple-700 mb-6">
            <a href="#" className="hover:underline">Central de edição</a> &gt; <a href="#" className="hover:underline">Edição de Produtos</a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Alterar nome do Produto</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o novo nome do produto"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição do produto</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Escreva a nova descrição do produto"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoria do Produto</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Escolha uma nova categoria</option>
                <option value="camiseta">Camiseta</option>
                <option value="calca">Calça</option>
                <option value="sapato">Sapato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Preço</label>
              <input
                name="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tamanho do Produto</label>
              <select
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Altere o tamanho</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Imagens</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-white bg-purple-600 px-4 py-2 rounded cursor-pointer"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.imagens.map((img, idx) => (
                  <span key={idx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                    {img.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded mt-4"
            >
              Salvar
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="border rounded p-4 bg-gray-50">
            <div className="h-48 bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-sm">[ Novas imagens aqui ]</span>
            </div>
            <h3 className="font-bold">{formData.nome || 'Produto'}</h3>
            <p className="text-sm text-gray-600">{formData.descricao || 'Descrição do produto...'}</p>
            <p className="text-right font-semibold mt-2">R$ {parseFloat(formData.preco).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
