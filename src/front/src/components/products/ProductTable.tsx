'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number; name: string; price: number; image?: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            {product.image && (
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <CardTitle className="pt-4">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">R$ {product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => onEdit(product)}>Atualizar</Button>
            <Button variant="destructive" onClick={() => onDelete(product.id)}>Excluir</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}