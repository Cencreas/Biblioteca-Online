"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Users, BookCopy, BarChart3, Settings, Star, Search, Home, BookMarked, Menu, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function LibrarySidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Componente de menu para dispositivos móveis
  const MobileMenu = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">Biblioteca Digital</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="space-y-1 px-2">
              <NavLink href="/" icon={<Home className="h-5 w-5" />} label="Início" active={pathname === "/"} mobile />
              <NavLink
                href="/catalogo"
                icon={<BookCopy className="h-5 w-5" />}
                label="Catálogo"
                active={pathname === "/catalogo"}
                mobile
              />
              <NavLink
                href="/busca"
                icon={<Search className="h-5 w-5" />}
                label="Busca Avançada"
                active={pathname === "/busca"}
                mobile
              />
              <NavLink
                href="/emprestimos"
                icon={<BookMarked className="h-5 w-5" />}
                label="Empréstimos"
                active={pathname === "/emprestimos"}
                mobile
              />
              <NavLink
                href="/recomendacoes"
                icon={<Star className="h-5 w-5" />}
                label="Recomendações"
                active={pathname === "/recomendacoes"}
                mobile
              />
              <NavLink
                href="/usuarios"
                icon={<Users className="h-5 w-5" />}
                label="Usuários"
                active={pathname === "/usuarios"}
                mobile
              />
              <NavLink
                href="/relatorios"
                icon={<BarChart3 className="h-5 w-5" />}
                label="Relatórios"
                active={pathname === "/relatorios"}
                mobile
              />
              <NavLink
                href="/configuracoes"
                icon={<Settings className="h-5 w-5" />}
                label="Configurações"
                active={pathname === "/configuracoes"}
                mobile
              />
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Componente de link de navegação reutilizável
  const NavLink = ({
    href,
    icon,
    label,
    active,
    mobile = false,
  }: {
    href: string
    icon: React.ReactNode
    label: string
    active: boolean
    mobile?: boolean
  }) => {
    if (mobile) {
      return (
        <Link
          href={href}
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
            active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-foreground"
          }`}
          onClick={() => setOpen(false)}
        >
          <span className="mr-3">{icon}</span>
          {label}
        </Link>
      )
    }

    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={active}>
          <Link href={href}>
            {icon}
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <>
      {/* Menu para dispositivos móveis */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <MobileMenu />
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Biblioteca Digital</span>
        </Link>
      </div>

      {/* Sidebar para desktop */}
      <Sidebar className="hidden md:flex">
        <SidebarHeader className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">Biblioteca Digital</span>
          </Link>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            <NavLink href="/" icon={<Home />} label="Início" active={pathname === "/"} />
            <NavLink href="/catalogo" icon={<BookCopy />} label="Catálogo" active={pathname === "/catalogo"} />
            <NavLink href="/busca" icon={<Search />} label="Busca Avançada" active={pathname === "/busca"} />
            <NavLink
              href="/emprestimos"
              icon={<BookMarked />}
              label="Empréstimos"
              active={pathname === "/emprestimos"}
            />
            <NavLink
              href="/recomendacoes"
              icon={<Star />}
              label="Recomendações"
              active={pathname === "/recomendacoes"}
            />
            <SidebarSeparator />
            <NavLink href="/usuarios" icon={<Users />} label="Usuários" active={pathname === "/usuarios"} />
            <NavLink href="/relatorios" icon={<BarChart3 />} label="Relatórios" active={pathname === "/relatorios"} />
            <NavLink
              href="/configuracoes"
              icon={<Settings />}
              label="Configurações"
              active={pathname === "/configuracoes"}
            />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Biblioteca Digital</p>
            <p>v1.0.0</p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
