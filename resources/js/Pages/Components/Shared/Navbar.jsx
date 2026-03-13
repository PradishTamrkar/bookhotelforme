import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    AppBar, Toolbar, Box, Typography, Button, IconButton,
    Drawer, List, ListItem, ListItemText, Stack, Avatar,
    Menu, MenuItem, Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HotelIcon from "@mui/icons-material/Hotel";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LogoutIcon from "@mui/icons-material/Logout";

const FONT = "'Plus Jakarta Sans', sans-serif";

const NAV_LINKS = [
    { label: "Hotels",       href: "/hotels" },
    { label: "Destinations", href: "/destinations" },
    { label: "About",        href: "/about" },
    { label: "Contact",      href: "/contact" },
];

// ── Two variants ──────────────────────────────────────────────────────────────
// variant="transparent" → glassmorphism over hero image (landing page)
// variant="solid"       → white navbar for inner pages

const TransparentBar = styled(AppBar)(() => ({
    background: "rgba(0,0,0,0.28)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "none",
}));

const SolidBar = styled(AppBar)(() => ({
    background: "#ffffff",
    borderBottom: "1px solid #f0ede8",
    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
}));

// ── Props ─────────────────────────────────────────────────────────────────────
// variant      → "transparent" | "solid"  (default: "solid")
// onLoginClick → fn — opens login modal
// onSignupClick→ fn — opens signup modal

