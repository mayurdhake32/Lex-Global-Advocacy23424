import { TeamMember, PracticeArea, Course, BlogPost, ClientMatter } from '../types';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-elena-vance',
    slug: 'elena-vance',
    name: 'Dame Elena Vance KC',
    designation: 'Managing Partner & Principal Advocate',
    department: 'Dispute Resolution & Arbitration',
    role: 'Managing Partner',
    qualifications: ['LL.M. (Cantab, First Class)', 'B.C.L. (Oxon, Distinction)'],
    barEnrollment: 'Bar of England & Wales (Middle Temple, 1998; King’s Counsel 2012)',
    practiceAreas: ['International Arbitration & Dispute Resolution', 'Appellate & Constitutional Advocacy'],
    languages: ['English', 'French', 'German'],
    biography: 'Dame Elena Vance KC possesses over 28 years of distinguished courtroom and arbitral advocacy. She regularly appears before the UK Supreme Court, the Privy Council, the International Court of Justice, and premier international tribunals under LCIA, ICC, and SIAC rules. Her practice centers on complex multi-jurisdictional injunctions, sovereign immunity defenses, and major commercial disputes.',
    yearsOfExperience: 28,
    milestones: [
      'Appointed King’s Counsel (Silk) in 2012',
      'Vice-President of the London International Arbitration Club',
      'Former Member of the ICC Commission on Arbitration & ADR',
      'Chambers Global Band 1 Arbitrator & Counsel (2018–2026)'
    ],
    publications: [
      'Cross-Border Injunctions and Asset Preservation (Oxford University Press, 2018)',
      'Sovereign Immunity in Modern Commercial Disputes (Cambridge Law Journal, 2022)',
      'Emergency Arbitrators: Jurisdictional Bounds and Enforcement (Lex Law Review, 2025)'
    ],
    email: 'e.vance@lexglobaladvocacy.com',
    linkedin: 'https://linkedin.com/in/elena-vance-kc',
    officeLocation: 'Chambers: London & Geneva',
    imageUrl: '/src/assets/images/portrait_elena_vance_1793026040571.jpg',
    altText: 'Portrait of Dame Elena Vance KC, Managing Partner and Principal Advocate',
    order: 1,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'Astraea Holdings v. Sovereign Republic of Z (ICC $2.1B Arbitration Award)',
      'In re Global Telecom Injunctions (UK Supreme Court, Leading Precedent on Worldwide Freezing Orders)',
      'Maritime Shipping Consortium v. Baltic Port Authority (Privy Council Appeal)'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  },
  {
    id: 'team-marcus-sterling',
    slug: 'marcus-sterling',
    name: 'Marcus Sterling',
    designation: 'Senior Advocate & Head of Admiralty Chambers',
    department: 'Maritime & Admiralty',
    role: 'Senior Advocate',
    qualifications: ['LL.M. Maritime Law (Southampton)', 'LL.B. (Edinburgh, First Class)'],
    barEnrollment: 'Faculty of Advocates (Scotland, 1996), Bar of England & Wales (Inner Temple)',
    practiceAreas: ['Maritime & Admiralty Law', 'International Trade & Commodities'],
    languages: ['English', 'Norwegian'],
    biography: 'Marcus Sterling has thirty years of specialized maritime advocacy, handling wet and dry shipping litigation, vessel arrests, charterparty deadfreight disputes, salvage under LOF contracts, and complex marine insurance claims. He is recognized worldwide as a premier nautical litigator before the High Court of Admiralty in London and arbitral seats across Singapore and Rotterdam.',
    yearsOfExperience: 30,
    milestones: [
      'Lead Counsel on the MV Northern Dawn Salvage Arbitration ($320M cargo recovery)',
      'Panel Arbitrator for the Singapore Chamber of Maritime Arbitration (SCMA)',
      'Senior Editorial Board, Journal of Maritime Law and Commerce'
    ],
    publications: [
      'The Law of Charterparties & Laytime Disputes (Informa Law, 2019)',
      'Marine Insurance Clauses in War Risk Zones (Lloyd’s Maritime Law Quarterly, 2023)'
    ],
    email: 'm.sterling@lexglobaladvocacy.com',
    linkedin: 'https://linkedin.com/in/marcus-sterling-advocate',
    officeLocation: 'Chambers: London & Edinburgh',
    imageUrl: '/src/assets/images/portrait_marcus_sterling_1793026077880.jpg',
    altText: 'Portrait of Marcus Sterling, Senior Advocate and Head of Admiralty Chambers',
    order: 2,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'The MV Arctic Horizon (Admiralty Court London - Landmark Ruling on Collision Apportionment)',
      'Pacific LNG Carrier Charterparty Appeal (LMAA London Arbitration)',
      'Re Sovereign Straits Arrest Warrant (Enforcement under Arrest Convention 1952)'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  },
  {
    id: 'team-tariq-almansoor',
    slug: 'tariq-almansoor',
    name: 'Tariq Al-Mansoor',
    designation: 'Senior Advocate, Arbitration Counsel',
    department: 'Dispute Resolution & Arbitration',
    role: 'Senior Advocate',
    qualifications: ['LL.M. (Harvard Law School)', 'LL.B. (University of London, SOAS)'],
    barEnrollment: 'Bar of England & Wales (Lincoln’s Inn, 2005), DIFC Courts Bar',
    practiceAreas: ['International Arbitration & Dispute Resolution', 'Banking, Finance & Sovereign Debt'],
    languages: ['Arabic', 'English', 'French'],
    biography: 'Tariq Al-Mansoor advises multinational energy consortia, infrastructure developers, and sovereign wealth funds in high-stakes bilateral investment treaty (BIT) arbitrations and cross-border commercial claims. With over 19 years of advocacy across Europe, the Middle East, and Asia, Tariq brings rigorous jurisdictional precision to multilateral dispute resolution.',
    yearsOfExperience: 19,
    milestones: [
      'Fellow of the Chartered Institute of Arbitrators (FCIArb)',
      'Counsel in $1.4B transnational oil & gas pipeline concession dispute',
      'Listed in Who’s Who Legal: Thought Leaders in Arbitration (2020–2026)'
    ],
    publications: [
      'Enforcement of Arbitral Awards in Emerging Jurisdictions (Kluwer Law International, 2021)',
      'Bilateral Investment Treaties and State Regulatory Carve-Outs (ICSID Review, 2024)'
    ],
    email: 't.almansoor@lexglobaladvocacy.com',
    linkedin: 'https://linkedin.com/in/tariq-al-mansoor',
    officeLocation: 'Chambers: London & Dubai',
    imageUrl: '/src/assets/images/portrait_tariq_almansoor_1793026078955.jpg',
    altText: 'Portrait of Tariq Al-Mansoor, Senior Advocate and Arbitration Counsel',
    order: 3,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'Solaris Power Consortium v. National Grid Authority (ICSID Case No. ARB/22/19)',
      'Gulf Infrastructure Fund v. Construction Syndicate (DIAC Ad Hoc Hearing)',
      'Euro-Levant Petroleum Joint Venture Arbitration (LCIA Award Concluded)'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  },
  {
    id: 'team-amara-chen',
    slug: 'amara-chen',
    name: 'Amara Chen',
    designation: 'Associate Advocate & Partner, Corporate Practice',
    department: 'Corporate & Cross-Border M&A',
    role: 'Associate Advocate',
    qualifications: ['LL.M. Corporate Law (NYU School of Law)', 'LL.B. (National University of Singapore, First Class)'],
    barEnrollment: 'New York State Bar (2011), Singapore Supreme Court Roll of Advocates & Solicitors (2009)',
    practiceAreas: ['Corporate & Cross-Border M&A', 'Banking, Finance & Sovereign Debt'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    biography: 'Amara Chen leads the firm’s Cross-Border Corporate and M&A group. She counsels private equity funds, institutional investors, and sovereign-backed enterprises on complex share acquisitions, cross-border corporate reorganizations, FDI regulatory approvals, and joint-venture governance across the Asia-Pacific and American financial corridors.',
    yearsOfExperience: 15,
    milestones: [
      'Advised on $850M pan-Asian clean energy portfolio merger',
      'Recognized in Asian Legal Business 40 Under 40',
      'Co-Chair, International Bar Association Cross-Border Transactions Subcommittee'
    ],
    publications: [
      'Foreign Investment Controls & National Security Screens in Strategic Acquisitions (Columbia Journal of Transnational Law, 2023)',
      'Structuring Joint Ventures in Fragmented Regulatory Environments (Lex Practice Guides, 2025)'
    ],
    email: 'a.chen@lexglobaladvocacy.com',
    linkedin: 'https://linkedin.com/in/amara-chen-esq',
    officeLocation: 'Chambers: Singapore & New York',
    imageUrl: '/src/assets/images/portrait_amara_chen_1793026077073.jpg',
    altText: 'Portrait of Amara Chen, Associate Advocate & Partner in Corporate Practice',
    order: 4,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'Apex Semiconductor Corp $1.2B Outbound Acquisition & CFIUS Filing',
      'Pan-Ocean Logistics Restructuring & Debt Syndication',
      'BioPharm Global Merger and Dual-Listed Entity Establishment'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  },
  {
    id: 'team-sofia-hernandez',
    slug: 'sofia-hernandez',
    name: 'Dr. Sofia Hernandez',
    designation: 'Legal Consultant, Head of Tech & IP Governance',
    department: 'Technology, IP & Regulatory',
    role: 'Legal Consultant',
    qualifications: ['Ph.D. in Cyberlaw & AI Governance (Stanford Law School)', 'LL.M. Intellectual Property (Columbia)'],
    barEnrollment: 'State Bar of California (2015), Solicitor of the Senior Courts of England & Wales',
    practiceAreas: ['Technology, IP & Data Protection', 'Cross-Border Regulatory Compliance'],
    languages: ['English', 'Spanish', 'Portuguese'],
    biography: 'Dr. Sofia Hernandez is an internationally acclaimed legal consultant advising technology giants, frontier AI laboratories, and biomedical institutes on cross-border data protection (GDPR, CCPA), generative AI liability, trade secret protection, and intellectual property licensing. She acts as lead external regulatory counsel on multi-billion dollar tech mergers.',
    yearsOfExperience: 11,
    milestones: [
      'Invited Expert on the European AI Act Advisory Consultative Group',
      'Lead IP Consultant on $600M algorithmic patent portfolio transaction',
      'Adjunct Professor of Global Technology Law at King’s College London'
    ],
    publications: [
      'Algorithmic Liability and Evidentiary Burdens in Commercial Litigation (Harvard Journal of Law & Technology, 2024)',
      'Cross-Border Data Adequacy and Cloud Sovereignty (Modern Law Review, 2022)'
    ],
    email: 's.hernandez@lexglobaladvocacy.com',
    linkedin: 'https://linkedin.com/in/sofia-hernandez-phd',
    officeLocation: 'Chambers: San Francisco & London',
    imageUrl: '/src/assets/images/portrait_sophia_reyes_1793026078307.jpg',
    altText: 'Portrait of Dr. Sofia Hernandez, Head of Technology and IP Governance',
    order: 5,
    isFeatured: true,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'In re Neural Health Technologies Global Patent Defense',
      'Cross-Atlantic Cloud Architecture Compliance Audit (GDPR Adequacy Clearance)',
      'Enterprise Source Code Trade Secret Injunction Proceeding'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  },
  {
    id: 'team-julian-ross',
    slug: 'julian-ross',
    name: 'Julian Ross',
    designation: 'Senior Legal Researcher & Jurisprudential Fellow',
    department: 'Legal Research & Academics',
    role: 'Legal Researcher',
    qualifications: ['B.C.L. (Oxon, Dist.), B.A. Jurisprudence (Oxford, First Class)'],
    barEnrollment: 'Call to the Bar, Middle Temple (Passed with Certificate of Honour, 2023)',
    practiceAreas: ['Appellate & Constitutional Advocacy', 'International Arbitration & Dispute Resolution'],
    languages: ['English', 'Latin', 'German'],
    biography: 'Julian Ross coordinates Lex Global Advocacy’s research institute and appellate briefing division. Working in direct concert with King’s Counsel and Senior Advocates, Julian drafts judicial review skeleton arguments, constitutional submissions, and doctrinal treatises cited by Commonwealth appellate benches.',
    yearsOfExperience: 4,
    milestones: [
      'Oxford Vinerian Scholar Proxime Accessit',
      'Editor, Oxford University Commonwealth Law Journal',
      'Author of benchmark study on comparative administrative law'
    ],
    publications: [
      'Proportionality and Executive Discretion in Emergency Powers (Public Law, 2025)',
      'The Doctrine of Legitimate Expectation in Commonwealth Jurisdictions (Oxford Press, 2024)'
    ],
    email: 'j.ross@lexglobaladvocacy.com',
    officeLocation: 'Chambers: Oxford & London',
    imageUrl: '/src/assets/images/portrait_marcus_sterling_1793026077880.jpg', // safe fallback
    altText: 'Portrait of Julian Ross, Senior Legal Researcher',
    order: 6,
    isFeatured: false,
    isPublished: true,
    isArchived: false,
    notableCases: [
      'Briefing counsel on Judicial Review challenge before Court of Appeal',
      'Jurisdictional comparative analysis for Singapore High Court intervention'
    ],
    updatedAt: '2026-10-26T07:46:00Z',
  }
];

