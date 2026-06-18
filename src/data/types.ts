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

/* ---------- interactive prototype (mirrors the original prototype's data) ---------- */

export type Outcome = "resolve" | "route" | "cadunico" | "honest_no";

/** a WhatsApp message: text (t) or a document/photo attachment (doc + sz) */
export interface ChatMsg {
  who: "me" | "them";
  t?: string;
  doc?: string;
  sz?: string;
}

export interface XrayChip {
  t: string;
  accent?: boolean;
}

/** the raio-X layer: what's happening · what the AI does · why it needs AI */
export interface Xray {
  seen?: string;
  ai?: string;
  why?: string;
  chips?: XrayChip[];
}

export interface Triage {
  label: string;
  confidence: number;
  signals?: string[];
  reasoning?: string;
}

export interface Deadline {
  ciencia?: string;
  prazo_final?: string;
  dias_restantes?: number;
}

export interface GuardrailCheck {
  check: string;
  status: string;
}

export interface Generation {
  doc_type?: string;
  excerpt?: string;
  citations?: string[];
}

/** the dados layer: flexible — different keys surface per step */
export interface StepInternals {
  ocr?: Record<string, string>;
  systems?: string[];
  retrieval?: string[];
  deadline?: Deadline;
  guardrails?: GuardrailCheck[];
  triage?: Triage;
  generation?: Generation;
}

export interface ScenarioStep {
  stageIndex: number;
  kicker: string;
  title: string;
  chat: ChatMsg[];
  xray: Xray;
  internals: StepInternals;
}

export interface ScenarioEnding {
  kind: string;
  headline: string;
  body: string;
  artifact?: { title: string; excerpt?: string; citations?: string[] };
}

export interface Scenario {
  id: string;
  benefit: string;
  recommended?: boolean;
  persona: { name: string; line: string };
  outcomeType: Outcome;
  stages: string[];
  letter?: { text?: string; fields?: Record<string, string> };
  steps: ScenarioStep[];
  ending: ScenarioEnding;
}

/** the citable normative base shown in "os dados por trás" */
export interface KbEntry {
  id: string;
  topic: string;
  rule: string;
  source: string;
  plain: string;
  volatile?: boolean;
}

/** the honest-triage logic: one of four situations, with a confidence threshold */
export interface TriageRule {
  outcome: string;
  when: string;
  action: string;
}

export interface TriageRules {
  summary: string;
  rules: TriageRule[];
  confidence_gate?: string;
}
