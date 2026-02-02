// Creating a type for different levels and const to use it in other files and get access to levels
export const LEVELS = ["low", "medium", "high"];
export type Level = (typeof LEVELS)[number];

// Creating an interface for a Task
export interface Task {
  title: string;
  energyLevel: Level;
  anxietyLevel: Level;
  id: number;
  done: boolean;
}
