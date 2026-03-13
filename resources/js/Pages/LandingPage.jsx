import { useState } from "react";
import {
    Box, Typography, Button, Container, Grid,
    Card, CardContent, CardMedia, CardActions,
    Modal, TextField, Chip, Divider, IconButton,
    InputAdornment, Fade, Backdrop, Avatar,
    Rating, Stack
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ── MUI Icons ──
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CategoryIcon from "@mui/icons-material/Category";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// ── Shared Components ──
import Navbar from "@/Components/Shared/Navbar.jsx";
import Footer from "@/Components/Shared/Footer.jsx";
import Pagination from "@/Components/Shared/Pagination.jsx";

// ── Theme ──
import theme from "@/theme";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const STATS = [
    { label: "Hotels",          value: "48",    icon: <HotelIcon sx={{ fontSize: 28 }} /> },
    { label: "Room Categories", value: "124",   icon: <CategoryIcon sx={{ fontSize: 28 }} /> },
    { label: "Rooms",           value: "1,340", icon: <MeetingRoomIcon sx={{ fontSize: 28 }} /> },
];

const HOTELS = [
    {
        id: 1, name: "Dwarika's Hotel", destination: "Kathmandu",
        region: "city", stars: 5, rating: 4.9, reviews: 312,
        price: 18500, tag: "Heritage Luxury",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        amenities: ["wifi", "pool", "restaurant", "parking"],
    },
    {
        id: 2, name: "Temple Tree Resort", destination: "Pokhara",
        region: "city", stars: 4, rating: 4.7, reviews: 198,
        price: 9800, tag: "Lakeside View",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
        amenities: ["wifi", "pool", "restaurant"],
    },
    {
        id: 3, name: "Yeti Mountain Home", destination: "Namche Bazaar",
        region: "trekking", stars: 4, rating: 4.8, reviews: 145,
        price: 12000, tag: "Everest View",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
        amenities: ["wifi", "restaurant"],
    },
    {
        id: 4, name: "Barahi Jungle Lodge", destination: "Chitwan",
        region: "wildlife", stars: 4, rating: 4.6, reviews: 221,
        price: 8500, tag: "Jungle Safari",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80",
        amenities: ["wifi", "restaurant", "parking"],
    },
    {
        id: 5, name: "Hotel Manang", destination: "Kathmandu",
        region: "city", stars: 3, rating: 4.3, reviews: 407,
        price: 4500, tag: "City Centre",
        image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=600&q=80",
        amenities: ["wifi", "restaurant"],
    },
    {
        id: 6, name: "Fishtail Lodge", destination: "Pokhara",
        region: "city", stars: 5, rating: 4.8, reviews: 183,
        price: 22000, tag: "Island Retreat",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        amenities: ["wifi", "pool", "restaurant", "parking"],
    },
];

const AMENITY_ICONS = {
    wifi:       <WifiIcon sx={{ fontSize: 15 }} />,
    pool:       <PoolIcon sx={{ fontSize: 15 }} />,
    restaurant: <RestaurantIcon sx={{ fontSize: 15 }} />,
    parking:    <LocalParkingIcon sx={{ fontSize: 15 }} />,
};

const REGION_COLORS = {
    city:       { bg: "#e8f5ee", color: "#2D6A4F" },
    trekking:   { bg: "#e8eaf6", color: "#3949AB" },
    wildlife:   { bg: "#fbe9e7", color: "#B7410E" },
    pilgrimage: { bg: "#fff8e1", color: "#F57F17" },
};

const FILTERS = ["all", "city", "trekking", "wildlife", "pilgrimage"];

// ─── Styled ───────────────────────────────────────────────────────────────────
const FONT = "'Plus Jakarta Sans', sans-serif";

const HeroSection = styled(Box)(() => ({
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    backgroundImage: `url('https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
        zIndex: 1,
    },
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to top, #FAFAF8, transparent)",
        zIndex: 2,
    },
}));

const StatCard = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(3),
    borderRadius: "12px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.18)",
    transition: "transform 0.25s ease, background 0.25s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        background: "rgba(255,255,255,0.16)",
    },
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%", maxWidth: 440,
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
    padding: theme.spacing(5),
    outline: "none",
}));

// ─── Component ────────────────────────────────────────────────────────────────
export default function LandingPage() {
    const [loginOpen,    setLoginOpen]    = useState(false);
    const [signupOpen,   setSignupOpen]   = useState(false);
    const [showPass,     setShowPass]     = useState(false);
    const [showPass2,    setShowPass2]    = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? HOTELS
        : HOTELS.filter((h) => h.region === activeFilter);

    const switchToSignup = () => { setLoginOpen(false);  setSignupOpen(true);  };
    const switchToLogin  = () => { setSignupOpen(false); setLoginOpen(true);   };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAFAF8; }
            `}</style>

            {/* ── Navbar ── */}
            <Navbar
                variant="transparent"
                onLoginClick={() => setLoginOpen(true)}
                onSignupClick={() => setSignupOpen(true)}
            />

            {/* ── Hero ── */}
            <HeroSection>
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3, pt: 8 }}>
                    <Grid container alignItems="center" spacing={4}>

                        {/* Left — Text */}
                        <Grid item xs={12} md={7}>
                            {/* Badge */}
                            <Box sx={{
                                display: "inline-flex", alignItems: "center", gap: 1,
                                bgcolor: "rgba(82,183,136,0.18)",
                                border: "1px solid rgba(82,183,136,0.35)",
                                borderRadius: "100px", px: 2, py: 0.7, mb: 3,
                            }}>
                                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#52B788" }} />
                                <Typography sx={{ color: "#52B788", fontSize: "0.82rem", fontWeight: 700, fontFamily: FONT }}>
                                    Nepal's #1 Hotel Booking Platform
                                </Typography>
                            </Box>

                            {/* Headline */}
                            <Typography sx={{
                                color: "#fff", fontWeight: 800,
                                fontSize: { xs: "2.4rem", md: "3.6rem" },
                                lineHeight: 1.15, mb: 2.5, fontFamily: FONT,
                                letterSpacing: "-0.02em",
                            }}>
                                Welcome to<br />
                                <Box component="span" sx={{ color: "#52B788" }}>Nepal's Finest</Box> Hotels
                            </Typography>

                            {/* Subtext */}
                            <Typography sx={{
                                color: "rgba(255,255,255,0.82)", fontSize: "1rem",
                                lineHeight: 1.8, mb: 4.5, maxWidth: 480,
                                fontFamily: FONT, fontWeight: 400,
                            }}>
                                Experience luxury, comfort & peace all in one place.
                                From Kathmandu palaces to Everest Base Camp lodges —
                                find and book your perfect Nepal stay.
                            </Typography>

                            {/* Search Bar */}
                            <Box sx={{
                                display: "flex", bgcolor: "#fff",
                                borderRadius: "12px", overflow: "hidden",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                                maxWidth: 520,
                            }}>
                                <TextField
                                    placeholder="Search destination or hotel..."
                                    variant="standard" fullWidth
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ ml: 2 }}>
                                                <SearchIcon sx={{ color: "#2D6A4F" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ "& input": { py: 1.8, fontSize: "0.92rem", fontFamily: FONT } }}
                                />
                                <Button variant="contained" sx={{
                                    borderRadius: "0 12px 12px 0", px: 3.5,
                                    minWidth: 120, fontWeight: 700,
                                    bgcolor: "#E76F51", fontFamily: FONT,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#B7410E" },
                                }}>
                                    Search
                                </Button>
                            </Box>
                        </Grid>

                        {/* Right — Booking Card */}
                        <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                            <Box sx={{
                                bgcolor: "rgba(255,255,255,0.97)",
                                borderRadius: "16px", p: 4, width: 320,
                                boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
                            }}>
                                <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", mb: 2.5, fontFamily: FONT, color: "#1A1A1A" }}>
                                    Book Your Stay
                                </Typography>
                                <Stack spacing={2}>
                                    <TextField label="Check-in Date" type="date" fullWidth size="small"
                                        InputLabelProps={{ shrink: true, sx: { fontFamily: FONT } }}
                                        InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                    />
                                    <TextField label="Check-out Date" type="date" fullWidth size="small"
                                        InputLabelProps={{ shrink: true, sx: { fontFamily: FONT } }}
                                        InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                    />
                                    <TextField label="Guests" type="number" fullWidth size="small"
                                        defaultValue={2} inputProps={{ min: 1 }}
                                        InputLabelProps={{ sx: { fontFamily: FONT } }}
                                        InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                    />
                                    <Button
                                        variant="contained" fullWidth size="large"
                                        startIcon={<SearchIcon />}
                                        onClick={() => setLoginOpen(true)}
                                        sx={{
                                            py: 1.4, fontWeight: 700, fontFamily: FONT,
                                            textTransform: "none", borderRadius: "10px",
                                            bgcolor: "#E76F51",
                                            "&:hover": { bgcolor: "#B7410E" },
                                        }}
                                    >
                                        Search Available Rooms
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mt: 6, maxWidth: 500 }}>
                        {STATS.map((s) => (
                            <Grid item xs={4} key={s.label}>
                                <StatCard>
                                    <Box sx={{ color: "#52B788", mb: 0.5 }}>{s.icon}</Box>
                                    <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", fontFamily: FONT }}>
                                        {s.value}
                                    </Typography>
                                    <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", fontFamily: FONT, fontWeight: 500 }}>
                                        {s.label}
                                    </Typography>
                                </StatCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </HeroSection>

            {/* ── Hotels Section ── */}
            <Box sx={{ bgcolor: "#FAFAF8", py: 10 }}>
                <Container maxWidth="lg">

                    {/* Section Header */}
                    <Box sx={{ mb: 5 }}>
                        <Typography sx={{
                            color: "#2D6A4F", fontWeight: 700, letterSpacing: "0.12em",
                            textTransform: "uppercase", mb: 1,
                            fontSize: "0.78rem", fontFamily: FONT,
                        }}>
                            Featured Properties
                        </Typography>
                        <Typography sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.8rem", md: "2.4rem" },
                            color: "#1A1A1A", mb: 3, fontFamily: FONT,
                            letterSpacing: "-0.01em",
                        }}>
                            Handpicked Hotels Across Nepal
                        </Typography>

                        {/* Region Filters */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {FILTERS.map((f) => (
                                <Chip
                                    key={f}
                                    label={f.charAt(0).toUpperCase() + f.slice(1)}
                                    onClick={() => setActiveFilter(f)}
                                    sx={{
                                        fontFamily: FONT, fontWeight: 600,
                                        fontSize: "0.82rem", cursor: "pointer",
                                        transition: "all 0.2s",
                                        ...(activeFilter === f
                                            ? { bgcolor: "#2D6A4F", color: "#fff" }
                                            : { bgcolor: "#efefeb", color: "#5C5C5C",
                                                "&:hover": { bgcolor: "#e0ede6", color: "#2D6A4F" } }
                                        ),
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    {/* Hotel Cards */}
                    <Grid container spacing={3}>
                        {filtered.map((hotel) => {
                            const regionStyle = REGION_COLORS[hotel.region] ?? REGION_COLORS.city;
                            return (
                                <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                                    <Card sx={{
                                        height: "100%", display: "flex", flexDirection: "column",
                                        borderRadius: "14px", overflow: "hidden",
                                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: "0 20px 48px rgba(0,0,0,0.13)",
                                        },
                                    }}>
                                        {/* Image */}
                                        <Box sx={{ position: "relative" }}>
                                            <CardMedia
                                                component="img" height="210"
                                                image={hotel.image} alt={hotel.name}
                                                sx={{ objectFit: "cover" }}
                                            />
                                            <Chip
                                                label={hotel.tag} size="small"
                                                sx={{
                                                    position: "absolute", top: 12, left: 12,
                                                    bgcolor: regionStyle.bg, color: regionStyle.color,
                                                    fontWeight: 700, fontSize: "0.7rem",
                                                    border: `1px solid ${regionStyle.color}30`,
                                                    height: 24, fontFamily: FONT,
                                                }}
                                            />
                                            <Box sx={{
                                                position: "absolute", top: 12, right: 12,
                                                bgcolor: "rgba(0,0,0,0.6)", borderRadius: "6px",
                                                px: 1, py: 0.4, display: "flex", alignItems: "center", gap: 0.4,
                                            }}>
                                                <StarIcon sx={{ color: "#FFD700", fontSize: 13 }} />
                                                <Typography sx={{ color: "#fff", fontSize: "0.78rem", fontWeight: 700, fontFamily: FONT }}>
                                                    {hotel.rating}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Content */}
                                        <CardContent sx={{ flexGrow: 1, px: 2.5, pt: 2, pb: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                                <Typography sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3, flex: 1, fontFamily: FONT }}>
                                                    {hotel.name}
                                                </Typography>
                                                <Rating value={hotel.stars} readOnly size="small" sx={{ mt: 0.3, ml: 1, flexShrink: 0 }} />
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
                                                <LocationOnIcon sx={{ fontSize: 14, color: "#B7410E" }} />
                                                <Typography sx={{ color: "#5C5C5C", fontSize: "0.82rem", fontFamily: FONT }}>
                                                    {hotel.destination}
                                                </Typography>
                                                <Typography sx={{ color: "#bbb", fontSize: "0.75rem", fontFamily: FONT }}>
                                                    · {hotel.reviews} reviews
                                                </Typography>
                                            </Box>
                                            <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                                                {hotel.amenities.map((a) => (
                                                    <Box key={a} sx={{
                                                        display: "flex", alignItems: "center",
                                                        color: "#2D6A4F", bgcolor: "#eef6f1",
                                                        borderRadius: "6px", px: 0.8, py: 0.4,
                                                    }}>
                                                        {AMENITY_ICONS[a]}
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </CardContent>

                                        <Divider sx={{ mx: 2.5 }} />

                                        {/* Price + Book */}
                                        <CardActions sx={{ px: 2.5, py: 1.8, justifyContent: "space-between", alignItems: "center" }}>
                                            <Box>
                                                <Typography sx={{ color: "#aaa", fontSize: "0.7rem", fontFamily: FONT }}>
                                                    Starting from
                                                </Typography>
                                                <Typography sx={{ color: "#2D6A4F", fontWeight: 800, fontSize: "1.05rem", fontFamily: FONT }}>
                                                    NPR {hotel.price.toLocaleString()}
                                                    <Box component="span" sx={{ color: "#aaa", fontSize: "0.72rem", fontWeight: 400 }}>
                                                        {" "}/night
                                                    </Box>
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained" size="small"
                                                onClick={() => setLoginOpen(true)}
                                                sx={{
                                                    px: 2.5, py: 0.9, borderRadius: "8px",
                                                    fontWeight: 700, fontFamily: FONT,
                                                    textTransform: "none", fontSize: "0.82rem",
                                                    bgcolor: "#E76F51",
                                                    "&:hover": { bgcolor: "#B7410E" },
                                                }}
                                            >
                                                Book Now
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Pagination — dummy meta for landing page */}
                    <Pagination
                        links={[
                            { label: "&laquo; Previous", url: null },
                            { label: "1", url: "#", active: true },
                            { label: "2", url: "#", active: false },
                            { label: "3", url: "#", active: false },
                            { label: "Next &raquo;", url: "#" },
                        ]}
                        meta={{ current_page: 1, last_page: 3, total: 48, per_page: 6, from: 1, to: 6 }}
                    />
                </Container>
            </Box>

            {/* ── Footer ── */}
            <Footer />

            {/* ── Login Modal ── */}
            <Modal open={loginOpen} onClose={() => setLoginOpen(false)}
                closeAfterTransition slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 300 } }}>
                <Fade in={loginOpen}>
                    <ModalBox>
                        <IconButton onClick={() => setLoginOpen(false)}
                            sx={{ position: "absolute", top: 14, right: 14, color: "#ccc" }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "#2D6A4F", width: 50, height: 50 }}>
                                <HotelIcon />
                            </Avatar>
                            <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: FONT, mb: 0.5 }}>
                                Welcome Back
                            </Typography>
                            <Typography sx={{ color: "#888", fontSize: "0.9rem", fontFamily: FONT }}>
                                Sign in to your account
                            </Typography>
                        </Box>
                        <Stack spacing={2.5}>
                            <TextField label="Email Address" type="email" fullWidth size="small"
                                InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                InputLabelProps={{ sx: { fontFamily: FONT } }}
                            />
                            <TextField
                                label="Password" type={showPass ? "text" : "password"}
                                fullWidth size="small"
                                InputLabelProps={{ sx: { fontFamily: FONT } }}
                                InputProps={{
                                    sx: { borderRadius: "10px", fontFamily: FONT },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPass(!showPass)} size="small">
                                                {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" fullWidth size="large" sx={{
                                py: 1.4, fontWeight: 700, fontFamily: FONT,
                                textTransform: "none", borderRadius: "10px",
                            }}>
                                Sign In
                            </Button>
                        </Stack>
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <Typography sx={{ color: "#888", fontSize: "0.88rem", fontFamily: FONT }}>
                                Don't have an account?{" "}
                                <Box component="span" onClick={switchToSignup} sx={{
                                    color: "#2D6A4F", fontWeight: 700, cursor: "pointer",
                                    "&:hover": { textDecoration: "underline" },
                                }}>
                                    Sign Up
                                </Box>
                            </Typography>
                        </Box>
                    </ModalBox>
                </Fade>
            </Modal>

            {/* ── Signup Modal ── */}
            <Modal open={signupOpen} onClose={() => setSignupOpen(false)}
                closeAfterTransition slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 300 } }}>
                <Fade in={signupOpen}>
                    <ModalBox>
                        <IconButton onClick={() => setSignupOpen(false)}
                            sx={{ position: "absolute", top: 14, right: 14, color: "#ccc" }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "#E76F51", width: 50, height: 50 }}>
                                <HotelIcon />
                            </Avatar>
                            <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", fontFamily: FONT, mb: 0.5 }}>
                                Create Account
                            </Typography>
                            <Typography sx={{ color: "#888", fontSize: "0.9rem", fontFamily: FONT }}>
                                Start booking Nepal's finest hotels
                            </Typography>
                        </Box>
                        <Stack spacing={2}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={6}>
                                    <TextField label="First Name" fullWidth size="small"
                                        InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                        InputLabelProps={{ sx: { fontFamily: FONT } }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Last Name" fullWidth size="small"
                                        InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                        InputLabelProps={{ sx: { fontFamily: FONT } }}
                                    />
                                </Grid>
                            </Grid>
                            <TextField label="Email Address" type="email" fullWidth size="small"
                                InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                InputLabelProps={{ sx: { fontFamily: FONT } }}
                            />
                            <TextField label="Phone Number" fullWidth size="small"
                                InputProps={{ sx: { borderRadius: "10px", fontFamily: FONT } }}
                                InputLabelProps={{ sx: { fontFamily: FONT } }}
                            />
                            <TextField
                                label="Password" type={showPass2 ? "text" : "password"}
                                fullWidth size="small"
                                InputLabelProps={{ sx: { fontFamily: FONT } }}
                                InputProps={{
                                    sx: { borderRadius: "10px", fontFamily: FONT },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPass2(!showPass2)} size="small">
                                                {showPass2 ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" fullWidth size="large" sx={{
                                py: 1.4, fontWeight: 700, fontFamily: FONT,
                                textTransform: "none", borderRadius: "10px",
                                bgcolor: "#E76F51",
                                "&:hover": { bgcolor: "#B7410E" },
                            }}>
                                Create Account
                            </Button>
                        </Stack>
                        <Box sx={{ textAlign: "center", mt: 2.5 }}>
                            <Typography sx={{ color: "#888", fontSize: "0.88rem", fontFamily: FONT }}>
                                Already have an account?{" "}
                                <Box component="span" onClick={switchToLogin} sx={{
                                    color: "#2D6A4F", fontWeight: 700, cursor: "pointer",
                                    "&:hover": { textDecoration: "underline" },
                                }}>
                                    Sign In
                                </Box>
                            </Typography>
                        </Box>
                    </ModalBox>
                </Fade>
            </Modal>

        </ThemeProvider>
    );
}
