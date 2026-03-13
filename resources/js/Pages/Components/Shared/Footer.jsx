import { Link } from "@inertiajs/react";
import {
    Box, Container, Grid, Typography,
    Stack, IconButton, Divider
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const FONT = "'Plus Jakarta Sans', sans-serif";

const FOOTER_LINKS = {
    "Explore": [
        { label: "All Hotels",     href: "/hotels" },
        { label: "Destinations",   href: "/destinations" },
        { label: "Luxury Stays",   href: "/hotels?filter=luxury" },
        { label: "Trekking Hubs",  href: "/hotels?region=trekking" },
    ],
    "Company": [
        { label: "About Us",  href: "/about" },
        { label: "Contact",   href: "/contact" },
        { label: "Careers",   href: "/careers" },
    ],
    "Support": [
        { label: "Help Centre",    href: "/help" },
        { label: "Cancellations",  href: "/cancellation-policy" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use",   href: "/terms" },
    ],
};

const CONTACT_INFO = [
    { icon: <LocationOnIcon sx={{ fontSize: 15 }} />, text: "Thamel, Kathmandu, Nepal" },
    { icon: <PhoneIcon sx={{ fontSize: 15 }} />,      text: "+977 1-4444444" },
    { icon: <EmailIcon sx={{ fontSize: 15 }} />,      text: "hello@bookhotelfor.me" },
];

const SOCIALS = [FacebookIcon, InstagramIcon, TwitterIcon];

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "#0f1f15", color: "#fff", pt: 8, pb: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>

                    {/* ── Brand ── */}
                    <Grid item xs={12} md={3.5}>

                        {/* Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                            <Box sx={{
                                width: 40, height: 40, borderRadius: "10px",
                                background: "linear-gradient(135deg, #52B788, #1B4332)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <HotelIcon sx={{ color: "#fff", fontSize: 22 }} />
                            </Box>
                            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", fontFamily: FONT }}>
                                BookHotel
                                <Box component="span" sx={{ color: "#52B788" }}>ForMe</Box>
                            </Typography>
                        </Box>

                        <Typography sx={{
                            color: "rgba(255,255,255,0.5)", fontSize: "0.88rem",
                            fontFamily: FONT, lineHeight: 1.8, mb: 3, maxWidth: 260,
                        }}>
                            Nepal's premier hotel booking platform. Find your perfect stay
                            from Kathmandu to Everest Base Camp.
                        </Typography>

                        {/* Contact */}
                        <Stack spacing={1.4} sx={{ mb: 3 }}>
                            {CONTACT_INFO.map((item, i) => (
                                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                                    <Box sx={{ color: "#52B788", flexShrink: 0 }}>{item.icon}</Box>
                                    <Typography sx={{
                                        color: "rgba(255,255,255,0.55)",
                                        fontSize: "0.83rem", fontFamily: FONT,
                                    }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        {/* Social Icons */}
                        <Stack direction="row" spacing={1}>
                            {SOCIALS.map((Icon, i) => (
                                <IconButton key={i} size="small" sx={{
                                    color: "rgba(255,255,255,0.45)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px", width: 34, height: 34,
                                    "&:hover": {
                                        color: "#52B788",
                                        borderColor: "#52B788",
                                        background: "rgba(82,183,136,0.1)",
                                    },
                                    transition: "all 0.2s",
                                }}>
                                    <Icon sx={{ fontSize: 16 }} />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    {/* ── Link Columns ── */}
                    {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                        <Grid item xs={6} sm={4} md={2.5} key={heading}>
                            <Typography sx={{
                                fontWeight: 700, fontSize: "0.75rem",
                                color: "#52B788", letterSpacing: "0.12em",
                                textTransform: "uppercase", fontFamily: FONT, mb: 2.5,
                            }}>
                                {heading}
                            </Typography>
                            <Stack spacing={1.4}>
                                {links.map((link) => (
                                    <Box
                                        key={link.label}
                                        component={Link}
                                        href={link.href}
                                        sx={{
                                            color: "rgba(255,255,255,0.5)",
                                            fontSize: "0.87rem", fontFamily: FONT,
                                            textDecoration: "none",
                                            "&:hover": { color: "#fff" },
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        {link.label}
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 5 }} />

                {/* ── Bottom Bar ── */}
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexWrap: "wrap", gap: 2,
                }}>
                    <Typography sx={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.82rem", fontFamily: FONT,
                    }}>
                        © {new Date().getFullYear()} BookHotelForMe · All rights reserved.
                    </Typography>
                    <Typography sx={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.82rem", fontFamily: FONT,
                    }}>
                        Made with ❤️ for Nepal 🇳🇵
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
