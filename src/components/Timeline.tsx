import { useState, useMemo } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import {
    ExpandMore,
    CalendarToday,
    ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProjectData from "../model/project";
import { prefetchRoute } from "../data/routePrefetch";

interface TimelineProps {
    data: ProjectData[];
    title?: string;
}

const parseDate = (dateStr: string): Date => {
    if (dateStr === "-1") {
        return new Date();
    }
    const [month, year] = dateStr.split(" ");
    return new Date(`${month} 1, ${year}`);
};

const formatDate = (dateStr: string): string => {
    if (dateStr === "-1") {
        return "Present";
    }
    return dateStr;
};

const getDuration = (start: string, end: string): string => {
    const startDate = parseDate(start);
    const endDate = end === "-1" ? new Date() : parseDate(end);

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
        return `${diffYears}y ${diffMonths % 12 > 0 ? `${diffMonths % 12}m` : ""}`;
    }
    return `${diffMonths}m`;
};

const getYear = (dateStr: string): string => {
    if (dateStr === "-1") {
        return new Date().getFullYear().toString();
    }
    const parts = dateStr.split(" ");
    return parts[1] || "";
};

interface GroupedData {
    year: string;
    items: ProjectData[];
}

const Timeline = ({ data, title = "Timeline" }: TimelineProps) => {
    const navigate = useNavigate();
    const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
    const [isAllExpanded, setIsAllExpanded] = useState(true);

    // Sort and group data by year
    const groupedData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            const dateA = parseDate(a.start);
            const dateB = parseDate(b.start);
            return dateB.getTime() - dateA.getTime();
        });

        const groups: GroupedData[] = [];
        let currentYear = "";
        let currentGroup: ProjectData[] = [];

        sorted.forEach((item) => {
            const year = getYear(item.start);
            if (year !== currentYear) {
                if (currentGroup.length > 0) {
                    groups.push({ year: currentYear, items: currentGroup });
                }
                currentYear = year;
                currentGroup = [item];
            } else {
                currentGroup.push(item);
            }
        });

        if (currentGroup.length > 0) {
            groups.push({ year: currentYear, items: currentGroup });
        }

        return groups;
    }, [data]);

    // Initialize all years as expanded
    useState(() => {
        const allYears = new Set(groupedData.map((g) => g.year));
        setExpandedYears(allYears);
    });

    const toggleYear = (year: string) => {
        setExpandedYears((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(year)) {
                newSet.delete(year);
            } else {
                newSet.add(year);
            }
            return newSet;
        });
    };

    const toggleAll = () => {
        if (isAllExpanded) {
            setExpandedYears(new Set());
        } else {
            setExpandedYears(new Set(groupedData.map((g) => g.year)));
        }
        setIsAllExpanded(!isAllExpanded);
    };

    if (groupedData.length === 0) {
        return null;
    }

    return (
        <Box sx={{ width: "100%" }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    pb: 1,
                    borderBottom: "1px solid var(--color-border-light)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    onClick={toggleAll}
                    sx={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-primary-500)",
                        cursor: "pointer",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {isAllExpanded ? "Collapse all" : "Expand all"}
                </Typography>
            </Box>

            {/* Timeline List */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {groupedData.map((group) => (
                    <Box key={group.year}>
                        {/* Year Header */}
                        <Box
                            onClick={() => toggleYear(group.year)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                py: 1,
                                px: 1,
                                borderRadius: "var(--radius-sm)",
                                cursor: "pointer",
                                transition: "background 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "var(--color-gray-50)",
                                },
                            }}
                        >
                            <IconButton
                                size="small"
                                sx={{
                                    p: 0.25,
                                    color: "var(--color-text-muted)",
                                    transition: "transform 0.2s ease",
                                    transform: expandedYears.has(group.year)
                                        ? "rotate(0deg)"
                                        : "rotate(-90deg)",
                                }}
                            >
                                <ExpandMore sx={{ fontSize: 16 }} />
                            </IconButton>
                            <Typography
                                sx={{
                                    fontSize: "var(--text-sm)",
                                    fontWeight: 600,
                                    color: "var(--color-text-primary)",
                                }}
                            >
                                {group.year}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "var(--text-xs)",
                                    color: "var(--color-text-muted)",
                                    ml: 0.5,
                                }}
                            >
                                ({group.items.length})
                            </Typography>
                        </Box>

                        {/* Items for this year */}
                        <Collapse in={expandedYears.has(group.year)}>
                            <Box
                                sx={{
                                    pl: 3.5,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {group.items.map((item, index) => {
                                    const isOngoing = item.end === "-1";
                                    const isLast = index === group.items.length - 1;

                                    return (
                                        <Box
                                            key={item.title}
                                            onClick={() =>
                                                item.detailsLink &&
                                                navigate(item.detailsLink)
                                            }
                                            onMouseEnter={() =>
                                                item.detailsLink &&
                                                prefetchRoute(item.detailsLink)
                                            }
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                py: 1,
                                                position: "relative",
                                                cursor: item.detailsLink
                                                    ? "pointer"
                                                    : "default",
                                                borderLeft: isLast
                                                    ? "none"
                                                    : "1px solid var(--color-border-light)",
                                                ml: "7px",
                                                pl: 2,
                                                transition: "all 0.2s ease",
                                                "&:hover": item.detailsLink
                                                    ? {
                                                        backgroundColor:
                                                            "var(--color-gray-50)",
                                                    }
                                                    : {},
                                            }}
                                        >
                                            {/* Timeline dot */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    left: "-4px",
                                                    top: "14px",
                                                    width: "7px",
                                                    height: "7px",
                                                    borderRadius: "50%",
                                                    backgroundColor: isOngoing
                                                        ? "var(--color-primary-500)"
                                                        : "var(--color-gray-400)",
                                                    border: `1.5px solid ${isOngoing
                                                        ? "var(--color-primary-500)"
                                                        : "var(--color-surface)"
                                                        }`,
                                                }}
                                            />

                                            {/* Content */}
                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                }}
                                            >
                                                {/* Date row */}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 0.25,
                                                    }}
                                                >
                                                    <CalendarToday
                                                        sx={{
                                                            fontSize: 10,
                                                            color: "var(--color-text-muted)",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: "var(--text-xs)",
                                                            color: "var(--color-text-secondary)",
                                                        }}
                                                    >
                                                        {formatDate(item.start)} —{" "}
                                                        {formatDate(item.end)}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "10px",
                                                            color: isOngoing
                                                                ? "var(--color-primary-500)"
                                                                : "var(--color-text-muted)",
                                                            backgroundColor:
                                                                isOngoing
                                                                    ? "var(--color-primary-50)"
                                                                    : "var(--color-gray-100)",
                                                            px: 0.75,
                                                            py: 0.25,
                                                            borderRadius:
                                                                "var(--radius-sm)",
                                                        }}
                                                    >
                                                        {getDuration(
                                                            item.start,
                                                            item.end
                                                        )}
                                                    </Typography>
                                                </Box>

                                                {/* Title */}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                "var(--text-sm)",
                                                            fontWeight: 500,
                                                            color: "var(--color-text-primary)",
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    {item.detailsLink && (
                                                        <ArrowForward
                                                            sx={{
                                                                fontSize: 12,
                                                                color: "var(--color-text-muted)",
                                                                opacity: 0,
                                                                transition:
                                                                    "opacity 0.2s ease",
                                                            }}
                                                            className="arrow-icon"
                                                        />
                                                    )}
                                                </Box>

                                                {/* Short description */}
                                                {item.short && (
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                "var(--text-xs)",
                                                            color: "var(--color-text-muted)",
                                                            mt: 0.25,
                                                        }}
                                                    >
                                                        {item.short}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Hover effect for arrow */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    right: 8,
                                                    top: "50%",
                                                    transform:
                                                        "translateY(-50%)",
                                                    ".arrow-icon": {
                                                        opacity: 0,
                                                    },
                                                    "&:hover .arrow-icon": {
                                                        opacity: 1,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Timeline;
