import { InstitutionsCard as Root } from "./institutionsCard"
import { institutionsCardContent } from "./institutionsCardContent"
import { InstitutionsCardAddress } from "./institutionsCardAddress"
import { InstitutionCardImage } from "./institutionsCardImage"
import { InstitutionsCardTitle } from "./institutionsCardTitle"
import { InstitutionsCardRating } from "./institutionsCardRating"
import { InstitutionsCardApplicationDeadline } from "./institutionsCardApplicationDeadline"
import { InstitutionsCardApply } from "./institutionsCardApply"
import institutionsCardFooter from "./institutionsCardFooter"
import { InstitutionsCardContact } from "./institutionsCardContact"

export const InstitutionCard = {
  Root,
  Image: InstitutionCardImage,
  Content: institutionsCardContent,
  Title: InstitutionsCardTitle,
  Address: InstitutionsCardAddress,
  Rating: InstitutionsCardRating,
  ApplicationDeadline: InstitutionsCardApplicationDeadline,
  Apply: InstitutionsCardApply,
  Contact: InstitutionsCardContact,
  Footer: institutionsCardFooter,
  // Actions: InstitutionCardActions,
}
