import { Link as RouterLink } from "react-router"
import {  Link as LinkMUI, LinkProps as MuiLinkProps } from "@mui/material"

interface LinkProps extends MuiLinkProps  {
  text: string;
  to: string;
  color?: "primary" | "secondary" | "inherit" | "error" | "info" | "success" | "warning" | "textDisabled" | "textPrimary" | "textSecondary";
}


export const Link = ({ text, to, color, ...props }: LinkProps ) => {
  return (
    <LinkMUI component={RouterLink} color={color} to={to} {...props}>
      {text}
    </LinkMUI>
  )
}