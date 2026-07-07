import fs from "fs";
import path from "path";
import { z } from "zod";

// Zod schemas matching schemas in system/CONTENT.md
export const MilestoneSchema = z.object({
  label: z.string(),
  date: z.string(),
  done: z.boolean().optional().default(false),
});

export const SpeakerSchema = z.object({
  name: z.string(),
  title: z.string(),
  institution: z.string(),
  photo: z.string(),
  researchArea: z.string(),
  bio: z.string(),
  links: z
    .object({
      twitter: z.string().optional(),
      scholar: z.string().optional(),
      site: z.string().optional(),
    })
    .optional(),
});

export const CommitteeMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  affiliation: z.string(),
  photo: z.string().optional(),
  group: z.enum(["patron", "chair", "tpc", "advisory", "local", "finance", "web_publicity"]),
  email: z.string().optional(),
  contact: z.string().optional(),
});

export const TrackSchema = z.object({
  domain: z.string(),
  topics: z.array(z.string()),
  icon: z.string(),
  description: z.string().optional(),
  overview: z.string().optional(),
  expandedTopics: z.array(z.string()).optional(),
});

export const NewsItemSchema = z.object({
  title: z.string(),
  date: z.string(),
  content: z.string(),
  link: z.string().optional(),
});

// Types inferred from Zod schemas
export type Milestone = z.infer<typeof MilestoneSchema>;
export type Speaker = z.infer<typeof SpeakerSchema>;
export type CommitteeMember = z.infer<typeof CommitteeMemberSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;

// Generic JSON loader with validation
function loadContentFile<T>(filename: string, schema: z.ZodSchema<T>): T {
  const filePath = path.join(process.cwd(), "content", filename);
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Content file not found: ${filePath}`);
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(rawData);
    return schema.parse(parsedData);
  } catch (error) {
    console.error(`[Content Load Error] Failed to load/validate: ${filename}`, error);
    throw new Error(`Content Load Error: Failed to validate ${filename}. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Abstracted typed content loaders
export function getMilestones(): Milestone[] {
  return loadContentFile("dates.json", z.array(MilestoneSchema));
}

export function getTracks(): Track[] {
  return loadContentFile("tracks.json", z.array(TrackSchema));
}

export function getSpeakers(): Speaker[] {
  return loadContentFile("speakers.json", z.array(SpeakerSchema));
}

export function getCommittee(): CommitteeMember[] {
  return loadContentFile("committee.json", z.array(CommitteeMemberSchema));
}

export function getNews(): NewsItem[] {
  return loadContentFile("news.json", z.array(NewsItemSchema));
}
