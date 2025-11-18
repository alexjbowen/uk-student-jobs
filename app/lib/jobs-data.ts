// lib/jobs-data.ts

export type Job = {
  slug: string;
  company: string;
  role: string;
  location: string;
  industry: string;
  posted: string;
  salary: string;
  deadline?: string;
  description?: string; // full pasted job description
  applyUrl?: string;
};

export const todaysJobs: Job[] = [
  {
    slug: "jp-morgan-2026-full-time-analyst-london",
    company: "J.P. Morgan",
    role: "2026 Full-Time Analyst (London)",
    location: "London",
    industry: "Investment Banking",
    posted: "Today",
    salary: "Competitive",
    deadline: "Closes: 2 Nov 2025",
    description: `The Full-Time Analyst Programme is a rotational experience across product and coverage teams, supported by extensive training and continuous on-the-job learning.

As an analyst you will:
• Support live M&A, leveraged finance, equity and debt capital markets transactions  
• Build and maintain detailed financial models  
• Produce client presentations, pitch materials and market updates  
• Analyse industry trends and company financials  
• Work closely with senior bankers, product partners and global teams

What we look for:
• Strong analytical and quantitative skills  
• Ability to work in a fast-paced, detail-oriented environment  
• Interest in financial markets and corporate finance  
• Excellent communication, teamwork and problem-solving abilities`,
    applyUrl: "#",
  },

  {
    slug: "mckinsey-business-analyst-2026-london",
    company: "McKinsey & Company",
    role: "Business Analyst 2026",
    location: "London",
    industry: "Strategy Consulting",
    posted: "Today",
    salary: "Competitive",
    deadline: "Closes: 15 Jul 2025",
    description: `As a Business Analyst, you will work in teams to help leading organisations solve their most critical strategic, operational, and organisational challenges.

What you’ll do:
• Structure ambiguous problems and develop clear hypotheses  
• Analyse data and perform rigorous quantitative analysis  
• Conduct research and build industry expertise  
• Communicate insights to clients and drive recommendations  
• Work directly with senior clients and stakeholders  
• Contribute to team problem-solving sessions and workshops

What McKinsey looks for:
• Strong academic performance  
• Problem-solving and analytical ability  
• Curiosity, teamwork, and communication skills  
• Ability to work with incomplete information in fast-paced environments`,
    applyUrl: "#",
  },

  {
    slug: "blackrock-2026-full-time-analyst-emea",
    company: "BlackRock",
    role: "2026 Full-Time Analyst Program - EMEA",
    location: "London",
    industry: "Asset Management",
    posted: "Today",
    salary: "Competitive",
    deadline: "Closes: 24 Oct 2025",
    description: `BlackRock’s Analyst Programme provides a two-year experience across investment, client, and technology-focused business areas, supported by structured training and mentorship.

Role responsibilities:
• Analyse markets, investment strategies, and portfolio performance  
• Work with portfolio managers to support daily investment decisions  
• Conduct research and interpret economic, market, and risk data  
• Develop tools and dashboards for internal teams  
• Support client reporting, presentations, and investment materials

What BlackRock looks for:
• Passion for investing, markets, and long-term client outcomes  
• Strong analytical, technical, and communication skills  
• Ability to work collaboratively in global teams  
• Curiosity, attention to detail, and willingness to learn`,
    applyUrl: "#",
  },

  {
    slug: "lendable-graduate-analyst-london",
    company: "Lendable",
    role: "Graduate Analyst",
    location: "London",
    industry: "Fintech / Consumer Credit",
    posted: "Today",
    salary: "£48,000 + Shares",
    deadline: "Rolling Deadline",
    description: `About Lendable
Lendable is on a mission to build the world's best technology to help people get credit and save money. We're building one of the world’s leading fintech companies and are off to a strong start:

• One of the UK’s newest unicorns with a team of just over 600 people  
• Among the fastest-growing tech companies in the UK  
• Profitable since 2017  
• Backed by top investors including Balderton Capital and Goldman Sachs  
• Loved by customers with 4.9 ratings across tens of thousands of Trustpilot reviews

So far, we’ve rebuilt the Big Three consumer finance products from scratch: loans, credit cards and car finance. We get money into our customers’ hands in minutes instead of days.

We’re growing fast, and there’s a lot more to do: we’re going after the two biggest Western markets (UK and US) where trillions worth of financial products are held by big banks with dated systems and painful processes.

Join us if you want to:
• Take ownership across a broad remit and have a material impact from day one  
• Work in small teams of exceptional people who are relentlessly resourceful  
• Build the best technology in-house using new data sources, machine learning, and AI to make machines do the heavy lifting

About the role
We’re looking for a super-smart graduate who is great with numbers and loves problem-solving, to apply your skills in a start-up environment and make a big impact on how we do things.

What you'll be doing
• Use your analytical and problem-solving skills to generate insights from data  
• Model key assumptions for our NPV model (e.g., predicting future default rates)  
• Use analytics to inform lending decisions, exposure limits, and strategy shifts  
• Conduct hypothesis testing to improve areas like pricing, lending strategy, and fraud detection  
• Present findings to senior leaders and work with product/tech teams to implement them

What we're looking for
• A graduate with a strong academic background  
• Someone who loves numbers and can work with complex datasets  
• Natural curiosity and desire to understand how systems work  
• Startup mindset — excited to work in a fast-growth environment and have real impact

Interview Process
• 15-minute online numerical test  
• Remote case study (45 mins)  
• Remote case study (60 mins)  
• In-person case study (60 mins) + Culture Add (15 mins) + lunch with recent grads (30–45 mins)

Life at Lendable
• Join and scale one of the world’s most successful fintech companies  
• Best-in-class compensation including equity  
• Hybrid work: WFH Monday and Friday; office Tue–Thu in Shoreditch  
• Fully stocked kitchen for breakfast, lunch, snacks, and drinks  
• Private health insurance coverage  
• Inclusive, equal-opportunity environment with a mission to be London’s most open workspace`,
    applyUrl: "#",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return todaysJobs.find((job) => job.slug === slug);
}
