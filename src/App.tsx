import { useMemo, useState } from "react";

type IconName =
  | "home"
  | "people"
  | "message"
  | "calendar"
  | "chart"
  | "search"
  | "bell"
  | "sparkle"
  | "arrow"
  | "check"
  | "copy"
  | "refresh"
  | "chevron"
  | "briefcase"
  | "school"
  | "target"
  | "bookmark"
  | "upload"
  | "file";

type GoalId = "job-search" | "career-transition" | "industry-exploration";

type GoalProfile = {
  goal: GoalId;
  focus: string;
  support: string;
};

type UserProfile = {
  name: string;
  headline: string;
  school: string;
  program: string;
  graduation: string;
  location: string;
  experience: string;
  targetRoles: string;
  cvLoaded: boolean;
};

type CandidateSource = "OpenAlex" | "Opt-in alumni" | "Uploaded PDF" | "Pasted text";

type CandidateEntry = {
  id: string;
  name: string;
  role: string;
  detail: string;
  source: CandidateSource;
};

type GoalGuide = {
  label: string;
  shortLabel: string;
  icon: IconName;
  promise: string;
  questionOne: string;
  questionOnePlaceholder: string;
  questionTwo: string;
  questionTwoPlaceholder: string;
  focusLabel: string;
  weeklyOutcome: string;
  peopleLabel: string;
  discoveryTitle: string;
  discoveryDescription: string;
  messageAngle: string;
  followupFocus: string;
  insight: string;
};

const icons: Record<IconName, React.ReactNode> = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5M9 21v-7h6v7" /></>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 9h8M8 13h5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  sparkle: <><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.8L12 15l-1.3-4.2L6.5 9l4.2-1.8Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  refresh: <><path d="M20 7h-5V2" /><path d="M20 7a9 9 0 1 0 1 9" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  school: <><path d="m3 10 9-5 9 5-9 5Z" /><path d="M7 12.5V17c3 2 7 2 10 0v-4.5M21 10v6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m15 9 6-6M17 3h4v4" /></>,
  bookmark: <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4Z" />,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {icons[name]}
    </svg>
  );
}

