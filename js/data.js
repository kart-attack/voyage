// All facts come from content-brief.md (Karthika's Feb 2026 resume). Don't add numbers that aren't there.
window.VOYAGE = {
  stops: [
    {
      org: "TCE Madurai · Anna University", short: "TCE", mono: "T", color: "#D9824B",
      role: "Bachelor of Architecture", years: "2005 – 2010",
      title: "Where it started",
      line: "Five years learning how spaces make people feel, and how to draw before I could brand.",
      label: "Along the way",
      facts: [["B.Arch", "Architecture, Anna University"], ["Gen. Sec.", "Culturals, TCE"]],
      x: 195, y: 475
    },
    {
      org: "IDC, IIT Bombay", short: "IDC", mono: "I", color: "#4D8BEF",
      role: "Master of Design, Product Design", years: "2011 – 2013",
      title: "The pivot",
      line: "Swapped buildings for products, and for the people who use them.",
      label: "Along the way",
      facts: [["M.Des", "Product Design"], ["Role", "Placement Coordinator"]],
      x: 300, y: 255
    },
    {
      org: "Housing.com", short: "Housing", mono: "H", color: "#7A5AF8",
      role: "Marketing Designer", years: "Aug '13 – Apr '14",
      title: "The first brand book",
      line: "Wrote the brand's tone and style guidelines, and shipped the marketing that followed.",
      label: "What I did",
      facts: [["Tone", "Brand tone and style guidelines"], ["Assets", "Marketing collateral"]],
      x: 470, y: 440
    },
    {
      org: "Grabhouse", short: "Grabhouse", mono: "G", color: "#F19EC8",
      role: "Senior Marketing Designer", years: "Nov '14 – Jul '16",
      title: "The Daily Addicts",
      line: "Identity and content strategy for the blog, and a crew built from the ground up.",
      label: "The numbers",
      facts: [["230%", "traffic growth in 6 months"], ["3M+", "monthly active users"], ["12+", "member creative team, from zero"]],
      caseId: "grabhouse", x: 610, y: 215
    },
    {
      org: "Swiggy", short: "Swiggy", mono: "S", color: "#FC8019",
      role: "Creative Head", years: "Feb '17 – Jan '19",
      title: "100 cities, one voice",
      line: "Scaled the creative footprint as Swiggy went from 7 cities to 100+.",
      label: "The numbers",
      facts: [["7 → 100+", "cities covered"], ["3 → 18+", "people in the creative team"], ["165%", "customer-base growth in 10 months"]],
      caseId: "swiggy", x: 750, y: 480
    },
    {
      org: "ZestMoney", short: "ZestMoney", mono: "Z", color: "#027B49",
      role: "Creative Head", years: "Apr '19 – Oct '19",
      title: "The quick sprint",
      line: "A short, sharp stint setting the fintech brand's guidelines and collateral.",
      label: "What I did",
      facts: [["Guide", "Brand guidelines"], ["Assets", "Marketing collateral"]],
      x: 875, y: 270
    },
    {
      org: "3M India", short: "3M", mono: "3M", color: "#FA4D43",
      role: "Section Chief, Lead Designer", years: "Nov '19 – Sep '23",
      title: "Design Meets Design",
      line: "B2B design and strategy across Rail, Automotive, Fleet and Home Care, spanning three continents.",
      label: "The numbers",
      facts: [["$1.5M", "revenue in a few months, 3M Rail"], ["Gold ×2", "Sustainability awards, 2021 & 2022"], ["2023", "EHS Sustainability Achievement award"]],
      caseId: "3m", x: 1000, y: 440
    },
    {
      org: "Masai School", short: "Masai", mono: "M", color: "#1B2340",
      role: "Director of Creative", years: "Jul '24 – Now",
      title: "Captain of the crew",
      line: "Leading Grand Line Creative, the in-house studio, and reporting directly to the CEO.",
      label: "The numbers",
      facts: [["1100+", "creatives delivered"], ["83%", "faster turnaround with GenAI"], ["50+", "partnership programme pages"]],
      caseId: "masai", x: 1085, y: 190
    }
  ],

  cases: {
    masai: {
      num: "01", title: "The 83% shortcut", org: "Masai School", role: "Director of Creative", years: "Jul 2024 – Now",
      color: "#1B2340", accent: "#FBB833", metric: "83%", metricLabel: "faster turnaround",
      intro: "Core leadership stakeholder across product and marketing design, running a 10-person studio and owning the brand end to end.",
      numbers: [["1100+", "creatives delivered to date"], ["83%", "cut in turnaround with GenAI workflows"], ["50+", "partnership programme pages"], ["4+", "in-house B2B and B2C products branded"]],
      did: ["Set up and named Grand Line Creative, the in-house studio", "Built brand collateral for 4+ in-house products", "Led GenAI-driven workflow initiatives across the crew", "Owned the brand from identity to long-term brand value"]
    },
    "3m": {
      num: "02", title: "Design Meets Design", org: "3M India", role: "Section Chief, Lead Designer", years: "Nov 2019 – Sep 2023",
      color: "#FA4D43", accent: "#FFFFFF", metric: "$1.5M", metricLabel: "revenue in months",
      intro: "Led design and strategy for B2B engagements across Rail, Automotive, Fleet and Home Care, spanning Asia, Europe and South America.",
      numbers: [["$1.5M", "revenue in a few months, via 'Design Meets Design' for 3M Rail"], ["Gold", "Sustainability awards, 2021 and 2022"], ["2023", "EHS|PS Sustainability Achievement award"]],
      did: ["Created the 'Design Meets Design' programme for 3M Rail", "Designed the 3M India experience center", "Founded the 'Design for Sustainability' initiative", "Global Design Culture Team, Country Lead"]
    },
    swiggy: {
      num: "03", title: "100 cities, one voice", org: "Swiggy", role: "Creative Head", years: "Feb 2017 – Jan 2019",
      color: "#FC8019", accent: "#1B2340", metric: "100+", metricLabel: "cities, from 7",
      intro: "Scaled the creative footprint as the food delivery brand grew from 7 cities to more than 100.",
      numbers: [["7 → 100+", "cities"], ["3 → 18+", "creative team across design, content, animation, video, photo"], ["5000+", "assets delivered in 2 years"], ["165%", "customer-base growth in 10 months"], ["75%", "fewer redundancies through workflow fixes"]],
      did: ["Built the creative team from 3 to 18+", "Set up workflows that cut redundancies by 75%", "Kept one brand voice across 100+ cities"]
    },
    grabhouse: {
      num: "04", title: "The Daily Addicts", org: "Grabhouse", role: "Senior Marketing Designer", years: "Nov 2014 – Jul 2016",
      color: "#027B49", accent: "#F19EC8", metric: "230%", metricLabel: "traffic in 6 months",
      intro: "Led identity design and content strategy for the blog 'Daily Addicts' (formerly Urban Cocktail), and built the creative team from the ground up.",
      numbers: [["230%", "traffic growth in 6 months"], ["3M+", "monthly active users"], ["12+", "member multidisciplinary team, from zero"]],
      did: ["Built a 12+ member creative team from scratch", "Directed a core team of 5 across print and digital", "Identity and content strategy for Daily Addicts"]
    }
  },

  tools: [
    { name: "Illustrator", mono: "Ai", bg: "#330000", fg: "#FF9A00", use: "Identities, icons and illustration" },
    { name: "Photoshop", mono: "Ps", bg: "#001E36", fg: "#31A8FF", use: "Key visuals and campaign comps" },
    { name: "InDesign", mono: "Id", bg: "#49021F", fg: "#FF3366", use: "Brand books and print" },
    { name: "Premiere Pro", mono: "Pr", bg: "#00005B", fg: "#9999FF", use: "Edits, reels and brand films" },
    { name: "Figma", mono: "Fg", bg: "#1E1E1E", fg: "#A259FF", use: "Pages and product UI, with the crew" },
    { name: "Canva", mono: "Cv", bg: "#00C4CC", fg: "#FFFFFF", use: "Templates the whole company can use" },
    { name: "Make.com", mono: "Mk", bg: "#6D00CC", fg: "#FFFFFF", use: "Automated creative pipelines" },
    { name: "Zapier", mono: "Zp", bg: "#FF4F00", fg: "#FFFFFF", use: "Glue between briefs, tools and teams" },
    { name: "Higgsfield", mono: "Hf", bg: "#0B0B0B", fg: "#D7FF3A", use: "AI image and video generation" },
    { name: "Freepik", mono: "Fp", bg: "#0E5CFF", fg: "#FFFFFF", use: "AI assets and stock, fast" }
  ]
};
