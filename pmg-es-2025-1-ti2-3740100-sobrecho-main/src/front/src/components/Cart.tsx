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
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-500">Adicione alguns produtos para começar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da esquerda - Meu carrinho */}
        <div>
          <h2 className="text-2xl mb-6">Meu carrinho:</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 relative text-black"
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-gray-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">Produto Teste {item.id}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600">Tamanho: M</p>
                    <p className="text-gray-600">Cor: tal</p>
                    <p className="text-gray-600">Quantidade: 1</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da direita - Resumo da Compra */}
        <div>
          <div className="bg-white rounded-lg p-6 text-black">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal ({cartItems.length} itens)</span>
                <span>{formatCurrency(getTotal())}</span>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600">Deseja pechinchar?</label>
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => setWantsToBargain(e.target.value === 'sim')}
                >
                  <option value="">Escolha:</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Valor Total</span>
                  <span className="text-xl">{formatCurrency(getTotal())}</span>
                </div>

                <button className="w-full bg-[#E4D1FB] text-black py-2 rounded text-center">
                  Finalizar →
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-[#E4D1FB] text-black py-2 rounded text-center"
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