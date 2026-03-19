import { Box, Container, Skeleton } from "@mui/material";

const PageSkeleton = () => (
  <Box sx={{ minHeight: "100vh" }}>
    {/* Navbar skeleton */}
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "56px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        zIndex: "var(--z-fixed)",
        display: "flex",
        alignItems: "center",
        px: 3,
        justifyContent: "space-between",
      }}
    >
      <Skeleton variant="text" width={120} height={32} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="text" width={60} height={24} />
        <Skeleton variant="text" width={60} height={24} />
        <Skeleton variant="text" width={60} height={24} />
      </Box>
    </Box>

    {/* Content skeleton */}
    <Container sx={{ paddingTop: "100px", paddingBottom: "40px" }}>
      {/* Title */}
      <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 4 }} />

      {/* Image placeholder */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ borderRadius: "var(--radius-sm)", mb: 3 }}
      />

      {/* Text lines */}
      <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="75%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />

      {/* Second image placeholder */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={250}
        sx={{ borderRadius: "var(--radius-sm)", mb: 3 }}
      />

      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="50%" height={20} />
    </Container>
  </Box>
);

export default PageSkeleton;
