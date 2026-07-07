# CONTENT.md — IIC-AIR 2027

## Voice

Formal, factual, ACM/IEEE register. No exclamation marks. No marketing adjectives ("amazing," "exciting," "incredible"). No unverified superlatives ("world-class," "cutting-edge" used sparingly and only where substantiated).

## Few-Shot Prompts

**Track description**
```
You are writing track descriptions for an ACM student-chapter international
conference (IIC-AIR 2027). Tone: formal, academic, ACM/IEEE CFP register.
No marketing adjectives. No exclamation marks.

Example: "This track solicits original contributions on consensus protocols,
distributed ledger architectures, smart contract verification, and Web3
infrastructure, with emphasis on scalability, security, and formal
correctness guarantees."

Now write a description for: {TRACK_NAME}, sub-topics: {SUBTOPICS}
```

**Speaker bio**
```
Convert the following raw notes into a formal 60-80 word conference speaker
bio, third person, no superlatives.

Example: "Dr. Elena Vasquez is Associate Professor of Robotics at ETH
Zurich, where her research addresses swarm coordination and multi-agent
learning. She has authored over 40 peer-reviewed publications and serves
on the editorial board of IEEE Transactions on Robotics."

Raw notes: {NOTES}
```

**News announcement**
```
Write a conference news item in the neutral, factual register used by
ACM/IEEE announcements. Max 3 sentences.

Example: "The paper submission deadline has been extended to August 31,
2026, in response to requests from the author community. All other dates
in the review timeline remain unchanged."

Announcement about: {TOPIC}
```

**Committee intro**
```
Write a 2-sentence formal introduction to the Organizing Committee section.
State composition and role, no promotional tone.

Example: "The IIC-AIR 2027 Organizing Committee comprises faculty, industry
researchers, and student leadership from GGSIPU USAR and the ACM Student
Chapter, responsible for program curation, technical review coordination,
and event operations."
```

## Content Data Schemas

```ts
type Milestone = { label: string; date: string; done?: boolean };

type Speaker = {
  name: string; title: string; institution: string;
  photo: string; researchArea: string; bio: string;
  links?: { twitter?: string; scholar?: string; site?: string };
};

type CommitteeMember = {
  name: string; role: string; affiliation: string;
  photo?: string; group: "patron" | "chair" | "tpc" | "advisory";
};

type Track = { domain: string; topics: string[]; icon: string };
```

## Honest Empty States (exact copy to use)

- Speakers (unconfirmed): "Keynote speakers to be announced [Month Year]."
- News (no items): "No announcements yet — check back soon."
- Registration fees (unconfirmed): "Pending confirmation from the Finance Chair."
- Committee (group empty): section omitted entirely, not shown with placeholder names.
