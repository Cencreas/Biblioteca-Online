"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BookPlus,
  Search,
  Grid,
  List,
  Download,
  SortAsc,
  SortDesc,
  Filter,
  FileDown,
  Star,
  BookOpen,
} from "lucide-react"

export default function CatalogoPage() {
  // Estados para controlar a visualização e ordenação
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("title-asc")

  // Dados de exemplo para os livros
  const livros = [
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
      anoPublicacao: "2019",
      isbn: "9788533613379",
      avaliacao: 4.9,
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
      anoPublicacao: "2009",
      isbn: "9788535914849",
      avaliacao: 4.7,
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
      anoPublicacao: "2016",
      isbn: "9788582850350",
      avaliacao: 4.8,
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
      anoPublicacao: "2017",
      isbn: "9788532530783",
      avaliacao: 4.8,
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
      anoPublicacao: "2015",
      isbn: "9788522005314",
      avaliacao: 4.9,
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
      anoPublicacao: "2018",
      isbn: "9788544001820",
      avaliacao: 4.7,
    },
  ]

  // Função para ordenar os livros
  const sortedLivros = [...livros].sort((a, b) => {
    switch (sortBy) {
      case "title-asc":
        return a.titulo.localeCompare(b.titulo)
      case "title-desc":
        return b.titulo.localeCompare(a.titulo)
      case "author-asc":
        return a.autor.localeCompare(b.autor)
      case "author-desc":
        return b.autor.localeCompare(a.autor)
      case "year-asc":
        return a.anoPublicacao.localeCompare(b.anoPublicacao)
      case "year-desc":
        return b.anoPublicacao.localeCompare(a.anoPublicacao)
      case "rating-desc":
        return b.avaliacao - a.avaliacao
      case "rating-asc":
        return a.avaliacao - b.avaliacao
      default:
        return 0
    }
  })

  // Função para exportar dados (simulada)
  const exportData = (format: "pdf" | "excel") => {
    alert(`Exportando catálogo em formato ${format}...`)
    // Em uma implementação real, você chamaria uma API para gerar o arquivo
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Catálogo de Livros</h1>
          <p className="text-muted-foreground mt-2">Explore o acervo completo da biblioteca</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/catalogo/adicionar">
              <BookPlus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Adicionar Livro</span>
              <span className="sm:hidden">Adicionar</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Formato de Exportação</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportData("pdf")}>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar como PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData("excel")}>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar como Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar por título, autor ou ISBN..." className="w-full pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os gêneros</SelectItem>
                <SelectItem value="ficcao">Ficção</SelectItem>
                <SelectItem value="nao-ficcao">Não-ficção</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="fantasia">Fantasia</SelectItem>
                <SelectItem value="biografia">Biografia</SelectItem>
                <SelectItem value="historia">História</SelectItem>
                <SelectItem value="ciencia">Ciência</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger>
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="disponivel">Disponível</SelectItem>
                <SelectItem value="emprestado">Emprestado</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy("title-asc")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Título (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("title-desc")}>
                <SortDesc className="mr-2 h-4 w-4" />
                Título (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("author-asc")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Autor (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("author-desc")}>
                <SortDesc className="mr-2 h-4 w-4" />
                Autor (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("year-desc")}>
                <SortDesc className="mr-2 h-4 w-4" />
                Mais recentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("year-asc")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Mais antigos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating-desc")}>
                <Star className="mr-2 h-4 w-4" />
                Melhor avaliados
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-muted" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedLivros.map((livro) => (
            <Card key={livro.id} className="overflow-hidden flex flex-col">
              <div className="aspect-[2/3] w-full relative">
                <img src={livro.capa || "/placeholder.svg"} alt={livro.titulo} className="object-cover w-full h-full" />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                  {livro.disponivel ? "Disponível" : "Indisponível"}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{livro.titulo}</CardTitle>
                <div className="text-sm text-muted-foreground">{livro.autor}</div>
                <div className="flex items-center mt-1">
                  <div className="text-sm font-medium">{livro.avaliacao} ★</div>
                  <div className="text-xs text-muted-foreground ml-2">{livro.genero}</div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" asChild>
                  <Link href={`/catalogo/${livro.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Detalhes
                  </Link>
                </Button>
                <Button disabled={!livro.disponivel}>{livro.disponivel ? "Emprestar" : "Reservar"}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Capa</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Autor</TableHead>
                <TableHead className="hidden lg:table-cell">Gênero</TableHead>
                <TableHead className="hidden lg:table-cell">Editora</TableHead>
                <TableHead className="hidden lg:table-cell">Ano</TableHead>
                <TableHead className="text-center hidden md:table-cell">Exemplares</TableHead>
                <TableHead className="text-center hidden md:table-cell">Disponíveis</TableHead>
                <TableHead className="text-center">Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLivros.map((livro) => (
                <TableRow key={livro.id}>
                  <TableCell>
                    <img
                      src={livro.capa || "/placeholder.svg"}
                      alt={livro.titulo}
                      className="w-12 h-16 object-cover rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{livro.titulo}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{livro.autor}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{livro.autor}</TableCell>
                  <TableCell className="hidden lg:table-cell">{livro.genero}</TableCell>
                  <TableCell className="hidden lg:table-cell">{livro.editora}</TableCell>
                  <TableCell className="hidden lg:table-cell">{livro.anoPublicacao}</TableCell>
                  <TableCell className="text-center hidden md:table-cell">{livro.exemplares}</TableCell>
                  <TableCell className="text-center hidden md:table-cell">{livro.exemplaresDispo}</TableCell>
                  <TableCell className="text-center">{livro.avaliacao} ★</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/catalogo/${livro.id}`}>Detalhes</Link>
                      </Button>
                      <Button size="sm" disabled={!livro.disponivel}>
                        {livro.disponivel ? "Emprestar" : "Reservar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
