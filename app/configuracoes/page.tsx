"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Settings,
  Save,
  Mail,
  Bell,
  Shield,
  Database,
  RefreshCw,
  AlertTriangle,
  Trash2,
  Plus,
  Edit,
  Download,
  Upload,
  Moon,
  Sun,
  Laptop,
  BookOpen,
  Calendar,
  Palette,
  Globe,
  UserPlus,
} from "lucide-react"

export default function ConfiguracoesPage() {
  // Estados para controlar os diálogos
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false)
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)

  // Estado para controlar as configurações gerais
  const [generalSettings, setGeneralSettings] = useState({
    libraryName: "Biblioteca Digital",
    address: "Av. Universitária, 1000 - Campus Universitário",
    phone: "(00) 1234-5678",
    email: "biblioteca@universidade.edu.br",
    website: "https://biblioteca.universidade.edu.br",
    description:
      "Biblioteca central da universidade, oferecendo acesso a livros, periódicos e recursos digitais para toda a comunidade acadêmica.",
    logo: "/placeholder.svg?height=100&width=100",
  })

  // Estado para controlar as configurações de empréstimo
  const [loanSettings, setLoanSettings] = useState({
    studentLoanDays: 14,
    teacherLoanDays: 30,
    staffLoanDays: 21,
    maxRenewals: 3,
    maxActiveLoans: {
      student: 5,
      teacher: 10,
      staff: 7,
    },
    finePerDay: 0.5,
    gracePeriod: 1,
    allowReservations: true,
    reservationHoldDays: 3,
    blockAfterOverdue: true,
    blockThreshold: 3,
  })

  // Estado para controlar as configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState({
    sendEmailNotifications: true,
    sendDueReminders: true,
    dueReminderDays: [3, 1],
    sendOverdueNotices: true,
    overdueNoticeDays: [1, 3, 7],
    sendReservationNotices: true,
    sendWelcomeEmail: true,
    emailSignature: "Equipe da Biblioteca Digital\nUniversidade Federal\nTel: (00) 1234-5678",
    emailSenderName: "Biblioteca Digital",
    emailSenderAddress: "biblioteca@universidade.edu.br",
  })

  // Estado para controlar as configurações de aparência
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    primaryColor: "#0f172a",
    accentColor: "#3b82f6",
    fontSize: "medium",
    enableDarkMode: true,
    showBookCovers: true,
    defaultView: "grid",
    itemsPerPage: 20,
    dateFormat: "DD/MM/YYYY",
    language: "pt-BR",
  })

  // Dados de exemplo para papéis de usuário
  const userRoles = [
    {
      id: 1,
      name: "Administrador",
      description: "Acesso completo ao sistema",
      users: 2,
      permissions: [
        "gerenciar_usuarios",
        "gerenciar_livros",
        "gerenciar_emprestimos",
        "gerenciar_configuracoes",
        "gerar_relatorios",
        "gerenciar_papeis",
      ],
    },
    {
      id: 2,
      name: "Bibliotecário",
      description: "Gerencia livros e empréstimos",
      users: 5,
      permissions: ["gerenciar_livros", "gerenciar_emprestimos", "visualizar_usuarios", "visualizar_relatorios"],
    },
    {
      id: 3,
      name: "Assistente",
      description: "Auxilia em tarefas básicas",
      users: 8,
      permissions: ["visualizar_livros", "registrar_emprestimos", "registrar_devolucoes"],
    },
    {
      id: 4,
      name: "Usuário",
      description: "Acesso básico ao catálogo",
      users: 573,
      permissions: ["visualizar_livros", "visualizar_emprestimos_proprios"],
    },
  ]

  // Dados de exemplo para logs do sistema
  const systemLogs = [
    {
      id: 1,
      timestamp: "2023-11-20T14:32:45",
      level: "info",
      user: "admin@biblioteca.edu",
      action: "Configurações de empréstimo atualizadas",
      details: "Alteração no período de empréstimo para professores: 21 -> 30 dias",
    },
    {
      id: 2,
      timestamp: "2023-11-19T10:15:22",
      level: "warning",
      user: "sistema",
      action: "Falha na sincronização com o sistema acadêmico",
      details: "Timeout na conexão com a API externa",
    },
    {
      id: 3,
      timestamp: "2023-11-18T16:45:12",
      level: "error",
      user: "sistema",
      action: "Erro no envio de notificações por email",
      details: "Falha na conexão com o servidor SMTP",
    },
    {
      id: 4,
      timestamp: "2023-11-18T09:22:37",
      level: "info",
      user: "maria.silva@biblioteca.edu",
      action: "Backup do sistema realizado",
      details: "Backup completo realizado com sucesso",
    },
    {
      id: 5,
      timestamp: "2023-11-17T11:05:18",
      level: "info",
      user: "joao.santos@biblioteca.edu",
      action: "Novo papel de usuário criado",
      details: "Papel 'Pesquisador' criado com permissões específicas",
    },
  ]

  // Dados de exemplo para permissões disponíveis
  const availablePermissions = [
    { id: "gerenciar_usuarios", name: "Gerenciar Usuários", description: "Criar, editar e excluir usuários" },
    { id: "gerenciar_livros", name: "Gerenciar Livros", description: "Adicionar, editar e remover livros do catálogo" },
    {
      id: "gerenciar_emprestimos",
      name: "Gerenciar Empréstimos",
      description: "Registrar e gerenciar empréstimos e devoluções",
    },
    { id: "gerenciar_configuracoes", name: "Gerenciar Configurações", description: "Alterar configurações do sistema" },
    { id: "gerar_relatorios", name: "Gerar Relatórios", description: "Criar e visualizar relatórios do sistema" },
    { id: "gerenciar_papeis", name: "Gerenciar Papéis", description: "Criar e editar papéis de usuário" },
    { id: "visualizar_usuarios", name: "Visualizar Usuários", description: "Ver informações de usuários" },
    { id: "visualizar_livros", name: "Visualizar Livros", description: "Ver o catálogo de livros" },
    { id: "visualizar_relatorios", name: "Visualizar Relatórios", description: "Ver relatórios do sistema" },
    { id: "registrar_emprestimos", name: "Registrar Empréstimos", description: "Registrar novos empréstimos" },
    { id: "registrar_devolucoes", name: "Registrar Devoluções", description: "Registrar devoluções de livros" },
    {
      id: "visualizar_emprestimos_proprios",
      name: "Visualizar Empréstimos Próprios",
      description: "Ver apenas os próprios empréstimos",
    },
  ]

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleString("pt-BR")
  }

  // Função para salvar configurações gerais
  const salvarConfiguracoesGerais = () => {
    console.log("Configurações gerais salvas:", generalSettings)
    alert("Configurações gerais salvas com sucesso!")
  }

  // Função para salvar configurações de empréstimo
  const salvarConfiguracoesEmprestimo = () => {
    console.log("Configurações de empréstimo salvas:", loanSettings)
    alert("Configurações de empréstimo salvas com sucesso!")
  }

  // Função para salvar configurações de notificação
  const salvarConfiguracoesNotificacao = () => {
    console.log("Configurações de notificação salvas:", notificationSettings)
    alert("Configurações de notificação salvas com sucesso!")
  }

  // Função para salvar configurações de aparência
  const salvarConfiguracoesAparencia = () => {
    console.log("Configurações de aparência salvas:", appearanceSettings)
    alert("Configurações de aparência salvas com sucesso!")
  }

  // Função para adicionar novo papel
  const adicionarPapel = () => {
    console.log("Novo papel adicionado")
    setIsAddRoleDialogOpen(false)
    alert("Novo papel adicionado com sucesso!")
  }

  // Função para editar papel
  const editarPapel = (role: any) => {
    setSelectedRole(role)
    setIsEditRoleDialogOpen(true)
  }

  // Função para salvar papel editado
  const salvarPapelEditado = () => {
    console.log("Papel editado:", selectedRole)
    setIsEditRoleDialogOpen(false)
    alert("Papel editado com sucesso!")
  }

  // Função para excluir papel
  const excluirPapel = (role: any) => {
    console.log("Papel excluído:", role)
    alert(`Papel "${role.name}" excluído com sucesso!`)
  }

  // Função para realizar backup
  const realizarBackup = () => {
    console.log("Backup realizado")
    setIsBackupDialogOpen(false)
    alert("Backup realizado com sucesso!")
  }

  // Função para restaurar backup
  const restaurarBackup = () => {
    console.log("Backup restaurado")
    alert("Backup restaurado com sucesso!")
  }

  // Função para resetar configurações
  const resetarConfiguracoes = () => {
    console.log("Configurações resetadas")
    setIsResetDialogOpen(false)
    alert("Configurações resetadas para os valores padrão!")
  }

  // Função para enviar email de teste
  const enviarEmailTeste = () => {
    console.log("Email de teste enviado")
    alert("Email de teste enviado com sucesso!")
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">Gerencie as configurações do sistema de biblioteca</p>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[800px]">
          <TabsTrigger value="geral">
            <Settings className="mr-2 h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="emprestimos">
            <BookOpen className="mr-2 h-4 w-4" />
            Empréstimos
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="aparencia">
            <Palette className="mr-2 h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="avancado">
            <Shield className="mr-2 h-4 w-4" />
            Avançado
          </TabsTrigger>
        </TabsList>

        {/* Aba de Configurações Gerais */}
        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Biblioteca</CardTitle>
              <CardDescription>Configure as informações básicas da sua biblioteca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="libraryName">Nome da Biblioteca</Label>
                    <Input
                      id="libraryName"
                      value={generalSettings.libraryName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, libraryName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={generalSettings.website}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={generalSettings.description}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo da Biblioteca</Label>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                      <img
                        src={generalSettings.logo || "/placeholder.svg"}
                        alt="Logo da Biblioteca"
                        className="w-32 h-32 object-contain mb-4"
                      />
                      <Button variant="outline">Alterar Logo</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Horário de Funcionamento</Label>
                    <div className="border rounded-md p-4 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="weekdayOpen" className="text-xs">
                            Segunda a Sexta - Abertura
                          </Label>
                          <Input id="weekdayOpen" type="time" defaultValue="08:00" />
                        </div>
                        <div>
                          <Label htmlFor="weekdayClose" className="text-xs">
                            Segunda a Sexta - Fechamento
                          </Label>
                          <Input id="weekdayClose" type="time" defaultValue="20:00" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="saturdayOpen" className="text-xs">
                            Sábado - Abertura
                          </Label>
                          <Input id="saturdayOpen" type="time" defaultValue="09:00" />
                        </div>
                        <div>
                          <Label htmlFor="saturdayClose" className="text-xs">
                            Sábado - Fechamento
                          </Label>
                          <Input id="saturdayClose" type="time" defaultValue="14:00" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="sundayOpen" />
                        <Label htmlFor="sundayOpen">Aberto aos domingos</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={salvarConfiguracoesGerais}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Configurações de Empréstimos */}
        <TabsContent value="emprestimos">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Empréstimo</CardTitle>
              <CardDescription>Defina as regras de empréstimo, renovação e multas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Períodos de Empréstimo</h3>

                  <div className="space-y-2">
                    <Label htmlFor="studentLoanDays">Período para Alunos (dias)</Label>
                    <Input
                      id="studentLoanDays"
                      type="number"
                      min="1"
                      value={loanSettings.studentLoanDays}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, studentLoanDays: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teacherLoanDays">Período para Professores (dias)</Label>
                    <Input
                      id="teacherLoanDays"
                      type="number"
                      min="1"
                      value={loanSettings.teacherLoanDays}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, teacherLoanDays: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staffLoanDays">Período para Funcionários (dias)</Label>
                    <Input
                      id="staffLoanDays"
                      type="number"
                      min="1"
                      value={loanSettings.staffLoanDays}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, staffLoanDays: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxRenewals">Número máximo de renovações</Label>
                    <Input
                      id="maxRenewals"
                      type="number"
                      min="0"
                      value={loanSettings.maxRenewals}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, maxRenewals: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <h3 className="text-lg font-medium pt-4">Limites de Empréstimo</h3>

                  <div className="space-y-2">
                    <Label htmlFor="maxStudentLoans">Máximo de empréstimos ativos para Alunos</Label>
                    <Input
                      id="maxStudentLoans"
                      type="number"
                      min="1"
                      value={loanSettings.maxActiveLoans.student}
                      onChange={(e) =>
                        setLoanSettings({
                          ...loanSettings,
                          maxActiveLoans: {
                            ...loanSettings.maxActiveLoans,
                            student: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTeacherLoans">Máximo de empréstimos ativos para Professores</Label>
                    <Input
                      id="maxTeacherLoans"
                      type="number"
                      min="1"
                      value={loanSettings.maxActiveLoans.teacher}
                      onChange={(e) =>
                        setLoanSettings({
                          ...loanSettings,
                          maxActiveLoans: {
                            ...loanSettings.maxActiveLoans,
                            teacher: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStaffLoans">Máximo de empréstimos ativos para Funcionários</Label>
                    <Input
                      id="maxStaffLoans"
                      type="number"
                      min="1"
                      value={loanSettings.maxActiveLoans.staff}
                      onChange={(e) =>
                        setLoanSettings({
                          ...loanSettings,
                          maxActiveLoans: {
                            ...loanSettings.maxActiveLoans,
                            staff: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Multas e Penalidades</h3>

                  <div className="space-y-2">
                    <Label htmlFor="finePerDay">Valor da multa por dia de atraso (R$)</Label>
                    <Input
                      id="finePerDay"
                      type="number"
                      min="0"
                      step="0.01"
                      value={loanSettings.finePerDay}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, finePerDay: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gracePeriod">Período de carência (dias)</Label>
                    <Input
                      id="gracePeriod"
                      type="number"
                      min="0"
                      value={loanSettings.gracePeriod}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, gracePeriod: Number.parseInt(e.target.value) })
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Dias após o vencimento antes de começar a cobrar multa
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="blockAfterOverdue"
                      checked={loanSettings.blockAfterOverdue}
                      onCheckedChange={(checked) => setLoanSettings({ ...loanSettings, blockAfterOverdue: checked })}
                    />
                    <Label htmlFor="blockAfterOverdue">Bloquear usuário após atrasos</Label>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="blockThreshold">Número de atrasos para bloqueio</Label>
                    <Input
                      id="blockThreshold"
                      type="number"
                      min="1"
                      value={loanSettings.blockThreshold}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, blockThreshold: Number.parseInt(e.target.value) })
                      }
                      disabled={!loanSettings.blockAfterOverdue}
                    />
                  </div>

                  <h3 className="text-lg font-medium pt-4">Reservas</h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowReservations"
                      checked={loanSettings.allowReservations}
                      onCheckedChange={(checked) => setLoanSettings({ ...loanSettings, allowReservations: checked })}
                    />
                    <Label htmlFor="allowReservations">Permitir reservas de livros</Label>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="reservationHoldDays">Dias para manter reserva disponível</Label>
                    <Input
                      id="reservationHoldDays"
                      type="number"
                      min="1"
                      value={loanSettings.reservationHoldDays}
                      onChange={(e) =>
                        setLoanSettings({ ...loanSettings, reservationHoldDays: Number.parseInt(e.target.value) })
                      }
                      disabled={!loanSettings.allowReservations}
                    />
                    <p className="text-sm text-muted-foreground">
                      Número de dias que um livro reservado fica disponível para retirada
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={salvarConfiguracoesEmprestimo}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Configurações de Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Configure as notificações por email e alertas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificações por Email</h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendEmailNotifications"
                      checked={notificationSettings.sendEmailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sendEmailNotifications: checked,
                        })
                      }
                    />
                    <Label htmlFor="sendEmailNotifications">Habilitar notificações por email</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendDueReminders"
                      checked={notificationSettings.sendDueReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sendDueReminders: checked,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                    <Label htmlFor="sendDueReminders">Enviar lembretes de devolução</Label>
                  </div>

                  <div className="space-y-2 pl-6">
                    <Label htmlFor="dueReminderDays">Dias antes do vencimento para enviar lembretes</Label>
                    <div className="flex gap-2">
                      <Input
                        id="dueReminderDays1"
                        type="number"
                        min="1"
                        value={notificationSettings.dueReminderDays[0]}
                        onChange={(e) => {
                          const newDays = [...notificationSettings.dueReminderDays]
                          newDays[0] = Number.parseInt(e.target.value)
                          setNotificationSettings({
                            ...notificationSettings,
                            dueReminderDays: newDays,
                          })
                        }}
                        disabled={
                          !notificationSettings.sendDueReminders || !notificationSettings.sendEmailNotifications
                        }
                        className="w-20"
                      />
                      <Input
                        id="dueReminderDays2"
                        type="number"
                        min="1"
                        value={notificationSettings.dueReminderDays[1]}
                        onChange={(e) => {
                          const newDays = [...notificationSettings.dueReminderDays]
                          newDays[1] = Number.parseInt(e.target.value)
                          setNotificationSettings({
                            ...notificationSettings,
                            dueReminderDays: newDays,
                          })
                        }}
                        disabled={
                          !notificationSettings.sendDueReminders || !notificationSettings.sendEmailNotifications
                        }
                        className="w-20"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={
                          !notificationSettings.sendDueReminders || !notificationSettings.sendEmailNotifications
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dias antes do vencimento para enviar lembretes (ex: 3, 1)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendOverdueNotices"
                      checked={notificationSettings.sendOverdueNotices}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sendOverdueNotices: checked,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                    <Label htmlFor="sendOverdueNotices">Enviar avisos de atraso</Label>
                  </div>

                  <div className="space-y-2 pl-6">
                    <Label htmlFor="overdueNoticeDays">Dias após o vencimento para enviar avisos</Label>
                    <div className="flex gap-2 flex-wrap">
                      {notificationSettings.overdueNoticeDays.map((day, index) => (
                        <Input
                          key={index}
                          type="number"
                          min="1"
                          value={day}
                          onChange={(e) => {
                            const newDays = [...notificationSettings.overdueNoticeDays]
                            newDays[index] = Number.parseInt(e.target.value)
                            setNotificationSettings({
                              ...notificationSettings,
                              overdueNoticeDays: newDays,
                            })
                          }}
                          disabled={
                            !notificationSettings.sendOverdueNotices || !notificationSettings.sendEmailNotifications
                          }
                          className="w-20"
                        />
                      ))}
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={
                          !notificationSettings.sendOverdueNotices || !notificationSettings.sendEmailNotifications
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dias após o vencimento para enviar avisos (ex: 1, 3, 7)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendReservationNotices"
                      checked={notificationSettings.sendReservationNotices}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sendReservationNotices: checked,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                    <Label htmlFor="sendReservationNotices">Enviar avisos de reserva disponível</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendWelcomeEmail"
                      checked={notificationSettings.sendWelcomeEmail}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sendWelcomeEmail: checked,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                    <Label htmlFor="sendWelcomeEmail">Enviar email de boas-vindas para novos usuários</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configurações de Email</h3>

                  <div className="space-y-2">
                    <Label htmlFor="emailSenderName">Nome do Remetente</Label>
                    <Input
                      id="emailSenderName"
                      value={notificationSettings.emailSenderName}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailSenderName: e.target.value,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailSenderAddress">Email do Remetente</Label>
                    <Input
                      id="emailSenderAddress"
                      type="email"
                      value={notificationSettings.emailSenderAddress}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailSenderAddress: e.target.value,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailSignature">Assinatura de Email</Label>
                    <Textarea
                      id="emailSignature"
                      rows={4}
                      value={notificationSettings.emailSignature}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailSignature: e.target.value,
                        })
                      }
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={enviarEmailTeste}
                      disabled={!notificationSettings.sendEmailNotifications}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Email de Teste
                    </Button>
                  </div>

                  <h3 className="text-lg font-medium pt-4">Configurações do Servidor SMTP</h3>

                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">Servidor SMTP</Label>
                    <Input
                      id="smtpServer"
                      placeholder="smtp.exemplo.com"
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Porta</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        placeholder="587"
                        disabled={!notificationSettings.sendEmailNotifications}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpSecurity">Segurança</Label>
                      <Select disabled={!notificationSettings.sendEmailNotifications}>
                        <SelectTrigger id="smtpSecurity">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">Nenhuma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Usuário</Label>
                    <Input
                      id="smtpUsername"
                      placeholder="usuario@exemplo.com"
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Senha</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      placeholder="••••••••"
                      disabled={!notificationSettings.sendEmailNotifications}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={salvarConfiguracoesNotificacao}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Configurações de Aparência */}
        <TabsContent value="aparencia">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Aparência</CardTitle>
              <CardDescription>Personalize a aparência e o comportamento da interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tema e Cores</h3>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={appearanceSettings.theme}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          theme: value,
                        })
                      }
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Selecione o tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Claro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="mr-2 h-4 w-4" />
                            <span>Escuro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>Sistema</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableDarkMode"
                      checked={appearanceSettings.enableDarkMode}
                      onCheckedChange={(checked) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          enableDarkMode: checked,
                        })
                      }
                    />
                    <Label htmlFor="enableDarkMode">Permitir modo escuro</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-full border"
                        style={{ backgroundColor: appearanceSettings.primaryColor }}
                      />
                      <Input
                        id="primaryColor"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            primaryColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-full border"
                        style={{ backgroundColor: appearanceSettings.accentColor }}
                      />
                      <Input
                        id="accentColor"
                        value={appearanceSettings.accentColor}
                        onChange={(e) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            accentColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                    <Select
                      value={appearanceSettings.fontSize}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          fontSize: value,
                        })
                      }
                    >
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Exibição e Comportamento</h3>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showBookCovers"
                      checked={appearanceSettings.showBookCovers}
                      onCheckedChange={(checked) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          showBookCovers: checked,
                        })
                      }
                    />
                    <Label htmlFor="showBookCovers">Mostrar capas dos livros</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultView">Visualização padrão do catálogo</Label>
                    <Select
                      value={appearanceSettings.defaultView}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          defaultView: value,
                        })
                      }
                    >
                      <SelectTrigger id="defaultView">
                        <SelectValue placeholder="Selecione a visualização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grade</SelectItem>
                        <SelectItem value="list">Lista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemsPerPage">Itens por página</Label>
                    <Select
                      value={appearanceSettings.itemsPerPage.toString()}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          itemsPerPage: Number.parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger id="itemsPerPage">
                        <SelectValue placeholder="Selecione a quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de data</Label>
                    <Select
                      value={appearanceSettings.dateFormat}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          dateFormat: value,
                        })
                      }
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={appearanceSettings.language}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                        <SelectItem value="fr-FR">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <h3 className="text-lg font-medium pt-4">Visualização</h3>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Pré-visualização</h4>
                      <Badge variant={appearanceSettings.theme === "dark" ? "outline" : "default"}>
                        {appearanceSettings.theme === "light"
                          ? "Tema Claro"
                          : appearanceSettings.theme === "dark"
                            ? "Tema Escuro"
                            : "Tema do Sistema"}
                      </Badge>
                    </div>

                    <div className="border rounded-md p-4 bg-background">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted"></div>
                        <div>
                          <div className="h-4 w-24 bg-muted rounded"></div>
                          <div className="h-3 w-16 bg-muted rounded mt-1 opacity-70"></div>
                        </div>
                      </div>
                      <div className="h-4 w-full bg-muted rounded mt-2"></div>
                      <div className="h-4 w-3/4 bg-muted rounded mt-2"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-8 w-20 rounded bg-primary"></div>
                        <div className="h-8 w-20 rounded bg-muted"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={salvarConfiguracoesAparencia}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba de Configurações Avançadas */}
        <TabsContent value="avancado">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Papéis e Permissões</CardTitle>
                <CardDescription>Gerencie os papéis de usuário e suas permissões no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button onClick={() => setIsAddRoleDialogOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Adicionar Papel
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Usuários</TableHead>
                        <TableHead>Permissões</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>{role.users}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 2).map((permission) => (
                                <Badge key={permission} variant="outline" className="whitespace-nowrap">
                                  {availablePermissions.find((p) => p.id === permission)?.name || permission}
                                </Badge>
                              ))}
                              {role.permissions.length > 2 && (
                                <Badge variant="outline">+{role.permissions.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => editarPapel(role)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => excluirPapel(role)}
                                disabled={role.name === "Administrador" || role.name === "Usuário"}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup e Restauração</CardTitle>
                <CardDescription>Gerencie backups do sistema e restaure dados quando necessário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Backup do Sistema</h3>
                    <p className="text-sm text-muted-foreground">
                      Crie backups completos do sistema, incluindo dados de usuários, livros e configurações.
                    </p>

                    <div className="flex gap-2">
                      <Button onClick={() => setIsBackupDialogOpen(true)}>
                        <Database className="mr-2 h-4 w-4" />
                        Criar Backup Agora
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Último Backup
                      </Button>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="backupSchedule">Programação de Backup Automático</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backupSchedule">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backupRetention">Retenção de Backups (dias)</Label>
                      <Input id="backupRetention" type="number" min="1" defaultValue="30" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Restauração</h3>
                    <p className="text-sm text-muted-foreground">
                      Restaure o sistema a partir de um backup anterior. Esta ação substituirá todos os dados atuais.
                    </p>

                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Selecione um arquivo de backup</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Arraste e solte um arquivo de backup ou clique para selecionar
                      </p>
                      <Button variant="outline" className="mt-4">
                        Selecionar Arquivo
                      </Button>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" onClick={restaurarBackup}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restaurar Sistema
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs do Sistema</CardTitle>
                <CardDescription>Visualize os logs de atividade e eventos do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filtrar por nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os níveis</SelectItem>
                        <SelectItem value="info">Informação</SelectItem>
                        <SelectItem value="warning">Aviso</SelectItem>
                        <SelectItem value="error">Erro</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input placeholder="Buscar nos logs..." className="w-[250px]" />
                  </div>

                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Logs
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Nível</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Ação</TableHead>
                        <TableHead>Detalhes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{formatarData(log.timestamp)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.level === "info" ? "default" : log.level === "warning" ? "outline" : "destructive"
                              }
                            >
                              {log.level === "info" ? "Informação" : log.level === "warning" ? "Aviso" : "Erro"}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>Configurações avançadas do sistema e opções de manutenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Manutenção</h3>

                    <div className="space-y-2">
                      <Label htmlFor="maintenance">Modo de Manutenção</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="maintenance" />
                        <Label htmlFor="maintenance">Ativar modo de manutenção</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Quando ativado, o sistema ficará indisponível para usuários comuns enquanto você realiza
                        manutenção.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cacheClearing">Limpeza de Cache</Label>
                      <Button variant="outline" className="w-full justify-start">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Limpar Cache do Sistema
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="databaseOptimization">Otimização de Banco de Dados</Label>
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="mr-2 h-4 w-4" />
                        Otimizar Banco de Dados
                      </Button>
                    </div>

                    <div className="pt-2">
                      <Button variant="destructive" onClick={() => setIsResetDialogOpen(true)}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Resetar para Configurações Padrão
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Integrações</h3>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">Chave de API</Label>
                      <div className="flex gap-2">
                        <Input id="apiKey" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Chave para integração com sistemas externos</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Integrações Ativas</Label>
                      <div className="border rounded-md divide-y">
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>Sistema Acadêmico</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            Conectado
                          </Badge>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>Servidor de Email</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            Conectado
                          </Badge>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Google Calendar</span>
                          </div>
                          <Badge variant="outline" className="bg-red-50">
                            Desconectado
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label>Webhooks</Label>
                      <div className="border rounded-md p-3">
                        <p className="text-sm">URL de Webhook para eventos do sistema:</p>
                        <div className="flex gap-2 mt-2">
                          <Input value="https://exemplo.com/webhook/biblioteca" readOnly />
                          <Button variant="outline" size="icon">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para adicionar novo papel */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Papel</DialogTitle>
            <DialogDescription>Crie um novo papel de usuário e defina suas permissões</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Nome do Papel</Label>
                <Input id="roleName" placeholder="Ex: Bibliotecário Assistente" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleDescription">Descrição</Label>
                <Textarea id="roleDescription" placeholder="Descreva as responsabilidades deste papel" rows={2} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="border rounded-md p-4 space-y-2 max-h-[300px] overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Switch id={`permission-${permission.id}`} />
                    <div>
                      <Label htmlFor={`permission-${permission.id}`} className="text-sm font-medium">
                        {permission.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={adicionarPapel}>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Papel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar papel */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Papel</DialogTitle>
            <DialogDescription>Modifique as informações e permissões deste papel</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editRoleName">Nome do Papel</Label>
                  <Input id="editRoleName" defaultValue={selectedRole.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editRoleDescription">Descrição</Label>
                  <Textarea id="editRoleDescription" defaultValue={selectedRole.description} rows={2} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Permissões</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Selecionar Todas
                    </Button>
                    <Button variant="outline" size="sm">
                      Limpar Todas
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 space-y-2 max-h-[300px] overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Switch
                        id={`edit-permission-${permission.id}`}
                        checked={selectedRole.permissions.includes(permission.id)}
                      />
                      <div>
                        <Label htmlFor={`edit-permission-${permission.id}`} className="text-sm font-medium">
                          {permission.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Usuários com este papel</Label>
                <div className="text-sm text-muted-foreground">
                  Este papel está atribuído a <span className="font-medium">{selectedRole.users}</span> usuários.
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={salvarPapelEditado}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para backup */}
      <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Backup do Sistema</DialogTitle>
            <DialogDescription>Selecione as opções para o backup do sistema</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Backup</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="fullBackup" defaultChecked />
                  <Label htmlFor="fullBackup">Backup Completo</Label>
                </div>
                <p className="text-xs text-muted-foreground pl-7">
                  Inclui todos os dados do sistema, configurações e arquivos
                </p>

                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="dataOnlyBackup" />
                  <Label htmlFor="dataOnlyBackup">Apenas Dados</Label>
                </div>
                <p className="text-xs text-muted-foreground pl-7">
                  Inclui apenas os dados do banco de dados, sem arquivos ou configurações
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupDescription">Descrição do Backup</Label>
              <Input id="backupDescription" placeholder="Ex: Backup mensal - Novembro 2023" />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="compressBackup" defaultChecked />
              <Label htmlFor="compressBackup">Comprimir backup</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="downloadBackup" defaultChecked />
              <Label htmlFor="downloadBackup">Baixar após concluir</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBackupDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={realizarBackup}>
              <Database className="mr-2 h-4 w-4" />
              Iniciar Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para resetar configurações */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resetar Configurações</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá restaurar todas as configurações para os valores padrão. Os dados de usuários, livros e
              empréstimos não serão afetados. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={resetarConfiguracoes} className="bg-destructive text-destructive-foreground">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Resetar Configurações
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
