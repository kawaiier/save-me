interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const BUTTON_STYLE: Record<"submit" | "reset" | "button", string> = {
  submit: "bg-green-200 hover:bg-green-500",
  reset: "bg-red-200 hover:bg-red-500",
  button: "bg-gray-200 hover:bg-gray-500",
};

export default function Button({
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`p-2 rounded-md hover:cursor-pointer w-full dark:text-black ${BUTTON_STYLE[type]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
