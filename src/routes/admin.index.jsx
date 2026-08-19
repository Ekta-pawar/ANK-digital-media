import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Inbox, MessageCircle, Trash2, CheckCircle2 } from "lucide-react";
import { getContacts, updateContactStatus, deleteContact } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

const STATUS_VARIANT = {
  new: "default",
  contacted: "secondary",
  resolved: "outline",
};

function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = () => {
    setLoading(true);
    getContacts()
      .then(setContacts)
      .catch((err) => setError(err.message || "Failed to load enquiries"))
      .finally(() => setLoading(false));
  };

  useEffect(loadContacts, []);

  const stats = useMemo(
    () => ({
      total: contacts.length,
      new: contacts.filter((c) => c.status === "new").length,
      resolved: contacts.filter((c) => c.status === "resolved").length,
    }),
    [contacts]
  );

  const handleStatusChange = async (id, status) => {
    const updated = await updateContactStatus(id, status).catch((err) => {
      toast.error(err.message || "Failed to update status");
      return null;
    });
    if (updated) {
      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
      toast.success(`Marked as ${status}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    const deleted = await deleteContact(id).catch((err) => {
      toast.error(err.message || "Failed to delete enquiry");
      return false;
    });
    if (deleted) {
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Enquiry deleted");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Inbox className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Total enquiries</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">New</p>
              <p className="text-xl font-bold">{stats.new}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-green-100 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Resolved</p>
              <p className="text-xl font-bold">{stats.resolved}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Enquiries ({contacts.length})</h2>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : contacts.length === 0 ? (
        <p className="text-sm text-slate-500">No enquiries yet.</p>
      ) : (
        <div className="rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <div>{c.email}</div>
                    <div className="text-xs text-slate-500">{c.phone}</div>
                  </TableCell>
                  <TableCell>{c.service}</TableCell>
                  <TableCell className="max-w-xs truncate" title={c.message}>
                    {c.message}
                  </TableCell>
                  <TableCell>
                    <Select value={c.status} onValueChange={(value) => handleStatusChange(c._id, value)}>
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue>
                          <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
