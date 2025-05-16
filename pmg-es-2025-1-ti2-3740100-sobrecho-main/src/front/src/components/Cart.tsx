'use client';

import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/utils';
import { Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getTotal } = useCart();
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [wantsToBargain, setWantsToBargain] = useState<boolean>(false);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F8FF] text-gray-800 p-8">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-500">Adicione alguns produtos para começar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8FF] text-gray-800 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da esquerda - Meu carrinho */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Meu carrinho:</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-md relative"
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        Produto {item.id}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
  <div>
    <p className="font-semibold">{item.name}</p>
    <p className="text-gray-600">Tamanho: M</p>
    <p className="text-gray-600">Cor: Qualquer</p>
    <p className="text-gray-600">Quantidade: {item.quantity}</p>
  </div>
  <p className="text-black font-bold mt-2">R$ {item.price.toFixed(2)}</p>
</div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da direita - Resumo da Compra */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal ({cartItems.length} itens)</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(getTotal())}
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-medium">
                  Deseja pechinchar?
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                  onChange={(e) =>
                    setWantsToBargain(e.target.value === 'sim')
                  }
                >
                  <option value="">Escolha:</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700">Valor Total</span>
                  <span className="font-bold text-gray-800">
                    {formatCurrency(getTotal())}
                  </span>
                </div>

                <button className="w-full bg-[#E4D1FB] hover:bg-[#d4bdf2] text-gray-900 font-medium py-2 rounded-lg transition">
                  Finalizar →
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition"
                >
                  ← Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
