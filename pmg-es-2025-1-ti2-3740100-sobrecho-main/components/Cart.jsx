import React, { useState } from 'react';
import useCart from '../hooks/useCart';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const [customPrice, setCustomPrice] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState('');

  const handleCustomPrice = () => {
    if (customPrice && !isNaN(customPrice)) {
      // Implementar lógica para preço personalizado
      console.log('Preço personalizado:', customPrice);
    }
  };

  const handleFinalize = () => {
    // Implementar lógica de finalização
    console.log('Finalizando compra');
    clearCart();
  };

  const subtotal = getTotal();
  const total = selectedDiscount 
    ? subtotal * (1 - parseInt(selectedDiscount) / 100) 
    : subtotal;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Meu carrinho:</h1>
          {items.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 mb-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                    <p className="text-sm text-gray-600">Cor: {item.color}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">R${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Resumo da Compra:</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <span>Subtotal ({items.length} itens)</span>
              <span>R${subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Deseja pechinchar?</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedDiscount}
                onChange={(e) => setSelectedDiscount(e.target.value)}
              >
                <option value="">Escolha:</option>
                <option value="10">10% de desconto</option>
                <option value="20">20% de desconto</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Deseja pagar quanto na peça?</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Digite o preço"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
              <button
                onClick={handleCustomPrice}
                className="mt-2 w-full bg-purple-200 text-purple-700 py-2 px-4 rounded hover:bg-purple-300"
              >
                Enviar Solicitação →
              </button>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Valor Total</span>
                <span className="font-semibold">R${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinalize}
              className="w-full bg-purple-200 text-purple-700 py-3 rounded hover:bg-purple-300"
              disabled={items.length === 0}
            >
              Finalizar →
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full mt-4 bg-purple-200 text-purple-700 py-2 rounded hover:bg-purple-300"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 