export default function Navbar({ variant = "solid", onLoginClick, onSignupClick }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl,   setAnchorEl]   = useState(null);

    const isTransparent = variant === "transparent";
    const Bar           = isTransparent ? TransparentBar : SolidBar;
    const textColor     = isTransparent ? "#fff"         : "#1A1A1A";
    const subTextColor  = isTransparent ? "rgba(255,255,255,0.82)" : "#5C5C5C";

    const openUserMenu  = (e) => setAnchorEl(e.currentTarget);
    const closeUserMenu = ()  => setAnchorEl(null);

    const handleLogout = () => {
        closeUserMenu();
        router.post("/logout");
    };

    return (
        <>
            <Bar position="fixed" elevation={0}>
                <Toolbar sx={{ px: { xs: 2, md: 6 }, minHeight: "66px !important" }}>

                    {/* ── Logo ── */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: "flex", alignItems: "center",
                            gap: 1.5, flexGrow: 1, textDecoration: "none",
                        }}
                    >
                        <Box sx={{
                            width: 38, height: 38, borderRadius: "10px",
                            background: "linear-gradient(135deg, #52B788, #1B4332)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <HotelIcon sx={{ color: "#fff", fontSize: 20 }} />
                        </Box>
                        <Typography sx={{
                            fontWeight: 800, fontSize: "1.2rem",
                            color: textColor, fontFamily: FONT,
                            letterSpacing: "-0.01em",
                        }}>
                            BookHotel
                            <Box component="span" sx={{ color: "#52B788" }}>ForMe</Box>
                        </Typography>
                    </Box>

                    {/* ── Nav Links — desktop ── */}
                    <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ mr: 3, display: { xs: "none", md: "flex" } }}
                    >
                        {NAV_LINKS.map((link) => (
                            <Button
                                key={link.label}
                                component={Link}
                                href={link.href}
                                sx={{
                                    color: subTextColor,
                                    fontWeight: 500, fontSize: "0.88rem",
                                    fontFamily: FONT, textTransform: "none",
                                    "&:hover": {
                                        color: "#52B788",
                                        background: "transparent",
                                    },
                                    transition: "color 0.2s",
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Stack>

                    {/* ── Auth / User — desktop ── */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                        {user ? (
                            <>
                                {/* User avatar button */}
                                <Button
                                    onClick={openUserMenu}
                                    endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
                                    sx={{
                                        color: textColor, fontWeight: 600,
                                        fontFamily: FONT, textTransform: "none",
                                        gap: 1, borderRadius: "10px",
                                        px: 1.5, py: 0.8,
                                        "&:hover": {
                                            background: isTransparent
                                                ? "rgba(255,255,255,0.1)"
                                                : "#f5f5f0",
                                        },
                                    }}
                                >
                                    <Avatar sx={{
                                        width: 32, height: 32,
                                        bgcolor: "#2D6A4F", fontSize: "0.82rem",
                                        fontFamily: FONT,
                                    }}>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography sx={{
                                        fontFamily: FONT, fontWeight: 600,
                                        fontSize: "0.88rem", color: textColor,
                                    }}>
                                        {user.name?.split(" ")[0]}
                                    </Typography>
                                </Button>

                                {/* Dropdown menu */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={closeUserMenu}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                            mt: 1, minWidth: 190,
                                            border: "1px solid #f0ede8",
                                        },
                                    }}
                                >
                                    {/* User info header */}
                                    <Box sx={{ px: 2, py: 1.5 }}>
                                        <Typography sx={{
                                            fontWeight: 700, fontSize: "0.9rem",
                                            fontFamily: FONT, color: "#1A1A1A",
                                        }}>
                                            {user.name}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: "0.78rem", color: "#999",
                                            fontFamily: FONT,
                                        }}>
                                            {user.email}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <MenuItem
                                        component={Link}
                                        href="/profile"
                                        onClick={closeUserMenu}
                                        sx={{
                                            gap: 1.5, py: 1.2,
                                            fontFamily: FONT, fontSize: "0.88rem",
                                            color: "#1A1A1A",
                                        }}
                                    >
                                        <PersonOutlineIcon fontSize="small" sx={{ color: "#2D6A4F" }} />
                                        My Profile
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        href="/reservations"
                                        onClick={closeUserMenu}
                                        sx={{
                                            gap: 1.5, py: 1.2,
                                            fontFamily: FONT, fontSize: "0.88rem",
                                            color: "#1A1A1A",
                                        }}
                                    >
                                        <BookOnlineIcon fontSize="small" sx={{ color: "#2D6A4F" }} />
                                        My Bookings
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={handleLogout}
                                        sx={{
                                            gap: 1.5, py: 1.2,
                                            fontFamily: FONT, fontSize: "0.88rem",
                                            color: "#B7410E",
                                        }}
                                    >
                                        <LogoutIcon fontSize="small" />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="text"
                                    onClick={onLoginClick}
                                    sx={{
                                        color: textColor, fontWeight: 600,
                                        fontFamily: FONT, textTransform: "none",
                                        px: 2.5, borderRadius: "8px",
                                        "&:hover": {
                                            background: isTransparent
                                                ? "rgba(255,255,255,0.1)"
                                                : "#f5f5f0",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onSignupClick}
                                    sx={{
                                        px: 3, fontWeight: 700,
                                        fontFamily: FONT, textTransform: "none",
                                        background: "#E76F51", borderRadius: "8px",
                                        "&:hover": { background: "#B7410E" },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* ── Mobile Menu Toggle ── */}
                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        sx={{ display: { xs: "flex", md: "none" }, color: textColor, ml: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Bar>

            {/* ── Mobile Drawer ── */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: { width: 290, p: 3, borderRadius: "16px 0 0 16px" },
                }}
            >
                {/* Drawer Header */}
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", mb: 3,
                }}>
                    <Typography sx={{
                        fontWeight: 800, fontSize: "1.1rem", fontFamily: FONT,
                    }}>
                        BookHotel<Box component="span" sx={{ color: "#52B788" }}>ForMe</Box>
                    </Typography>
                    <IconButton onClick={() => setDrawerOpen(false)} size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* Nav Links */}
                <List disablePadding sx={{ mb: 2 }}>
                    {NAV_LINKS.map((link) => (
                        <ListItem
                            key={link.label}
                            component={Link}
                            href={link.href}
                            onClick={() => setDrawerOpen(false)}
                            sx={{
                                borderRadius: "10px", mb: 0.5, px: 2,
                                textDecoration: "none",
                                "&:hover": { bgcolor: "#f5f5f0" },
                            }}
                        >
                            <ListItemText
                                primary={link.label}
                                primaryTypographyProps={{
                                    fontFamily: FONT,
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    color: "#1A1A1A",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ mb: 2.5 }} />

                {/* Auth section */}
                {user ? (
                    <Stack spacing={1.5}>
                        <Box sx={{
                            display: "flex", alignItems: "center", gap: 1.5,
                            p: 1.5, bgcolor: "#f5f5f0", borderRadius: "10px",
                        }}>
                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#2D6A4F", fontSize: "0.9rem" }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", fontFamily: FONT }}>
                                    {user.name}
                                </Typography>
                                <Typography sx={{ fontSize: "0.75rem", color: "#999", fontFamily: FONT }}>
                                    {user.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            component={Link} href="/profile" fullWidth
                            variant="outlined"
                            onClick={() => setDrawerOpen(false)}
                            startIcon={<PersonOutlineIcon fontSize="small" />}
                            sx={{
                                borderRadius: "10px", fontFamily: FONT,
                                textTransform: "none", fontWeight: 600,
                                borderColor: "#2D6A4F", color: "#2D6A4F",
                            }}
                        >
                            My Profile
                        </Button>
                        <Button
                            component={Link} href="/reservations" fullWidth
                            variant="outlined"
                            onClick={() => setDrawerOpen(false)}
                            startIcon={<BookOnlineIcon fontSize="small" />}
                            sx={{
                                borderRadius: "10px", fontFamily: FONT,
                                textTransform: "none", fontWeight: 600,
                                borderColor: "#2D6A4F", color: "#2D6A4F",
                            }}
                        >
                            My Bookings
                        </Button>
                        <Button
                            fullWidth variant="contained"
                            onClick={handleLogout}
                            startIcon={<LogoutIcon fontSize="small" />}
                            sx={{
                                borderRadius: "10px", fontFamily: FONT,
                                textTransform: "none", fontWeight: 700,
                                bgcolor: "#B7410E",
                                "&:hover": { bgcolor: "#7D2D0A" },
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={1.5}>
                        <Button
                            fullWidth variant="outlined"
                            onClick={() => { setDrawerOpen(false); onLoginClick?.(); }}
                            sx={{
                                borderRadius: "10px", fontFamily: FONT,
                                textTransform: "none", fontWeight: 600,
                                borderColor: "#2D6A4F", color: "#2D6A4F",
                                py: 1.2,
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            fullWidth variant="contained"
                            onClick={() => { setDrawerOpen(false); onSignupClick?.(); }}
                            sx={{
                                borderRadius: "10px", fontFamily: FONT,
                                textTransform: "none", fontWeight: 700,
                                bgcolor: "#E76F51", py: 1.2,
                                "&:hover": { bgcolor: "#B7410E" },
                            }}
                        >
                            Sign Up
                        </Button>
                    </Stack>
                )}
            </Drawer>
        </>
    );
}
