// Exemplo de Molecule - Formulário de Login usando átomos
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Card from '../atoms/Card'

export default function LoginForm({ onSubmit, loading = false }) {
  return (
    <Card padding="large" className="max-w-md mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input 
            type="email"
            placeholder="seu@email.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <Input 
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="flex gap-3">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          
          <Button 
            type="button" 
            variant="secondary"
            className="flex-1"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Card>
  )
}