export const INITIAL_PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'pa-arbitration',
    slug: 'international-arbitration',
    title: 'International Arbitration & Dispute Resolution',
    subtitle: 'Cross-Border Tribunals, Bilateral Treaties & Enforcement',
    shortDescription: 'Representation before LCIA, ICC, SIAC, ICSID, and DIAC tribunals in complex sovereign and commercial disputes.',
    fullScope: [
      'Bilateral Investment Treaty (BIT) & Investor-State Arbitrations',
      'International Commercial Arbitration (ICC, LCIA, SIAC, UNCITRAL)',
      'Worldwide Freezing Injunctions (Mareva) & Asset Trace Actions',
      'Enforcement & Challenge of Awards under the New York Convention 1958',
      'Multi-Jurisdictional Conflict of Laws & Sovereign Immunity Advocacy'
    ],
    leadAdvocateNames: ['Dame Elena Vance KC', 'Tariq Al-Mansoor'],
    regulatoryBodies: ['LCIA', 'ICC Court of Arbitration', 'SIAC', 'ICSID'],
    iconName: 'Scale'
  },
  {
    id: 'pa-corporate',
    slug: 'corporate-cross-border-ma',
    title: 'Corporate & Cross-Border M&A',
    subtitle: 'Strategic Transactions, Private Equity & National Security Clearances',
    shortDescription: 'Structuring complex global mergers, joint ventures, sovereign investments, and foreign direct investment screenings.',
    fullScope: [
      'Cross-Border Mergers, Spin-Offs & Multi-Tier Share Purchase Agreements',
      'National Security & Foreign Investment Screenings (CFIUS, EU FDI, UK NSI)',
      'Private Equity & Sovereign Wealth Fund Capital Deployments',
      'Transnational Joint Ventures & Corporate Governance Charters',
      'Pre-Closing Regulatory Clearances & Antitrust Coordination'
    ],
    leadAdvocateNames: ['Amara Chen'],
    regulatoryBodies: ['SEC', 'CFIUS', 'UK Investment Security Unit', 'MAS'],
    iconName: 'Briefcase'
  },
  {
    id: 'pa-maritime',
    slug: 'maritime-admiralty-law',
    title: 'Maritime & Admiralty Chambers',
    subtitle: 'Vessel Arrests, Charterparties, Collision & Marine Insurance',
    shortDescription: 'Centuries of combined admiralty advocacy before the London High Court of Admiralty, LMAA, and global port authorities.',
    fullScope: [
      'Wet Shipping Litigation: Collisions, Groundings & Lloyd’s Open Form Salvage',
      'Dry Shipping & Charterparty Disputes (NYPE, Baltime, Gencon)',
      'Warrants of Arrest & Security Enforcement under 1952/1999 Conventions',
      'Marine Cargo Loss, Contamination & Bill of Lading Liabilities',
      'Hull & Machinery, P&I Club Recoveries and War Risk Adjudications'
    ],
    leadAdvocateNames: ['Marcus Sterling'],
    regulatoryBodies: ['High Court of Admiralty (London)', 'LMAA', 'SCMA', 'IMO'],
    iconName: 'Anchor'
  },
  {
    id: 'pa-tech-ip',
    slug: 'technology-ip-regulatory',
    title: 'Technology, IP & Global AI Governance',
    subtitle: 'Algorithmic Compliance, Patent Defense & Cross-Border Data Adequacy',
    shortDescription: 'Strategic guidance on global AI compliance frameworks, trade secrets, software patents, and digital antitrust scrutiny.',
    fullScope: [
      'Global AI Act Compliance & Algorithmic Liability Audits',
      'Cross-Border Data Transfer Frameworks (GDPR, UK GDPR, CCPA)',
      'High-Stakes Patent, Copyright & Trade Secret Litigation',
      'Cloud Architecture Privacy Certifications & Cyber Breach Defense',
      'Tech Consortium Licensing & FRAND Standard Essential Patent Charters'
    ],
    leadAdvocateNames: ['Dr. Sofia Hernandez'],
    regulatoryBodies: ['EDPB', 'USPTO', 'EPO', 'ICO UK'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'pa-appellate',
    slug: 'appellate-constitutional-advocacy',
    title: 'Appellate & Constitutional Advocacy',
    subtitle: 'High Court Writs, Judicial Reviews & Supreme Court Interventions',
    shortDescription: 'Doctrinal advocacy before national apex courts, constitutional benches, and international human rights tribunals.',
    fullScope: [
      'Judicial Review Appeals challenging Regulatory & Executive Determinations',
      'Constitutional Rights, Proportionality & Rule-of-Law Injunctions',
      'Amicus Curiae Submissions on Novel Questions of Public Law',
      'Extradition & Mutual Legal Assistance Treaty (MLAT) Proceedings',
      'Interventions before Commonwealth Supreme Courts and the ECHR'
    ],
    leadAdvocateNames: ['Dame Elena Vance KC', 'Julian Ross'],
    regulatoryBodies: ['UK Supreme Court', 'Privy Council', 'ECHR', 'Commonwealth Benches'],
    iconName: 'Scroll'
  },
  {
    id: 'pa-banking',
    slug: 'banking-finance-sovereign-debt',
    title: 'Banking, Finance & Sovereign Debt Restructuring',
    subtitle: 'Syndicated Lending, Project Bonds & Multilateral Workout Strategies',
    shortDescription: 'Advising institutional creditors, multilateral development banks, and emerging states on sovereign restructuring.',
    fullScope: [
      'Cross-Border Syndicated Facilities & Project Finance Securitization',
      'Sovereign Bond Restructuring under Collective Action Clauses (CACs)',
      'Trade Finance, Letters of Credit & Intercreditor Enforcement',
      'Financial Sanctions, OFAC/EU Restrictive Measures Compliance',
      'Insolvency & Special Situations Advisory in Parallel Jurisdictions'
    ],
    leadAdvocateNames: ['Amara Chen', 'Tariq Al-Mansoor'],
    regulatoryBodies: ['Bank of England (PRA)', 'Federal Reserve', 'IMF Panels', 'FINMA'],
    iconName: 'Landmark'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-arbitration-masterclass',
    slug: 'international-commercial-arbitration-masterclass',
    title: 'International Commercial Arbitration in Practice: From Clause to Award Enforcement',
    category: 'Dispute Resolution',
    level: 'Executive Masterclass',
    duration: '6 Weeks (Self-Paced / 12 CLE Credits)',
    instructorId: 'team-elena-vance',
    instructorName: 'Dame Elena Vance KC',
    instructorDesignation: 'Managing Partner & King’s Counsel',
    description: 'An authoritative, practitioner-focused curriculum dissecting the procedural life cycle of an international arbitration. Learn to draft bulletproof dispute resolution clauses, navigate emergency arbitrator applications, conduct witness cross-examinations, and enforce awards under the New York Convention across contested sovereign jurisdictions.',
    learningOutcomes: [
      'Draft tiered dispute resolution clauses that survive bifurcated challenge',
      'Assess emergency arbitrator jurisdiction and interim relief criteria under LCIA & ICC rules',
      'Structure evidentiary requests under IBA Rules on the Taking of Evidence',
      'Formulate cross-border asset execution strategies countering sovereign immunity pleas'
    ],
    cleCredits: 12,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Drafting Pathological vs. Resilient Dispute Resolution Clauses',
        duration: '1h 45m',
        summary: 'Examines seat selection, governing law of the arbitration agreement, institutional vs. ad hoc choices, and multi-tiered negotiation escalation ladders.',
        content: 'The arbitration agreement is the cornerstone of arbitral jurisdiction. Practitioners must rigorously distinguish between the substantive contract law and the lex arbitri governing the arbitration clause itself. In Sulamérica v. Enesa Engenharia, the English Court of Appeal reinforced that an express choice of law for the substantive contract is strong evidence of the parties’ intent, yet distinct jurisdiction principles govern separability under Section 7 of the Arbitration Act 1996...'
      },
      {
        id: 'mod-2',
        title: 'Module 2: Emergency Arbitrator Proceedings & Urgent Interim Relief',
        duration: '2h 10m',
        summary: 'Actionable protocols for urgent asset freezing, evidentiary preservation, and jurisdictional boundaries prior to tribunal constitution.',
        content: 'Emergency arbitrator mechanisms provide vital protection when waiting for a tribunal constitution would cause irreparable harm. Counsel must satisfy tests of urgent harm, prima facie case on the merits, and proportionality. Note that enforceability of emergency arbitrator orders varies significantly between jurisdictions like Singapore, London, and the United States...'
      },
      {
        id: 'mod-3',
        title: 'Module 3: The Evidentiary Protocol: Document Production under IBA Rules',
        duration: '2h 30m',
        summary: 'Managing Redfern schedules, privilege objections, and confidentiality in international commercial disputes.',
        content: 'The IBA Rules on the Taking of Evidence in International Arbitration provide a pragmatic bridge between common law discovery and civil law specificity. Article 3 requires precise categorization of requested documents, demonstrating relevance to the outcome and materiality...'
      },
      {
        id: 'mod-4',
        title: 'Module 4: Award Annulment & Enforcement under the New York Convention',
        duration: '2h 15m',
        summary: 'Navigating Article V grounds, public policy defenses, and execution against state-owned commercial instrumentalities.',
        content: 'Enforcement is where an arbitral victory becomes commercial reality. Under Article V(1)(e) and V(2)(b) of the 1958 New York Convention, resisting parties frequently plead breach of natural justice or violation of public policy. Counsel must anticipate these defenses early...'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Under the doctrine of separability, what is the legal consequence if the underlying commercial contract is alleged to be void for initial illegality?',
        options: [
          'The arbitration clause is automatically rendered void alongside the main contract.',
          'The arbitration clause survives independently unless the illegality directly impeaches the arbitration agreement itself.',
          'The matter must be transferred to the national court of the defendant domicile immediately.',
          'Arbitration proceedings can only proceed if both parties execute a supplemental submission protocol.'
        ],
        correctIndex: 1,
        explanation: 'The doctrine of separability (enshrined in UNCITRAL Model Law Art 16 and Section 7 of the UK Arbitration Act) dictates that the arbitration agreement remains valid and effective even if the matrix contract is alleged to be void, unless the dispute touches directly upon the creation of the arbitration agreement itself.'
      },
      {
        id: 'q2',
        question: 'Under Article V(2)(b) of the New York Convention 1958, an award may be refused enforcement if:',
        options: [
          'The tribunal misapplied a point of substantive domestic contract law.',
          'The costs awarded exceed standard judicial scales in the enforcing forum.',
          'Enforcement would be contrary to the international public policy of the country where enforcement is sought.',
          'The dissenting arbitrator filed a minority opinion criticizing the tribunal majority.'
        ],
        correctIndex: 2,
        explanation: 'Article V(2)(b) specifically preserves the enforcing forum’s sovereign right to refuse recognition or enforcement if it finds that doing so would violate the forum state’s core public policy.'
      }
    ]
  },
  {
    id: 'course-cross-border-ma',
    slug: 'cross-border-ma-regulatory-clearance',
    title: 'Cross-Border M&A, Foreign Investment Screens & National Security Approvals',
    category: 'Corporate Jurisprudence',
    level: 'Advanced',
    duration: '4 Weeks (8 CLE Credits)',
    instructorId: 'team-amara-chen',
    instructorName: 'Amara Chen',
    instructorDesignation: 'Associate Advocate & Partner, Corporate Practice',
    description: 'A deep-dive masterclass for transactional attorneys, corporate counsel, and investment officers navigating the tightened global regulatory landscape. Master CFIUS clearances, EU Foreign Subsidies Regulation (FSR), UK National Security & Investment Act (NSI), and cross-border merger structuring.',
    learningOutcomes: [
      'Navigate mandatory vs voluntary national security filing thresholds in US, UK, and EU jurisdictions',
      'Draft risk-allocating hell-or-high-water and regulatory effort covenants in purchase agreements',
      'Manage multi-jurisdictional gun-jumping risks prior to closing clearance',
      'Formulate divestiture and mitigation undertakings in sensitive tech & infrastructure deals'
    ],
    cleCredits: 8,
    modules: [
      {
        id: 'cma-1',
        title: 'Module 1: The New Geopolitics of M&A: CFIUS, NSI, and EU FDI Regimes',
        duration: '1h 30m',
        summary: 'Overview of statutory triggers for dual-use tech, critical infrastructure, and personal data assets.',
        content: 'Cross-border M&A can no longer be executed solely through private contractual covenants. The statutory expansion of national security screening regimes requires transactional lawyers to conduct mandatory regulatory triage at the term sheet stage...'
      },
      {
        id: 'cma-2',
        title: 'Module 2: Contractual Allocation of Regulatory Clearance Risk',
        duration: '2h 00m',
        summary: 'Reverse break fees, drop-dead dates, and ticking fees during protracted security reviews.',
        content: 'When regulatory clearances take anywhere from six to eighteen months, the purchase agreement must precisely balance closing certainty against buyer flexibility. Drafting clear "reasonable best efforts" definitions and structuring reverse break fees is critical...'
      }
    ],
    quiz: [
      {
        id: 'q-cma-1',
        question: 'What is the primary legal consequence of "gun-jumping" in cross-border antitrust and regulatory mergers?',
        options: [
          'Automatic invalidation of the board resolution approving the merger.',
          'Severe regulatory fines and possible unwinding orders for premature integration or coordination prior to clearance.',
          'Mandatory arbitration before the International Chamber of Commerce.',
          'Immediate criminal indictment of the independent directors.'
        ],
        correctIndex: 1,
        explanation: 'Gun-jumping laws in jurisdictions such as the US and EU prohibit parties from coordinating commercial conduct or exercising operational control before receiving regulatory clearance, subjecting violators to heavy financial penalties.'
      }
    ]
  },
  {
    id: 'course-ai-governance',
    slug: 'ai-governance-algorithmic-liability',
    title: 'AI Governance, Algorithmic Liability & Transnational Tech Regulation',
    category: 'Technology & Regulatory',
    level: 'Advanced',
    duration: '4 Weeks (8 CLE Credits)',
    instructorId: 'team-sofia-hernandez',
    instructorName: 'Dr. Sofia Hernandez',
    instructorDesignation: 'Legal Consultant, Head of Tech & IP Governance',
    description: 'An authoritative study of algorithmic accountability, the European AI Act risk tiers, generative AI copyright and training data fair use, liability under product safety directives, and cross-border data transfer compliance in enterprise computing.',
    learningOutcomes: [
      'Categorize AI systems into Prohibited, High-Risk, and General-Purpose tiers under the EU AI Act',
      'Draft enterprise AI vendor indemnity and warranties addressing synthetic output infringement',
      'Conduct algorithmic risk impact assessments for automated credit and employment scoring',
      'Defend corporate IP in model fine-tuning and proprietary data ingestion pipelines'
    ],
    cleCredits: 8,
    modules: [
      {
        id: 'ai-1',
        title: 'Module 1: Global AI Regulatory Architectures: EU AI Act vs. US Standards',
        duration: '2h 00m',
        summary: 'Statutory compliance obligations for foundation models and high-risk algorithmic deployments.',
        content: 'The global regulatory matrix for artificial intelligence is bifurcating between the prescriptive, risk-tiered approach of the European Union and the sector-specific enforcement model in the United States led by FTC unfair trade practices...'
      }
    ],
    quiz: [
      {
        id: 'q-ai-1',
        question: 'Under the EU AI Act, what classification is assigned to biometric identification systems used in publicly accessible spaces?',
        options: [
          'Minimal risk with voluntary self-assessment',
          'Strictly prohibited subject to narrow law-enforcement statutory exceptions',
          'Permitted with a standard software license notification',
          'Regulated solely under consumer product warranty directives'
        ],
        correctIndex: 1,
        explanation: 'Real-time remote biometric identification in publicly accessible spaces is classified as unacceptable risk and strictly prohibited under the EU AI Act, with very narrow and strictly judicially authorized law-enforcement exceptions.'
      }
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-emergency-arbitrators',
    slug: 'evolution-of-emergency-arbitrator-relief',
    title: 'The Evolution of Emergency Arbitrator Relief: Enforcement Trends Across New York Convention Jurisdictions',
    category: 'Arbitration Jurisprudence',
    excerpt: 'An analytical examination of recent appellate authorities in London, Singapore, and Paris on the transnational enforceability of emergency arbitrator awards prior to tribunal constitution.',
    content: [
      'In high-stakes commercial disputes, the period between the filing of a notice of arbitration and the formal constitution of the arbitral tribunal often poses existential exposure for the claimant. Assets may be dissipated, proprietary source code transferred offshore, or crucial infrastructure dismantled.',
      'To address this vulnerable window, major arbitral institutions—including the LCIA, ICC, SIAC, and SCC—introduced emergency arbitrator provisions allowing parties to seek urgent interim relief within days of filing.',
      'However, a doctrinal fault line has emerged regarding whether an order or "award" issued by an emergency arbitrator qualifies as an "arbitral award" enforceable under the 1958 New York Convention. Because emergency relief is inherently provisional and subject to modification by the eventual merits tribunal, critics argue it lacks the requisite finality.',
      'Recent statutory reforms in Singapore (under the International Arbitration Act) and Hong Kong have expressly codified the enforceability of emergency arbitrator orders with the same status as high court judgments. Meanwhile, in jurisdictions that have not enacted specific statutory recognition, counsel must carefully strategize whether to invoke the emergency arbitrator or proceed directly to state courts for a freezing order (Mareva injunction).',
      'Our chambers recommend an integrated approach: assessing the seat, the anticipated location of debtor assets, and reciprocal enforcement treaties before electing between institutional emergency arbitration and curial court interventions.'
    ],
    authorId: 'team-elena-vance',
    authorName: 'Dame Elena Vance KC',
    authorDesignation: 'Managing Partner & Principal Advocate',
    authorImageUrl: '/src/assets/images/portrait_elena_vance_1793026040571.jpg',
    publishedDate: 'October 14, 2026',
    readingTime: '6 min read',
    citations: [
      'Sulamérica Cia Nacional de Seguros S.A. v. Enesa Engenharia S.A. [2012] EWCA Civ 638',
      'PT Perusahaan Gas Negara v. CRW Joint Operation [2015] SGCA 30',
      'UNCITRAL Model Law on International Commercial Arbitration (Article 17H)'
    ]
  },
  {
    id: 'blog-cfius-screening',
    slug: 'cross-border-national-security-screening',
    title: 'Cross-Border National Security Screening: Navigating CFIUS and the EU FDI Framework in Strategic Tech Mergers',
    category: 'Corporate & M&A',
    excerpt: 'How multinational buyers and sovereign funds must structure covenants, reverse termination fees, and mitigation agreements under stringent investment screening scrutiny.',
    content: [
      'The era of friction-free cross-border capital deployment in critical technology and infrastructure has definitively drawn to a close. Over the past twenty-four months, regulatory scrutiny of inbound foreign investments has broadened from traditional defense acquisitions to artificial intelligence, semiconductor fabrication, synthetic biology, and bulk consumer telemetry.',
      'In the United States, the Committee on Foreign Investment in the United States (CFIUS) exercises non-notified transaction call-in powers with increasing frequency, reviewing completed deals years post-closing.',
      'Simultaneously, the European Union FDI Screening Framework and individual member state laws (such as the UK National Security and Investment Act) have established mandatory pre-closing clearance gates with severe criminal and civil penalties for closing prematurely.',
      'For transactional counsel, national security analysis must begin during preliminary target diligence. Term sheets must clearly allocate regulatory risks, defining whether the buyer is obligated to agree to board observer seats, facility carve-outs, or operational trust arrangements to secure clearance.'
    ],
    authorId: 'team-amara-chen',
    authorName: 'Amara Chen',
    authorDesignation: 'Associate Advocate & Partner, Corporate Practice',
    authorImageUrl: '/src/assets/images/portrait_amara_chen_1793026077073.jpg',
    publishedDate: 'September 28, 2026',
    readingTime: '8 min read',
    citations: [
      'Foreign Investment Risk Review Modernization Act of 2018 (FIRRMA), 50 U.S.C. § 4565',
      'Regulation (EU) 2019/452 of the European Parliament and of the Council',
      'UK National Security and Investment Act 2021 (c. 25)'
    ]
  },
  {
    id: 'blog-maritime-frustration',
    slug: 'force-majeure-maritime-supply-chains',
    title: 'Force Majeure and Frustration in Geopolitically Disrupted Maritime Supply Chains',
    category: 'Maritime & Admiralty',
    excerpt: 'Navigating safe port warranties, war risk premiums, and cargo detention under standard NYPE and Shelltime charterparties.',
    content: [
      'When geopolitical tensions escalate across strategic shipping chokepoints—such as the Red Sea, the Strait of Malacca, or the Black Sea—shipowners and charterers face immediate legal crises concerning voyage orders, vessel safety, and cargo diversion.',
      'Under standard charterparty terms such as NYPE 1993 or Baltime, the charterer is under an absolute obligation to nominate "safe ports". If a nominated port or transit corridor becomes dangerous due to hostilities, the owner is entitled to refuse to proceed.',
      'However, invoking the common law doctrine of frustration requires demonstrating that an unforeseen event has made performance radically different from that undertaken by the contract, not merely onerous or commercially disadvantageous.',
      'In this advisory note, we review how London maritime tribunals and the Commercial Court assess war risk insurance surcharges, Conwartime clauses, and the legal tests governing legitimate alternative route nominations.'
    ],
    authorId: 'team-marcus-sterling',
    authorName: 'Marcus Sterling',
    authorDesignation: 'Senior Advocate & Head of Admiralty Chambers',
    authorImageUrl: '/src/assets/images/portrait_marcus_sterling_1793026077880.jpg',
    publishedDate: 'September 08, 2026',
    readingTime: '7 min read',
    citations: [
      'The Evia (No. 2) [1983] 1 A.C. 736 (House of Lords on safe port warranties)',
      'The Polar [2024] UKSC 2 (General Average and War Risk Insurance clauses)',
      'BIMCO Conwartime 2013 / 2020 Standard Clauses'
    ]
  }
];

