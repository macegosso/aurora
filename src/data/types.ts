export type Accent = "coral" | "teal" | "gold" | "purple";

export type SlideKind =
  | "cover"
  | "exec"
  | "quote"
  | "cards"
  | "steps"
  | "proto"
  | "principles"
  | "";

export interface Stat {
  big: string;
  label: string;
}

export interface SlideCard {
  t: string;
  d: string;
  accent?: Accent;
}

export interface SlideCol {
  h: string;
  items: string[];
}

export interface Slide {
  kind?: SlideKind;
  sec: string;
  title: string;
  lead?: string;
  note?: string;
  footnote?: string;
  cta?: { label: string; href: string };
  stats?: Stat[];
  cards?: SlideCard[];
  cols?: SlideCol[];
  steps?: string[];
  bullets?: string[];
}

export interface CVExperience {
  role: string;
  company: string;
  period?: string;
  points?: string[];
}

export interface CVEducation {
  course: string;
  school: string;
  period?: string;
}

export interface CV {
  name: string;
  role: string;
  tagline?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary?: string;
  experience?: CVExperience[];
  skills?: string[];
  education?: CVEducation[];
  languages?: string[];
}

export interface DossierDoc {
  id: string;
  title: string;
  subtitle?: string;
  md: string;
}
