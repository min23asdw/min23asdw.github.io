import "../styles/Badge.css";
import BadgeType from "../model/BadgeType";
import { Tooltip } from "@mui/material";

interface BadgeProps {
  type: string;
}

const Badge = (prop: BadgeProps) => {
  const type = prop.type;
  const badgeText = BadgeType[type as keyof typeof BadgeType];
  if (!badgeText) return null;
  return (
    <Tooltip title={badgeText} enterTouchDelay={10}>
      <span className={`badge ${type.toLowerCase()}`}>{type}</span>
    </Tooltip>
  );
};
export default Badge;
