"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  BookOpen,
  ShieldAlert,
  Mail,
  User,
  UserCheck,
  Clock,
  BookMarked,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function UsuariosPage() {
  // Estados para controlar os diálogos
  const [isNovoUsuarioDialogOpen, setIsNovoUsuarioDialogOpen] = useState(false)
  const [isEditarUsuarioDialogOpen, setIsEditarUsuarioDialogOpen] = useState(false)
  const [isExcluirUsuarioDialogOpen, setIsExcluirUsuarioDialogOpen] = useState(false)
  const [isImportarUsuariosDialogOpen, setIsImportarUsuariosDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Estado para controlar a visualização de detalhes do usuário
  const [viewingUser, setViewingUser] = useState<any>(null)

  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("todos")

  // Estado para controlar o formulário de novo usuário
  const [newUserForm, setNewUserForm] = useState({
    nome: "",
    email: "",
    tipo: "aluno",
    matricula: "",
    telefone: "",
    curso: "",
    departamento: "",
    status: "ativo",
  })

  // Dados de exemplo para usuários
  const usuarios = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria.silva@email.com",
      tipo: "aluno",
      matricula: "20210001",
      curso: "Engenharia de Software",
      departamento: "Computação",
      status: "ativo",
      dataRegistro: "2021-02-15",
      emprestimosAtivos: 2,
      emprestimosTotal: 15,
      multasPendentes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao.santos@email.com",
      tipo: "professor",
      matricula: "P20180023",
      curso: "",
      departamento: "Matemática",
      status: "ativo",
      dataRegistro: "2018-08-10",
      emprestimosAtivos: 3,
      emprestimosTotal: 42,
      multasPendentes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      nome: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      tipo: "aluno",
      matricula: "20220015",
      curso: "Administração",
      departamento: "Ciências Sociais",
      status: "ativo",
      dataRegistro: "2022-02-20",
      emprestimosAtivos: 1,
      emprestimosTotal: 7,
      multasPendentes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      nome: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      tipo: "funcionario",
      matricula: "F20150008",
      curso: "",
      departamento: "Biblioteca",
      status: "ativo",
      dataRegistro: "2015-03-05",
      emprestimosAtivos: 0,
      emprestimosTotal: 23,
      multasPendentes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      nome: "Lucia Ferreira",
      email: "lucia.ferreira@email.com",
      tipo: "aluno",
      matricula: "20190042",
      curso: "Medicina",
      departamento: "Ciências da Saúde",
      status: "bloqueado",
      dataRegistro: "2019-02-18",
      emprestimosAtivos: 0,
      emprestimosTotal: 31,
      multasPendentes: 25.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      nome: "Pedro Almeida",
      email: "pedro.almeida@email.com",
      tipo: "aluno",
      matricula: "20200037",
      curso: "Direito",
      departamento: "Ciências Jurídicas",
      status: "inativo",
      dataRegistro: "2020-02-10",
      emprestimosAtivos: 0,
      emprestimosTotal: 12,
      multasPendentes: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Dados de exemplo para empréstimos do usuário
  const emprestimosUsuario = [
    {
      id: 101,
      livro: "O Senhor dos Anéis: A Sociedade do Anel",
      autor: "J.R.R. Tolkien",
      dataEmprestimo: "2023-10-15",
      dataDevolucao: "2023-10-29",
      status: "Em dia",
      renovacoes: 0,
    },
    {
      id: 102,
      livro: "1984",
      autor: "George Orwell",
      dataEmprestimo: "2023-10-20",
      dataDevolucao: "2023-11-03",
      status: "Em dia",
      renovacoes: 0,
    },
  ]

  // Dados de exemplo para histórico de empréstimos do usuário
  const historicoEmprestimos = [
    {
      id: 201,
      livro: "Dom Casmurro",
      autor: "Machado de Assis",
      dataEmprestimo: "2023-08-10",
      dataDevolucao: "2023-08-24",
      dataDevolvido: "2023-08-23",
      status: "Devolvido",
    },
    {
      id: 202,
      livro: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      dataEmprestimo: "2023-07-05",
      dataDevolucao: "2023-07-19",
      dataDevolvido: "2023-07-21",
      status: "Devolvido com atraso",
      diasAtraso: 2,
      multa: 2.0,
      multaPaga: true,
    },
    {
      id: 203,
      livro: "Orgulho e Preconceito",
      autor: "Jane Austen",
      dataEmprestimo: "2023-06-15",
      dataDevolucao: "2023-06-29",
      dataDevolvido: "2023-06-29",
      status: "Devolvido",
    },
  ]

  // Função para filtrar usuários com base na aba ativa
  const filtrarUsuarios = () => {
    switch (activeTab) {
      case "ativos":
        return usuarios.filter((user) => user.status === "ativo")
      case "bloqueados":
        return usuarios.filter((user) => user.status === "bloqueado")
      case "inativos":
        return usuarios.filter((user) => user.status === "inativo")
      case "alunos":
        return usuarios.filter((user) => user.tipo === "aluno")
      case "professores":
        return usuarios.filter((user) => user.tipo === "professor")
      case "funcionarios":
        return usuarios.filter((user) => user.tipo === "funcionario")
      default:
        return usuarios
    }
  }

  // Função para abrir o diálogo de edição de usuário
  const editarUsuario = (usuario: any) => {
    setSelectedUser(usuario)
    setIsEditarUsuarioDialogOpen(true)
  }

  // Função para abrir o diálogo de exclusão de usuário
  const excluirUsuario = (usuario: any) => {
    setSelectedUser(usuario)
    setIsExcluirUsuarioDialogOpen(true)
  }

  // Função para visualizar detalhes do usuário
  const visualizarUsuario = (usuario: any) => {
    setViewingUser(usuario)
  }

  // Função para fechar a visualização de detalhes do usuário
  const fecharVisualizacaoUsuario = () => {
    setViewingUser(null)
  }

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  // Função para criar novo usuário
  const criarNovoUsuario = () => {
    console.log("Novo usuário:", newUserForm)
    // Aqui você implementaria a lógica para criar o usuário
    setIsNovoUsuarioDialogOpen(false)
    // Limpar o formulário
    setNewUserForm({
      nome: "",
      email: "",
      tipo: "aluno",
      matricula: "",
      telefone: "",
      curso: "",
      departamento: "",
      status: "ativo",
    })
    alert("Usuário criado com sucesso!")
  }

  // Função para confirmar exclusão de usuário
  const confirmarExclusao = () => {
    console.log("Excluindo usuário:", selectedUser)
    // Aqui você implementaria a lógica para excluir o usuário
    setIsExcluirUsuarioDialogOpen(false)
    alert(`Usuário ${selectedUser.nome} excluído com sucesso!`)
  }

  // Função para alterar status do usuário
  const alterarStatusUsuario = (usuario: any, novoStatus: string) => {
    console.log(`Alterando status do usuário ${usuario.nome} para ${novoStatus}`)
    // Aqui você implementaria a lógica para alterar o status
    alert(`Status do usuário ${usuario.nome} alterado para ${novoStatus}!`)
  }

  // Função para importar usuários
  const importarUsuarios = () => {
    console.log("Importando usuários...")
    // Aqui você implementaria a lógica para importar usuários
    setIsImportarUsuariosDialogOpen(false)
    alert("Usuários importados com sucesso!")
  }

  // Função para exportar usuários
  const exportarUsuarios = (formato: string) => {
    console.log(`Exportando usuários em formato ${formato}...`)
    // Aqui você implementaria a lógica para exportar usuários
    alert(`Usuários exportados em formato ${formato} com sucesso!`)
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground mt-2">Gerencie os usuários da biblioteca e suas permissões</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Formato de Exportação</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportarUsuarios("excel")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar como Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportarUsuarios("csv")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar como CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportarUsuarios("pdf")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar como PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => setIsImportarUsuariosDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>

          <Button onClick={() => setIsNovoUsuarioDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar por nome, email ou matrícula..." className="w-full pl-8" />
          </div>
          <Select defaultValue="todos">
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="aluno">Alunos</SelectItem>
              <SelectItem value="professor">Professores</SelectItem>
              <SelectItem value="funcionario">Funcionários</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todos">
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="bloqueado">Bloqueados</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Visualização principal: lista de usuários ou detalhes do usuário */}
      {viewingUser ? (
        // Detalhes do usuário
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={fecharVisualizacaoUsuario}>
              Voltar para lista
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => editarUsuario(viewingUser)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              {viewingUser.status === "ativo" ? (
                <Button variant="destructive" onClick={() => alterarStatusUsuario(viewingUser, "bloqueado")}>
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Bloquear
                </Button>
              ) : viewingUser.status === "bloqueado" ? (
                <Button variant="outline" onClick={() => alterarStatusUsuario(viewingUser, "ativo")}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Desbloquear
                </Button>
              ) : (
                <Button variant="outline" onClick={() => alterarStatusUsuario(viewingUser, "ativo")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reativar
                </Button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Informações do Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={viewingUser.avatar || "/placeholder.svg"}
                        alt={viewingUser.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-bold">{viewingUser.nome}</h2>
                    <Badge
                      className="mt-1"
                      variant={
                        viewingUser.status === "ativo"
                          ? "default"
                          : viewingUser.status === "bloqueado"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {viewingUser.status === "ativo"
                        ? "Ativo"
                        : viewingUser.status === "bloqueado"
                          ? "Bloqueado"
                          : "Inativo"}
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Tipo:</dt>
                      <dd className="font-medium">
                        {viewingUser.tipo === "aluno"
                          ? "Aluno"
                          : viewingUser.tipo === "professor"
                            ? "Professor"
                            : "Funcionário"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Matrícula:</dt>
                      <dd className="font-medium">{viewingUser.matricula}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd className="font-medium">{viewingUser.email}</dd>
                    </div>
                    {viewingUser.curso && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Curso:</dt>
                        <dd className="font-medium">{viewingUser.curso}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Departamento:</dt>
                      <dd className="font-medium">{viewingUser.departamento}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Data de Registro:</dt>
                      <dd className="font-medium">{formatarData(viewingUser.dataRegistro)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Empréstimos Ativos:</dt>
                      <dd className="font-medium">{viewingUser.emprestimosAtivos}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Total de Empréstimos:</dt>
                      <dd className="font-medium">{viewingUser.emprestimosTotal}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Multas Pendentes:</dt>
                      <dd className={`font-medium ${viewingUser.multasPendentes > 0 ? "text-destructive" : ""}`}>
                        {viewingUser.multasPendentes > 0 ? `R$ ${viewingUser.multasPendentes.toFixed(2)}` : "Nenhuma"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Email
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Relatório
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Novo Empréstimo
                  </Button>
                  {viewingUser.multasPendentes > 0 && (
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Registrar Pagamento de Multa
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="emprestimos" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="emprestimos">Empréstimos Ativos</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="emprestimos">
                  <Card>
                    <CardHeader>
                      <CardTitle>Empréstimos Ativos</CardTitle>
                      <CardDescription>Livros atualmente emprestados para este usuário</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {emprestimosUsuario.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Livro</TableHead>
                                <TableHead>Data Empréstimo</TableHead>
                                <TableHead>Data Devolução</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {emprestimosUsuario.map((emprestimo) => (
                                <TableRow key={emprestimo.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{emprestimo.livro}</p>
                                      <p className="text-sm text-muted-foreground">{emprestimo.autor}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>{formatarData(emprestimo.dataEmprestimo)}</TableCell>
                                  <TableCell>{formatarData(emprestimo.dataDevolucao)}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{emprestimo.status}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                      <BookOpen className="h-4 w-4" />
                                      <span className="sr-only">Ver Detalhes</span>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">Nenhum empréstimo ativo</h3>
                          <p className="text-sm text-muted-foreground max-w-md mt-1">
                            Este usuário não possui empréstimos ativos no momento.
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
                      <CardDescription>Registro de empréstimos anteriores deste usuário</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {historicoEmprestimos.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Livro</TableHead>
                                <TableHead>Período</TableHead>
                                <TableHead>Data Devolução</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {historicoEmprestimos.map((emprestimo) => (
                                <TableRow key={emprestimo.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{emprestimo.livro}</p>
                                      <p className="text-sm text-muted-foreground">{emprestimo.autor}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-sm">
                                      {formatarData(emprestimo.dataEmprestimo)} -{" "}
                                      {formatarData(emprestimo.dataDevolucao)}
                                    </div>
                                  </TableCell>
                                  <TableCell>{formatarData(emprestimo.dataDevolvido)}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={emprestimo.status === "Devolvido com atraso" ? "destructive" : "success"}
                                    >
                                      {emprestimo.status}
                                    </Badge>
                                    {emprestimo.status === "Devolvido com atraso" && emprestimo.multaPaga && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        Multa paga: R$ {emprestimo.multa.toFixed(2)}
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">Nenhum histórico disponível</h3>
                          <p className="text-sm text-muted-foreground max-w-md mt-1">
                            Este usuário ainda não possui histórico de empréstimos.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle>Notas e Observações</CardTitle>
                  <CardDescription>Informações adicionais sobre o usuário</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Carlos Mendes</span>
                        </div>
                        <span className="text-xs text-muted-foreground">10/10/2023</span>
                      </div>
                      <p className="text-sm">
                        Usuário solicitou extensão do prazo de empréstimo devido a viagem acadêmica. Aprovado por 7 dias
                        adicionais.
                      </p>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Ana Souza</span>
                        </div>
                        <span className="text-xs text-muted-foreground">15/09/2023</span>
                      </div>
                      <p className="text-sm">
                        Usuário participante do programa de monitoria da biblioteca. Possui permissão para empréstimos
                        estendidos.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Adicionar Nota
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Lista de usuários
        <div className="space-y-4">
          <Tabs defaultValue="todos" onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="bloqueados">Bloqueados</TabsTrigger>
              <TabsTrigger value="inativos">Inativos</TabsTrigger>
              <TabsTrigger value="alunos">Alunos</TabsTrigger>
              <TabsTrigger value="professores">Professores</TabsTrigger>
              <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Usuários</CardTitle>
                  <CardDescription>
                    {activeTab === "todos"
                      ? "Todos os usuários cadastrados no sistema"
                      : activeTab === "ativos"
                        ? "Usuários com status ativo"
                        : activeTab === "bloqueados"
                          ? "Usuários com status bloqueado"
                          : activeTab === "inativos"
                            ? "Usuários com status inativo"
                            : activeTab === "alunos"
                              ? "Usuários do tipo aluno"
                              : activeTab === "professores"
                                ? "Usuários do tipo professor"
                                : "Usuários do tipo funcionário"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Matrícula</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Departamento</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Empréstimos</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtrarUsuarios().map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell>
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={usuario.avatar || "/placeholder.svg"}
                                  alt={usuario.nome}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{usuario.nome}</p>
                                <p className="text-sm text-muted-foreground">{usuario.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{usuario.matricula}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {usuario.tipo === "aluno"
                                  ? "Aluno"
                                  : usuario.tipo === "professor"
                                    ? "Professor"
                                    : "Funcionário"}
                              </Badge>
                            </TableCell>
                            <TableCell>{usuario.departamento}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  usuario.status === "ativo"
                                    ? "default"
                                    : usuario.status === "bloqueado"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {usuario.status === "ativo"
                                  ? "Ativo"
                                  : usuario.status === "bloqueado"
                                    ? "Bloqueado"
                                    : "Inativo"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{usuario.emprestimosAtivos}</span>
                                {usuario.multasPendentes > 0 && (
                                  <AlertTriangle className="h-4 w-4 text-destructive ml-2" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Abrir menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => visualizarUsuario(usuario)}>
                                    <User className="mr-2 h-4 w-4" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => editarUsuario(usuario)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {usuario.status === "ativo" ? (
                                    <DropdownMenuItem onClick={() => alterarStatusUsuario(usuario, "bloqueado")}>
                                      <ShieldAlert className="mr-2 h-4 w-4" />
                                      Bloquear
                                    </DropdownMenuItem>
                                  ) : usuario.status === "bloqueado" ? (
                                    <DropdownMenuItem onClick={() => alterarStatusUsuario(usuario, "ativo")}>
                                      <UserCheck className="mr-2 h-4 w-4" />
                                      Desbloquear
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => alterarStatusUsuario(usuario, "ativo")}>
                                      <RefreshCw className="mr-2 h-4 w-4" />
                                      Reativar
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => excluirUsuario(usuario)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{filtrarUsuarios().length}</span> de{" "}
                    <span className="font-medium">{usuarios.length}</span> usuários
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Diálogo para criar novo usuário */}
      <Dialog open={isNovoUsuarioDialogOpen} onOpenChange={setIsNovoUsuarioDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogDescription>Preencha os dados para cadastrar um novo usuário no sistema.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={newUserForm.nome}
                  onChange={(e) => setNewUserForm({ ...newUserForm, nome: e.target.value })}
                  placeholder="Nome completo do usuário"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Usuário</Label>
                <Select
                  value={newUserForm.tipo}
                  onValueChange={(value) => setNewUserForm({ ...newUserForm, tipo: value })}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  value={newUserForm.matricula}
                  onChange={(e) => setNewUserForm({ ...newUserForm, matricula: e.target.value })}
                  placeholder="Número de matrícula"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={newUserForm.telefone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newUserForm.status}
                  onValueChange={(value) => setNewUserForm({ ...newUserForm, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newUserForm.tipo === "aluno" && (
                <div className="space-y-2">
                  <Label htmlFor="curso">Curso</Label>
                  <Input
                    id="curso"
                    value={newUserForm.curso}
                    onChange={(e) => setNewUserForm({ ...newUserForm, curso: e.target.value })}
                    placeholder="Nome do curso"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input
                  id="departamento"
                  value={newUserForm.departamento}
                  onChange={(e) => setNewUserForm({ ...newUserForm, departamento: e.target.value })}
                  placeholder="Departamento"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="enviarEmail" />
                <Label htmlFor="enviarEmail">Enviar email de boas-vindas</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNovoUsuarioDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={criarNovoUsuario}>
              <UserPlus className="mr-2 h-4 w-4" />
              Criar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar usuário */}
      <Dialog open={isEditarUsuarioDialogOpen} onOpenChange={setIsEditarUsuarioDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Edite os dados do usuário selecionado.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome">Nome Completo</Label>
                  <Input id="edit-nome" defaultValue={selectedUser.nome} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-tipo">Tipo de Usuário</Label>
                  <Select defaultValue={selectedUser.tipo}>
                    <SelectTrigger id="edit-tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluno">Aluno</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="funcionario">Funcionário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-matricula">Matrícula</Label>
                  <Input id="edit-matricula" defaultValue={selectedUser.matricula} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-telefone">Telefone</Label>
                  <Input id="edit-telefone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUser.tipo === "aluno" && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-curso">Curso</Label>
                    <Input id="edit-curso" defaultValue={selectedUser.curso} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="edit-departamento">Departamento</Label>
                  <Input id="edit-departamento" defaultValue={selectedUser.departamento} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditarUsuarioDialogOpen(false)}>
              Cancelar
            </Button>
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para excluir usuário */}
      <Dialog open={isExcluirUsuarioDialogOpen} onOpenChange={setIsExcluirUsuarioDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={selectedUser.avatar || "/placeholder.svg"}
                  alt={selectedUser.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedUser.nome}</h3>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.tipo === "aluno"
                    ? "Aluno"
                    : selectedUser.tipo === "professor"
                      ? "Professor"
                      : "Funcionário"}{" "}
                  - {selectedUser.matricula}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExcluirUsuarioDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmarExclusao}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para importar usuários */}
      <Dialog open={isImportarUsuariosDialogOpen} onOpenChange={setIsImportarUsuariosDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Usuários</DialogTitle>
            <DialogDescription>Importe usuários em massa a partir de um arquivo CSV ou Excel.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Arraste e solte seu arquivo aqui</h3>
              <p className="text-sm text-muted-foreground mt-1">Ou clique para selecionar um arquivo</p>
              <Button variant="outline" className="mt-4">
                Selecionar Arquivo
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Formatos suportados: .csv, .xlsx</p>
              <p>Tamanho máximo: 10MB</p>
              <p>
                <a href="#" className="text-primary underline">
                  Baixar modelo de planilha
                </a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportarUsuariosDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={importarUsuarios}>
              <Upload className="mr-2 h-4 w-4" />
              Importar Usuários
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
