import {
  Building2,
  Globe,
  Headphones,
  Layers,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Phone,
  PhoneCall,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  ThumbsUp,
  Users,
} from "lucide-react";

export type ServiceEntry = {
  category: string;
  title: string;
  icon: typeof Globe;
  description: string;
  features: string[];
};

export const SERVICE_CONTENT: Record<string, ServiceEntry> = {
  "web-designing": {
    category: "Website Services",
    title: "Web Designing",
    icon: MonitorSmartphone,
    description:
      "Clean, modern layouts built around your brand and your customers' path to enquiry — not just how a page looks, but how it converts.",
    features: [
      "Custom UI/UX, not a stock template",
      "Mobile-first, responsive on every device",
      "Fast-loading pages built for conversions",
      "Ongoing design support after launch",
    ],
  },
  "web-development": {
    category: "Website Services",
    title: "Web Development",
    icon: Globe,
    description:
      "Web development covers everything involved in building a site for real use — design, content, client-side and server-side scripting, and network security configuration.",
    features: [
      "Clean, maintainable code on modern frameworks",
      "Secure by default — HTTPS, hardened endpoints",
      "Built to scale as your traffic grows",
      "Integrations with payments, CRM and analytics",
    ],
  },
  "web-hosting": {
    category: "Website Services",
    title: "Web Hosting",
    icon: Server,
    description:
      "Fast, secure and monitored hosting with free SSL, daily backups and domain registration, so your site stays online while you focus on your business.",
    features: [
      "Free SSL certificates on every plan",
      "Daily automated backups",
      "24×7 uptime monitoring",
      "Domain registration and DNS management",
    ],
  },
  "software-development": {
    category: "Website Services",
    title: "Software Development",
    icon: Layers,
    description:
      "Custom software and internal tools built around how your team actually works, from first spec to production support.",
    features: [
      "Requirements mapped before a line of code is written",
      "Web, desktop and mobile builds",
      "API integrations with your existing tools",
      "Testing and QA before every release",
    ],
  },
  "ecommerce-website": {
    category: "Website Services",
    title: "E-Commerce Website",
    icon: ShoppingCart,
    description:
      "Online stores built to convert browsers into buyers — product catalogues, secure checkout and order management, all in one place.",
    features: [
      "Secure payment gateway integration",
      "Inventory and order management",
      "Mobile-optimised checkout flow",
      "SEO-ready product pages",
    ],
  },
  "digital-marketing": {
    category: "Digital Services",
    title: "Digital Marketing",
    icon: Megaphone,
    description:
      "Data-driven campaigns that put your brand in front of the right people — search, social, influencers and local presence, all measured against real business outcomes.",
    features: [
      "Strategy built around your actual goals",
      "Campaigns tracked against real metrics",
      "Multi-channel: search, social and local",
      "Monthly reporting, not just a dashboard link",
    ],
  },
  seo: {
    category: "Digital Services",
    title: "SEO",
    icon: Search,
    description:
      "Search engine optimisation focused on the keywords your customers actually search for, backed by technical fixes that help Google trust your site.",
    features: [
      "Keyword research tied to buyer intent",
      "On-page and technical SEO audits",
      "Content and link-building support",
      "Rank tracking and monthly reporting",
    ],
  },
  "social-media": {
    category: "Digital Services",
    title: "Social Media",
    icon: Users,
    description:
      "Consistent, on-brand presence across the platforms your customers use, from content calendars to community management.",
    features: [
      "Content calendars planned in advance",
      "Platform-specific creative and copy",
      "Paid social campaign management",
      "Engagement and community response",
    ],
  },
  "influencer-marketing": {
    category: "Digital Services",
    title: "Influencer Marketing",
    icon: Sparkles,
    description:
      "Partnerships with creators your audience already trusts, matched to your brand and measured on real engagement, not just follower counts.",
    features: [
      "Creator matching based on your audience",
      "Campaign briefs and content approval",
      "Performance tracking per partnership",
      "Micro and macro-influencer options",
    ],
  },
  "google-my-business": {
    category: "Digital Services",
    title: "Google My Business",
    icon: ThumbsUp,
    description:
      "A fully optimised local listing that shows up when nearby customers search — accurate info, photos, posts and review management.",
    features: [
      "Full profile setup and optimisation",
      "Regular posts and photo updates",
      "Review monitoring and responses",
      "Local search ranking improvements",
    ],
  },
  "brand-building": {
    category: "Digital Services",
    title: "Brand Building",
    icon: Building2,
    description:
      "A consistent identity across every touchpoint — messaging, visuals and tone — so your business is recognisable wherever customers find you.",
    features: [
      "Brand voice and messaging guidelines",
      "Visual identity applied across channels",
      "Consistency across web, social and print",
      "Positioning against your competitors",
    ],
  },
  "bulk-sms-services": {
    category: "SMS Services",
    title: "Bulk SMS Services",
    icon: MessageSquare,
    description:
      "Reach thousands of customers in seconds with high-delivery bulk SMS, backed by live reporting on every campaign you send.",
    features: [
      "High delivery-rate SMS gateway",
      "Transactional and promotional routes",
      "Live delivery reporting per campaign",
      "Sender ID and template approval support",
    ],
  },
  "whatsapp-marketing": {
    category: "SMS Services",
    title: "WhatsApp Marketing",
    icon: MessageSquare,
    description:
      "Official WhatsApp Business messaging for updates, offers and support, with templates approved and ready to send at scale.",
    features: [
      "Verified WhatsApp Business API access",
      "Approved message templates",
      "Broadcast lists and segmentation",
      "Two-way customer conversations",
    ],
  },
  "voice-call-services": {
    category: "SMS Services",
    title: "Voice Call Services",
    icon: PhoneCall,
    description:
      "Automated and bulk voice call campaigns for announcements, reminders and promotions, delivered directly to your customers' phones.",
    features: [
      "Bulk voice broadcast campaigns",
      "Pre-recorded or text-to-speech messages",
      "Call scheduling and reporting",
      "DND-compliant number filtering",
    ],
  },
  "ivr-services": {
    category: "SMS Services",
    title: "IVR Services",
    icon: Phone,
    description:
      "Interactive voice response systems that route calls, capture responses and qualify leads automatically, day or night.",
    features: [
      "Custom call-flow design",
      "Multi-level menu routing",
      "Lead capture and qualification",
      "Integration with your CRM",
    ],
  },
  "missed-call-services": {
    category: "SMS Services",
    title: "Missed Call Services",
    icon: Headphones,
    description:
      "A dedicated missed-call number for lead generation, verification or feedback, with every call logged and reported automatically.",
    features: [
      "Dedicated missed-call number",
      "Instant auto-reply SMS or call-back",
      "Real-time call logging and reports",
      "Use for leads, OTP or feedback",
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_CONTENT);
