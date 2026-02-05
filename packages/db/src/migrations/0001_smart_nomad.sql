CREATE TABLE "institutions" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"logo" text DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn5.vectorstock.com%2Fi%2F1000x1000%2F08%2F19%2Fgray-photo-placeholder-icon-design-ui-vector-35850819.jpg&f=1&nofb=1&ipt=5aba73c7354f31d2de6dc3f977134d0805decdeba0d20fb8edf7693c34d8e1d8',
	"name" text NOT NULL,
	"description" text NOT NULL,
	"rating" real DEFAULT 5
);
--> statement-breakpoint
CREATE TABLE "institutions_comment" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"comment" text NOT NULL
);
