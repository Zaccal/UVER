ALTER TABLE "institutions" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ADD COLUMN "application_deadline" timestamp DEFAULT now() NOT NULL;