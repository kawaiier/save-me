import { Button } from "@mui/material";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const BUTTON_STYLE: Record<"submit" | "reset" | "button", string> = {
  submit: "success",
  reset: "error",
  button: "primary",
};

export default function StyledButton({
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <Button color={BUTTON_STYLE[type]} onClick={onClick} variant="outlined">
      {children}
    </Button>
  );
}
