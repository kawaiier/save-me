import { Button } from "@mui/material";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const BUTTON_STYLE: Record<"submit" | "reset" | "button", "success" | "error" | "primary"> = {
  submit: "success",
  reset: "error",
  button: "primary",
};

export default function StyledButton({
  children,
  type = "button",
  onClick,
  size = "medium",
}: ButtonProps) {
  return (
    <Button 
      color={BUTTON_STYLE[type]} 
      onClick={onClick} 
      variant="contained"
      size={size}
      sx={{
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
        padding: size === 'small' ? '8px 16px' : size === 'large' ? '12px 24px' : '10px 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          transform: 'translateY(0)',
        }
      }}
    >
      {children}
    </Button>
  );
}
