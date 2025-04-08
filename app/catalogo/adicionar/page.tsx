"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, BookPlus } from "lucide-react"

export default function AdicionarLivroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isbn, setIsbn] = useState("")
  const [livroInfo, setLivroInfo] = useState<any>(null)

  // Dados de exemplo para o formulário
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editora: "",
    anoPublicacao: "",
    genero: "",
    isbn: "",
    descricao: "",
    quantidadeExemplares: "1",
    localizacao: "",
  })

  // Função simulada para buscar informações do livro por ISBN
  const buscarPorISBN = async () => {
    if (!isbn) return

    setIsLoading(true)

    // Simulando uma chamada de API
    try {
      // Em uma implementação real, você faria uma chamada para a API do Google Books ou Open Library
      // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      // const data = await response.json()

      // Simulando resposta após 1.5 segundos
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dados simulados baseados no ISBN
      const dadosSimulados = {
        titulo: "O Senhor dos Anéis: A Sociedade do Anel",
        autor: "J.R.R. Tolkien",
        editora: "HarperCollins",
        anoPublicacao: "2019",
        genero: "Fantasia",
        isbn: isbn,
        descricao:
          "Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e perigoso que precisa ser destruído antes que caia nas mãos do mal.",
        capa: "/placeholder.svg?height=280&width=180",
      }

      setLivroInfo(dadosSimulados)

      // Preencher o formulário com os dados obtidos
      setFormData({
        ...formData,
        titulo: dadosSimulados.titulo,
        autor: dadosSimulados.autor,
        editora: dadosSimulados.editora,
        anoPublicacao: dadosSimulados.anoPublicacao,
        genero: dadosSimulados.genero,
        isbn: dadosSimulados.isbn,
        descricao: dadosSimulados.descricao,
      })
    } catch (error) {
      console.error("Erro ao buscar informações do livro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o livro no banco de dados
    console.log("Dados do livro a serem salvos:", formData)

    // Simulando sucesso e redirecionando
    setTimeout(() => {
      router.push("/catalogo")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Novo Livro</h1>
        <p className="text-muted-foreground mt-2">Cadastre um novo livro no sistema da biblioteca</p>
      </div>

      <Tabs defaultValue="isbn" className="space-y-4">
        <TabsList>
          <TabsTrigger value="isbn">Buscar por ISBN</TabsTrigger>
          <TabsTrigger value="manual">Cadastro Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="isbn">
          <Card>
            <CardHeader>
              <CardTitle>Buscar livro por ISBN</CardTitle>
              <CardDescription>Digite o ISBN para buscar automaticamente as informações do livro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Digite o ISBN (ex: 9788533613379)"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                <Button onClick={buscarPorISBN} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>

              {livroInfo && (
                <div className="mt-6 grid md:grid-cols-[200px_1fr] gap-6">
                  <div>
                    <img
                      src={livroInfo.capa || "/placeholder.svg"}
                      alt={livroInfo.titulo}
                      className="w-full rounded-md border"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{livroInfo.titulo}</h3>
                    <p className="text-muted-foreground">por {livroInfo.autor}</p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium">Editora</p>
                        <p className="text-sm text-muted-foreground">{livroInfo.editora}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ano de Publicação</p>
                        <p className="text-sm text-muted-foreground">{livroInfo.anoPublicacao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gênero</p>
                        <p className="text-sm text-muted-foreground">{livroInfo.genero}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">ISBN</p>
                        <p className="text-sm text-muted-foreground">{livroInfo.isbn}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium">Descrição</p>
                      <p className="text-sm text-muted-foreground">{livroInfo.descricao}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {livroInfo && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setLivroInfo(null)}>
                  Limpar
                </Button>
                <Button onClick={() => document.getElementById("form-manual")?.scrollIntoView({ behavior: "smooth" })}>
                  Continuar para detalhes adicionais
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="manual" id="form-manual">
          <Card>
            <CardHeader>
              <CardTitle>Cadastro Manual</CardTitle>
              <CardDescription>Preencha os detalhes do livro manualmente</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autor">Autor</Label>
                    <Input
                      id="autor"
                      value={formData.autor}
                      onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editora">Editora</Label>
                    <Input
                      id="editora"
                      value={formData.editora}
                      onChange={(e) => setFormData({ ...formData, editora: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anoPublicacao">Ano de Publicação</Label>
                    <Input
                      id="anoPublicacao"
                      value={formData.anoPublicacao}
                      onChange={(e) => setFormData({ ...formData, anoPublicacao: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genero">Gênero</Label>
                    <Select
                      value={formData.genero}
                      onValueChange={(value) => setFormData({ ...formData, genero: value })}
                    >
                      <SelectTrigger id="genero">
                        <SelectValue placeholder="Selecione um gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ficcao">Ficção</SelectItem>
                        <SelectItem value="nao-ficcao">Não-ficção</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="fantasia">Fantasia</SelectItem>
                        <SelectItem value="biografia">Biografia</SelectItem>
                        <SelectItem value="historia">História</SelectItem>
                        <SelectItem value="ciencia">Ciência</SelectItem>
                        <SelectItem value="infantil">Infantil</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantidadeExemplares">Quantidade de Exemplares</Label>
                    <Input
                      id="quantidadeExemplares"
                      type="number"
                      min="1"
                      value={formData.quantidadeExemplares}
                      onChange={(e) => setFormData({ ...formData, quantidadeExemplares: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localizacao">Localização na Biblioteca</Label>
                    <Input
                      id="localizacao"
                      placeholder="Ex: Estante A, Prateleira 3"
                      value={formData.localizacao}
                      onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição/Sinopse</Label>
                  <Textarea
                    id="descricao"
                    rows={5}
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capa">Capa do Livro</Label>
                  <Input id="capa" type="file" accept="image/*" />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => router.push("/catalogo")}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <BookPlus className="mr-2 h-4 w-4" />
                    Cadastrar Livro
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
