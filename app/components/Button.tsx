interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

export default function Button({
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className="p-2 bg-gray-800 text-white rounded-md"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
