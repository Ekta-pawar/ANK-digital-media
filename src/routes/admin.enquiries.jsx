import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/enquiries")({ component: EnquiriesPage });

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

const STATUS_VARIANT = {
  new: "default",
  contacted: "secondary",
  resolved: "outline",
};

function EnquiriesPage() {
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Enquiries ({contacts.length})</h2>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <div className="space-y-3 rounded-xl border bg-white p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          ))}
        </div>
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
