import { createContext } from "@/hooks/createContext";
import { Institution } from "@UVER/db/schema";

export const institutionContext = createContext<Institution>()
