import { pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { LOGO_PLACEHOLDER } from "../lib/constants";
import { relations } from "drizzle-orm";

export * from "./auth";

export const Institutions = pgTable("institutions", {
  id: text("id").primaryKey(),
  image: text("image").notNull(),
  logo: text("logo").default(LOGO_PLACEHOLDER),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rating: real("rating").default(5.0),
  website: text("website").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  applicationDeadline: timestamp("application_deadline").defaultNow().notNull()
});

export type Institution = typeof Institutions.$inferSelect;

export const InstitutionsComment = pgTable("institutions_comment", {
  id: text("id").primaryKey(),
  institutionId: text("institution_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  comment: text("comment").notNull(),
})

export const InstitutionsRelations = relations(Institutions, ({ many }) => ({
  comments: many(InstitutionsComment),
}));

export const InstitutionsCommentRelations = relations(InstitutionsComment, ({ one }) => ({
  institution: one(Institutions, {
    fields: [InstitutionsComment.institutionId],
    references: [Institutions.id],
  }),
}));
