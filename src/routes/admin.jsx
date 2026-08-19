import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Inbox, LogOut, Menu, X } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/api";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Screenshot_2026-07-25_141748-removebg-preview.png";

export const Route = createFileRoute("/admin")({ component: AdminRoute });

const navigation = [{ label: "Enquiries", icon: Inbox, to: "/admin" }];

function AdminRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname === "/admin/login") {
    return <Outlet />;
  }

  return <AdminShell />;
}

function AdminShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then((currentUser) => mounted && setUser(currentUser))
      .catch(() => mounted && navigate({ to: "/admin/login", replace: true }))
      .finally(() => mounted && setChecking(false));

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    await logout().catch(() => undefined);
    navigate({ to: "/admin/login", replace: true });
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Checking your session…
      </main>
    );
  }

  if (!user) return null;

  const currentItem = navigation.find((item) => item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950 text-slate-100 transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <img src={logo} alt="Ank Digital Media" className="h-9 w-9 shrink-0 rounded-md bg-white object-contain p-1" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-wide">Ank Digital Media</p>
            <p className="text-xs text-slate-400">Admin panel</p>
          </div>
          <button
            className="ml-auto p-1 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4" aria-label="Admin navigation">
          {navigation.map((item) => {
            const isActive = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-bold sm:text-lg">{currentItem?.label || "Admin"}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="lg:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
