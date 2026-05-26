import { useEffect, useState } from "react";

const API = "http://localhost:3000/machines";

type Machine = {
  id: number;
  name: string;
  model: string;
  sector: string;
};

type Form = { name: string; model: string; sector: string };

const emptyForm: Form = { name: "", model: "", sector: "" };

export function MachineList() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Form>(emptyForm);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Machine | null | "not_found">(null);

  function refreshMachines() {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMachines(data.machine))
      .catch(() => setError("Erro ao recarregar máquinas."));
  }

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMachines(data.machine);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar máquinas.");
        setLoading(false);
      });
  }, []);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    setSubmitting(false);
    refreshMachines();
  }

  async function handleDelete(id: number) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    refreshMachines();
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`${API}/${searchId}`);
    if (!res.ok) { setSearchResult("not_found"); return; }
    const data = await res.json();
    setSearchResult(data.machine ?? "not_found");
  }

  function startEdit(machine: Machine) {
    setEditingId(machine.id);
    setEditForm({ name: machine.name, model: machine.model, sector: machine.sector });
  }

  async function handleUpdate(id: number) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    refreshMachines();
  }

  return (
    <div>
      <h2>Adicionar máquina</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Modelo"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
        />
        <input
          placeholder="Setor"
          value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value })}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Adicionar"}
        </button>
      </form>

      <h2>Buscar por ID</h2>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="ID da máquina"
          value={searchId}
          onChange={(e) => { setSearchId(e.target.value); setSearchResult(null); }}
          required
        />
        <button type="submit">Buscar</button>
      </form>
      {searchResult === "not_found" && <p className="not-found">Máquina não encontrada.</p>}
      {searchResult && searchResult !== "not_found" && (
        <table className="search-result">
          <thead>
            <tr><th>ID</th><th>Nome</th><th>Modelo</th><th>Setor</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{searchResult.id}</td>
              <td>{searchResult.name}</td>
              <td>{searchResult.model}</td>
              <td>{searchResult.sector}</td>
            </tr>
          </tbody>
        </table>
      )}

      <h2>Máquinas</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Setor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {machines.length === 0 && (
              <tr>
                <td colSpan={4}>Nenhuma máquina cadastrada.</td>
              </tr>
            )}
            {machines.map((machine) =>
              editingId === machine.id ? (
                <tr key={machine.id}>
                  <td>
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={editForm.model}
                      onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={editForm.sector}
                      onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                    />
                  </td>
                  <td className="actions">
                    <button className="save" onClick={() => handleUpdate(machine.id)}>
                      Salvar
                    </button>
                    <button className="cancel" onClick={() => setEditingId(null)}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={machine.id}>
                  <td>{machine.name}</td>
                  <td>{machine.model}</td>
                  <td>{machine.sector}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => startEdit(machine)}>
                      Editar
                    </button>
                    <button className="delete" onClick={() => handleDelete(machine.id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
