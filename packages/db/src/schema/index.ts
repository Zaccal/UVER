import { pgEnum, pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { LOGO_PLACEHOLDER } from "../lib/constants";
import { relations } from "drizzle-orm";
import { user } from "./auth";

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
  applicationDeadline: timestamp("application_deadline").defaultNow().notNull(),
  majors: text("majors").array().default([]),
  country: text("country").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  city: text("city").notNull(),
  degreeType: text("degree_type").notNull(),
  state: text("state").notNull(),
  tuitionPrice: text("tuition_price").notNull(),
  zipCode: text("zip_code").notNull(),
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
});

export const InstitutionsRelations = relations(Institutions, ({ many }) => ({
  comments: many(InstitutionsComment),
}));

export const InstitutionsCommentRelations = relations(
  InstitutionsComment,
  ({ one }) => ({
    institution: one(Institutions, {
      fields: [InstitutionsComment.institutionId],
      references: [Institutions.id],
    }),
  }),
);

export const applicationStatus = pgEnum("application_status", [
  "pending",
  "approved",
  "rejected",
]);

export const Applications = pgTable("applications", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  institutionId: text("institution_id")
    .notNull()
    .references(() => Institutions.id, { onDelete: "cascade" }),
  program: text("program").notNull(),
  message: text("message"),
  status: applicationStatus("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Application = typeof Applications.$inferSelect;

export const ApplicationsRelations = relations(Applications, ({ one }) => ({
  institution: one(Institutions, {
    fields: [Applications.institutionId],
    references: [Institutions.id],
  }),
}));
