import { Box, Typography, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: <EmailIcon fontSize="small" />,
            href: "mailto:pongsakorn_career@outlook.com",
            label: "Email",
        },
        {
            icon: <LinkedInIcon fontSize="small" />,
            href: "https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/",
            label: "LinkedIn",
        },
        {
            icon: <GitHubIcon fontSize="small" />,
            href: "https://github.com/min23asdw",
            label: "GitHub",
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                borderTop: "1px solid var(--color-border)",
                padding: "var(--space-4) 0",
                marginTop: "var(--space-12)",
            }}
        >
            <Box
                sx={{
                    maxWidth: "var(--container-max)",
                    margin: "0 auto",
                    padding: "0 var(--container-padding-x)",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--space-3)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-tertiary)",
                    }}
                >
                    &copy; {currentYear} Pongsakorn Rattanapan
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: "var(--space-1)",
                    }}
                >
                    {socialLinks.map((social) => (
                        <IconButton
                            key={social.label}
                            component="a"
                            href={social.href}
                            target={social.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                                social.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            aria-label={social.label}
                            size="small"
                            sx={{
                                color: "var(--color-text-tertiary)",
                                "&:hover": {
                                    color: "var(--color-primary-500)",
                                },
                            }}
                        >
                            {social.icon}
                        </IconButton>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