function Button({
  children,
  className = "",
  onClick,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return <button className={`button ${className}`} onClick={onClick} title={title}>{children}</button>;
}

const goalGuides: Record<GoalId, GoalGuide> = {
  "job-search": {
    label: "Find my next role",
    shortLabel: "Job search",
    icon: "briefcase",
    promise: "Build relationships that can help you understand roles, teams, and hiring paths.",
    questionOne: "What role or function are you targeting?",
    questionOnePlaceholder: "e.g. Associate Product Manager",
    questionTwo: "What would make networking useful right now?",
    questionTwoPlaceholder: "e.g. Learn what hiring managers look for",
    focusLabel: "Your job-search plan",
    weeklyOutcome: "Have 2 role-learning conversations",
    peopleLabel: "People who can clarify your path",
    discoveryTitle: "Meet people close to your target role",
    discoveryDescription: "Prioritized by role proximity, relevant hiring context, and credible common ground.",
    messageAngle: "Ask about how the role works in practice—not whether they can refer you",
    followupFocus: "Turn helpful career context into a relationship worth maintaining.",
    insight: "Role-specific questions are creating your strongest conversations.",
  },
  "career-transition": {
    label: "Navigate a career transition",
    shortLabel: "Career transition",
    icon: "arrow",
    promise: "Learn from people who have made a similar move and translate your existing strengths.",
    questionOne: "What field are you moving from and toward?",
    questionOnePlaceholder: "e.g. Consulting → Product strategy",
    questionTwo: "What feels most uncertain about the transition?",
    questionTwoPlaceholder: "e.g. How to position my transferable skills",
    focusLabel: "Your transition plan",
    weeklyOutcome: "Validate 2 transferable strengths",
    peopleLabel: "People who have made your move",
    discoveryTitle: "Learn from people one step ahead",
    discoveryDescription: "Prioritized by similar transitions, transferable skills, and shared starting points.",
    messageAngle: "Ask about one pivotal decision in their transition—not their entire career story",
    followupFocus: "Use what you learn to refine your transition story and keep mentors updated.",
    insight: "Shared-transition outreach is giving you the clearest career signals.",
  },
  "industry-exploration": {
    label: "Explore an industry",
    shortLabel: "Industry exploration",
    icon: "search",
    promise: "Build an informed view of an industry through varied, first-hand perspectives.",
    questionOne: "Which industry or space are you exploring?",
    questionOnePlaceholder: "e.g. Fintech and digital trust",
    questionTwo: "What do you most want to understand?",
    questionTwoPlaceholder: "e.g. Roles, trends, and day-to-day work",
    focusLabel: "Your exploration plan",
    weeklyOutcome: "Collect 3 different perspectives",
    peopleLabel: "Perspectives worth learning from",
    discoveryTitle: "Build a well-rounded industry view",
    discoveryDescription: "Prioritized to give you varied functions, companies, and informed perspectives.",
    messageAngle: "Ask about a current industry change—not broad career advice",
    followupFocus: "Connect the perspectives you gather and share what you learn along the way.",
    insight: "Cross-functional conversations are sharpening your view of the industry.",
  },
};

function GoalWizard({ onComplete }: { onComplete: (profile: GoalProfile) => void }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [focus, setFocus] = useState("");
  const [support, setSupport] = useState("");
  const guide = goal ? goalGuides[goal] : null;

  return (
    <main className="wizard-shell">
      <div className="wizard-brand">
        <span className="brand-mark">C</span>
        <span>Connectly</span>
      </div>
      <section className="wizard-card">
        <div className="wizard-progress">
          <span className={step >= 1 ? "active" : ""}><i>1</i> Choose your goal</span>
          <b />
          <span className={step >= 2 ? "active" : ""}><i>2</i> Shape your plan</span>
        </div>
        {step === 1 ? (
          <>
            <div className="wizard-heading">
              <p className="eyebrow">Start with intention</p>
              <h1>What do you want networking to help you achieve?</h1>
              <p>Choose one focus. Connectly will guide who you meet, what you ask, and how you follow through.</p>
            </div>
            <div className="goal-options">
              {(Object.entries(goalGuides) as [GoalId, GoalGuide][]).map(([id, item]) => (
                <Button
                  className={`goal-option ${goal === id ? "selected" : ""}`}
                  key={id}
                  onClick={() => setGoal(id)}
                >
                  <span className="goal-option-icon"><Icon name={item.icon} size={21} /></span>
                  <span><strong>{item.label}</strong><small>{item.promise}</small></span>
                  <i className="radio-mark">{goal === id && <Icon name="check" size={13} />}</i>
                </Button>
              ))}
            </div>
            <div className="wizard-footer">
              <span>You can change this later from your profile.</span>
              <Button className={`primary-button ${!goal ? "disabled" : ""}`} onClick={() => goal && setStep(2)}>
                Continue <Icon name="arrow" size={16} />
              </Button>
            </div>
          </>
        ) : guide ? (
          <>
            <div className="wizard-heading compact-heading">
              <p className="eyebrow">{guide.shortLabel} plan</p>
              <h1>Let’s make your guidance specific</h1>
              <p>Two quick answers help us recommend the right people and next steps.</p>
            </div>
            <div className="selected-goal-summary">
              <span className="goal-option-icon"><Icon name={guide.icon} size={19} /></span>
              <div><small>Your networking goal</small><strong>{guide.label}</strong></div>
              <Button className="text-button" onClick={() => setStep(1)}>Change</Button>
            </div>
            {goal === "job-search" && (
              <div className="sample-goal-row">
                <span>Testing the provided prototype scenario?</span>
                <Button onClick={() => { setFocus("Marketing / Fintech product track"); setSupport("How do hiring managers evaluate new grad product candidates in fintech?"); }}>
                  Use sample goal details
                </Button>
              </div>
            )}
            <div className="guiding-questions">
              <label>
                <span><i>1</i>{guide.questionOne}</span>
                <input autoFocus onChange={(event) => setFocus(event.target.value)} placeholder={guide.questionOnePlaceholder} value={focus} />
              </label>
              <label>
                <span><i>2</i>{guide.questionTwo}</span>
                <input onChange={(event) => setSupport(event.target.value)} placeholder={guide.questionTwoPlaceholder} value={support} />
              </label>
            </div>
            <div className="wizard-footer">
              <Button className="secondary-button" onClick={() => setStep(1)}>Back</Button>
              <Button
                className={`primary-button ${!focus.trim() || !support.trim() ? "disabled" : ""}`}
                onClick={() => focus.trim() && support.trim() && onComplete({ goal, focus: focus.trim(), support: support.trim() })}
              >
                Build my networking plan <Icon name="arrow" size={16} />
              </Button>
            </div>
          </>
        ) : null}
      </section>
      <p className="wizard-trust"><Icon name="target" size={15} /> Your goal guides the experience. You always choose who to contact.</p>
    </main>
  );
}

function GoalBanner({ guide, profile, onEdit }: { guide: GoalGuide; profile: GoalProfile; onEdit?: () => void }) {
  return (
    <section className="goal-banner">
      <span className="goal-banner-icon"><Icon name={guide.icon} size={20} /></span>
      <div>
        <span>{guide.focusLabel}</span>
        <strong>{profile.focus}</strong>
        <small>Guidance focus: {profile.support}</small>
      </div>
      {onEdit && <Button className="goal-edit" onClick={onEdit}>Adjust goal</Button>}
    </section>
  );
}

const emptyUserProfile: UserProfile = {
  name: "",
  headline: "",
  school: "",
  program: "",
  graduation: "",
  location: "",
  experience: "",
  targetRoles: "",
  cvLoaded: false,
};

const sampleUserProfile: UserProfile = {
  name: "Alex Kim",
  headline: "Commerce student interested in product strategy and fintech",
  school: "University of Toronto",
  program: "BCom, Management & Technology",
  graduation: "2025",
  location: "Toronto, Canada",
  experience: "Product Strategy Intern at Northstar Labs",
  targetRoles: "Product Analyst, Associate Product Manager, Fintech Strategy",
  cvLoaded: true,
};

function ProfileSetup({
  goalProfile,
  guide,
  onSubmit,
  onChangeGoal,
}: {
  goalProfile: GoalProfile;
  guide: GoalGuide;
  onSubmit: (profile: UserProfile) => void;
  onChangeGoal: () => void;
}) {
  const [profile, setProfile] = useState<UserProfile>(emptyUserProfile);
  const update = (field: keyof UserProfile, value: string | boolean) =>
    setProfile((current) => ({ ...current, [field]: value }));
  const fieldsComplete = Object.entries(profile).every(([, value]) =>
    typeof value === "boolean" ? value : value.trim().length > 0,
  );

  return (
    <main className="setup-shell">
      <header className="setup-topbar">
        <div className="wizard-brand">
          <span className="brand-mark">C</span>
          <span>Connectly</span>
        </div>
        <div className="setup-step"><span><Icon name="check" size={12} /> Goal set</span><b /><span className="active">2&nbsp; Profile & CV</span></div>
      </header>
      <div className="setup-content">
        <section className="setup-heading">
          <div>
            <p className="eyebrow">First-time setup</p>
            <h1>Tell us about your background</h1>
            <p>Your profile and CV help Connectly find credible shared context before it recommends anyone.</p>
          </div>
          <Button className="secondary-button sample-data-button" onClick={() => setProfile(sampleUserProfile)}>
            <Icon name="sparkle" size={15} /> Use sample Alex Kim data
          </Button>
        </section>

        <section className="setup-layout">
          <div className="panel setup-main">
            <div className="setup-section-title">
              <span className="stat-icon blue"><Icon name="briefcase" /></span>
              <div><h2>Profile & background</h2><p>Start with a blank profile or use the sample data for this prototype.</p></div>
            </div>
            <div className="profile-form-grid setup-form">
              {[
                ["name", "Full name", "e.g. Alex Kim"],
                ["headline", "Professional headline", "What are you studying or working toward?"],
                ["school", "School", "e.g. University of Toronto"],
                ["program", "Program", "e.g. BCom, Management & Technology"],
                ["graduation", "Graduation year", "e.g. 2025"],
                ["location", "Location", "e.g. Toronto, Canada"],
                ["experience", "Current experience", "Your most relevant current role"],
                ["targetRoles", "Target roles", "Roles or functions you want to explore"],
              ].map(([field, label, placeholder]) => (
                <label className={field === "headline" || field === "experience" || field === "targetRoles" ? "wide" : ""} key={field}>
                  <span>{label}</span>
                  <input
                    onChange={(event) => update(field as keyof UserProfile, event.target.value)}
                    placeholder={placeholder}
                    value={profile[field as keyof UserProfile] as string}
                  />
                </label>
              ))}
            </div>

            <div className="cv-section">
              <div className="setup-section-title compact">
                <span className="stat-icon violet"><Icon name="file" /></span>
                <div><h2>CV upload</h2><p>We will parse your CV to refine your matches and outreach prompts.</p></div>
              </div>
              <label className={`cv-upload ${profile.cvLoaded ? "loaded" : ""}`}>
                <input
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => event.target.files?.length && update("cvLoaded", true)}
                  type="file"
                />
                <span className="cv-upload-icon"><Icon name={profile.cvLoaded ? "check" : "upload"} size={20} /></span>
                <strong>{profile.cvLoaded ? "Alex_Kim_CV.pdf uploaded" : "Upload your CV"}</strong>
                <small>{profile.cvLoaded ? "Ready to parse for skills and experience" : "PDF, DOC, or DOCX · Demo files stay in this prototype"}</small>
              </label>

              {profile.cvLoaded && (
                <article className="cv-preview">
                  <div className="cv-preview-head">
                    <span><Icon name="file" size={17} /></span>
                    <div><strong>Alex Kim — CV preview</strong><small>Parsed sample content</small></div>
                    <span className="parsed-pill"><Icon name="check" size={12} /> Parsed</span>
                  </div>
                  <div className="cv-preview-body">
                    <section>
                      <span>Experience</span>
                      <strong>Northstar Labs · Product Strategy Intern</strong>
                      <small>May 2024 – Aug 2024</small>
                      <ul><li>Supported user research and analyzed drop-off in cross-border payment onboarding.</li><li>Built competitor benchmarks for 5 neobank products.</li></ul>
                    </section>
                    <section>
                      <span>Capstone project</span>
                      <strong>Trust & identity verification for international student remittance</strong>
                      <ul><li>Interviewed 12 users and mapped KYC onboarding friction.</li><li>Designed a prototype balancing verification and user trust.</li></ul>
                    </section>
                    <section>
                      <span>Skills detected</span>
                      <div className="skill-tags">{["User Research", "Figma", "SQL", "Market Analysis", "Product Roadmaps"].map((skill) => <i key={skill}>{skill}</i>)}</div>
                    </section>
                  </div>
                </article>
              )}
            </div>
            <div className="setup-submit">
              <div><strong>{fieldsComplete ? "Ready to generate your network" : "Complete your profile and upload a CV"}</strong><span>Matches are created only after you submit this setup.</span></div>
              <Button className={`primary-button ${!fieldsComplete ? "disabled" : ""}`} onClick={() => fieldsComplete && onSubmit(profile)}>
                Generate my matches <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>

          <aside className="setup-aside">
            <div className="panel context-summary">
              <span className="stat-icon blue"><Icon name="target" /></span>
              <h2>What guides your plan</h2>
              <div><Icon name="check" size={15} /><span><strong>Primary goal</strong>{guide.label}</span></div>
              <div><Icon name="check" size={15} /><span><strong>Your focus</strong>{goalProfile.focus}</span></div>
              <div><Icon name="check" size={15} /><span><strong>Core question</strong>{goalProfile.support}</span></div>
              <Button className="secondary-button setup-adjust" onClick={onChangeGoal}>Adjust goal</Button>
            </div>
            <div className="panel setup-privacy">
              <Icon name="sparkle" size={18} />
              <div><strong>Nothing is pre-populated</strong><p>Your people, messages, and follow-ups will be generated only after this setup is submitted.</p></div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

const sampleCandidates: CandidateEntry[] = [
  { id: "oa-1", name: "Dr. Leila Hassan", role: "Research Scientist at Visa", detail: "Digital identity, payment trust, and consumer risk", source: "OpenAlex" },
  { id: "oa-2", name: "Dr. Marcus Wu", role: "Applied Scientist at Stripe", detail: "Fraud detection and cross-border payment systems", source: "OpenAlex" },
  { id: "oa-3", name: "Dr. Elena Rossi", role: "Research Lead at Wealthsimple", detail: "First-time investor confidence and financial behavior", source: "OpenAlex" },
  { id: "oa-4", name: "Dr. Samir Gupta", role: "Principal Researcher at Interac", detail: "Authentication, identity verification, and payments", source: "OpenAlex" },
  { id: "oa-5", name: "Dr. Natalie Brooks", role: "UX Research Scientist at Shopify", detail: "Trust in unfamiliar digital financial tools", source: "OpenAlex" },
  { id: "oa-6", name: "Dr. Tomás Silva", role: "Research Manager at Wise", detail: "Newcomer remittance behavior and onboarding", source: "OpenAlex" },
  { id: "oa-7", name: "Dr. Amara Okafor", role: "Behavioral Scientist at RBC", detail: "Financial inclusion and customer decision-making", source: "OpenAlex" },
  { id: "oa-8", name: "Dr. Henry Park", role: "Data Science Lead at KOHO", detail: "Activation analytics for consumer fintech products", source: "OpenAlex" },
  { id: "al-1", name: "Maya Patel", role: "Product Manager at Stripe", detail: "U of T alum · Cross-border payout onboarding", source: "Opt-in alumni" },
  { id: "al-2", name: "Aaron Chen", role: "Product Hiring Manager at Wealthsimple", detail: "U of T alum · Early-career product assessment", source: "Opt-in alumni" },
  { id: "al-3", name: "Priya Rao", role: "Product Strategy Lead at Wise", detail: "U of T alum · Newcomer payment journeys", source: "Opt-in alumni" },
  { id: "al-4", name: "Sofia Martinez", role: "Product Manager at Wise", detail: "Rotman alum · International customer experience", source: "Opt-in alumni" },
  { id: "al-5", name: "Rohan Mehta", role: "Product Analyst at Wealthsimple", detail: "U of T alum · First-time investor activation", source: "Opt-in alumni" },
  { id: "al-6", name: "Claire Dubois", role: "Service Designer at RBC", detail: "U of T alum · Newcomer banking onboarding", source: "Opt-in alumni" },
  { id: "al-7", name: "Nadia Rahman", role: "Fintech Product Designer at Microsoft", detail: "U of T alum · Identity and trust experiences", source: "Opt-in alumni" },
  { id: "pdf-1", name: "Jordan Lee", role: "Associate Product Manager at Block", detail: "Parsed profile · New-grad fintech product path", source: "Uploaded PDF" },
  { id: "pdf-2", name: "Anika Shah", role: "Product Operations at PayPal", detail: "Parsed profile · Moved from commerce into product", source: "Uploaded PDF" },
  { id: "pdf-3", name: "Michael Tran", role: "Fintech Strategy Associate at Deloitte", detail: "Parsed profile · Neobank market strategy", source: "Uploaded PDF" },
  { id: "pdf-4", name: "Fatima Noor", role: "Product Analyst at Interac", detail: "Parsed profile · KYC funnel analytics", source: "Uploaded PDF" },
  { id: "pdf-5", name: "Lucas Martin", role: "APM at Shopify", detail: "Parsed profile · International graduate hiring journey", source: "Uploaded PDF" },
];

function CandidatePoolSetup({
  goalProfile,
  userProfile,
  onFinalize,
}: {
  goalProfile: GoalProfile;
  userProfile: UserProfile;
  onFinalize: (candidates: CandidateEntry[]) => void;
}) {
  const [candidates, setCandidates] = useState<CandidateEntry[]>([]);
  const [pastedProfiles, setPastedProfiles] = useState("");
  const addCandidates = (entries: CandidateEntry[]) =>
    setCandidates((current) => [...current, ...entries.filter((entry) => !current.some((item) => item.id === entry.id))]);
  const sourceCounts = {
    OpenAlex: candidates.filter((item) => item.source === "OpenAlex").length,
    alumni: candidates.filter((item) => item.source === "Opt-in alumni").length,
    uploaded: candidates.filter((item) => item.source === "Uploaded PDF").length,
    pasted: candidates.filter((item) => item.source === "Pasted text").length,
  };
  const addPastedProfiles = () => {
    const blocks = pastedProfiles.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
    if (!blocks.length) return;
    addCandidates(blocks.map((block, index) => {
      const [firstLine, ...rest] = block.split("\n");
      return {
        id: `paste-${Date.now()}-${index}`,
        name: firstLine || `Pasted candidate ${index + 1}`,
        role: rest[0] || "Manually added professional",
        detail: rest.slice(1).join(" ") || "Profile text ready for matching",
        source: "Pasted text" as CandidateSource,
      };
    }));
    setPastedProfiles("");
  };

  return (
    <main className="setup-shell">
      <header className="setup-topbar">
        <div className="wizard-brand"><span className="brand-mark">C</span><span>Connectly</span></div>
        <div className="setup-step pool-step">
          <span><Icon name="check" size={12} /> Goal</span><b />
          <span><Icon name="check" size={12} /> Profile & CV</span><b />
          <span className="active">3&nbsp; Candidate pool</span>
        </div>
      </header>
      <div className="setup-content">
        <section className="setup-heading pool-heading">
          <div>
            <p className="eyebrow">Before AI ranking</p>
            <h1>Build your candidate contact pool</h1>
            <p>Add professionals from approved sources. Connectly will only rank the pool you provide.</p>
          </div>
          <div className="pool-heading-actions">
            {candidates.length > 0 && <Button className="secondary-button" onClick={() => setCandidates([])}>Clear pool</Button>}
            <Button className="secondary-button" onClick={() => setCandidates(sampleCandidates)}>
              <Icon name="sparkle" size={15} /> Load 20-candidate demo
            </Button>
          </div>
        </section>

        <div className="no-scrape-notice">
          <Icon name="check" size={17} />
          <div><strong>No automatic web scraping.</strong><span>Add candidates via dataset, opt-in alumni, paste text, or upload exported profile PDFs.</span></div>
        </div>

        <section className="pool-source-grid">
          <article className="panel pool-source-card">
            <span className="source-number">01</span>
            <span className="stat-icon blue"><Icon name="school" /></span>
            <h2>OpenAlex researchers</h2>
            <p>Pull public, openly licensed researcher records related to fintech, trust, and payment systems.</p>
            <div className="source-card-meta"><span>Public dataset</span><strong>{sourceCounts.OpenAlex} added</strong></div>
            <Button className="secondary-button" onClick={() => addCandidates(sampleCandidates.filter((item) => item.source === "OpenAlex"))}>
              Pull OpenAlex candidates
            </Button>
          </article>
          <article className="panel pool-source-card">
            <span className="source-number">02</span>
            <span className="stat-icon green"><Icon name="people" /></span>
            <h2>Opt-in pilot alumni</h2>
            <p>Add professionals who explicitly joined the pilot community and consented to be discoverable.</p>
            <div className="source-card-meta"><span>Consented profiles</span><strong>{sourceCounts.alumni} added</strong></div>
            <Button className="secondary-button" onClick={() => addCandidates(sampleCandidates.filter((item) => item.source === "Opt-in alumni"))}>
              Import opt-in alumni
            </Button>
          </article>
          <article className="panel pool-source-card input-source-card">
            <span className="source-number">03</span>
            <span className="stat-icon violet"><Icon name="upload" /></span>
            <h2>Add profiles you provide</h2>
            <p>Paste profile text manually or upload profile PDFs exported by you.</p>
            <div className="pool-input-tabs">
              <label className="paste-profiles">
                <span>Paste profiles</span>
                <textarea onChange={(event) => setPastedProfiles(event.target.value)} placeholder={"One profile per paragraph\nName\nRole and company\nRelevant experience"} value={pastedProfiles} />
              </label>
              <Button className={`secondary-button ${!pastedProfiles.trim() ? "disabled" : ""}`} onClick={addPastedProfiles}>Add pasted profiles</Button>
              <div className="pool-or"><span>or</span></div>
              <label className="profile-pdf-upload">
                <input
                  accept=".pdf,application/pdf"
                  multiple
                  onChange={(event) => {
                    if (!event.target.files?.length) return;
                    addCandidates(sampleCandidates.filter((item) => item.source === "Uploaded PDF").slice(0, event.target.files.length));
                  }}
                  type="file"
                />
                <Icon name="file" size={18} />
                <span><strong>Upload exported profile PDFs</strong><small>PDF only · Multiple files supported</small></span>
              </label>
              <small className="input-count">{sourceCounts.uploaded} PDF parsed · {sourceCounts.pasted} pasted</small>
            </div>
          </article>
        </section>

        <section className="panel pool-review">
          <div className="pool-review-head">
            <div>
              <p className="eyebrow">Candidate pool</p>
              <h2>{candidates.length ? `${candidates.length} candidates ready to rank` : "Your pool is empty"}</h2>
              <p>{candidates.length ? `AI will compare these candidates with ${userProfile.name}’s goal and CV.` : "Add candidates using one or more approved sources above."}</p>
            </div>
            <div className="pool-count"><strong>{candidates.length}</strong><span>candidates</span></div>
          </div>
          {candidates.length > 0 ? (
            <div className="candidate-table">
              {candidates.map((candidate) => (
                <article className="candidate-row" key={candidate.id}>
                  <span className="candidate-avatar">{candidate.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                  <div><strong>{candidate.name}</strong><span>{candidate.role}</span><small>{candidate.detail}</small></div>
                  <span className={`source-pill source-${candidate.source.toLowerCase().replaceAll(" ", "-")}`}>{candidate.source}</span>
                  <Button title={`Remove ${candidate.name}`} onClick={() => setCandidates((current) => current.filter((item) => item.id !== candidate.id))}>×</Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="pool-empty">
              <span className="stat-icon blue"><Icon name="people" /></span>
              <strong>No professionals added yet</strong>
              <p>The dashboard remains empty until you finalize a candidate pool.</p>
            </div>
          )}
          <div className="pool-finalize">
            <div>
              <Icon name="sparkle" size={17} />
              <span><strong>Next: AI relevance ranking</strong><small>Connectly will re-rank this pool into a shortlist of 3–5 contacts. It will not search the web.</small></span>
            </div>
            <Button className={`primary-button ${!candidates.length ? "disabled" : ""}`} onClick={() => candidates.length && onFinalize(candidates)}>
              Finalize pool & rank shortlist <Icon name="arrow" size={16} />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

const contacts = [
  {
    id: 1,
    name: "Maya Patel",
    role: "Product Manager at Stripe",
    school: "University of Toronto",
    match: 94,
    mutual: 8,
    reason: "Rotman FinTech Association · Shared transition",
    why: "Maya made the same international-student-to-fintech transition you're exploring.",
    profileDetail: "Led onboarding experiments for Stripe’s cross-border payouts, reducing first-transfer drop-off by 18%.",
    yourConnection: "Your capstone explores trust and identity-verification friction in remittance onboarding for international students.",
    ask: "How did your team balance verification friction with the trust a first-time user needs?",
    messages: [
      "Hi Maya, I’m a fellow U of T alum working on a capstone about remittance onboarding for international students. I saw that you led onboarding experiments for Stripe’s cross-border payouts and reduced first-transfer drop-off by 18%. I’m especially curious how your team balanced identity-verification friction with the trust a first-time user needs. Would you be open to a 15-minute chat next week?",
      "Hi Maya, your work improving first-transfer activation for Stripe’s cross-border payouts caught my attention. My U of T capstone looks at a closely related problem: how verification affects trust for international students sending money abroad. I’d love to hear how you identified the highest-friction moment in that journey. Would you have 15 minutes to share what you learned?",
    ],
    image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 2,
    name: "Aaron Chen",
    role: "Product Hiring Manager at Wealthsimple",
    school: "University of Toronto",
    match: 91,
    mutual: 5,
    reason: "New-grad product hiring · U of T",
    why: "Aaron evaluates early-career product candidates in fintech and shares your U of T background.",
    profileDetail: "Built Wealthsimple’s assessment rubric for associate product hires across research, analytics, and product judgment.",
    yourConnection: "Your CV demonstrates user research, SQL, market analysis, and a fintech capstone with 12 international users.",
    ask: "Which signals best distinguish a strong new-grad product candidate when direct PM experience is limited?",
    messages: [
      "Hi Aaron, I’m a fellow U of T student targeting new-grad product roles in fintech. My recent work includes analyzing cross-border onboarding drop-off at Northstar Labs and interviewing 12 users for a remittance trust capstone. Since you’ve built assessment rubrics for associate product hires, I’d value your perspective on which signals best distinguish candidates without a formal PM title. Would you be open to a brief 15-minute chat?",
      "Hi Aaron, your work evaluating associate product candidates at Wealthsimple stood out to me. I’m finishing a U of T commerce degree and have been building experience across user research, SQL, and fintech onboarding strategy. I’m trying to understand how hiring teams weigh project evidence against direct PM experience. Could I ask you about that in a short conversation?",
    ],
    image: "https://images.unsplash.com/photo-1642736468842-c6bdcfbbcd28?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 3,
    name: "Priya Rao",
    role: "Product Strategy Lead at Wise",
    school: "University of Toronto",
    match: 88,
    mutual: 12,
    reason: "Cross-border fintech · Product strategy",
    why: "Priya’s product strategy work closely matches your cross-border onboarding internship and remittance capstone.",
    profileDetail: "Shapes product strategy for newcomer payment journeys and partners with research teams on KYC onboarding decisions.",
    yourConnection: "At Northstar Labs, you analyzed onboarding drop-off and benchmarked five neobanks; your capstone maps KYC trust friction.",
    ask: "What evidence would you expect a new-grad candidate to use when making a product recommendation about KYC friction?",
    messages: [
      "Hi Priya, your product strategy work on newcomer payment journeys closely connects to my experience analyzing cross-border onboarding drop-off at Northstar Labs and my capstone on KYC trust for international students. I’m exploring new-grad fintech product roles and would value your perspective on the evidence teams expect behind a recommendation about verification friction. Would you be open to a brief chat?",
      "Hi Priya, I’m a U of T commerce student focused on fintech product strategy. I recently interviewed 12 international users about remittance onboarding and benchmarked five neobank products during my internship. Your work connecting KYC decisions with newcomer trust really resonated. Could I ask how your team balances research evidence with regulatory constraints?",
    ],
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=160&h=160&q=85",
  },
];

const discoveryContacts = [
  {
    id: 101,
    name: "Sofia Martinez",
    role: "Product Manager at Wise",
    match: 96,
    mutual: 7,
    why: "Built cross-border payment experiences for newcomers—the same audience as your remittance capstone.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 102,
    name: "Ethan Chen",
    role: "UX Researcher at Shopify",
    match: 93,
    mutual: 5,
    why: "Researches how small-business owners build trust in unfamiliar digital tools.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 103,
    name: "Amara Okafor",
    role: "Growth Strategist at Notion",
    match: 91,
    mutual: 11,
    why: "Moved from a student startup accelerator into product-led growth for global teams.",
    image: "https://images.unsplash.com/photo-1609436132311-e4b0c9370469?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 104,
    name: "Rohan Mehta",
    role: "Data Scientist at Wealthsimple",
    match: 89,
    mutual: 4,
    why: "Uses behavioral data to understand where first-time investors lose confidence.",
    image: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 105,
    name: "Claire Dubois",
    role: "Service Designer at RBC",
    match: 87,
    mutual: 9,
    why: "Redesigned onboarding journeys for international students opening their first Canadian account.",
    image: "https://images.unsplash.com/photo-1684262855364-f3ca7786c734?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 106,
    name: "Jordan Brooks",
    role: "Community Lead at Figma",
    match: 85,
    mutual: 6,
    why: "Built peer-learning programs that help early-career designers find trusted mentors.",
    image: "https://images.unsplash.com/photo-1588178454780-441fa5b99fa5?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 107,
    name: "Nadia Rahman",
    role: "AI Product Designer at Microsoft",
    match: 84,
    mutual: 3,
    why: "Designs AI feedback experiences for multilingual users and international teams.",
    image: "https://images.unsplash.com/photo-1609371497456-3a55a205d5eb?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 108,
    name: "Marcus Lee",
    role: "Sustainability Analyst at Deloitte",
    match: 82,
    mutual: 8,
    why: "Turned campus climate research into sustainability strategy for consumer businesses.",
    image: "https://images.unsplash.com/photo-1614700308520-bd630ab82471?auto=format&fit=crop&w=160&h=160&q=85",
  },
  {
    id: 109,
    name: "Priya Shah",
    role: "Venture Associate at MaRS",
    match: 80,
    mutual: 13,
    why: "Supports newcomer-led startups and mentors student founders across Toronto.",
    image: "https://images.unsplash.com/photo-1642449685592-6b944a8f6556?auto=format&fit=crop&w=160&h=160&q=85",
  },
];

const firstNames: Record<number, string> = { 1: "Maya", 2: "Aaron", 3: "Priya" };

function Discovery({ guide, profile }: { guide: GoalGuide; profile: GoalProfile }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Best matches");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const normalizedQuery = query.trim().toLowerCase();
  const results = discoveryContacts.filter((contact) =>
    `${contact.name} ${contact.role} ${contact.why}`
      .toLowerCase()
      .includes(normalizedQuery),
  );

  const steps: Array<{ icon: IconName; number: string; title: string; detail: string }> = [
    { icon: "search", number: "01", title: "Find the right people", detail: "Search by company, role, or professional interest." },
    { icon: "target", number: "02", title: "Understand the connection", detail: "See the experiences and context that make the match relevant." },
    { icon: "message", number: "03", title: "Start a real conversation", detail: "Draft personalized outreach and thoughtful questions." },
    { icon: "calendar", number: "04", title: "Keep it going", detail: "Save context, plan follow-ups, and nurture the relationship." },
  ];

  return (
    <div className="content discovery-content">
      <section className="discovery-hero">
        <span className="goal-context-pill"><Icon name={guide.icon} size={14} /> Guided for: {guide.shortLabel}</span>
        <p className="eyebrow">Your next guided step</p>
        <h1>{guide.discoveryTitle}</h1>
        <p>{guide.discoveryDescription} Your focus: <strong>{profile.focus}</strong></p>
        <label className="discovery-search">
          <Icon name="search" size={20} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company, role, interest, or name"
            value={query}
          />
          <Button className="primary-button">Search people</Button>
        </label>
        <div className="popular-searches">
          <span>Try:</span>
          {["Product", "Designer", "Research"].map((term) => (
            <Button className="search-suggestion" key={term} onClick={() => setQuery(term)}>{term}</Button>
          ))}
        </div>
      </section>

      <section className="journey-strip" aria-label="From discovery to follow-up">
        {steps.map((step, index) => (
          <article className="journey-step" key={step.number}>
            <div className="journey-icon"><Icon name={step.icon} /></div>
            <div>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </div>
            {index < steps.length - 1 && <Icon name="chevron" size={16} />}
          </article>
        ))}
      </section>

      <section className="discovery-layout">
        <div className="discovery-results">
          <div className="results-heading">
            <div>
              <h2>{normalizedQuery ? `${results.length} matches found` : guide.peopleLabel}</h2>
              <p>Ranked for your {guide.shortLabel.toLowerCase()} goal and conversation potential</p>
            </div>
            <div className="filter-row">
              {["Best matches", "Shared school", "Mutuals"].map((item) => (
                <Button
                  className={`filter-chip ${filter === item ? "active" : ""}`}
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <div className="discovery-cards">
            {results.map((contact) => (
              <article className="discovery-card" key={contact.id}>
                <div className="card-topline">
                  <div className="avatar-wrap discovery-avatar">
                    <img alt={`${contact.name}, ${contact.role}`} src={contact.image} />
                    <span className="linkedin-badge">in</span>
                  </div>
                  <span className="match-score">{contact.match}% relevant</span>
                  <Button
                    className={`save-button ${savedIds.includes(contact.id) ? "saved" : ""}`}
                    onClick={() => setSavedIds((current) =>
                      current.includes(contact.id)
                        ? current.filter((id) => id !== contact.id)
                        : [...current, contact.id]
                    )}
                    title={`Save ${contact.name}`}
                  >
                    <Icon name={savedIds.includes(contact.id) ? "check" : "bookmark"} size={16} />
                  </Button>
                </div>
                <strong className="discovery-name">{contact.name}</strong>
                <span className="discovery-role">{contact.role}</span>
                <div className="shared-context">
                  <span>Why this connection makes sense</span>
                  <p>{contact.why}</p>
                </div>
                <div className="card-meta">
                  <span><Icon name="school" size={14} /> U of T</span>
                  <span><Icon name="people" size={14} /> {contact.mutual} mutual</span>
                </div>
                <Button
                  className={`card-action ${savedIds.includes(contact.id) ? "secondary-button" : "primary-button"}`}
                  onClick={() => setSavedIds((current) =>
                    current.includes(contact.id)
                      ? current.filter((id) => id !== contact.id)
                      : [...current, contact.id]
                  )}
                >
                  <Icon name={savedIds.includes(contact.id) ? "check" : "bookmark"} size={15} />
                  {savedIds.includes(contact.id) ? "Saved to review" : "Save connection"}
                </Button>
              </article>
            ))}
            {results.length === 0 && (
              <div className="empty-results">
                <span className="stat-icon blue"><Icon name="search" /></span>
                <strong>No exact matches yet</strong>
                <p>Try a broader role, company, or professional interest.</p>
                <Button className="secondary-button" onClick={() => setQuery("")}>Clear search</Button>
              </div>
            )}
          </div>
        </div>

        <aside className="discovery-aside">
          <span className="ai-mark"><Icon name="target" size={18} /></span>
          <p className="eyebrow">Your networking guide</p>
          <h2>Explore with a purpose</h2>
          <p>For your {guide.shortLabel.toLowerCase()} goal, look for people who can help with: {profile.support.toLowerCase()}.</p>
          <div className="aside-proof">
            <strong>Start with one perspective</strong>
            <span>Save 2–3 people whose experience answers a specific question.</span>
          </div>
          <div className="aside-proof">
            <strong>Then compare what you learn</strong>
            <span>Connectly will help turn conversations into your next guided step.</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

type Page = "overview" | "discover" | "messages" | "follow-ups" | "analytics" | "profile";

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </section>
  );
}

function ProfilePage({ guide, goalProfile, submittedProfile, onChangeGoal }: { guide: GoalGuide; goalProfile: GoalProfile; submittedProfile: UserProfile; onChangeGoal: () => void }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: submittedProfile.name,
    headline: submittedProfile.headline,
    school: submittedProfile.school,
    program: submittedProfile.program,
    graduation: submittedProfile.graduation,
    location: submittedProfile.location,
    targetRoles: submittedProfile.targetRoles,
    goal: `${guide.label}: ${goalProfile.focus}. ${goalProfile.support}.`,
    experience: submittedProfile.experience,
  });
  const update = (field: keyof typeof profile, value: string) => setProfile((current) => ({ ...current, [field]: value }));

  return (
    <div className="content page-content">
      <PageIntro
        eyebrow={`${guide.shortLabel} guidance`}
        title="Profile & networking goal"
        description="Your selected goal shapes every recommendation, prompt, and relationship milestone."
        action={<Button className={editing ? "primary-button" : "secondary-button"} onClick={() => setEditing((value) => !value)}><Icon name={editing ? "check" : "briefcase"} size={16} />{editing ? "Save profile" : "Edit profile"}</Button>}
      />
      <GoalBanner guide={guide} profile={goalProfile} onEdit={onChangeGoal} />
      <section className="profile-layout">
        <div className="panel profile-main">
          <div className="profile-identity">
            <div className="profile-avatar-large">AK</div>
            <div><h2>{profile.name}</h2><p>{profile.headline}</p><span>{profile.location}</span></div>
            <span className="completion-ring">88%<small>complete</small></span>
          </div>
          <div className="profile-form-grid">
            {[
              ["name", "Full name"],
              ["headline", "Professional headline"],
              ["school", "School"],
              ["program", "Program"],
              ["graduation", "Graduation year"],
              ["location", "Location"],
              ["experience", "Current experience"],
              ["targetRoles", "Target roles"],
            ].map(([field, label]) => (
              <label className={field === "headline" || field === "targetRoles" ? "wide" : ""} key={field}>
                <span>{label}</span>
                <input disabled={!editing} onChange={(event) => update(field as keyof typeof profile, event.target.value)} value={profile[field as keyof typeof profile]} />
              </label>
            ))}
            <label className="wide">
              <span>Primary networking goal</span>
              <textarea disabled={!editing} onChange={(event) => update("goal", event.target.value)} value={profile.goal} />
            </label>
          </div>
        </div>
        <aside className="profile-side">
          <div className="panel context-summary">
            <span className="stat-icon blue"><Icon name="target" /></span>
            <h2>What guides your plan</h2>
            <div><Icon name="check" size={15} /><span><strong>Primary goal</strong>{guide.label}</span></div>
            <div><Icon name="check" size={15} /><span><strong>Your focus</strong>{goalProfile.focus}</span></div>
            <div><Icon name="check" size={15} /><span><strong>What you need next</strong>{goalProfile.support}</span></div>
          </div>
          <div className="panel profile-tip">
            <Icon name="file" size={18} />
            <div><strong>CV parsed successfully</strong><p>Northstar Labs, fintech onboarding research, remittance capstone, and 5 core skills are informing your matches.</p></div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function MessagesPage({ guide, profile }: { guide: GoalGuide; profile: GoalProfile }) {
  const [activeId, setActiveId] = useState(1);
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = contacts.find((contact) => contact.id === activeId) ?? contacts[0];
  const [drafts, setDrafts] = useState<Record<number, string>>(() => Object.fromEntries(contacts.map((contact) => [contact.id, contact.messages[0]])));
  const draft = drafts[active.id] ?? active.messages[variant];

  return (
    <div className="content page-content">
      <PageIntro eyebrow={`${guide.shortLabel} · Guided outreach`} title="Messages" description={`Start conversations that move your goal forward: ${profile.focus}.`} />
      <GoalBanner guide={guide} profile={profile} />
      <section className="messages-layout">
        <aside className="panel message-contacts">
          <div className="section-title"><div><h2>Generated matches</h2><p>Created from your goal, profile, and parsed CV</p></div><span>3</span></div>
          {contacts.map((contact) => (
            <Button className={`message-contact ${active.id === contact.id ? "active" : ""}`} key={contact.id} onClick={() => { setActiveId(contact.id); setVariant(0); }}>
              <img alt="" src={contact.image} /><span><strong>{contact.name}</strong><small>{contact.role}</small></span><Icon name="chevron" size={15} />
            </Button>
          ))}
        </aside>
        <div className="message-workspace">
          <div className="panel analysis-panel">
            <div className="analysis-head">
              <div className="recipient-large"><img alt="" src={active.image} /><div><span>Relationship analysis</span><h2>{active.name}</h2><p>{active.role}</p></div></div>
              <span className="analysis-score">{active.match}%<small>relevance</small></span>
            </div>
            <div className="analysis-summary"><Icon name="sparkle" size={17} /><p><strong>Why this is credible:</strong> {active.why}</p></div>
            <div className="analysis-columns">
              <article><span>Their relevant experience</span><p>{active.profileDetail}</p></article>
              <span className="connection-line"><Icon name="arrow" size={17} /></span>
              <article className="you"><span>Your matching experience</span><p>{active.yourConnection}</p></article>
            </div>
            <div className="angle-row">
              <div><span>Recommended {guide.shortLabel.toLowerCase()} angle</span><strong>{guide.messageAngle}</strong></div>
              <div><span>Question worth asking</span><strong>“{active.ask}”</strong></div>
            </div>
          </div>
          <div className="panel draft-panel">
            <div className="draft-heading"><div><h2>Personalized draft</h2><p>Built from the evidence above. Edit anything before sending.</p></div><span className="ready"><i /> Editable</span></div>
            <textarea aria-label="Editable personalized message" onChange={(event) => setDrafts((current) => ({ ...current, [active.id]: event.target.value }))} value={draft} />
            <div className="draft-footer"><span>{draft.length} characters</span><div>
              <Button className="secondary-button" onClick={() => { const next = variant === 0 ? 1 : 0; setVariant(next); setDrafts((current) => ({ ...current, [active.id]: active.messages[next] })); }}><Icon name="refresh" size={15} />Try another angle</Button>
              <Button className="primary-button" onClick={async () => { await navigator.clipboard?.writeText(draft); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }}><Icon name={copied ? "check" : "copy"} size={15} />{copied ? "Copied" : "Copy draft"}</Button>
            </div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

const followups = [
  { id: 1, contact: "Maya Patel", role: "Product Manager at Stripe", date: "Planned", type: "If Maya replies", note: "Your shared context is cross-border onboarding and trust for international users.", action: "Thank her and ask how early-career candidates can demonstrate product judgment.", image: contacts[0].image },
  { id: 2, contact: "Aaron Chen", role: "Product Hiring Manager at Wealthsimple", date: "Planned", type: "After a conversation", note: "Your goal is to understand how fintech teams evaluate new-grad product candidates.", action: "Share one revised portfolio example based on his assessment advice.", image: contacts[1].image },
  { id: 3, contact: "Priya Rao", role: "Product Strategy Lead at Wise", date: "Planned", type: "If Priya replies", note: "Your shared context is KYC friction, newcomer trust, and product strategy.", action: "Follow up with your capstone journey map and one focused learning.", image: contacts[2].image },
];

function FollowUpsPage({ guide, profile }: { guide: GoalGuide; profile: GoalProfile }) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  return (
    <div className="content page-content">
      <PageIntro eyebrow={`${guide.shortLabel} · Relationship follow-up`} title="Keep the relationship going" description={guide.followupFocus} action={<Button className="primary-button"><Icon name="calendar" size={16} />Add reminder</Button>} />
      <GoalBanner guide={guide} profile={profile} />
      <section className="followup-stats">
        <div><strong>3</strong><span>Suggested paths</span></div><div><strong>0</strong><span>Due this week</span></div><div><strong>0</strong><span>Conversations held</span></div><div><strong>—</strong><span>Follow-through rate</span></div>
      </section>
      <section className="followups-layout">
        <div className="panel nurture-list">
          <div className="section-title"><div><h2>Suggested follow-up paths</h2><p>Generated from your goal and CV—these activate only when a conversation begins</p></div></div>
          {followups.map((item) => (
            <article className={`nurture-card ${completed.includes(item.id) ? "complete" : ""}`} key={item.id}>
              <img alt="" src={item.image} />
              <div className="nurture-main">
                <div className="nurture-title"><div><strong>{item.contact}</strong><span>{item.role}</span></div><span className="due-pill">{item.date}</span></div>
                <p className="interaction-type">{item.type}</p>
                <div className="saved-note"><span>Generated shared context</span><p>{notes[item.id] || item.note}</p></div>
                <div className="next-action"><Icon name="sparkle" size={16} /><div><span>Suggested next step</span><strong>{item.action}</strong></div></div>
                <div className="nurture-actions"><Button className="secondary-button" onClick={() => { const value = window.prompt("Update your conversation note", notes[item.id] || item.note); if (value) setNotes((current) => ({ ...current, [item.id]: value })); }}>Edit note</Button><Button className="primary-button" onClick={() => setCompleted((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}><Icon name="check" size={15} />{completed.includes(item.id) ? "Completed" : "Mark complete"}</Button></div>
              </div>
            </article>
          ))}
        </div>
        <aside className="panel followup-coach">
          <span className="ai-mark"><Icon name="sparkle" size={18} /></span>
          <h2>{guide.weeklyOutcome}</h2>
          <p>Each next step is prioritized for your {guide.shortLabel.toLowerCase()} goal.</p>
          <div className="coach-progress"><div><strong>0 of 3</strong><span>actions activated</span></div><span><i className="empty-progress" /></span></div>
          <ul><li>Reach out to one generated match</li><li>Capture what you learn about hiring signals</li><li>Activate a follow-up after the first reply</li></ul>
        </aside>
      </section>
    </div>
  );
}

function AnalyticsPage({ guide, profile }: { guide: GoalGuide; profile: GoalProfile }) {
  const bars = ["h08", "h08", "h08", "h08", "h08", "h08"];
  return (
    <div className="content page-content">
      <PageIntro eyebrow={`${guide.shortLabel} · Goal progress`} title="What’s moving your goal forward" description={`Measure learning and relationship quality for ${profile.focus}—not outreach volume.`} action={<Button className="secondary-button">Last 6 months <Icon name="chevron" size={14} /></Button>} />
      <GoalBanner guide={guide} profile={profile} />
      <section className="analytics-kpis">
        {[["people", "3", "Goal-relevant matches", "Generated from CV", "blue"], ["message", "0", "Meaningful conversations", "Ready to start", "violet"], ["check", "—", "Outreach confidence", "Baseline not set", "green"], ["calendar", "0", "Relationships nurtured", "3 paths suggested", "amber"]].map(([icon, value, label, trend, color]) => (
          <article className="panel analytics-kpi" key={label}><span className={`stat-icon ${color}`}><Icon name={icon as IconName} /></span><div><span>{label}</span><strong>{value}</strong><small>{trend}</small></div></article>
        ))}
      </section>
      <section className="analytics-grid">
        <div className="panel chart-panel">
          <div className="section-title"><div><h2>Conversation momentum</h2><p>Your baseline starts after the first conversation</p></div><span className="positive-badge">New plan</span></div>
          <div className="bar-chart">{bars.map((height, index) => <div key={`${height}-${index}`}><span className={`analytics-bar ${height}`} /><small>{["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][index]}</small></div>)}</div>
        </div>
        <div className="panel confidence-panel">
          <div className="section-title"><div><h2>Outreach confidence</h2><p>How prepared you feel before reaching out</p></div></div>
          <div className="confidence-score"><strong>—</strong><span>Not measured yet</span></div>
          <div className="confidence-track"><span className="baseline-track" /></div>
          <p><Icon name="arrow" size={14} /> Your first drafted message will establish a confidence baseline.</p>
        </div>
        <div className="panel sources-panel">
          <div className="section-title"><div><h2>What creates strong matches</h2><p>Signals behind your most relevant connections</p></div></div>
          {[["Shared professional interest", "42%", "w42"], ["Similar career transition", "28%", "w28"], ["University or community", "18%", "w18"], ["Mutual connections", "12%", "w12"]].map(([label, value, width]) => <div className="source-row" key={label}><div><span>{label}</span><strong>{value}</strong></div><span><i className={width} /></span></div>)}
        </div>
        <div className="panel insight-panel">
          <span className="ai-mark"><Icon name="target" /></span><p className="eyebrow">Goal-based insight</p><h2>{guide.insight}</h2><p>Your strongest progress comes from conversations tied to one clear learning objective: {profile.support.toLowerCase()}.</p><Button className="text-button">See the supporting conversations <Icon name="arrow" size={15} /></Button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [goalProfile, setGoalProfile] = useState<GoalProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [candidatePool, setCandidatePool] = useState<CandidateEntry[] | null>(null);
  const [page, setPage] = useState<Page>("overview");
  const [selectedId, setSelectedId] = useState(1);
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);
  const selected = contacts.find((contact) => contact.id === selectedId) ?? contacts[0];

  const message = useMemo(
    () => selected.messages[generated ? 1 : 0],
    [generated, selected],
  );

  const copyMessage = async () => {
    await navigator.clipboard?.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!goalProfile) {
    return <GoalWizard onComplete={(profile) => { setGoalProfile(profile); setPage("overview"); }} />;
  }

  const guide = goalGuides[goalProfile.goal];

  if (!userProfile) {
    return (
      <ProfileSetup
        goalProfile={goalProfile}
        guide={guide}
        onChangeGoal={() => setGoalProfile(null)}
        onSubmit={(profile) => { setUserProfile(profile); setPage("overview"); }}
      />
    );
  }

  if (!candidatePool) {
    return (
      <CandidatePoolSetup
        goalProfile={goalProfile}
        userProfile={userProfile}
        onFinalize={(candidates) => { setCandidatePool(candidates); setPage("overview"); }}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">C</span>
          <span>Connectly</span>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {[
            ["home", "Overview"],
            ["people", "Discover"],
            ["message", "Messages"],
            ["calendar", "Follow-ups"],
            ["chart", "Analytics"],
          ].map(([icon, label]) => (
            <Button
              className={`nav-item ${page === label.toLowerCase() ? "active" : ""}`}
              key={label}
              onClick={() => setPage(label.toLowerCase() as Page)}
            >
              <Icon name={icon as IconName} />
              <span>{label}</span>
              {label === "Follow-ups" && <span className="nav-count">3</span>}
            </Button>
          ))}
        </nav>
        <div className="sidebar-tip">
          <span className="tip-icon"><Icon name={guide.icon} size={17} /></span>
          <small className="sidebar-goal-label">{guide.shortLabel}</small>
          <strong>{guide.weeklyOutcome}</strong>
          <p>Your plan is ready. Start with one generated match.</p>
          <div className="tip-progress"><span className="empty-progress" /></div>
          <small>0 of 3 guided actions</small>
        </div>
        <Button className={`profile-chip ${page === "profile" ? "active" : ""}`} onClick={() => setPage("profile")}>
          <div className="avatar-initials">AK</div>
          <div>
            <strong>{userProfile.name}</strong>
            <span>{userProfile.school.replace("University of ", "")} · {userProfile.graduation}</span>
          </div>
          <Icon name="chevron" size={16} />
        </Button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">C</span>
            <span>Connectly</span>
          </div>
          <label className="search-box">
            <Icon name="search" size={17} />
            <input placeholder="Search contacts, companies, or roles" />
            <kbd>⌘ K</kbd>
          </label>
          <Button className="topbar-goal" onClick={() => setGoalProfile(null)}>
            <Icon name="target" size={15} />
            <span>{guide.shortLabel}</span>
            <small>Adjust goal</small>
          </Button>
          <Button className="icon-button" title="Notifications">
            <Icon name="bell" />
            <span className="notification-dot" />
          </Button>
        </header>

        {page === "discover" ? <Discovery guide={guide} profile={goalProfile} />
        : page === "messages" ? <MessagesPage guide={guide} profile={goalProfile} />
        : page === "follow-ups" ? <FollowUpsPage guide={guide} profile={goalProfile} />
        : page === "analytics" ? <AnalyticsPage guide={guide} profile={goalProfile} />
        : page === "profile" ? <ProfilePage goalProfile={goalProfile} guide={guide} submittedProfile={userProfile} onChangeGoal={() => setGoalProfile(null)} />
        : (
        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">{guide.shortLabel} · Tuesday, March 12</p>
              <h1>Good morning, {userProfile.name.split(" ")[0]}</h1>
              <p>Here’s the next best step toward your networking goal.</p>
            </div>
            <Button className="primary-button" onClick={() => setPage("discover")}>
              <Icon name="arrow" size={17} />
              Continue my plan
            </Button>
          </section>

          <GoalBanner guide={guide} profile={goalProfile} onEdit={() => setGoalProfile(null)} />

          <section className="stats-grid" aria-label="Networking progress">
            <article className="stat-card">
              <span className="stat-icon blue"><Icon name="people" /></span>
              <div><strong>3</strong><span>CV-informed matches</span></div>
              <span className="trend">Just generated</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon violet"><Icon name="message" /></span>
              <div><strong>0</strong><span>Conversations held</span></div>
              <span className="trend muted">Ready to start</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon green"><Icon name="check" /></span>
              <div><strong>—</strong><span>Outreach confidence</span></div>
              <span className="trend muted">No baseline yet</span>
            </article>
            <article className="stat-card">
              <span className="stat-icon amber"><Icon name="calendar" /></span>
              <div><strong>0</strong><span>Active follow-ups</span></div>
              <span className="trend muted">3 paths suggested</span>
            </article>
          </section>

          <section className="workspace-grid">
            <div className="panel matches-panel">
              <div className="panel-heading">
                <div>
                  <div className="heading-row">
                  <h2>{guide.peopleLabel}</h2>
                    <span className="new-pill">Top 3 of {candidatePool.length}</span>
                  </div>
                  <p>Generated from your goal, CV, and target roles: {userProfile.targetRoles}</p>
                </div>
                <Button className="text-button">View all <Icon name="arrow" size={16} /></Button>
              </div>
              <div className="contact-list">
                {contacts.map((contact) => (
                  <button
                    className={`contact-row ${selectedId === contact.id ? "selected" : ""}`}
                    key={contact.id}
                    onClick={() => {
                      setSelectedId(contact.id);
                      setGenerated(false);
                    }}
                  >
                    <div className="avatar-wrap">
                      <img alt={`${contact.name}, ${contact.role}`} src={contact.image} />
                      <span className="linkedin-badge">in</span>
                    </div>
                    <div className="contact-info">
                      <div className="contact-title">
                        <strong>{contact.name}</strong>
                        <span>{contact.match}% match</span>
                      </div>
                      <p>{contact.role}</p>
                      <div className="contact-meta">
                        <span><Icon name="school" size={14} /> {contact.school}</span>
                        <span>{contact.mutual} mutual</span>
                      </div>
                      <span className="reason-pill">{contact.reason}</span>
                    </div>
                    <span className="row-arrow"><Icon name="chevron" size={17} /></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel message-panel">
              <div className="message-heading">
                <span className="ai-mark"><Icon name="sparkle" size={18} /></span>
                <div>
                  <h2>Guided conversation builder</h2>
                  <p>A {guide.shortLabel.toLowerCase()} conversation with {selected.name}</p>
                </div>
                <span className="ready"><i /> Ready</span>
              </div>
              <div className="recipient-card context-card">
                <img alt="" src={selected.image} />
                <div>
                  <span>Why {firstNames[selected.id]} specifically</span>
                  <strong>{selected.why}</strong>
                </div>
                <span className="match-mini">{selected.match}% match</span>
              </div>
              <div className="evidence-grid">
                <div className="evidence-item">
                  <span>From {firstNames[selected.id]}’s experience</span>
                  <p>{selected.profileDetail}</p>
                </div>
                <div className="evidence-item yours">
                  <span>Connects to your experience</span>
                  <p>{selected.yourConnection}</p>
                </div>
              </div>
              <div className="question-card">
                <span>Your goal-based question</span>
                <p>“{selected.ask}”</p>
              </div>
              <div className="message-box">
                <textarea aria-label="Personalized message" value={message} readOnly />
                <span className="character-count">{message.length} / 300</span>
              </div>
              <div className="message-actions">
                <Button className="secondary-button" onClick={() => setGenerated((value) => !value)}>
                  <Icon name="refresh" size={16} /> Regenerate
                </Button>
                <Button className="primary-button grow" onClick={copyMessage}>
                  <Icon name={copied ? "check" : "copy"} size={16} />
                  {copied ? "Copied!" : "Copy message"}
                </Button>
              </div>
              <p className="helper-text"><Icon name="sparkle" size={14} /> Every detail is grounded in both profiles—not a generic template</p>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel followup-panel">
              <div className="panel-heading compact">
                <div>
                  <h2>Suggested relationship path</h2>
                  <p>These steps activate after you begin a conversation.</p>
                </div>
                <Button className="text-button">See all</Button>
              </div>
              <div className="followup-list">
                <div className="date-tile"><strong>14</strong><span>Mar</span></div>
                <div className="followup-info">
                  <strong>If Maya replies, ask about hiring signals</strong>
                  <span>Generated from your fintech product goal and capstone</span>
                </div>
                <span className="status-pill meeting">Suggested</span>
                <Button className="outline-button">View path</Button>
              </div>
              <div className="followup-list">
                <div className="date-tile soft"><strong>15</strong><span>Mar</span></div>
                <div className="followup-info">
                  <strong>After speaking with Aaron, revise one portfolio story</strong>
                  <span>Use his hiring rubric advice to show stronger product judgment</span>
                </div>
                <span className="status-pill followup">Planned</span>
                <Button className="outline-button">View path</Button>
              </div>
            </div>

            <div className="panel insight-card">
              <div className="insight-top">
                <span className="stat-icon green"><Icon name="chart" /></span>
                <span>{guide.shortLabel} insight</span>
              </div>
              <strong>{guide.insight}</strong>
              <p>Your guidance is currently tuned to help you: {goalProfile.support.toLowerCase()}.</p>
              <Button className="text-button">View analytics <Icon name="arrow" size={16} /></Button>
              <div className="mini-bars" aria-hidden="true">
                {[35, 54, 46, 68, 58, 82, 91].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
            </div>
          </section>
        </div>
        )}
      </main>
    </div>
  );
}
