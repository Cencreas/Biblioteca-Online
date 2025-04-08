"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart, ChartContainer } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function RelatoriosPage() {
  // Dados de exemplo para os gráficos
  const emprestimosData = [
    { name: "Jan", emprestimos: 65 },
    { name: "Fev", emprestimos: 59 },
    { name: "Mar", emprestimos: 80 },
    { name: "Abr", emprestimos: 81 },
    { name: "Mai", emprestimos: 56 },
    { name: "Jun", emprestimos: 55 },
    { name: "Jul", emprestimos: 40 },
    { name: "Ago", emprestimos: 70 },
    { name: "Set", emprestimos: 90 },
    { name: "Out", emprestimos: 110 },
    { name: "Nov", emprestimos: 95 },
    { name: "Dez", emprestimos: 85 },
  ]

  const generoData = [
    { name: "Ficção", value: 35 },
    { name: "Não-ficção", value: 25 },
    { name: "Romance", value: 15 },
    { name: "Fantasia", value: 10 },
    { name: "Biografia", value: 8 },
    { name: "História", value: 7 },
  ]

  const atrasosData = [
    { name: "Jan", pontuais: 45, atrasados: 5 },
    { name: "Fev", pontuais: 40, atrasados: 8 },
    { name: "Mar", pontuais: 60, atrasados: 10 },
    { name: "Abr", pontuais: 65, atrasados: 12 },
    { name: "Mai", pontuais: 40, atrasados: 8 },
    { name: "Jun", pontuais: 42, atrasados: 7 },
    { name: "Jul", pontuais: 30, atrasados: 5 },
    { name: "Ago", pontuais: 55, atrasados: 10 },
    { name: "Set", pontuais: 75, atrasados: 12 },
    { name: "Out", pontuais: 90, atrasados: 15 },
    { name: "Nov", pontuais: 80, atrasados: 10 },
    { name: "Dez", pontuais: 70, atrasados: 8 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground mt-2">Visualize estatísticas e métricas da biblioteca</p>
      </div>

      <Tabs defaultValue="emprestimos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="emprestimos">Empréstimos</TabsTrigger>
          <TabsTrigger value="generos">Gêneros</TabsTrigger>
          <TabsTrigger value="atrasos">Atrasos</TabsTrigger>
        </TabsList>

        <TabsContent value="emprestimos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Empréstimos por Mês</CardTitle>
              <CardDescription>Total de empréstimos realizados nos últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emprestimosData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="emprestimos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Gênero</CardTitle>
              <CardDescription>Porcentagem de livros emprestados por gênero literário</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={generoData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {generoData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atrasos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Atrasos</CardTitle>
              <CardDescription>Comparação entre devoluções pontuais e atrasadas</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={atrasosData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pontuais" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="atrasados" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
