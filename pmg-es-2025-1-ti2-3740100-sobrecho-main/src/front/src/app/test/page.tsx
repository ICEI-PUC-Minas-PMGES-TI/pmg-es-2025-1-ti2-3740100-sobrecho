'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const produtos = [
  {
    id: 1,
    name: "Produto Teste 1",
    price: 99.99,
    image: "https://cdn.shopify.com/s/files/1/0222/0104/0992/files/roupa_com_tecnologia_kace2.jpg?v=1689884986"
  },
  {
    id: 2,
    name: "Produto Teste 2",
    price: 149.99,
    image: "https://img.ltwebstatic.com/gspCenter/goodsImage/2023/3/16/9201975936_1057337/89517A5BA30B54A0981089BABD66EB77_thumbnail_720x.jpg"
  },
  {
    id: 3,
    name: "Produto Teste 3",
    price: 199.99,
    image: "https://static.cruzeiro.com.br/produtos/camisa-cruzeiro-i-2425-sn-torcedor-adidas-masculina/10/FB9-4316-310/FB9-4316-310_zoom1.jpg?ts=1710173015"
  }
];

export default function TestPage() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Página de Teste - Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="border rounded-lg p-4">
            <img 
              src={produto.image} 
              alt={produto.name} 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="font-semibold">{produto.name}</h2>
            <p className="text-gray-600">R$ {produto.price}</p>
            <Button
              onClick={() => {
                addToCart(produto);
                alert('Produto adicionado ao carrinho!');
              }}
              className="w-full mt-4"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}