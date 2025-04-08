import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, BookCopy, Clock } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Bem-vindo à Biblioteca Digital</h1>
        <p className="text-muted-foreground mt-2">Gerencie seu acervo, empréstimos e usuários em um só lugar</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12 adicionados este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">23 devoluções pendentes hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+8 novos esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29</div>
            <p className="text-xs text-muted-foreground">5 disponíveis para retirada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Livros Populares</CardTitle>
            <CardDescription>Os livros mais emprestados este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", count: 12 },
                { title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", count: 10 },
                { title: "1984", author: "George Orwell", count: 8 },
                { title: "Dom Casmurro", author: "Machado de Assis", count: 7 },
                { title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", count: 6 },
              ].map((book, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <div className="text-sm font-medium">{book.count} empréstimos</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse as funcionalidades mais utilizadas</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild className="w-full justify-start">
              <Link href="/catalogo/adicionar">Cadastrar Novo Livro</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/emprestimos">Registrar Empréstimo</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/emprestimos">Processar Devolução</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/usuarios">Cadastrar Usuário</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/relatorios">Gerar Relatórios</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
