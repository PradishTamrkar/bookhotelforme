import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2D6A4F",
            light: "#52B788",
            dark: "#1B4332",
        },
        secondary: {
            main: "#B7410E",
            light: "#E76F51",
            dark: "#7D2D0A",
        },
        background: {
            default: "#FAFAF8",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1A1A1A",
            secondary: "#5C5C5C",
        },
    },
    typography: {
        fontFamily: "'Cormorant Garamond', serif",
        h1: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 },
        h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 },
        h3: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
        h4: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
        h5: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
        h6: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
        body1: { fontFamily: "'Lato', sans-serif" },
        body2: { fontFamily: "'Lato', sans-serif" },
        button: { fontFamily: "'Lato', sans-serif", letterSpacing: "0.08em" },
    },
    shape: {
        borderRadius: 2,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                },
                containedPrimary: {
                    background: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #52B788 0%, #2D6A4F 100%)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                    border: "1px solid #f0ede8",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        fontFamily: "'Lato', sans-serif",
                    },
                    "& .MuiInputLabel-root": {
                        fontFamily: "'Lato', sans-serif",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: "'Lato', sans-serif",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: "'Lato', sans-serif",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: "'Lato', sans-serif",
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontFamily: "'Lato', sans-serif",
                },
            },
        },
    },
});

export default theme;
