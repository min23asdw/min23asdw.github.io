import { Popover, Typography } from "@mui/material";

import { Link } from "react-router-dom";

type NavbarUserPopoverProps = {
  open: boolean;

  popoverAnchor: HTMLButtonElement | null;
  handlePopoverClose: () => void;
};

function NavbarUserPopover({
  open,

  popoverAnchor,
  handlePopoverClose,
}: NavbarUserPopoverProps) {
  const renderPopoverContent = () => {
    return (
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              padding: "5px",
              fontWeight: "bold",
              bgcolor: "rgba(255, 142, 61, 0.25)",
              color: "black",
              ":hover": {
                bgcolor: "rgba(255, 142, 61, 0.75)",
                color: "white",
              },

              display: "flex",
              alignItems: "center",
            }}
          >
            หน้าหลัก
          </Typography>
        </Link>
      </div>
    );
  };

  return (
    <Popover
      open={open}
      anchorEl={popoverAnchor}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {renderPopoverContent()}
    </Popover>
  );
}

export default NavbarUserPopover;