export const INITIAL_CLIENT_MATTERS: ClientMatter[] = [
  {
    id: 'matter-084',
    matterNumber: 'LEX-2026-ARB-084',
    title: 'Pacific Dredging Corp v. Republic of Mariana Port Authority',
    practiceArea: 'International Arbitration & Dispute Resolution',
    leadAdvocateName: 'Tariq Al-Mansoor',
    clientName: 'Pacific Dredging Corp (Consortium)',
    filingCourt: 'International Chamber of Commerce (ICC Paris)',
    status: 'Arbitration Hearing',
    nextFilingDeadline: 'November 15, 2026',
    summary: 'Advising lead EPC dredging contractor in $380M bilateral infrastructure dispute regarding port expansion dredging delays, site condition warranties, and state expropriation counters.',
    confidentialDocuments: [
      { title: 'Claimant Statement of Case & Memorial on Quantum.pdf', filingDate: '2026-09-12', size: '14.2 MB' },
      { title: 'ICC Procedural Order No. 4 (Hearing Schedule).pdf', filingDate: '2026-10-02', size: '2.1 MB' },
      { title: 'Independent Expert Hydraulic & Soil Dynamics Report.pdf', filingDate: '2026-10-18', size: '28.6 MB' }
    ]
  },
  {
    id: 'matter-112',
    matterNumber: 'LEX-2026-CORP-112',
    title: 'Meridian Energy Consortium Acquisition of Helios Wind Alpha',
    practiceArea: 'Corporate & Cross-Border M&A',
    leadAdvocateName: 'Amara Chen',
    clientName: 'Meridian Energy Global Fund',
    filingCourt: 'UK Investment Security Unit / EU Commission FDI Review',
    status: 'Regulatory Review',
    nextFilingDeadline: 'November 03, 2026',
    summary: 'Counsel to acquirer on £720M offshore wind facility transaction subject to cross-border national security assessment and competition review.',
    confidentialDocuments: [
      { title: 'Share Purchase Agreement (Execution Version).pdf', filingDate: '2026-08-30', size: '9.4 MB' },
      { title: 'UK NSI Act Schedule 1 Notification & Clearances.pdf', filingDate: '2026-09-24', size: '4.8 MB' },
      { title: 'Anti-Trust Remedies & Grid Access Undertakings.pdf', filingDate: '2026-10-15', size: '3.7 MB' }
    ]
  },
  {
    id: 'matter-039',
    matterNumber: 'LEX-2026-APP-039',
    title: 'Global Biologics Ltd v. Patent Registry of Appeal',
    practiceArea: 'Technology, IP & Regulatory',
    leadAdvocateName: 'Dr. Sofia Hernandez',
    clientName: 'Global Biologics Therapeutics',
    filingCourt: 'Court of Appeal (Civil Division) London',
    status: 'Judgment Reserved',
    nextFilingDeadline: 'December 01, 2026',
    summary: 'Representing multinational patent holder defending broad algorithmic antibody discovery claims against third-party prior art invalidation challenges.',
    confidentialDocuments: [
      { title: 'Appellate Skeleton Argument on Inventive Step.pdf', filingDate: '2026-09-10', size: '5.2 MB' },
      { title: 'Transcript of Oral Submissions Before Lord Justices.pdf', filingDate: '2026-10-12', size: '8.1 MB' }
    ]
  }
];
