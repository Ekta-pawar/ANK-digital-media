import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getContacts, updateContactStatus } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Enquiries ({contacts.length})</h2>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading ? (
        <>
          <div className="space-y-3 sm:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 rounded-xl border bg-white p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            ))}
          </div>
          <div className="hidden space-y-3 rounded-xl border bg-white p-4 sm:block">
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
        </>
      ) : contacts.length === 0 ? (
        <p className="text-sm text-slate-500">No enquiries yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="space-y-3 sm:hidden">
            {contacts.map((c) => (
              <div key={c._id} className="space-y-3 rounded-xl border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">{c.service}</p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-sm text-slate-600">
                  <div className="truncate">{c.email}</div>
                  <div>{c.phone}</div>
                </div>

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
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden rounded-xl border bg-white sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
