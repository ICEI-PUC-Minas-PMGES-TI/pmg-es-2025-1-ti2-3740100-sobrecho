'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { Trash2, Plus, Minus } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getTotal, updateQuantity } = useCart();
  const [wantsToBargain, setWantsToBargain] = useState<boolean>(false);
  const [bargainPrice, setBargainPrice] = useState<string>('');
  const [bargainSent, setBargainSent] = useState<boolean>(false);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-500">Adicione alguns produtos para começar</p>
      </div>
    );
  }

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSendBargain = () => {
    if (!bargainPrice || isNaN(Number(bargainPrice)) || Number(bargainPrice) <= 0) {
      alert('Por favor, insira um valor válido para pechincha.');
      return;
    }
    setBargainSent(true);
    alert('Solicitação de pechincha enviada!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl mb-6">Meu carrinho:</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 relative text-black">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-gray-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">Produto {item.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Preço: {formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 border rounded text-gray-700 hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border rounded text-gray-700 hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 text-black space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal ({totalQuantity} itens)</span>
              <span>{formatCurrency(getTotal())}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600">Deseja pechinchar?</label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  setWantsToBargain(e.target.value === 'sim');
                  setBargainSent(false);
                  setBargainPrice('');
                }}
                value={wantsToBargain ? 'sim' : 'nao'}
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>

            {wantsToBargain && !bargainSent && (
              <div className="space-y-2">
                <label className="block text-gray-600">Sugira seu preço:</label>
                <input
                  type="number"
                  value={bargainPrice}
                  onChange={(e) => setBargainPrice(e.target.value)}
                  placeholder="Digite seu preço"
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.01"
                />
                <button
                  onClick={handleSendBargain}
                  className="w-full bg-[#E4D1FB] text-black py-2 rounded"
                >
                  Enviar Pechincha
                </button>
              </div>
            )}

            {bargainSent && (
              <p className="text-green-600 font-semibold">
                Solicitação de pechincha enviada! Em breve entraremos em contato.
              </p>
            )}

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
  );
};
