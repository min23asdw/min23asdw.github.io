import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";

interface ContentItem {
  title: string;
  content: React.ReactNode;
}

interface ExpandableSectionProps {
  items: ContentItem[];
  show: number | null;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ items, show }) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(show);

  const toggleVisibility = (index: number) => {
    setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {items.map((item, index) => (
          <Button
            key={index}
            onClick={() => toggleVisibility(index)}
            sx={{
              bgcolor: "rgba(255, 142, 61, 0.25)",
              color: "black",
              ":hover": {
                bgcolor: "rgba(255, 142, 61, 0.75)",
                color: "white",
              },
              borderBottom: "solid black",
              width: "100%",
              marginBottom: "10px",
              // flexGrow: 1,
              borderRadius: "10px",
            }}
          >
            <h2 className="text-2xl font-bold">{item.title}</h2>
            {visibleIndex === index ? <ExpandLess /> : <ExpandMore />}
          </Button>
        ))}
      </div >

      {
        items.map((item, index) => (
          <Collapse key={index} in={visibleIndex === index} timeout="auto">
            <Box sx={{ padding: "10px" }}>{item.content}</Box>
          </Collapse>
        ))
      }
    </>
  );
};