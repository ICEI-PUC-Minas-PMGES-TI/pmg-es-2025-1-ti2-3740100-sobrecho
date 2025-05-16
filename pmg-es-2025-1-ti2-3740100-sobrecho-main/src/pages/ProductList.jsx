import React from 'react';
import Product from '../components/Product';

// Dados de exemplo
const sampleProducts = [
  {
    id: 1,
    name: 'Camiseta Básica',
    price: 49.90,
    image: 'https://via.placeholder.com/300',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Cinza'],
  },
  {
    id: 2,
    name: 'Calça Jeans',
    price: 129.90,
    image: 'https://via.placeholder.com/300',
    sizes: ['38', '40', '42', '44'],
    colors: ['Azul Claro', 'Azul Escuro', 'Preto'],
  },
  {
    id: 3,
    name: 'Vestido Floral',
    price: 89.90,
    image: 'https://via.placeholder.com/300',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Azul', 'Verde'],
  },
];

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 