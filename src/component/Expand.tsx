import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { useState } from "react";

interface ContentItem {
  title: string;
  content: React.ReactNode;
}

interface ExpandableSectionProps {
  items: ContentItem[];
  show: number | null;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  items,
  show,
}) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(show);

  const toggleVisibility = (index: number) => {
    setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box
      sx={{
        marginBottom: "var(--space-6)",
      }}
    >
      {/* Tab Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "var(--space-1)", sm: "var(--space-2)" },
          marginBottom: { xs: "var(--space-1)", sm: "var(--space-3)" },
        }}
      >
        {items.map((item, index) => {
          const isActive = visibleIndex === index;
          return (
            <Button
              key={index}
              onClick={() => toggleVisibility(index)}
              sx={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-3) var(--space-4)",
                borderRadius: "var(--radius-sm)",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "var(--text-base)",
                fontFamily: "var(--font-family-primary)",
                color: isActive
                  ? "var(--color-primary-700)"
                  : "var(--color-text-secondary)",
                backgroundColor: isActive
                  ? "var(--color-primary-100)"
                  : "transparent",
                border: `1px solid ${isActive
                  ? "var(--color-primary-300)"
                  : "var(--color-border)"
                  }`,
                "&:hover": {
                  backgroundColor: isActive
                    ? "var(--color-primary-100)"
                    : "var(--color-surface-subtle)",
                  borderColor: "var(--color-primary-300)",
                },
              }}
              aria-expanded={isActive}
              aria-controls={`expandable-content-${index}`}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "var(--text-base)",
                  color: "inherit",
                }}
              >
                {item.title}
              </Typography>
              {isActive ? (
                <ExpandLess sx={{ marginLeft: "var(--space-2)" }} />
              ) : (
                <ExpandMore sx={{ marginLeft: "var(--space-2)" }} />
              )}
            </Button>
          );
        })}
      </Box>

      {/* Expandable Content */}
      {items.map((item, index) => (
        <Collapse
          key={index}
          in={visibleIndex === index}
          timeout="auto"
          unmountOnExit
        >
          <Box
            id={`expandable-content-${index}`}
            sx={{
              padding: { xs: "var(--space-2)", sm: "var(--space-3)" },
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
              marginTop: { xs: "var(--space-1)", sm: "var(--space-2)" },
            }}
          >
            {item.content}
          </Box>
        </Collapse>
      ))}
    </Box>
  );
};
