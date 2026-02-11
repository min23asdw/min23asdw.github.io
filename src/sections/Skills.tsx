import { Box, Typography } from "@mui/material";
import data from "../data/SkillData.json";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";

interface Skill {
  name: string;
  icon: string;
  rank: number;
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-3)",
        borderRadius: "var(--radius-sm)",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        minWidth: "80px",
      }}
    >
      <i
        className={skill.icon}
        style={{
          fontSize: "32px",
          color: "var(--color-text-secondary)",
        }}
      />
      <Typography
        sx={{
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          color: "var(--color-text-primary)",
          textAlign: "center",
        }}
      >
        {skill.name}
      </Typography>
    </Box>
  );
};

const SkillCategory = ({
  title,
  icon: Icon,
  skills,
}: {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: "var(--space-3)", md: "var(--space-6)" },
      alignItems: { xs: "center", md: "flex-start" },
      padding: "var(--space-4)",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--color-border)",
    }}
  >
    {/* Category Title */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        minWidth: { md: "120px" },
        flexShrink: 0,
      }}
    >
      <Icon
        fontSize="small"
        sx={{
          color: "var(--color-text-tertiary)",
        }}
      />
      <Typography
        component="h3"
        sx={{
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        {title}
      </Typography>
    </Box>

    {/* Skills Grid */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
        justifyContent: { xs: "center", md: "flex-start" },
        flex: 1,
      }}
    >
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </Box>
  </Box>
);

const SkillsComponent = () => {
  const otherSkills = [
    "Version Control (Git)",
    "CI/CD",
    "Docker",
    "Computation Intelligence",
    "OpenCV",
    "NLP",
    "Agile/Scrum",
    "Jira",
  ];

  const languages = [
    { name: "Thai", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "var(--space-4) 0", md: "var(--space-6) 0" },
      }}
    >
      {/* Skills Categories */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <SkillCategory
          title="Frontend"
          icon={CodeIcon}
          skills={data.frontend}
        />
        <SkillCategory
          title="Backend"
          icon={StorageIcon}
          skills={data.backend}
        />

        {/* Other Skills */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "var(--space-3)", md: "var(--space-6)" },
            alignItems: { xs: "center", md: "flex-start" },
            padding: "var(--space-4)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              minWidth: { md: "120px" },
              flexShrink: 0,
            }}
          >
            <BuildIcon
              fontSize="small"
              sx={{
                color: "var(--color-text-tertiary)",
              }}
            />
            <Typography
              component="h3"
              sx={{
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              Other
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              justifyContent: { xs: "center", md: "flex-start" },
              flex: 1,
            }}
          >
            {otherSkills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  padding: "var(--space-1) var(--space-3)",
                  backgroundColor: "var(--color-surface-subtle)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Languages */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "var(--space-3)", md: "var(--space-6)" },
            alignItems: { xs: "center", md: "flex-start" },
            padding: "var(--space-4)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
              minWidth: { md: "120px" },
            }}
          >
            Languages
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              justifyContent: { xs: "center", md: "flex-start" },
              flex: 1,
            }}
          >
            {languages.map((lang, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {lang.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  ({lang.level})
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsComponent;
