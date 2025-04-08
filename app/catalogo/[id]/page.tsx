import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookMarked, Edit, Star, Clock, Users } from "lucide-react"

export default function DetalhesLivroPage({ params }: { params: { id: string } }) {
  // Em uma implementação real, você buscaria os detalhes do livro com base no ID
  const livro = {
    id: params.id,
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    editora: "HarperCollins",
    anoPublicacao: "2019",
    genero: "Fantasia",
    isbn: "9788533613379",
    descricao:
      "Em uma terra fantástica e única, um hobbit recebe de presente de seu tio um anel mágico e perigoso que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado, seus fiéis amigos o ajudarão a seguir a jornada. Baseado na obra de J. R. R. Tolkien.",
    capa: "/placeholder.svg?height=400&width=280",
    disponivel: true,
    exemplares: [
      { id: "1", estado: "Bom", localizacao: "Estante A, Prateleira 3", disponivel: true },
      { id: "2", estado: "Desgastado", localizacao: "Estante A, Prateleira 3", disponivel: false },
    ],
    avaliacoes: [
      {
        usuario: "Maria Silva",
        nota: 5,
        comentario: "Excelente livro, uma das melhores obras de fantasia já escritas!",
        data: "2023-10-15",
      },
      {
        usuario: "João Santos",
        nota: 4,
        comentario: "Muito bom, mas achei um pouco longo em algumas partes.",
        data: "2023-09-22",
      },
    ],
    historicoEmprestimos: [
      { usuario: "Ana Oliveira", dataEmprestimo: "2023-08-10", dataDevolucao: "2023-08-17", status: "Devolvido" },
      {
        usuario: "Carlos Mendes",
        dataEmprestimo: "2023-07-05",
        dataDevolucao: "2023-07-19",
        status: "Devolvido com atraso",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{livro.titulo}</h1>
          <p className="text-muted-foreground mt-2">por {livro.autor}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button disabled={!livro.disponivel}>
            <BookMarked className="mr-2 h-4 w-4" />
            {livro.disponivel ? "Emprestar" : "Reservar"}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-4">
          <img src={livro.capa || "/placeholder.svg"} alt={livro.titulo} className="w-full rounded-md border" />

          <div className="space-y-2">
            <Badge
              variant={livro.disponivel ? "default" : "secondary"}
              className="w-full justify-center text-center py-1"
            >
              {livro.disponivel ? "Disponível" : "Indisponível"}
            </Badge>

            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <Star className="h-4 w-4 fill-primary text-primary" />
              <Star className="h-4 w-4 fill-primary text-primary" />
              <Star className="h-4 w-4 fill-primary text-primary" />
              <Star className="h-4 w-4 fill-muted text-muted-foreground" />
              <span className="text-sm font-medium ml-1">4.5</span>
            </div>
          </div>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Informações</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Editora:</dt>
                  <dd>{livro.editora}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Ano:</dt>
                  <dd>{livro.anoPublicacao}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Gênero:</dt>
                  <dd>{livro.genero}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ISBN:</dt>
                  <dd>{livro.isbn}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Exemplares:</dt>
                  <dd>{livro.exemplares.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Disponíveis:</dt>
                  <dd>{livro.exemplares.filter((ex) => ex.disponivel).length}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sinopse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{livro.descricao}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="exemplares" className="space-y-4">
            <TabsList>
              <TabsTrigger value="exemplares">Exemplares</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="exemplares">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplares Disponíveis</CardTitle>
                  <CardDescription>Detalhes sobre os exemplares físicos deste livro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {livro.exemplares.map((exemplar) => (
                      <div
                        key={exemplar.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">Exemplar #{exemplar.id}</p>
                          <p className="text-sm text-muted-foreground">Estado: {exemplar.estado}</p>
                          <p className="text-sm text-muted-foreground">Localização: {exemplar.localizacao}</p>
                        </div>
                        <Badge variant={exemplar.disponivel ? "outline" : "secondary"}>
                          {exemplar.disponivel ? "Disponível" : "Emprestado"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacoes">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações dos Usuários</CardTitle>
                  <CardDescription>O que os leitores estão dizendo sobre este livro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {livro.avaliacoes.map((avaliacao, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{avaliacao.usuario}</p>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < avaliacao.nota ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{avaliacao.data}</p>
                        <p className="mt-2">{avaliacao.comentario}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Adicionar Avaliação
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Empréstimos</CardTitle>
                  <CardDescription>Registro de empréstimos anteriores deste livro</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {livro.historicoEmprestimos.map((emprestimo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{emprestimo.usuario}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>Empréstimo: {emprestimo.dataEmprestimo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Devolução: {emprestimo.dataDevolucao}</span>
                          </div>
                        </div>
                        <Badge variant={emprestimo.status === "Devolvido" ? "outline" : "secondary"}>
                          {emprestimo.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
