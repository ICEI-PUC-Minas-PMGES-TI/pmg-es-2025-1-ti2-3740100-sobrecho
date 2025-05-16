export default function Footer() {
  return (
    <footer className="bg-[#F8F4FF] text-gray-700 py-6 border-t border-purple-200 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Sobre o SóBrechó</h4>
            <p>
              Plataforma que conecta pessoas e promove o reuso de roupas e acessórios, contribuindo com a sustentabilidade.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links Úteis</h4>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Início</a></li>
              <li><a href="/cadastro-produto" className="hover:underline">Cadastrar Produto</a></li>
              <li><a href="/central-gestao" className="hover:underline">Central de Gestão</a></li>
              <li><a href="/contato" className="hover:underline">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Redes Sociais</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} SóBrechó. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
