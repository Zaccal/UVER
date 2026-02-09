import { createContext } from "react";

interface TagInputContextProps {
  value: string[];
  toggle: (value: string) => void;
}

export const TagInputContext = createContext<TagInputContextProps>({
  value: [],
  toggle: () => {}
});
