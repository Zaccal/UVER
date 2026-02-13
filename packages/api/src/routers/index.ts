import type { RouterClient } from "@orpc/server";

import { db } from "@UVER/db";
import { Applications, Institutions } from "@UVER/db/schema";
import { desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  institutions: {
    list: publicProcedure.handler(async () => {
      return db
        .select()
        .from(Institutions)
        .orderBy(desc(Institutions.createdAt));
    }),
    byId: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .handler(async ({ input }) => {
        const [institution] = await db
          .select()
          .from(Institutions)
          .where(eq(Institutions.id, input.id))
          .limit(1);
        return institution ?? null;
      }),
  },
  applications: {
    list: protectedProcedure.handler(async ({ context }) => {
      const userId = context.session!.user!.id;
      const rows = await db
        .select({
          id: Applications.id,
          institutionId: Applications.institutionId,
          program: Applications.program,
          message: Applications.message,
          status: Applications.status,
          createdAt: Applications.createdAt,
          institutionName: Institutions.name,
          institutionImage: Institutions.image,
        })
        .from(Applications)
        .innerJoin(
          Institutions,
          eq(Applications.institutionId, Institutions.id),
        )
        .where(eq(Applications.userId, userId))
        .orderBy(desc(Applications.createdAt));

      return rows;
    }),
    create: protectedProcedure
      .input(
        z.object({
          institutionId: z.string().min(1),
          program: z.string().min(1),
          message: z.string().optional(),
        }),
      )
      .handler(async ({ context, input }) => {
        const userId = context.session!.user!.id;
        const id = randomUUID();

        const [created] = await db
          .insert(Applications)
          .values({
            id,
            userId,
            institutionId: input.institutionId,
            program: input.program,
            message: input.message,
            status: "pending",
          })
          .returning();

        return created;
      }),
  },
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
