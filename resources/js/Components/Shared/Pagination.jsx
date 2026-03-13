import { Box, Button, IconButton, Typography } from "@mui/material";
import { router } from "@inertiajs/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FONT = "'Plus Jakarta Sans', sans-serif";

// ── Props ─────────────────────────────────────────────────────────────────────
// links → array from Laravel paginator  (data.links)
// meta  → object from Laravel paginator (data.meta)
//         { current_page, last_page, total, per_page, from, to }

export default function Pagination({ links = [], meta = {} }) {
    const { current_page, last_page, total, from, to } = meta;

    // Don't render if only one page
    if (!links.length || last_page <= 1) return null;

    const prev    = links.find((l) => l.label === "&laquo; Previous");
    const next    = links.find((l) => l.label === "Next &raquo;");
    const numbered = links.filter(
        (l) => l.label !== "&laquo; Previous" && l.label !== "Next &raquo;"
    );

    const go = (url) => {
        if (url) router.visit(url, { preserveScroll: true });
    };

    return (
        <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 2, mt: 5,
        }}>

            {/* ── Results count ── */}
            <Typography sx={{
                color: "#999", fontSize: "0.85rem", fontFamily: FONT,
            }}>
                Showing{" "}
                <Box component="span" sx={{ fontWeight: 700, color: "#1A1A1A" }}>
                    {from}–{to}
                </Box>
                {" "}of{" "}
                <Box component="span" sx={{ fontWeight: 700, color: "#1A1A1A" }}>
                    {total}
                </Box>
                {" "}results
            </Typography>

            {/* ── Page Buttons ── */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                {/* Prev */}
                <IconButton
                    onClick={() => go(prev?.url)}
                    disabled={!prev?.url}
                    size="small"
                    sx={{
                        width: 36, height: 36,
                        border: "1px solid #e8e5e0",
                        borderRadius: "8px",
                        color: prev?.url ? "#2D6A4F" : "#ccc",
                        "&:hover": {
                            bgcolor: "#eef6f1",
                            borderColor: "#2D6A4F",
                        },
                        transition: "all 0.2s",
                    }}
                >
                    <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </IconButton>

                {/* Page numbers */}
                {numbered.map((link, i) => (
                    <Button
                        key={i}
                        onClick={() => go(link.url)}
                        disabled={!link.url}
                        size="small"
                        sx={{
                            minWidth: 36, height: 36,
                            borderRadius: "8px",
                            fontFamily: FONT,
                            fontWeight: link.active ? 700 : 500,
                            fontSize: "0.85rem",
                            ...(link.active
                                ? {
                                    bgcolor: "#2D6A4F",
                                    color: "#fff",
                                    "&:hover": { bgcolor: "#1B4332" },
                                }
                                : {
                                    bgcolor: "transparent",
                                    color: "#5C5C5C",
                                    border: "1px solid #e8e5e0",
                                    "&:hover": {
                                        bgcolor: "#eef6f1",
                                        borderColor: "#2D6A4F",
                                        color: "#2D6A4F",
                                    },
                                }
                            ),
                        }}
                        // Laravel uses HTML entities for "..." — render safely
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}

                {/* Next */}
                <IconButton
                    onClick={() => go(next?.url)}
                    disabled={!next?.url}
                    size="small"
                    sx={{
                        width: 36, height: 36,
                        border: "1px solid #e8e5e0",
                        borderRadius: "8px",
                        color: next?.url ? "#2D6A4F" : "#ccc",
                        "&:hover": {
                            bgcolor: "#eef6f1",
                            borderColor: "#2D6A4F",
                        },
                        transition: "all 0.2s",
                    }}
                >
                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
        </Box>
    );
}
