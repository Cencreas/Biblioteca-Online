"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Save, History, Filter, X, BookMarked, Star } from "lucide-react"

export default function BuscaAvancadaPage() {
  // Estado para controlar os resultados da busca
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [yearRange, setYearRange] = useState([1900, 2025])

  // Estado para controlar os campos de busca
  const [searchForm, setSearchForm] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    editora: "",
    assunto: "",
    generos: [] as string[],
    idiomas: [] as string[],
    apenasDisponiveis: false,
    incluirEbooks: false,
  })

  // Dados de exemplo para os resultados da busca
  const livrosExemplo = [
    {
      id: 1,
      titulo: "O Senhor dos Anéis: A Sociedade do Anel",
      autor: "J.R.R. Tolkien",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Fantasia",
      disponivel: true,
      exemplares: 3,
      exemplaresDispo: 2,
      editora: "HarperCollins",
      anoPublicacao: 2019,
      isbn: "9788533613379",
      avaliacao: 4.9,
      idioma: "Português",
      formato: "Físico",
      assuntos: ["Aventura", "Fantasia Medieval", "Jornada do Herói"],
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Ficção Científica",
      disponivel: false,
      exemplares: 2,
      exemplaresDispo: 0,
      editora: "Companhia das Letras",
      anoPublicacao: 2009,
      isbn: "9788535914849",
      avaliacao: 4.7,
      idioma: "Português",
      formato: "Físico",
      assuntos: ["Distopia", "Totalitarismo", "Política"],
    },
    {
      id: 3,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Literatura Brasileira",
      disponivel: true,
      exemplares: 5,
      exemplaresDispo: 3,
      editora: "Penguin",
      anoPublicacao: 2016,
      isbn: "9788582850350",
      avaliacao: 4.8,
      idioma: "Português",
      formato: "Físico",
      assuntos: ["Literatura Brasileira", "Realismo", "Romance"],
    },
    {
      id: 4,
      titulo: "Harry Potter e a Pedra Filosofal",
      autor: "J.K. Rowling",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Fantasia",
      disponivel: true,
      exemplares: 4,
      exemplaresDispo: 1,
      editora: "Rocco",
      anoPublicacao: 2017,
      isbn: "9788532530783",
      avaliacao: 4.8,
      idioma: "Português",
      formato: "Físico e E-book",
      assuntos: ["Magia", "Escola", "Aventura"],
    },
    {
      id: 5,
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Infantil",
      disponivel: false,
      exemplares: 3,
      exemplaresDispo: 0,
      editora: "Agir",
      anoPublicacao: 2015,
      isbn: "9788522005314",
      avaliacao: 4.9,
      idioma: "Português",
      formato: "Físico",
      assuntos: ["Fábula", "Filosofia", "Infantil"],
    },
    {
      id: 6,
      titulo: "Orgulho e Preconceito",
      autor: "Jane Austen",
      capa: "/placeholder.svg?height=280&width=180",
      genero: "Romance",
      disponivel: true,
      exemplares: 2,
      exemplaresDispo: 2,
      editora: "Martin Claret",
      anoPublicacao: 2018,
      isbn: "9788544001820",
      avaliacao: 4.7,
      idioma: "Português",
      formato: "Físico",
      assuntos: ["Romance", "Literatura Inglesa", "Crítica Social"],
    },
  ]

  // Histórico de buscas (simulado)
  const searchHistory = [
    { id: 1, query: "Fantasia medieval", date: "2023-11-15", results: 12 },
    { id: 2, query: "Literatura brasileira século XIX", date: "2023-11-10", results: 8 },
    { id: 3, query: "Machado de Assis", date: "2023-11-05", results: 15 },
    { id: 4, query: "Distopias", date: "2023-10-28", results: 6 },
  ]

  // Buscas salvas (simulado)
  const savedSearches = [
    { id: 1, name: "Leituras para aula de literatura", query: "Literatura brasileira clássica", results: 18 },
    { id: 2, name: "Pesquisa TCC", query: "Filosofia contemporânea", results: 24 },
    { id: 3, name: "Clube do livro", query: "Ficção científica premiada", results: 9 },
  ]

  // Função para realizar a busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulando uma busca com filtros
    let results = [...livrosExemplo]

    // Aplicar filtros básicos
    if (searchForm.titulo) {
      results = results.filter((livro) => livro.titulo.toLowerCase().includes(searchForm.titulo.toLowerCase()))
    }

    if (searchForm.autor) {
      results = results.filter((livro) => livro.autor.toLowerCase().includes(searchForm.autor.toLowerCase()))
    }

    if (searchForm.isbn) {
      results = results.filter((livro) => livro.isbn.includes(searchForm.isbn))
    }

    if (searchForm.editora) {
      results = results.filter((livro) => livro.editora.toLowerCase().includes(searchForm.editora.toLowerCase()))
    }

    if (searchForm.assunto) {
      results = results.filter((livro) =>
        livro.assuntos.some((assunto) => assunto.toLowerCase().includes(searchForm.assunto.toLowerCase())),
      )
    }

    // Filtrar por ano de publicação
    results = results.filter((livro) => livro.anoPublicacao >= yearRange[0] && livro.anoPublicacao <= yearRange[1])

    // Filtrar por disponibilidade
    if (searchForm.apenasDisponiveis) {
      results = results.filter((livro) => livro.disponivel)
    }

    // Filtrar por gêneros selecionados
    if (searchForm.generos.length > 0) {
      results = results.filter((livro) => searchForm.generos.includes(livro.genero))
    }

    // Filtrar por idiomas selecionados
    if (searchForm.idiomas.length > 0) {
      results = results.filter((livro) => searchForm.idiomas.includes(livro.idioma))
    }

    // Atualizar os resultados e marcar que a busca foi realizada
    setSearchResults(results)
    setHasSearched(true)

    // Construir lista de filtros ativos para exibição
    const filters = []
    if (searchForm.titulo) filters.push(`Título: ${searchForm.titulo}`)
    if (searchForm.autor) filters.push(`Autor: ${searchForm.autor}`)
    if (searchForm.isbn) filters.push(`ISBN: ${searchForm.isbn}`)
    if (searchForm.editora) filters.push(`Editora: ${searchForm.editora}`)
    if (searchForm.assunto) filters.push(`Assunto: ${searchForm.assunto}`)
    if (yearRange[0] !== 1900 || yearRange[1] !== 2025) filters.push(`Ano: ${yearRange[0]}-${yearRange[1]}`)
    if (searchForm.apenasDisponiveis) filters.push("Apenas disponíveis")
    if (searchForm.incluirEbooks) filters.push("Incluir e-books")
    if (searchForm.generos.length > 0) filters.push(`Gêneros: ${searchForm.generos.join(", ")}`)
    if (searchForm.idiomas.length > 0) filters.push(`Idiomas: ${searchForm.idiomas.join(", ")}`)

    setActiveFilters(filters)
  }

  // Função para limpar os filtros
  const clearFilters = () => {
    setSearchForm({
      titulo: "",
      autor: "",
      isbn: "",
      editora: "",
      assunto: "",
      generos: [],
      idiomas: [],
      apenasDisponiveis: false,
      incluirEbooks: false,
    })
    setYearRange([1900, 2025])
    setActiveFilters([])
    setHasSearched(false)
    setSearchResults([])
  }

  // Função para atualizar os gêneros selecionados
  const toggleGenero = (genero: string) => {
    if (searchForm.generos.includes(genero)) {
      setSearchForm({
        ...searchForm,
        generos: searchForm.generos.filter((g) => g !== genero),
      })
    } else {
      setSearchForm({
        ...searchForm,
        generos: [...searchForm.generos, genero],
      })
    }
  }

  // Função para atualizar os idiomas selecionados
  const toggleIdioma = (idioma: string) => {
    if (searchForm.idiomas.includes(idioma)) {
      setSearchForm({
        ...searchForm,
        idiomas: searchForm.idiomas.filter((i) => i !== idioma),
      })
    } else {
      setSearchForm({
        ...searchForm,
        idiomas: [...searchForm.idiomas, idioma],
      })
    }
  }

  // Função para remover um filtro específico
  const removeFilter = (filter: string) => {
    const filterType = filter.split(":")[0].trim()

    switch (filterType) {
      case "Título":
        setSearchForm({ ...searchForm, titulo: "" })
        break
      case "Autor":
        setSearchForm({ ...searchForm, autor: "" })
        break
      case "ISBN":
        setSearchForm({ ...searchForm, isbn: "" })
        break
      case "Editora":
        setSearchForm({ ...searchForm, editora: "" })
        break
      case "Assunto":
        setSearchForm({ ...searchForm, assunto: "" })
        break
      case "Ano":
        setYearRange([1900, 2025])
        break
      case "Apenas disponíveis":
        setSearchForm({ ...searchForm, apenasDisponiveis: false })
        break
      case "Incluir e-books":
        setSearchForm({ ...searchForm, incluirEbooks: false })
        break
      case "Gêneros":
        setSearchForm({ ...searchForm, generos: [] })
        break
      case "Idiomas":
        setSearchForm({ ...searchForm, idiomas: [] })
        break
      default:
        break
    }

    // Remover o filtro da lista de filtros ativos
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Refazer a busca com os novos filtros
    handleSearch(new Event("submit") as any)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Busca Avançada</h1>
        <p className="text-muted-foreground mt-2">Encontre livros usando critérios específicos e filtros avançados</p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Painel de busca avançada */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Critérios de Busca</CardTitle>
              <CardDescription>Defina os parâmetros para encontrar livros específicos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    placeholder="Digite o título do livro"
                    value={searchForm.titulo}
                    onChange={(e) => setSearchForm({ ...searchForm, titulo: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input
                    id="autor"
                    placeholder="Nome do autor"
                    value={searchForm.autor}
                    onChange={(e) => setSearchForm({ ...searchForm, autor: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    placeholder="Código ISBN"
                    value={searchForm.isbn}
                    onChange={(e) => setSearchForm({ ...searchForm, isbn: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editora">Editora</Label>
                  <Input
                    id="editora"
                    placeholder="Nome da editora"
                    value={searchForm.editora}
                    onChange={(e) => setSearchForm({ ...searchForm, editora: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto/Palavras-chave</Label>
                  <Textarea
                    id="assunto"
                    placeholder="Digite assuntos ou palavras-chave"
                    value={searchForm.assunto}
                    onChange={(e) => setSearchForm({ ...searchForm, assunto: e.target.value })}
                  />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ano">
                    <AccordionTrigger>Ano de Publicação</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                        <Slider
                          defaultValue={[1900, 2025]}
                          min={1800}
                          max={2025}
                          step={1}
                          value={yearRange}
                          onValueChange={setYearRange}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="generos">
                    <AccordionTrigger>Gêneros</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {[
                          "Ficção",
                          "Não-ficção",
                          "Romance",
                          "Fantasia",
                          "Biografia",
                          "História",
                          "Ciência",
                          "Infantil",
                          "Literatura Brasileira",
                          "Ficção Científica",
                        ].map((genero) => (
                          <div key={genero} className="flex items-center space-x-2">
                            <Checkbox
                              id={`genero-${genero}`}
                              checked={searchForm.generos.includes(genero)}
                              onCheckedChange={() => toggleGenero(genero)}
                            />
                            <label
                              htmlFor={`genero-${genero}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {genero}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="idiomas">
                    <AccordionTrigger>Idiomas</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {["Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano"].map((idioma) => (
                          <div key={idioma} className="flex items-center space-x-2">
                            <Checkbox
                              id={`idioma-${idioma}`}
                              checked={searchForm.idiomas.includes(idioma)}
                              onCheckedChange={() => toggleIdioma(idioma)}
                            />
                            <label
                              htmlFor={`idioma-${idioma}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {idioma}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="disponibilidade">
                    <AccordionTrigger>Disponibilidade</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="apenas-disponiveis"
                            checked={searchForm.apenasDisponiveis}
                            onCheckedChange={(checked) =>
                              setSearchForm({ ...searchForm, apenasDisponiveis: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="apenas-disponiveis"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Apenas livros disponíveis
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="incluir-ebooks"
                            checked={searchForm.incluirEbooks}
                            onCheckedChange={(checked) =>
                              setSearchForm({ ...searchForm, incluirEbooks: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="incluir-ebooks"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Incluir e-books
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </Button>
                  <Button type="button" variant="outline" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Limpar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="saved">Buscas Salvas</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm">Histórico de Buscas</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    {searchHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{item.query}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.date} • {item.results} resultados
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saved">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-sm">Buscas Salvas</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    {savedSearches.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.query} • {item.results} resultados
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resultados da busca */}
        <div className="space-y-4">
          {hasSearched && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Resultados da Busca</h2>
                  <p className="text-sm text-muted-foreground">
                    {searchResults.length} {searchResults.length === 1 ? "livro encontrado" : "livros encontrados"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Busca
                  </Button>
                </div>
              </div>

              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2">
                  <div className="flex items-center mr-2">
                    <Filter className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Filtros:</span>
                  </div>
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {filter}
                      <button onClick={() => removeFilter(filter)} className="ml-1 rounded-full hover:bg-muted">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
                    Limpar todos
                  </Button>
                </div>
              )}

              {searchResults.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Capa</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Gênero</TableHead>
                        <TableHead>Editora</TableHead>
                        <TableHead>Ano</TableHead>
                        <TableHead className="text-center">Avaliação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((livro) => (
                        <TableRow key={livro.id}>
                          <TableCell>
                            <img
                              src={livro.capa || "/placeholder.svg"}
                              alt={livro.titulo}
                              className="w-12 h-16 object-cover rounded-sm"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{livro.titulo}</TableCell>
                          <TableCell>{livro.autor}</TableCell>
                          <TableCell>{livro.genero}</TableCell>
                          <TableCell>{livro.editora}</TableCell>
                          <TableCell>{livro.anoPublicacao}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="ml-1">{livro.avaliacao}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/catalogo/${livro.id}`}>
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  Detalhes
                                </Link>
                              </Button>
                              <Button size="sm" disabled={!livro.disponivel}>
                                <BookMarked className="mr-2 h-4 w-4" />
                                {livro.disponivel ? "Emprestar" : "Reservar"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Card className="bg-muted/40">
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Search className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum resultado encontrado</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                      Tente ajustar seus critérios de busca ou remover alguns filtros para encontrar mais resultados.
                    </p>
                    <Button variant="outline" onClick={clearFilters} className="mt-4">
                      Limpar todos os filtros
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!hasSearched && (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mb-6" />
                <h3 className="text-xl font-medium">Busca Avançada</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mt-2">
                  Use os filtros à esquerda para encontrar livros específicos no acervo da biblioteca. Você pode buscar
                  por título, autor, ISBN, editora, gênero e muito mais.
                </p>
                <Button onClick={() => document.getElementById("titulo")?.focus()} className="mt-6">
                  Iniciar Busca
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
