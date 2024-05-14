import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";

interface SectionProps {
    title: string;
    show: boolean;
    content: React.ReactNode;
  }
  
   
  
  export const ExpandableSection: React.FC<SectionProps> = ({
    title,
    show,
    content,
  }) => {
    const [visible, setVisible] = useState(show);
  
    const toggleVisibility = () => {
      setVisible(!visible);
    };
  
    return (
      <>
        <Button
          onClick={toggleVisibility}
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
            borderRadius: "10px",
          }}
        >
          <h2 className="text-2xl font-bold">{title}</h2>
          {visible ? <ExpandLess /> : <ExpandMore />}
        </Button>
  
        <Collapse in={visible} timeout="auto">
          <Box sx={{ padding: "10px" }}>{content}</Box>
        </Collapse>
      </>
    );
  };

 