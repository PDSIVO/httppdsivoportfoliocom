import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Mail, FolderKanban, LogOut, Trash2, Plus, Check, Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resolveImage, bundledAssetOptions } from "@/lib/portfolioAssets";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Section = { id: string; title: string };
type Project = {
  id: string;
  section_id: string;
  title: string;
  image_url: string;
  sort_order: number;
};

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<"messages" | "projects">("messages");

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl font-bold">Not authorized</h1>
          <p className="text-muted-foreground">
            Your account is signed in but not granted admin access. Ask the owner to add the
            <span className="font-mono"> admin </span> role to your user in the database.
          </p>
          <div className="text-xs text-muted-foreground">Signed in as: {user.email}</div>
          <Button onClick={signOut} variant="outline">Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display font-bold text-lg">PDSIVO Admin</Link>
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setTab("messages")}
                className={`px-3 h-9 rounded-lg text-sm flex items-center gap-2 transition ${tab === "messages" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Mail size={14} /> Messages
              </button>
              <button
                onClick={() => setTab("projects")}
                className={`px-3 h-9 rounded-lg text-sm flex items-center gap-2 transition ${tab === "projects" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <FolderKanban size={14} /> Projects
              </button>
            </nav>
          </div>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut size={14} /> Sign out
          </Button>
        </div>
      </header>

      <div className="container py-10">
        {tab === "messages" ? <MessagesTab /> : <ProjectsTab />}
      </div>
    </main>
  );
};

const MessagesTab = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setMessages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Message) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !m.is_read })
      .eq("id", m.id);
    if (error) toast.error(error.message);
    else setMessages((prev) => prev.map((x) => x.id === m.id ? { ...x, is_read: !m.is_read } : x));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      setMessages((prev) => prev.filter((x) => x.id !== id));
      toast.success("Deleted");
    }
  };

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-3xl font-bold">Contact Messages</h2>
        <div className="text-sm text-muted-foreground">
          {messages.length} total · <span className="text-primary font-medium">{unread} unread</span>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : messages.length === 0 ? (
        <div className="p-8 rounded-2xl border border-border bg-surface text-center text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`p-5 rounded-2xl border bg-surface ${m.is_read ? "border-border" : "border-primary/40"}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{m.name}</span>
                    {!m.is_read && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">New</span>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-muted-foreground hover:text-primary">{m.email}</a>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(m.created_at).toLocaleString()}
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap text-foreground/90 mb-4">{m.message}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleRead(m)}>
                  <Check size={14} /> {m.is_read ? "Mark unread" : "Mark read"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => remove(m.id)}>
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectsTab = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    const [s, p] = await Promise.all([
      supabase.from("portfolio_sections").select("id, title").order("sort_order"),
      supabase.from("portfolio_projects").select("*").order("section_id").order("sort_order"),
    ]);
    if (s.error) toast.error(s.error.message);
    if (p.error) toast.error(p.error.message);
    setSections(s.data ?? []);
    setProjects(p.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      setProjects((prev) => prev.filter((x) => x.id !== id));
      toast.success("Deleted");
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl font-bold">Portfolio Projects</h2>
        <Button onClick={() => setAdding(true)} variant="hero">
          <Plus size={14} /> Add project
        </Button>
      </div>

      <div className="space-y-10">
        {sections.map((section) => {
          const items = projects.filter((p) => p.section_id === section.id);
          return (
            <div key={section.id}>
              <h3 className="font-display text-xl font-semibold mb-4 pb-2 border-b border-border">
                {section.title} <span className="text-sm text-muted-foreground font-normal">({items.length})</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((p) => (
                  <div key={p.id} className="rounded-xl border border-border bg-surface overflow-hidden">
                    <div className="aspect-[4/5] bg-background overflow-hidden">
                      <img src={resolveImage(p.image_url)} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="text-sm font-medium line-clamp-2">{p.title}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(p)}>
                          <Pencil size={12} /> Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => remove(p.id)}>
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {(editing || adding) && (
        <ProjectForm
          sections={sections}
          project={editing}
          onClose={() => { setEditing(null); setAdding(false); }}
          onSaved={() => { setEditing(null); setAdding(false); load(); }}
        />
      )}
    </div>
  );
};

const ProjectForm = ({
  sections,
  project,
  onClose,
  onSaved,
}: {
  sections: Section[];
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [title, setTitle] = useState(project?.title ?? "");
  const [sectionId, setSectionId] = useState(project?.section_id ?? sections[0]?.id ?? "");
  const [imageUrl, setImageUrl] = useState(project?.image_url ?? "");
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim() || !sectionId) {
      toast.error("Title, image, and section are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      section_id: sectionId,
      image_url: imageUrl.trim(),
      sort_order: Number(sortOrder) || 0,
    };
    const { error } = project
      ? await supabase.from("portfolio_projects").update(payload).eq("id", project.id)
      : await supabase.from("portfolio_projects").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(project ? "Updated" : "Created");
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-border bg-surface-elevated p-6 space-y-4"
      >
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
        <h3 className="font-display text-xl font-bold">{project ? "Edit project" : "New project"}</h3>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Section</label>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
          >
            {sections.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://… or asset:social/sm-1.jpg"
            className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use a public image URL (e.g. from postimg.cc) or one of the bundled <code>asset:</code> keys.
          </p>
          {imageUrl && (
            <div className="mt-3 aspect-[4/5] w-32 rounded-lg overflow-hidden border border-border bg-background">
              <img src={resolveImage(imageUrl)} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
          <details className="mt-2">
            <summary className="text-xs text-muted-foreground cursor-pointer">Bundled asset keys</summary>
            <div className="mt-2 grid grid-cols-2 gap-1 max-h-40 overflow-y-auto text-xs">
              {bundledAssetOptions.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setImageUrl(a.key)}
                  className="text-left px-2 py-1 rounded hover:bg-primary/10 hover:text-primary truncate"
                >
                  {a.key}
                </button>
              ))}
            </div>
          </details>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Sort order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full h-11 px-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="hero" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Admin;