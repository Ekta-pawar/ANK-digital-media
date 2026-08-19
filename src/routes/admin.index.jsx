import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Inbox, MessageCircle, ShieldCheck } from "lucide-react";
import { getContacts, getAdmins } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/admin/")({ component: DashboardPage });

const STATUS_VARIANT = {
  new: "default",
  contacted: "secondary",
  resolved: "outline",
};

function DashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContacts(), getAdmins()])
      .then(([contactsData, admins]) => {
        setContacts(contactsData);
        setAdminCount(admins.length);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(
    () => ({
      total: contacts.length,
      new: contacts.filter((c) => c.status === "new").length,
      resolved: contacts.filter((c) => c.status === "resolved").length,
    }),
    [contacts]
  );

  const recent = contacts.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} iconClass="bg-primary/10 text-primary" label="Total enquiries" value={stats.total} loading={loading} />
        <StatCard icon={MessageCircle} iconClass="bg-blue-100 text-blue-600" label="New" value={stats.new} loading={loading} />
        <StatCard icon={CheckCircle2} iconClass="bg-green-100 text-green-600" label="Resolved" value={stats.resolved} loading={loading} />
        <StatCard icon={ShieldCheck} iconClass="bg-purple-100 text-purple-600" label="Admins" value={adminCount} loading={loading} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Recent enquiries</CardTitle>
          <Link
            to="/admin/enquiries"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <ul className="divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-16 shrink-0 rounded-md" />
                </li>
              ))}
            </ul>
          ) : recent.length === 0 ? (
            <p className="text-sm text-slate-500">No enquiries yet.</p>
          ) : (
            <ul className="divide-y">
              {recent.map((c) => (
                <li key={c._id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">
                      {c.service} · {c.email}
                    </p>
                  </div>
                  <Badge variant={STATUS_VARIANT[c.status]} className="shrink-0">
                    {c.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, iconClass, label, value, loading }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${iconClass}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500">{label}</p>
          {loading ? (
            <Skeleton className="mt-1 h-6 w-10" />
          ) : (
            <p className="text-xl font-bold">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
