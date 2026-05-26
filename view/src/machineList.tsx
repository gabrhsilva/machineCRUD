import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";

const API = "http://localhost:3000/machines";

type Machine = { id: number; name: string; model: string; sector: string };
type Form = { name: string; model: string; sector: string };
type FormErrors = { name?: string; model?: string; sector?: string };

const emptyForm: Form = { name: "", model: "", sector: "" };

function validateForm(form: Form): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Nome é obrigatório";
  if (!form.model.trim()) errors.model = "Tipo é obrigatório";
  if (!form.sector.trim()) errors.sector = "Setor é obrigatório";
  return errors;
}

function FormFields({
  form,
  errors,
  onChange,
  autoFocus,
}: {
  form: Form;
  errors: FormErrors;
  onChange: (f: Form) => void;
  autoFocus?: boolean;
}) {
  return (
    <>
      <TextField
        label="Nome"
        value={form.name}
        onChange={(e) => onChange({ ...form, name: e.target.value })}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        autoFocus={autoFocus}
      />
      <TextField
        label="Tipo"
        value={form.model}
        onChange={(e) => onChange({ ...form, model: e.target.value })}
        error={!!errors.model}
        helperText={errors.model}
        fullWidth
      />
      <TextField
        label="Setor"
        value={form.sector}
        onChange={(e) => onChange({ ...form, sector: e.target.value })}
        error={!!errors.sector}
        helperText={errors.sector}
        fullWidth
      />
    </>
  );
}

export function MachineList() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<Form>(emptyForm);
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [creating, setCreating] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Machine | null>(null);
  const [editForm, setEditForm] = useState<Form>(emptyForm);
  const [editErrors, setEditErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Machine | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Machine | null | "not_found" | "idle">("idle");
  const [searching, setSearching] = useState(false);

  const [snack, setSnack] = useState<{ msg: string; severity: "success" | "error" } | null>(null);

  async function loadMachines() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setMachines(data.machine ?? []);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await loadMachines();
    }
    init();
  }, []);

  function openCreate() {
    setCreateForm(emptyForm);
    setCreateErrors({});
    setCreateOpen(true);
  }

  async function handleCreate() {
    const errors = validateForm(createForm);
    if (Object.keys(errors).length > 0) { setCreateErrors(errors); return; }
    setCreating(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      if (!res.ok) throw new Error();
      setCreateOpen(false);
      setSnack({ msg: "Máquina criada com sucesso!", severity: "success" });
      await loadMachines();
    } catch {
      setSnack({ msg: "Erro ao criar máquina.", severity: "error" });
    } finally {
      setCreating(false);
    }
  }

  function openEdit(machine: Machine) {
    setEditTarget(machine);
    setEditForm({ name: machine.name, model: machine.model, sector: machine.sector });
    setEditErrors({});
    setEditOpen(true);
  }

  async function handleEdit() {
    if (!editTarget) return;
    const errors = validateForm(editForm);
    if (Object.keys(errors).length > 0) { setEditErrors(errors); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API}/${editTarget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error();
      setEditOpen(false);
      setSnack({ msg: "Máquina atualizada com sucesso!", severity: "success" });
      await loadMachines();
    } catch {
      setSnack({ msg: "Erro ao atualizar máquina.", severity: "error" });
    } finally {
      setSaving(false);
    }
  }

  async function handleSearch() {
    if (!searchId) return;
    setSearching(true);
    setSearchResult("idle");
    try {
      const res = await fetch(`${API}/${searchId}`);
      if (!res.ok) { setSearchResult("not_found"); return; }
      const data = await res.json();
      setSearchResult(data.machine ?? "not_found");
    } catch {
      setSnack({ msg: "Erro ao buscar máquina.", severity: "error" });
    } finally {
      setSearching(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setDeleteTarget(null);
      setSnack({ msg: "Máquina removida com sucesso!", severity: "success" });
      await loadMachines();
    } catch {
      setSnack({ msg: "Erro ao remover máquina.", severity: "error" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Box>
      {/* ── Header row ── */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Máquinas
          </Typography>
          {!loading && !loadError && (
            <Typography variant="body2" color="text.secondary">
              {machines.length} {machines.length === 1 ? "registro" : "registros"}
            </Typography>
          )}
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} size="medium">
          Nova máquina
        </Button>
      </Box>

      {/* ── Search ── */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, display: "flex", gap: 1.5, alignItems: "flex-start", bgcolor: "rgba(109,40,217,0.02)" }}>
        <TextField
          label="Buscar por ID"
          type="number"
          value={searchId}
          onChange={(e) => { setSearchId(e.target.value); setSearchResult("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          slotProps={{
            htmlInput: { min: 1 },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 220 }}
        />
        <Button
          variant="outlined"
          onClick={handleSearch}
          disabled={searching || !searchId}
          sx={{ mt: "1px", height: 40 }}
        >
          {searching ? "Buscando…" : "Buscar"}
        </Button>
      </Paper>

      {searchResult === "not_found" && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
          Nenhuma máquina encontrada com o ID <strong>{searchId}</strong>.
        </Alert>
      )}

      {searchResult && searchResult !== "idle" && searchResult !== "not_found" && (
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
            <Typography variant="caption" fontWeight={600} color="primary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Resultado da busca
            </Typography>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Setor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: "text.secondary", fontSize: "0.8125rem" }}>#{searchResult.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{searchResult.name}</TableCell>
                <TableCell>{searchResult.model}</TableCell>
                <TableCell>
                  <Chip label={searchResult.sector} size="small" sx={{ bgcolor: "rgba(109,40,217,0.08)", color: "primary.main" }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ── Main table ── */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {!loading && loadError && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Erro ao carregar máquinas. Verifique sua conexão e tente novamente.
        </Alert>
      )}

      {!loading && !loadError && (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Setor</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 5, gap: 1, color: "text.secondary" }}>
                      <InboxIcon sx={{ fontSize: 40, opacity: 0.35 }} />
                      <Typography variant="body2">Nenhuma máquina cadastrada.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                machines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{machine.name}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{machine.model}</TableCell>
                    <TableCell>
                      <Chip
                        label={machine.sector}
                        size="small"
                        sx={{ bgcolor: "rgba(109,40,217,0.08)", color: "primary.main", fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar" placement="top">
                        <IconButton size="small" onClick={() => openEdit(machine)} color="primary" sx={{ mr: 0.5 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remover" placement="top">
                        <IconButton size="small" onClick={() => setDeleteTarget(machine)} color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ── Create Dialog ── */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Nova máquina</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
          <FormFields form={createForm} errors={createErrors} onChange={setCreateForm} autoFocus />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setCreateOpen(false)} disabled={creating} color="inherit">Cancelar</Button>
          <Button variant="contained" onClick={handleCreate} disabled={creating}>
            {creating ? "Salvando…" : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Editar máquina</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
          <FormFields form={editForm} errors={editErrors} onChange={setEditForm} autoFocus />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setEditOpen(false)} disabled={saving} color="inherit">Cancelar</Button>
          <Button variant="contained" onClick={handleEdit} disabled={saving}>
            {saving ? "Salvando…" : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirmation ── */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs">
        <DialogTitle sx={{ color: "error.main" }}>Remover máquina</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover <strong>{deleteTarget?.name}</strong>? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting} color="inherit">Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Removendo…" : "Remover"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ── */}
      <Snackbar
        open={!!snack}
        autoHideDuration={4000}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack?.severity} onClose={() => setSnack(null)} variant="filled" sx={{ borderRadius: 2 }}>
          {snack?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
