import { useEffect, useState } from "react";

type Machine = {
  id: number;
  name: string;
  model: string;
  sector: string;
};

export function MachineList() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/machines")
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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Setor</th>
        </tr>
      </thead>
      <tbody>
        {machines.map((machine) => (
          <tr key={machine.id}>
            <td>{machine.name}</td>
            <td>{machine.model}</td>
            <td>{machine.sector}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
