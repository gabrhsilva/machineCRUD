import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6d28d9",
      light: "#8b5cf6",
      dark: "#4c1d95",
      contrastText: "#ffffff",
    },
    secondary: { main: "#0891b2" },
    background: { default: "#f5f3ff", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 14px rgba(109,40,217,0.4)", filter: "brightness(1.05)" },
        },
        outlined: {
          "&:hover": { backgroundColor: "rgba(109,40,217,0.06)" },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#6d28d9",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.8125rem",
          letterSpacing: "0.02em",
        },
        body: { fontSize: "0.875rem" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover td": { backgroundColor: "rgba(109,40,217,0.035)" },
          "&:last-child td": { borderBottom: 0 },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: { borderRadius: 12, overflow: "hidden" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: "1.1rem", paddingBottom: 4 },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: "rgba(109,40,217,0.18)" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: "0.75rem" },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});
