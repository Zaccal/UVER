import { createContext } from "@/hooks/createContext";
import { Institution } from "@UVER/db/schema";

interface InstitutionContext {
  data: Institution
}

export const institutionContext = createContext<InstitutionContext>()
