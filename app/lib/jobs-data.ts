// lib/jobs-data.ts

export type HelpfulLink = {
  label: string;
  href: string;
};

export type Job = {
  slug: string;
  company: string;
  role: string;
  location: string;
  industry: string;
  posted: string;
  salary: string;
  releaseDate: string;
  deadline?: string;
  description?: string;
  applyUrl?: string;
  helpfulLinks?: HelpfulLink[];
  roleSummaryHtml?: string;
  filterTags: string[];
  logoSrc?: string;
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
    releaseDate: "20 Nov 2025",
    deadline: "Closes: 21 Nov 2025",
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
    helpfulLinks: [
      {
        label: "J.P. Morgan careers site",
        href: "https://careers.jpmorgan.com/",
      },
      {
        label: "J.P. Morgan LinkedIn",
        href: "https://www.linkedin.com/company/jpmorgan/",
      },
      {
        label: "Glassdoor reviews",
        href: "https://www.glassdoor.co.uk/Reviews/J-P-Morgan-Reviews-E13661.htm",
      },
      {
        label: "Interview tips (coming soon)",
        href: "#",
      },
    ],
    filterTags: ["finance-investment-banking"],
    logoSrc: "/logos/jpmorgan.png",
  },

  {
    slug: "mckinsey-business-analyst-2026-london",
    company: "McKinsey & Company",
    role: "Business Analyst 2026",
    location: "London",
    industry: "Strategy Consulting",
    posted: "Today",
    salary: "Competitive",
    releaseDate: "12 Sep 2025",
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
    helpfulLinks: [
      {
        label: "McKinsey careers site",
        href: "https://www.mckinsey.com/careers/home",
      },
      {
        label: "McKinsey & Company LinkedIn",
        href: "https://www.linkedin.com/company/mckinsey/",
      },
      {
        label: "Glassdoor reviews",
        href:
          "https://www.glassdoor.co.uk/Reviews/McKinsey-and-Company-Reviews-E2893.htm",
      },
      {
        label: "Interview tips (coming soon)",
        href: "#",
      },
    ],
    filterTags: ["consulting-strategy"],
    logoSrc: "/logos/mckinsey.png",
  },

  {
    slug: "blackrock-2026-full-time-analyst-emea",
    company: "BlackRock",
    role: "2026 Full-Time Analyst Program - EMEA",
    location: "London",
    industry: "Asset Management",
    posted: "Today",
    salary: "Competitive",
    releaseDate: "18 Sep 2025",
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
    helpfulLinks: [
      {
        label: "BlackRock careers site",
        href: "https://careers.blackrock.com/",
      },
      {
        label: "BlackRock LinkedIn",
        href: "https://www.linkedin.com/company/blackrock/",
      },
      {
        label: "Glassdoor reviews",
        href: "https://www.glassdoor.co.uk/Reviews/BlackRock-Reviews-E9331.htm",
      },
      {
        label: "Interview tips (coming soon)",
        href: "#",
      },
    ],
    filterTags: ["finance-asset-management"],
    logoSrc: "/logos/blackrock.png",
  },

  {
    slug: "lendable-graduate-analyst-london",
    company: "Lendable",
    role: "Graduate Analyst",
    location: "London",
    industry: "Fintech",
    posted: "Today",
    salary: "£48,000 + Shares",
    releaseDate: "5 Sep 2025",
    deadline: "Rolling Deadline",
    description: `
<p><strong>About Lendable</strong></p>
<p>Lendable is on a mission to build the world's best technology to help people get credit and save money. We're building one of the world’s leading fintech companies and are off to a strong start:</p>

<ul>
  <li>One of the UK’s newest unicorns with a team of just over 600 people</li>
  <li>Among the fastest-growing tech companies in the UK</li>
  <li>Profitable since 2017</li>
  <li>Backed by top investors including Balderton Capital and Goldman Sachs</li>
  <li>Loved by customers with the best reviews in the market (4.9 across 10,000s of reviews on Trustpilot)</li>
</ul>

<p>So far, we’ve rebuilt the Big Three consumer finance products from scratch: loans, credit cards and car finance. We get money into our customers’ hands in minutes instead of days.</p>

<p>We’re growing fast, and there’s a lot more to do: we’re going after the two biggest Western markets (UK and US) where trillions worth of financial products are held by big banks with dated systems and painful processes.</p>

<p><strong>Join us if you want to</strong></p>
<ul>
  <li>Take ownership across a broad remit. You are trusted to make decisions that drive a material impact on the direction and success of Lendable from day 1</li>
  <li>Work in small teams of exceptional people, who are relentlessly resourceful to solve problems and find smarter solutions than the status quo</li>
  <li>Build the best technology in-house, using new data sources, machine learning and AI to make machines do the heavy lifting</li>
</ul>

<p><strong>About the role</strong></p>
<p>We’re looking for a super-smart graduate who is great with numbers and loves problem-solving to come and apply your skills in a start-up environment and have a big impact on our business and how we do things.</p>

<p><strong>What you'll be doing</strong></p>
<ul>
  <li>Use your analytical and problem-solving skills to generate key insights from data, and use that insight to drive meaningful change in our strategy</li>
  <li>Using data and modelling to ground assumptions for our NPV model, such as predicting what default rates will be in the future, and using that to inform our lending deicsions</li>
  <li>Using data and analytics to drive decisions about who we should lend to, and how much we should lend to them, and how that changes with the economy and competition changes</li>
  <li>Conducting hypothesis testing, and using your findings to change how we do things in areas such as lending strategy, pricing, and fraud detection</li>
  <li>Presenting your findings to senior leaders in the company, then work with the product/tech team to get them implemented</li>
</ul>

<p><strong>What we're looking for</strong></p>
<ul>
  <li>A graduate with a degree</li>
  <li>Someone that loves numbers! You’ll be working with numbers every single day in this role so you’ll be able to demonstrate your ability to work with complex data sets, analyse them and draw insights</li>
  <li>You’ll have a natural curiosity and love to dig into things to understand how they work</li>
  <li>Startup mindset. We’re a fast-growth tech startup so you’ll be super excited to work in an entrepreneurial environment and have a real impact on the business</li>
</ul>

<p><strong>Interview Process</strong></p>
<ul>
  <li>15-minute online numerical test</li>
  <li>Remote (video call) case study (45 mins)</li>
  <li>Remote (video call) case study (60 mins)</li>
  <li>In-person case study (60 min) + Culture Add Conversation (15 minutes) + a chance to meet other recent grads over lunch (30-45 minutes)</li>
</ul>

<p><strong>Life at Lendable</strong></p>
<ul>
  <li>The opportunity to scale up one of the world’s most successful fintech companies.</li>
  <li>Best-in-class compensation, including equity.</li>
  <li>You can work from home every Monday and Friday if you wish - on the other days, those based in the UK come together IRL at our Shoreditch office in London to be together, build and exchange ideas.</li>
  <li>Enjoy a fully stocked kitchen with everything you need to whip up breakfast, lunch, snacks, and drinks in the office every Tuesday-Thursday.</li>
  <li>We care for our Lendies’ well-being both physically and mentally, so we offer coverage when it comes to private health insurance</li>
  <li>We're an equal-opportunity employer and are looking to make Lendable the most inclusive and open workspace in London</li>
</ul>
`,
    applyUrl: "https://jobs.ashbyhq.com/lendable/6aaf5b7f-98d5-4d20-9270-636b99a858fd",
    helpfulLinks: [
      {
        label: "Lendable LinkedIn",
        href: "https://www.linkedin.com/company/lendable/",
      },
      {
        label: "Glassdoor reviews",
        href: "https://www.glassdoor.co.uk/Reviews/Lendable-UK-Reviews-E2982908.htm",
      },
      {
        label: "Lendable blog ",
        href: "https://blog.lendable.co.uk/",
      },
    ],
    roleSummaryHtml: `<div class="space-y-2 text-sm leading-relaxed">
  <h3><strong>About the role</strong></h3>
<p>
  Graduate Analyst role using data, modelling and hypothesis testing to shape Lendable’s lending, pricing and fraud strategies. You’ll turn complex datasets into clear insights, recommend changes to how the business operates, and present your work directly to senior leaders before partnering with product and tech to implement it.
</p>

<h3><strong>About the company</strong></h3>
<p>
  Lendable is a fast-growing, profitable UK fintech unicorn focused on rebuilding core consumer finance products (loans, credit cards, car finance) with modern technology. They operate in the UK and US, backed by top-tier investors, and are known for rapid customer journeys and high Trustpilot ratings.
</p>

<h3><strong>What is Lendable looking for?</strong></h3>
<ul>
  <li>Graduate with a strong comfort working with numbers and complex datasets.</li>
  <li>Analytical, curious and motivated to dig into how things work.</li>
  <li>Enjoys problem-solving and using data to drive decisions.</li>
  <li>Startup mindset: comfortable in a fast-paced, high-ownership environment with real impact from day one.</li>
</ul>

<h3><strong>Benefits</strong></h3>
<ul>
  <li>Opportunity to shape a leading fintech at scale with high ownership.</li>
  <li>Best-in-class compensation, including equity.</li>
  <li>Hybrid working: WFH Mondays and Fridays, in-office in Shoreditch Tuesday–Thursday.</li>
  <li>Fully stocked office kitchen on in-office days.</li>
  <li>Private health insurance and strong focus on well-being.</li>
  <li>Inclusive, equal-opportunity culture aiming to be one of London’s most open workplaces.</li>
  </ul>
</div>`,
    filterTags: ["finance-fintech"],
    logoSrc: "/logos/lendable.png",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return todaysJobs.find((job) => job.slug === slug);
}
