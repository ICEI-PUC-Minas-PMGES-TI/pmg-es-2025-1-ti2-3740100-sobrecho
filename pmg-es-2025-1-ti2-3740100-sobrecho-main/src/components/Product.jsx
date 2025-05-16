import React, { useState } from 'react';
import useCart from '../hooks/useCart';

const Product = ({ product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecione tamanho e cor');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">R${product.price.toFixed(2)}</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tamanho
        </label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border rounded-md py-2 px-3"
        >
          <option value="">Selecione um tamanho</option>
          {product.sizes?.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor
        </label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full border rounded-md py-2 px-3"
        >
          <option value="">Selecione uma cor</option>
          {product.colors?.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-purple-200 text-purple-700 py-2 px-4 rounded hover:bg-purple-300"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default Product; 