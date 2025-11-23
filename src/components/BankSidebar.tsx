import { Home, PlusCircle, CreditCard, TrendingUp, FileText, MessageSquare, BarChart3, Wallet } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Open Account", url: "/open-account", icon: PlusCircle },
  { title: "Make Transaction", url: "/transaction", icon: Wallet },
  { title: "AI Logs", url: "/ai-logs", icon: BarChart3 },
  { title: "Apply for Loan", url: "/apply-loan", icon: TrendingUp },
  { title: "Create FD", url: "/create-fd", icon: FileText },
  { title: "Apply for Card", url: "/apply-card", icon: CreditCard },
  { title: "Admin", url: "/admin", icon: CreditCard },
];

export function BankSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">YB</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">YourBank</h2>
            <p className="text-xs text-sidebar-foreground/60">Banking Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 px-6">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-3">
                    <NavLink 
                      to={item.url} 
                      end 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-md"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
