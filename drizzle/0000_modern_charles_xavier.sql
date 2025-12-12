CREATE TABLE "Chapter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"desc" text,
	"sectionId" text NOT NULL,
	CONSTRAINT "Chapter_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "HsCode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"cleanCode" text NOT NULL,
	"name" text NOT NULL,
	"nameEn" text,
	"description" text,
	"unit" text,
	"mfnRate" text,
	"generalRate" text,
	"vatRate" text,
	"exportRate" text,
	"agreements" jsonb,
	"elements" jsonb,
	"supervision" jsonb,
	"inspection" jsonb,
	"chapterId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "HsCode_code_unique" UNIQUE("code"),
	CONSTRAINT "HsCode_cleanCode_unique" UNIQUE("cleanCode")
);
--> statement-breakpoint
CREATE TABLE "Section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "Section_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_sectionId_Section_id_fk" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "HsCode" ADD CONSTRAINT "HsCode_chapterId_Chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "public"."Chapter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "HsCode_cleanCode_idx" ON "HsCode" USING btree ("cleanCode");--> statement-breakpoint
CREATE INDEX "HsCode_name_idx" ON "HsCode" USING btree ("name");