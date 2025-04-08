"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  BookOpen,
  Clock,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  BookMarked,
  Plus,
  XCircle,
  ArrowUpRight,
  Bell,
} from "lucide-react"

export default function EmprestimosPage() {
  // Estados para controlar os diálogos
  const [isRenovarDialogOpen, setIsRenovarDialogOpen] = useState(false)
  const [isDevolverDialogOpen, setIsDevolverDialogOpen] = useState(false)
  const [isNovoEmprestimoDialogOpen, setIsNovoEmprestimoDialogOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<any>(null)

  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("ativos")

  // Dados de exemplo para empréstimos ativos
  const emprestimosAtivos = [
    {
      id: 1,
      livro: "O Senhor dos Anéis: A Sociedade do Anel",
      autor: "J.R.R. Tolkien",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Maria Silva",
      dataEmprestimo: "2023-11-10",
      dataDevolucao: "2023-11-24",
      status: "Em dia",
      renovacoes: 0,
      renovacoesRestantes: 2,
    },
    {
      id: 2,
      livro: "1984",
      autor: "George Orwell",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "João Santos",
      dataEmprestimo: "2023-11-05",
      dataDevolucao: "2023-11-19",
      status: "Atrasado",
      diasAtraso: 3,
      multa: 3.0,
      renovacoes: 1,
      renovacoesRestantes: 1,
    },
    {
      id: 3,
      livro: "Harry Potter e a Pedra Filosofal",
      autor: "J.K. Rowling",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Ana Oliveira",
      dataEmprestimo: "2023-11-15",
      dataDevolucao: "2023-11-29",
      status: "Em dia",
      renovacoes: 0,
      renovacoesRestantes: 2,
    },
  ]

  // Dados de exemplo para histórico de empréstimos
  const historicoEmprestimos = [
    {
      id: 101,
      livro: "Dom Casmurro",
      autor: "Machado de Assis",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Maria Silva",
      dataEmprestimo: "2023-10-01",
      dataDevolucao: "2023-10-15",
      dataDevolvido: "2023-10-14",
      status: "Devolvido",
      renovacoes: 0,
    },
    {
      id: 102,
      livro: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Carlos Mendes",
      dataEmprestimo: "2023-09-20",
      dataDevolucao: "2023-10-04",
      dataDevolvido: "2023-10-06",
      status: "Devolvido com atraso",
      diasAtraso: 2,
      multa: 2.0,
      multaPaga: true,
      renovacoes: 1,
    },
    {
      id: 103,
      livro: "Orgulho e Preconceito",
      autor: "Jane Austen",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Ana Oliveira",
      dataEmprestimo: "2023-10-10",
      dataDevolucao: "2023-10-24",
      dataDevolvido: "2023-10-24",
      status: "Devolvido",
      renovacoes: 0,
    },
  ]

  // Dados de exemplo para reservas
  const reservas = [
    {
      id: 201,
      livro: "A Revolução dos Bichos",
      autor: "George Orwell",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Pedro Almeida",
      dataReserva: "2023-11-15",
      posicaoFila: 1,
      status: "Aguardando disponibilidade",
    },
    {
      id: 202,
      livro: "Cem Anos de Solidão",
      autor: "Gabriel García Márquez",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Lucia Ferreira",
      dataReserva: "2023-11-12",
      dataDisponivel: "2023-11-20",
      status: "Disponível para retirada",
      prazoRetirada: "2023-11-23",
    },
    {
      id: 203,
      livro: "O Hobbit",
      autor: "J.R.R. Tolkien",
      capa: "/placeholder.svg?height=280&width=180",
      usuario: "Rafael Costa",
      dataReserva: "2023-11-18",
      posicaoFila: 3,
      status: "Aguardando disponibilidade",
    },
  ]

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  // Função para calcular dias restantes
  const calcularDiasRestantes = (dataDevolucao: string) => {
    const hoje = new Date()
    const dataDevol = new Date(dataDevolucao)
    const diffTempo = dataDevol.getTime() - hoje.getTime()
    const diffDias = Math.ceil(diffTempo / (1000 * 3600 * 24))
    return diffDias
  }

  // Função para renovar empréstimo
  const renovarEmprestimo = (emprestimo: any) => {
    setSelectedLoan(emprestimo)
    setIsRenovarDialogOpen(true)
  }

  // Função para devolver livro
  const devolverLivro = (emprestimo: any) => {
    setSelectedLoan(emprestimo)
    setIsDevolverDialogOpen(true)
  }

  // Função para confirmar renovação
  const confirmarRenovacao = () => {
    // Aqui você implementaria a lógica para renovar o empréstimo
    console.log("Renovando empréstimo:", selectedLoan)
    setIsRenovarDialogOpen(false)

    // Simulando atualização do estado
    alert(`Empréstimo do livro "${selectedLoan.livro}" renovado com sucesso!`)
  }

  // Função para confirmar devolução
  const confirmarDevolucao = () => {
    // Aqui você implementaria a lógica para registrar a devolução
    console.log("Devolvendo livro:", selectedLoan)
    setIsDevolverDialogOpen(false)

    // Simulando atualização do estado
    alert(`Livro "${selectedLoan.livro}" devolvido com sucesso!`)
  }

  // Função para cancelar reserva
  const cancelarReserva = (reserva: any) => {
    // Aqui você implementaria a lógica para cancelar a reserva
    console.log("Cancelando reserva:", reserva)

    // Simulando atualização do estado
    alert(`Reserva do livro "${reserva.livro}" cancelada com sucesso!`)
  }

  // Função para registrar retirada de livro reservado
  const registrarRetirada = (reserva: any) => {
    // Aqui você implementaria a lógica para registrar a retirada
    console.log("Registrando retirada:", reserva)

    // Simulando atualização do estado
    alert(`Retirada do livro "${reserva.livro}" registrada com sucesso!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empréstimos</h1>
          <p className="text-muted-foreground mt-2">Gerencie empréstimos, devoluções e reservas de livros</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsNovoEmprestimoDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Empréstimo
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar por livro ou usuário..." className="pl-8" />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="em-dia">Em dia</SelectItem>
            <SelectItem value="atrasado">Atrasados</SelectItem>
            <SelectItem value="vencendo">Vencendo hoje</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="ativos" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="ativos" className="relative">
            Empréstimos Ativos
            <Badge className="ml-2 px-1.5 h-5 absolute -top-2 -right-2 bg-primary text-primary-foreground">
              {emprestimosAtivos.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="reservas" className="relative">
            Reservas
            <Badge className="ml-2 px-1.5 h-5 absolute -top-2 -right-2 bg-primary text-primary-foreground">
              {reservas.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ativos">
          <Card>
            <CardHeader>
              <CardTitle>Empréstimos Ativos</CardTitle>
              <CardDescription>Livros emprestados que ainda não foram devolvidos</CardDescription>
            </CardHeader>
            <CardContent>
              {emprestimosAtivos.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Capa</TableHead>
                        <TableHead>Livro</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Data Empréstimo</TableHead>
                        <TableHead>Data Devolução</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emprestimosAtivos.map((emprestimo) => {
                        const diasRestantes = calcularDiasRestantes(emprestimo.dataDevolucao)
                        const statusColor =
                          emprestimo.status === "Atrasado" ? "destructive" : diasRestantes <= 2 ? "warning" : "success"

                        return (
                          <TableRow key={emprestimo.id}>
                            <TableCell>
                              <img
                                src={emprestimo.capa || "/placeholder.svg"}
                                alt={emprestimo.livro}
                                className="w-12 h-16 object-cover rounded-sm"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{emprestimo.livro}</div>
                              <div className="text-sm text-muted-foreground">{emprestimo.autor}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{emprestimo.usuario}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{formatarData(emprestimo.dataEmprestimo)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{formatarData(emprestimo.dataDevolucao)}</span>
                              </div>
                              {emprestimo.status === "Em dia" && (
                                <div className="text-xs text-muted-foreground">
                                  {diasRestantes === 0
                                    ? "Vence hoje"
                                    : diasRestantes < 0
                                      ? `Atrasado ${Math.abs(diasRestantes)} dias`
                                      : `${diasRestantes} dias restantes`}
                                </div>
                              )}
                              {emprestimo.status === "Atrasado" && (
                                <div className="text-xs text-destructive">
                                  Atrasado {emprestimo.diasAtraso} dias (Multa: R$ {emprestimo.multa.toFixed(2)})
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  emprestimo.status === "Atrasado"
                                    ? "destructive"
                                    : diasRestantes <= 2
                                      ? "outline"
                                      : "default"
                                }
                              >
                                {emprestimo.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => renovarEmprestimo(emprestimo)}
                                  disabled={emprestimo.renovacoesRestantes === 0}
                                >
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Renovar
                                </Button>
                                <Button size="sm" onClick={() => devolverLivro(emprestimo)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Devolver
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum empréstimo ativo</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-1">
                    Não há empréstimos ativos no momento. Clique em "Novo Empréstimo" para registrar um novo.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Empréstimos</CardTitle>
              <CardDescription>Registro de empréstimos anteriores já finalizados</CardDescription>
            </CardHeader>
            <CardContent>
              {historicoEmprestimos.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Capa</TableHead>
                        <TableHead>Livro</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Data Devolução</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Detalhes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoEmprestimos.map((emprestimo) => (
                        <TableRow key={emprestimo.id}>
                          <TableCell>
                            <img
                              src={emprestimo.capa || "/placeholder.svg"}
                              alt={emprestimo.livro}
                              className="w-12 h-16 object-cover rounded-sm"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{emprestimo.livro}</div>
                            <div className="text-sm text-muted-foreground">{emprestimo.autor}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{emprestimo.usuario}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatarData(emprestimo.dataEmprestimo)} - {formatarData(emprestimo.dataDevolucao)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {emprestimo.renovacoes > 0 ? `${emprestimo.renovacoes} renovações` : "Sem renovações"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-muted-foreground" />
                              <span>{formatarData(emprestimo.dataDevolvido)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={emprestimo.status === "Devolvido com atraso" ? "destructive" : "success"}>
                              {emprestimo.status}
                            </Badge>
                            {emprestimo.status === "Devolvido com atraso" && emprestimo.multaPaga && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Multa paga: R$ {emprestimo.multa.toFixed(2)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/catalogo/${emprestimo.id}`}>
                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                Detalhes
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum histórico disponível</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-1">
                    O histórico de empréstimos aparecerá aqui quando houver devoluções registradas.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservas">
          <Card>
            <CardHeader>
              <CardTitle>Reservas</CardTitle>
              <CardDescription>Livros reservados aguardando disponibilidade ou retirada</CardDescription>
            </CardHeader>
            <CardContent>
              {reservas.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Capa</TableHead>
                        <TableHead>Livro</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Data Reserva</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservas.map((reserva) => (
                        <TableRow key={reserva.id}>
                          <TableCell>
                            <img
                              src={reserva.capa || "/placeholder.svg"}
                              alt={reserva.livro}
                              className="w-12 h-16 object-cover rounded-sm"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{reserva.livro}</div>
                            <div className="text-sm text-muted-foreground">{reserva.autor}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{reserva.usuario}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{formatarData(reserva.dataReserva)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {reserva.status === "Aguardando disponibilidade" ? (
                              <div>
                                <Badge variant="outline">{reserva.status}</Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Posição na fila: {reserva.posicaoFila}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <Badge variant="success">{reserva.status}</Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Disponível até: {formatarData(reserva.prazoRetirada)}
                                </div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {reserva.status === "Disponível para retirada" ? (
                                <Button size="sm" onClick={() => registrarRetirada(reserva)}>
                                  <BookMarked className="mr-2 h-4 w-4" />
                                  Registrar Retirada
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/catalogo/${reserva.id}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Ver Livro
                                  </Link>
                                </Button>
                              )}
                              <Button variant="destructive" size="sm" onClick={() => cancelarReserva(reserva)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancelar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BookMarked className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma reserva ativa</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-1">
                    Não há reservas ativas no momento. As reservas aparecem quando um usuário solicita um livro que não
                    está disponível.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumo de status (visível apenas na aba de empréstimos ativos) */}
      {activeTab === "ativos" && emprestimosAtivos.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total de Empréstimos</p>
                <p className="text-2xl font-bold">{emprestimosAtivos.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-success/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Em Dia</p>
                <p className="text-2xl font-bold">{emprestimosAtivos.filter((e) => e.status === "Em dia").length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-warning/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">Vencendo Hoje</p>
                <p className="text-2xl font-bold">
                  {emprestimosAtivos.filter((e) => calcularDiasRestantes(e.dataDevolucao) === 0).length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">Atrasados</p>
                <p className="text-2xl font-bold">{emprestimosAtivos.filter((e) => e.status === "Atrasado").length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Diálogo para renovar empréstimo */}
      <Dialog open={isRenovarDialogOpen} onOpenChange={setIsRenovarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renovar Empréstimo</DialogTitle>
            <DialogDescription>Confirme a renovação do empréstimo por mais 14 dias.</DialogDescription>
          </DialogHeader>
          {selectedLoan && (
            <div className="flex gap-4 py-4">
              <img
                src={selectedLoan.capa || "/placeholder.svg"}
                alt={selectedLoan.livro}
                className="w-16 h-24 object-cover rounded-sm"
              />
              <div>
                <h3 className="font-medium">{selectedLoan.livro}</h3>
                <p className="text-sm text-muted-foreground">{selectedLoan.autor}</p>
                <div className="mt-2 text-sm">
                  <p>Empréstimo: {formatarData(selectedLoan.dataEmprestimo)}</p>
                  <p>Devolução atual: {formatarData(selectedLoan.dataDevolucao)}</p>
                  <p className="font-medium mt-1">
                    Nova data de devolução:{" "}
                    {formatarData(
                      new Date(new Date(selectedLoan.dataDevolucao).getTime() + 14 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0],
                    )}
                  </p>
                </div>
                <div className="mt-2 text-sm">
                  <p>
                    Renovações: {selectedLoan.renovacoes} de{" "}
                    {selectedLoan.renovacoes + selectedLoan.renovacoesRestantes}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenovarDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarRenovacao}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Confirmar Renovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para devolver livro */}
      <Dialog open={isDevolverDialogOpen} onOpenChange={setIsDevolverDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Devolver Livro</DialogTitle>
            <DialogDescription>Confirme a devolução do livro.</DialogDescription>
          </DialogHeader>
          {selectedLoan && (
            <div className="flex gap-4 py-4">
              <img
                src={selectedLoan.capa || "/placeholder.svg"}
                alt={selectedLoan.livro}
                className="w-16 h-24 object-cover rounded-sm"
              />
              <div>
                <h3 className="font-medium">{selectedLoan.livro}</h3>
                <p className="text-sm text-muted-foreground">{selectedLoan.autor}</p>
                <div className="mt-2 text-sm">
                  <p>Empréstimo: {formatarData(selectedLoan.dataEmprestimo)}</p>
                  <p>Devolução prevista: {formatarData(selectedLoan.dataDevolucao)}</p>
                  <p>Usuário: {selectedLoan.usuario}</p>
                </div>
                {selectedLoan.status === "Atrasado" && (
                  <div className="mt-2 p-2 bg-destructive/10 rounded-md text-sm">
                    <p className="font-medium text-destructive">Livro com atraso de {selectedLoan.diasAtraso} dias</p>
                    <p>Multa a cobrar: R$ {selectedLoan.multa.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="condicao">Condição do livro na devolução</Label>
            <Select defaultValue="bom">
              <SelectTrigger id="condicao">
                <SelectValue placeholder="Selecione a condição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="otimo">Ótimo - Sem danos</SelectItem>
                <SelectItem value="bom">Bom - Desgaste normal</SelectItem>
                <SelectItem value="regular">Regular - Pequenos danos</SelectItem>
                <SelectItem value="ruim">Ruim - Danos significativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Input id="observacoes" placeholder="Observações sobre a devolução (opcional)" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDevolverDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarDevolucao}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmar Devolução
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para novo empréstimo */}
      <Dialog open={isNovoEmprestimoDialogOpen} onOpenChange={setIsNovoEmprestimoDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Novo Empréstimo</DialogTitle>
            <DialogDescription>Registre um novo empréstimo de livro.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="livro">Livro</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="livro" placeholder="Buscar livro por título ou ISBN..." className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário</Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="usuario" placeholder="Buscar usuário por nome ou ID..." className="pl-8" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataEmprestimo">Data do Empréstimo</Label>
                <Input id="dataEmprestimo" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataDevolucao">Data de Devolução</Label>
                <Input
                  id="dataDevolucao"
                  type="date"
                  defaultValue={new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input id="observacoes" placeholder="Observações sobre o empréstimo (opcional)" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="enviarNotificacao" />
              <label
                htmlFor="enviarNotificacao"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enviar notificação por e-mail ao usuário
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNovoEmprestimoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button>
              <BookMarked className="mr-2 h-4 w-4" />
              Registrar Empréstimo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notificações de vencimento próximo */}
      {activeTab === "ativos" &&
        emprestimosAtivos.some(
          (e) => calcularDiasRestantes(e.dataDevolucao) <= 2 && calcularDiasRestantes(e.dataDevolucao) >= 0,
        ) && (
          <Card className="bg-warning/10 border-warning">
            <CardContent className="p-4 flex items-start gap-4">
              <Bell className="h-6 w-6 text-warning mt-1" />
              <div>
                <h3 className="font-medium">Empréstimos vencendo em breve</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Os seguintes empréstimos estão próximos da data de vencimento:
                </p>
                <ul className="space-y-1 text-sm">
                  {emprestimosAtivos
                    .filter(
                      (e) => calcularDiasRestantes(e.dataDevolucao) <= 2 && calcularDiasRestantes(e.dataDevolucao) >= 0,
                    )
                    .map((e) => (
                      <li key={e.id} className="flex justify-between">
                        <span>
                          <strong>{e.livro}</strong> - {e.usuario}
                        </span>
                        <span className="font-medium">
                          {calcularDiasRestantes(e.dataDevolucao) === 0
                            ? "Vence hoje!"
                            : `Vence em ${calcularDiasRestantes(e.dataDevolucao)} dias`}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  )
}
