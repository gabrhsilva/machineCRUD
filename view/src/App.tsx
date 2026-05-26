import { MachineList } from './machineList'
import './App.css'

function App() {
  return (
    <>
      <h1>MachineCRUD</h1>
      <MachineList />
      <footer>© {new Date().getFullYear()} MachineCRUD. Todos os direitos reservados.</footer>
    </>
  )
}

export default App
