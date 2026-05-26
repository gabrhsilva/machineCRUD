import { Box, Typography } from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import { MachineList } from './machineList'

function App() {
  return (
    <Box sx={{ minHeight: "100svh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
      <Box
        component="header"
        sx={{
          background: "linear-gradient(135deg, #3b0764 0%, #6d28d9 55%, #7c3aed 100%)",
          py: { xs: 3, sm: 4 },
          px: 3,
          textAlign: "center",
          boxShadow: "0 4px 32px rgba(109,40,217,0.35)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
          <MemoryIcon sx={{ color: "#ddd6fe", fontSize: 34 }} />
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: 800, letterSpacing: "-0.5px", fontSize: { xs: 26, sm: 30 } }}
          >
            MachineCRUD
          </Typography>
        </Box>
        <Typography sx={{ color: "rgba(255,255,255,0.65)", mt: 0.5, fontSize: 14 }}>
          Gerenciamento de máquinas industriais
        </Typography>
      </Box>

      <Box sx={{ flex: 1, maxWidth: 900, width: "100%", mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
        <MachineList />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2.5,
          textAlign: "center",
          fontSize: 13,
          color: "text.secondary",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        © {new Date().getFullYear()} MachineCRUD. Todos os direitos reservados.
      </Box>
    </Box>
  )
}

export default App
