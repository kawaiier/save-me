interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const BUTTON_STYLE: Record<"submit" | "reset" | "button", string> = {
  submit: "bg-green-500 hover:bg-green-700",
  reset: "bg-red-500 hover:bg-red-700",
  button: "bg-gray-500 hover:bg-gray-700",
};

export default function Button({
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`p-2 rounded-md hover:cursor-pointer ${BUTTON_STYLE[type]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
