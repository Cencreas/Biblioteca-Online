"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  Star,
  ThumbsUp,
  History,
  TrendingUp,
  Sparkles,
  Heart,
  Calendar,
  Users,
  Bookmark,
  BookmarkPlus,
  Info,
  Settings,
  RefreshCw,
  Filter,
  XCircle,
} from "lucide-react"

export default function RecomendacoesPage() {
  // Estado para controlar as preferências de recomendação
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [preferences, setPreferences] = useState({
    baseadoHistorico: true,
    baseadoGeneros: true,
    incluirLancamentos: true,
    incluirPopulares: true,
    incluirCuradorias: true,
    generosFavoritos: ["Fantasia", "Ficção Científica", "Romance"],
  })

  // Dados de exemplo para livros recomendados com base no histórico
  const recomendacoesHistorico = [
    {
      id: 1,
      titulo: "Duna",
      autor: "Frank Herbert",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      avaliacao: 4.8,
      motivo: "Baseado em sua leitura de 'Fundação' de Isaac Asimov",
      disponivel: true,
    },
    {
      id: 2,
      titulo: "O Nome do Vento",
      autor: "Patrick Rothfuss",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Fantasia",
      avaliacao: 4.9,
      motivo: "Baseado em sua leitura de 'O Senhor dos Anéis'",
      disponivel: true,
    },
    {
      id: 3,
      titulo: "Neuromancer",
      autor: "William Gibson",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      avaliacao: 4.5,
      motivo: "Baseado em sua leitura de '1984' de George Orwell",
      disponivel: false,
    },
    {
      id: 4,
      titulo: "A Roda do Tempo: O Olho do Mundo",
      autor: "Robert Jordan",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Fantasia",
      avaliacao: 4.7,
      motivo: "Baseado em sua leitura de 'As Crônicas de Gelo e Fogo'",
      disponivel: true,
    },
  ]

  // Dados de exemplo para livros populares
  const livrosPopulares = [
    {
      id: 5,
      titulo: "Torto Arado",
      autor: "Itamar Vieira Junior",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Literatura Brasileira",
      avaliacao: 4.8,
      emprestimos: 42,
      disponivel: false,
    },
    {
      id: 6,
      titulo: "Sapiens: Uma Breve História da Humanidade",
      autor: "Yuval Noah Harari",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Não-ficção",
      avaliacao: 4.7,
      emprestimos: 38,
      disponivel: true,
    },
    {
      id: 7,
      titulo: "A Biblioteca da Meia-Noite",
      autor: "Matt Haig",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção",
      avaliacao: 4.6,
      emprestimos: 35,
      disponivel: true,
    },
    {
      id: 8,
      titulo: "Pachinko",
      autor: "Min Jin Lee",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Histórica",
      avaliacao: 4.5,
      emprestimos: 30,
      disponivel: true,
    },
  ]

  // Dados de exemplo para novos lançamentos
  const novosLancamentos = [
    {
      id: 9,
      titulo: "A Hipótese do Amor",
      autor: "Ali Hazelwood",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Romance",
      avaliacao: 4.4,
      dataAdicao: "2023-11-15",
      disponivel: true,
    },
    {
      id: 10,
      titulo: "O Homem Mais Rico da Babilônia",
      autor: "George S. Clason",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Finanças",
      avaliacao: 4.6,
      dataAdicao: "2023-11-10",
      disponivel: true,
    },
    {
      id: 11,
      titulo: "Admirável Mundo Novo",
      autor: "Aldous Huxley",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      avaliacao: 4.5,
      dataAdicao: "2023-11-05",
      disponivel: false,
    },
    {
      id: 12,
      titulo: "Algoritmos para Viver",
      autor: "Brian Christian",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ciência",
      avaliacao: 4.3,
      dataAdicao: "2023-11-01",
      disponivel: true,
    },
  ]

  // Dados de exemplo para coleções curadas
  const colecoesCuradas = [
    {
      id: "classicos-literatura",
      titulo: "Clássicos da Literatura",
      descricao: "Obras atemporais que todo leitor deveria conhecer",
      imagem: "/placeholder.svg?height=200&width=400",
      livros: [
        {
          id: 13,
          titulo: "Dom Quixote",
          autor: "Miguel de Cervantes",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 14,
          titulo: "Crime e Castigo",
          autor: "Fiódor Dostoiévski",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 15,
          titulo: "Orgulho e Preconceito",
          autor: "Jane Austen",
          capa: "/placeholder.svg?height=280&width=180",
        },
      ],
    },
    {
      id: "literatura-brasileira",
      titulo: "Joias da Literatura Brasileira",
      descricao: "O melhor da nossa literatura nacional",
      imagem: "/placeholder.svg?height=200&width=400",
      livros: [
        {
          id: 16,
          titulo: "Grande Sertão: Veredas",
          autor: "João Guimarães Rosa",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 17,
          titulo: "Memórias Póstumas de Brás Cubas",
          autor: "Machado de Assis",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 18,
          titulo: "Vidas Secas",
          autor: "Graciliano Ramos",
          capa: "/placeholder.svg?height=280&width=180",
        },
      ],
    },
    {
      id: "ficcao-cientifica",
      titulo: "Ficção Científica Essencial",
      descricao: "Visões do futuro que expandem a mente",
      imagem: "/placeholder.svg?height=200&width=400",
      livros: [
        {
          id: 19,
          titulo: "Fundação",
          autor: "Isaac Asimov",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 20,
          titulo: "2001: Uma Odisseia no Espaço",
          autor: "Arthur C. Clarke",
          capa: "/placeholder.svg?height=280&width=180",
        },
        {
          id: 21,
          titulo: "O Guia do Mochileiro das Galáxias",
          autor: "Douglas Adams",
          capa: "/placeholder.svg?height=280&width=180",
        },
      ],
    },
  ]

  // Dados de exemplo para livros salvos para ler depois
  const livrosSalvos = [
    {
      id: 22,
      titulo: "A Guerra dos Tronos",
      autor: "George R. R. Martin",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Fantasia",
      dataSalvo: "2023-10-15",
      disponivel: true,
    },
    {
      id: 23,
      titulo: "O Conto da Aia",
      autor: "Margaret Atwood",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      dataSalvo: "2023-10-10",
      disponivel: false,
    },
    {
      id: 24,
      titulo: "Flores para Algernon",
      autor: "Daniel Keyes",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      dataSalvo: "2023-09-28",
      disponivel: true,
    },
  ]

  // Função para salvar um livro para ler depois
  const salvarLivro = (livro: any) => {
    console.log("Livro salvo:", livro)
    // Aqui você implementaria a lógica para salvar o livro
    alert(`Livro "${livro.titulo}" salvo para ler depois!`)
  }

  // Função para remover um livro salvo
  const removerLivroSalvo = (livro: any) => {
    console.log("Livro removido:", livro)
    // Aqui você implementaria a lógica para remover o livro
    alert(`Livro "${livro.titulo}" removido da lista!`)
  }

  // Função para atualizar as preferências
  const atualizarPreferencias = () => {
    console.log("Preferências atualizadas:", preferences)
    setPreferencesOpen(false)
    // Aqui você implementaria a lógica para atualizar as preferências
    alert("Preferências de recomendação atualizadas com sucesso!")
  }

  // Função para alternar um gênero favorito
  const toggleGeneroFavorito = (genero: string) => {
    if (preferences.generosFavoritos.includes(genero)) {
      setPreferences({
        ...preferences,
        generosFavoritos: preferences.generosFavoritos.filter((g) => g !== genero),
      })
    } else {
      setPreferences({
        ...preferences,
        generosFavoritos: [...preferences.generosFavoritos, genero],
      })
    }
  }

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recomendações</h1>
          <p className="text-muted-foreground mt-2">
            Descubra novos livros baseados em seus interesses e histórico de leitura
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreferencesOpen(!preferencesOpen)}>
            <Settings className="mr-2 h-4 w-4" />
            Preferências
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Recomendações
          </Button>
        </div>
      </div>

      {/* Painel de preferências */}
      {preferencesOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Preferências de Recomendação</CardTitle>
            <CardDescription>Personalize como geramos recomendações para você</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="baseadoHistorico">Baseado no histórico de leitura</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber recomendações baseadas nos livros que você já leu
                  </p>
                </div>
                <Switch
                  id="baseadoHistorico"
                  checked={preferences.baseadoHistorico}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, baseadoHistorico: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="baseadoGeneros">Baseado em gêneros favoritos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber recomendações baseadas nos gêneros que você prefere
                  </p>
                </div>
                <Switch
                  id="baseadoGeneros"
                  checked={preferences.baseadoGeneros}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, baseadoGeneros: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="incluirLancamentos">Incluir lançamentos recentes</Label>
                  <p className="text-sm text-muted-foreground">Mostrar novos livros adicionados ao acervo</p>
                </div>
                <Switch
                  id="incluirLancamentos"
                  checked={preferences.incluirLancamentos}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, incluirLancamentos: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="incluirPopulares">Incluir livros populares</Label>
                  <p className="text-sm text-muted-foreground">Mostrar livros mais emprestados e bem avaliados</p>
                </div>
                <Switch
                  id="incluirPopulares"
                  checked={preferences.incluirPopulares}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, incluirPopulares: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="incluirCuradorias">Incluir coleções curadas</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar coleções especiais selecionadas pelos bibliotecários
                  </p>
                </div>
                <Switch
                  id="incluirCuradorias"
                  checked={preferences.incluirCuradorias}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, incluirCuradorias: checked })}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Gêneros favoritos</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Selecione os gêneros que você mais gosta para melhorar as recomendações
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fantasia",
                  "Ficção Científica",
                  "Romance",
                  "Mistério",
                  "Biografia",
                  "História",
                  "Não-ficção",
                  "Autoajuda",
                  "Literatura Brasileira",
                  "Poesia",
                  "Infantil",
                  "Técnico",
                ].map((genero) => (
                  <Badge
                    key={genero}
                    variant={preferences.generosFavoritos.includes(genero) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleGeneroFavorito(genero)}
                  >
                    {genero}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setPreferencesOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={atualizarPreferencias}>Salvar Preferências</Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="para-voce" className="space-y-4">
        <TabsList>
          <TabsTrigger value="para-voce">Para Você</TabsTrigger>
          <TabsTrigger value="populares">Populares</TabsTrigger>
          <TabsTrigger value="lancamentos">Lançamentos</TabsTrigger>
          <TabsTrigger value="colecoes">Coleções</TabsTrigger>
          <TabsTrigger value="salvos">Salvos</TabsTrigger>
        </TabsList>

        {/* Aba "Para Você" - Recomendações personalizadas */}
        <TabsContent value="para-voce">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recomendações Personalizadas</h2>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recomendações baseadas no seu histórico de leitura e preferências</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Select defaultValue="relevancia">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                    <SelectItem value="recentes">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {recomendacoesHistorico.map((livro) => (
                <Card key={livro.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-[2/3] w-full relative">
                    <img
                      src={livro.capa || "/placeholder.svg"}
                      alt={livro.titulo}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      {livro.disponivel ? "Disponível" : "Indisponível"}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="line-clamp-1 text-lg">{livro.titulo}</CardTitle>
                    <CardDescription>{livro.autor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{livro.avaliacao}</span>
                      <Badge variant="outline" className="ml-2">
                        {livro.genero}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <ThumbsUp className="h-3 w-3 inline mr-1" />
                      {livro.motivo}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/catalogo/${livro.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Detalhes
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => salvarLivro(livro)}>
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Aba "Populares" - Livros mais populares */}
        <TabsContent value="populares">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Livros Populares</h2>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Os livros mais emprestados e bem avaliados da biblioteca</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Select defaultValue="emprestimos">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emprestimos">Mais Emprestados</SelectItem>
                    <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {livrosPopulares.map((livro) => (
                <Card key={livro.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-[2/3] w-full relative">
                    <img
                      src={livro.capa || "/placeholder.svg"}
                      alt={livro.titulo}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      {livro.disponivel ? "Disponível" : "Indisponível"}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="line-clamp-1 text-lg">{livro.titulo}</CardTitle>
                    <CardDescription>{livro.autor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{livro.avaliacao}</span>
                      <Badge variant="outline" className="ml-2">
                        {livro.genero}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {livro.emprestimos} empréstimos este mês
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/catalogo/${livro.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Detalhes
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => salvarLivro(livro)}>
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Aba "Lançamentos" - Novos livros adicionados */}
        <TabsContent value="lancamentos">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Novos no Acervo</h2>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Livros recentemente adicionados ao acervo da biblioteca</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Select defaultValue="recentes">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recentes">Mais Recentes</SelectItem>
                    <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {novosLancamentos.map((livro) => (
                <Card key={livro.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-[2/3] w-full relative">
                    <img
                      src={livro.capa || "/placeholder.svg"}
                      alt={livro.titulo}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      {livro.disponivel ? "Disponível" : "Indisponível"}
                    </div>
                    <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      Novo
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="line-clamp-1 text-lg">{livro.titulo}</CardTitle>
                    <CardDescription>{livro.autor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{livro.avaliacao}</span>
                      <Badge variant="outline" className="ml-2">
                        {livro.genero}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Adicionado em {formatarData(livro.dataAdicao)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/catalogo/${livro.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Detalhes
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => salvarLivro(livro)}>
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Aba "Coleções" - Coleções curadas */}
        <TabsContent value="colecoes">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Coleções Curadas</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coleções especiais selecionadas pelos bibliotecários</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {colecoesCuradas.map((colecao) => (
              <Card key={colecao.id} className="overflow-hidden">
                <div className="md:grid md:grid-cols-[1fr_2fr]">
                  <div className="relative h-48 md:h-full">
                    <img
                      src={colecao.imagem || "/placeholder.svg"}
                      alt={colecao.titulo}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:hidden">
                      <h3 className="text-xl font-bold text-white">{colecao.titulo}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold hidden md:block">{colecao.titulo}</h3>
                      <p className="text-muted-foreground">{colecao.descricao}</p>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {colecao.livros.map((livro) => (
                        <div key={livro.id} className="flex-shrink-0 w-24">
                          <div className="aspect-[2/3] w-full mb-2">
                            <img
                              src={livro.capa || "/placeholder.svg"}
                              alt={livro.titulo}
                              className="object-cover w-full h-full rounded-sm"
                            />
                          </div>
                          <p className="text-xs font-medium line-clamp-1">{livro.titulo}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{livro.autor}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button asChild>
                        <Link href={`/colecoes/${colecao.id}`}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Ver Coleção
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba "Salvos" - Livros salvos para ler depois */}
        <TabsContent value="salvos">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Livros Salvos para Ler Depois</h2>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Livros que você salvou para ler posteriormente</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Select defaultValue="recentes">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recentes">Salvos Recentemente</SelectItem>
                    <SelectItem value="titulo">Título (A-Z)</SelectItem>
                    <SelectItem value="autor">Autor (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {livrosSalvos.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {livrosSalvos.map((livro) => (
                  <Card key={livro.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={livro.capa || "/placeholder.svg"}
                          alt={livro.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-bold line-clamp-1">{livro.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{livro.autor}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Badge variant="outline">{livro.genero}</Badge>
                          <Badge variant={livro.disponivel ? "default" : "secondary"} className="ml-1">
                            {livro.disponivel ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          <Bookmark className="h-3 w-3 inline mr-1" />
                          Salvo em {formatarData(livro.dataSalvo)}
                        </p>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/catalogo/${livro.id}`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Detalhes
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removerLivroSalvo(livro)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bookmark className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum livro salvo</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                    Você ainda não salvou nenhum livro para ler depois. Explore as recomendações e use o ícone de
                    marcador para salvar livros interessantes.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/catalogo">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explorar Catálogo
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Seção de "Porque recomendamos" */}
      <Card className="bg-muted/20 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Como funcionam nossas recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nossas recomendações são personalizadas com base em vários fatores:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <History className="h-4 w-4 text-primary mt-0.5" />
              <span>Seu histórico de leitura e empréstimos anteriores</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart className="h-4 w-4 text-primary mt-0.5" />
              <span>Gêneros e temas que você demonstrou interesse</span>
            </li>
            <li className="flex items-start gap-2">
              <Users className="h-4 w-4 text-primary mt-0.5" />
              <span>Livros populares entre usuários com interesses similares</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <span>Seleções especiais feitas pelos bibliotecários</span>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Ajuste suas preferências para melhorar a precisão das recomendações. Quanto mais você utiliza a biblioteca,
            melhores serão as sugestões!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
