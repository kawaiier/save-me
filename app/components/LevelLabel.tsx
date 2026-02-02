import { Level } from "../types";

const LEVEL_COLOR: Record<Level, string> = {
  high: "bg-red-300",
  medium: "bg-yellow-300",
  low: "bg-green-300",
};

export interface LabelProps {
  children: React.ReactNode;
  currentLevel: Level;
}

export default function LevelLabel({ children, currentLevel }: LabelProps) {
  const levelColor = LEVEL_COLOR[currentLevel];

  return (
    <div className={`p-1 rounded-md dark:text-black ${levelColor}`}>
      <span className="text-sm">{children}</span>
    </div>
  );
}
