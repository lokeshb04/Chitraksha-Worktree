/* =========================================================================
   CHITRAKSH — SITE DATA & CONFIGURATION
   -------------------------------------------------------------------------
   Edit THIS FILE to update club content. The rest of the site reads from
   window.SITE_DATA. Search for the headings below (e.g. "UPCOMING EVENTS").
   ========================================================================= */

window.SITE_DATA = {

  /* ---------------------------------------------------------------------
     CLUB INFORMATION
     Navbar, footer, About, SEO, and contact areas.
  --------------------------------------------------------------------- */
  club: {
    name: "Team Chitraksh",
    subtitle: "Official Media Cell Of SGGSIE&T",
    college: "Shri Guru Gobind Singhji Institute of Engineering and Technology",
    collegeShort: "SGGSIE&T",
    tagline: "Capturing moments, creating memories, and celebrating the art of photography.",
    about: "Team Chitraksh is the official photography and media cell of SGGSIE&T. We document campus life, cover college events, and create photographs, films, and social content that represent the institute.",
    email: "media@sggs.ac.in",
    phone: "+91 6376343015",
    address: "Guru Tegh Bahadurji Marg, Vishnupuri, Maharashtra 431606",
    instagram: "https://www.instagram.com/teamchitraksha/",
    youtube: "https://www.youtube.com/@Teamchitraksha"
  },

  /* ---------------------------------------------------------------------
     GLOBAL SETTINGS  —  animations, sound, team display, gallery
     Change these flags instead of hunting through CSS/JS.
  --------------------------------------------------------------------- */
  settings: {
    /* Visual effects */
    enableAnimations: true,               // scroll fade-in, hover motion, hero intro
    enableParallax: true,                 // subtle hero background shift on scroll
    enableGalleryAutoplay: true,          // infinite gallery auto-scroll
    enableSurrealLiquidDistortion: false,  // WebGL fluid displacement on gallery hover
    effectIntensity: 1,                   // 0–1 (hover zoom / motion amount)
    transitionSpeedMs: 1000,              // scroll-reveal duration

    /* Sound — never autoplays. User must turn sound ON with the navbar control. */
    enableSoundFeature: false,            // set false to hide the sound toggle entirely
    soundDefaultOn: true,                 // default is OFF; preference is stored in localStorage
    sounds: {
      ambient: "assets/sounds/dark-ambient-pad.mp3", // continuous ethereal background track
      click: "assets/sounds/click.mp3",
      hover: "assets/sounds/hover.mp3",
      navigate: "assets/sounds/navigate.mp3"
    },

    /* Gallery */
    gallerySpeed: 55,                     // seconds for one full infinite-gallery loop

    /* Team: groups shown on the homepage. All other groups appear under More Info. */
    homeTeamGroups: ["Club Leadership"],
    showMemberSocialLinks: true,

    /* Former office bearers (secondary page) */
    formerMembersInitialLimit: 6
  },

  /* ---------------------------------------------------------------------
     GOOGLE FORM  —  Query & Suggestions
     Paste your published Google Form URL below.
     embedUrl: use the "Send → <> Embed" iframe src from Google Forms.
     url: the public viewform link (used as a fallback / "Open form" button).
  --------------------------------------------------------------------- */
  googleForm: {
    url: "",          /* e.g. "https://docs.google.com/forms/d/e/XXXX/viewform" */
    embedUrl: "",     /* e.g. "https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true" */
    collegeEmailDomain: "sggs.ac.in",
    notice: "Please submit this form using your official @sggs.ac.in college email ID."
  },

  /* ---------------------------------------------------------------------
     HERO SECTION
     logo     = Team Chitraksh mark (kept separate from the heading)
     background = cinematic photograph behind the overlay
  --------------------------------------------------------------------- */
  hero: {
    eyebrow: "Official Media Cell · SGGSIE&T",
    title: "Team Chitraksh",
    tagline: "Capturing moments, creating memories, and celebrating the art of photography.",
    ctaLabel: "Explore Our Work",
    ctaTarget: "#gallery",
    logo: "assets/images/hero/Logo.jpeg",
    background: "assets/images/hero/admin-sggs.webp?v=2",
  },

  /* ---------------------------------------------------------------------
     EVENTS DRIVE LINKS
     Add a new object to this array for each event folder.
     driveLink must be a full Google Drive URL. additionalLinks is optional.
  --------------------------------------------------------------------- */
  eventsDriveLinks: [
    {
      title: "Ganesh Utsav",
      date: "September 2026",
      description: "Festival coverage documenting the immersion procession and celebrations across campus.",
      image: "assets/images/events/ganesh-utsav.jpg",
      driveLink: "",
      additionalLinks: []
      /* additionalLinks example:
         [{ label: "Highlights reel", url: "https://..." }]
      */
    },
    {
      title: "Diwali Celebration",
      date: "October 2026",
      description: "Long-exposure diya and firework photography from the college Diwali night.",
      image: "assets/images/events/diwali-celebration.jpg",
      driveLink: "",
      additionalLinks: []
    },
    {
      title: "Independence Day",
      date: "August 2026",
      description: "Flag hoisting ceremony and cultural programme captured by the Chitraksh team.",
      image: "assets/images/events/independence-day.jpg",
      driveLink: "",
      additionalLinks: []
    }
  ],

  /* ---------------------------------------------------------------------
     UPCOMING EVENTS
     Leave this array empty to show the empty state.
     Copy the commented example, uncomment, and fill in real details.
     Do not publish invented events.
  --------------------------------------------------------------------- */
  upcomingEvents: [
    /*
    {
      title: "Event name",
      date: "12 October 2026",
      time: "5:00 PM",
      venue: "Main Auditorium",
      organizer: "Team Chitraksh",
      description: "One or two sentences about the event.",
      registrationLink: "https://",
      detailsLink: "",
      additionalInfo: ""
    }
    */
  ],

  /* ---------------------------------------------------------------------
     INFINITE PHOTO GALLERY
     Paths must match filenames exactly (Linux/GitHub Pages are case-sensitive).
  --------------------------------------------------------------------- */
  gallery: [
    { image: "assets/images/gallery/DSC_6367.JPG", title: "Night Portrait", category: "Portrait", alt: "Team Chitraksh members photographed at night in club media crew attire" },
    { image: "assets/images/gallery/DSC_5981.JPG", title: "The Crew", category: "Team", alt: "Team Chitraksh members posing with cameras in the auditorium" },
    { image: "assets/images/gallery/DSC_5983.JPG", title: "Faces of Campus", category: "Portrait", alt: "Candid campus portrait by Team Chitraksh" },
    { image: "assets/images/gallery/DSC_6005.JPG", title: "On Assignment", category: "Candid", alt: "Candid photography from a campus assignment" },
    { image: "assets/images/gallery/DSC_6012.JPG", title: "Campus Frame", category: "Campus", alt: "Campus frame photographed by Team Chitraksh" },
    { image: "assets/images/gallery/DSC_6286.JPG", title: "In Session", category: "Events", alt: "Event coverage photograph by Team Chitraksh" },
    { image: "assets/images/gallery/photo-05.jpg", title: "Wild Green", category: "Nature", alt: "Forest canopy from above" },
    { image: "assets/images/gallery/photo-06.jpg", title: "Concrete Lines", category: "Architecture", alt: "Architectural lines and geometry" },
    { image: "assets/images/gallery/photo-07.jpg", title: "Candid Moment", category: "Candid", alt: "Candid unposed moment" },
    { image: "assets/images/gallery/photo-08.jpg", title: "After Dark", category: "Night", alt: "Night sky photography" },
    { image: "assets/images/gallery/photo-09.jpg", title: "In Monochrome", category: "Black & White", alt: "Monochrome composition" },
    { image: "assets/images/gallery/photo-10.jpg", title: "Festival Colours", category: "Events", alt: "Festival celebration photography" },
    { image: "assets/images/gallery/photo-11.jpg", title: "Wild Encounter", category: "Nature", alt: "Wildlife photography" },
    { image: "assets/images/gallery/photo-12.jpg", title: "Up Close", category: "Macro", alt: "Macro photography detail" },
    { image: "assets/images/gallery/photo-13.jpg", title: "Wide Open", category: "Landscape", alt: "Wide landscape vista" },
    { image: "assets/images/gallery/photo-14.jpg", title: "The Gathering", category: "Events", alt: "Event crowd photography" }
  ],

  /* ---------------------------------------------------------------------
     ACHIEVEMENTS & AWARDS  (secondary — opened from the ⋯ More menu)
     PLACEHOLDER: replace titles/orgs/images with real club awards.
     Do not leave invented awards on a public launch without checking.
  --------------------------------------------------------------------- */
  achievements: [
    {
      year: "2026",
      title: "Best Photography Club",
      organization: "State University Competition",
      image: "assets/images/achievements/best-club.jpg",
      description: "Recognized for outstanding photography and event documentation across the academic year."
    },
    {
      year: "2025",
      title: "National Photography Award",
      organization: "India Photography Association",
      image: "assets/images/achievements/national-award.jpg",
      description: "Awarded for a portfolio submission representing the college at the national level."
    },
    {
      year: "2025",
      title: "Inter-College Competition Winner",
      organization: "Regional Photography Fest",
      image: "assets/images/achievements/inter-college.jpg",
      description: "First place among 24 participating colleges in the regional photography fest."
    }
  ],

  /* ---------------------------------------------------------------------
     LEADERSHIP & TEAM
     "group" controls hierarchy and filters. Use consistent names:
       "Institute Leadership" | "Faculty" | "Club Leadership" |
       "Team Heads" | "Core Team" | "Volunteers"
     Groups listed in settings.homeTeamGroups appear on the homepage.
     Everyone else appears after clicking More Info.
     PLACEHOLDER names (e.g. "President Name") should be replaced.
  --------------------------------------------------------------------- */
  leadership: [
    {
      id: 1,
      name: "Director Name",
      position: "Institute Director",
      group: "Institute Leadership",
      image: "assets/images/members/director.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 1
    },
    {
      id: 2,
      name: "Faculty Coordinator Name",
      position: "Faculty Coordinator",
      group: "Faculty",
      image: "assets/images/members/faculty-coordinator.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 1
    },
    {
      id: 3,
      name: "Faculty Co-Coordinator Name",
      position: "Faculty Co-Coordinator",
      group: "Faculty",
      image: "assets/images/members/faculty-co-coordinator.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 2
    },
    {
      id: 4,
      name: "President Name",
      position: "Club President",
      group: "Club Leadership",
      image: "assets/images/members/president.jpg",
      description: "",
      instagram: "https://instagram.com/", linkedin: "", email: "",
      order: 1
    },
    {
      id: 5,
      name: "Vice President Name",
      position: "Vice President",
      group: "Club Leadership",
      image: "assets/images/members/vice-president.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 2
    },
    {
      id: 6,
      name: "Secretary Name",
      position: "Secretary",
      group: "Club Leadership",
      image: "assets/images/members/secretary.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 3
    },
    {
      id: 7,
      name: "Joint Secretary Name",
      position: "Joint Secretary",
      group: "Club Leadership",
      image: "assets/images/members/joint-secretary.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 4
    },
    {
      id: 8,
      name: "Treasurer Name",
      position: "Treasurer",
      group: "Club Leadership",
      image: "assets/images/members/treasurer.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 5
    },
    {
      id: 9,
      name: "Photography Head Name",
      position: "Photography Head",
      group: "Team Heads",
      image: "assets/images/members/photography-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 1
    },
    {
      id: 10,
      name: "Photography Co-Head Name",
      position: "Photography Co-Head",
      group: "Team Heads",
      image: "assets/images/members/photography-co-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 2
    },
    {
      id: 11,
      name: "Videography Head Name",
      position: "Videography Head",
      group: "Team Heads",
      image: "assets/images/members/videography-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 3
    },
    {
      id: 12,
      name: "Editing Head Name",
      position: "Editing Head",
      group: "Team Heads",
      image: "assets/images/members/editing-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 4
    },
    {
      id: 13,
      name: "Social Media Head Name",
      position: "Social Media Head",
      group: "Team Heads",
      image: "assets/images/members/social-media-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 5
    },
    {
      id: 14,
      name: "Design Head Name",
      position: "Design Head",
      group: "Team Heads",
      image: "assets/images/members/design-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 6
    },
    {
      id: 15,
      name: "Technical Head Name",
      position: "Technical Head",
      group: "Team Heads",
      image: "assets/images/members/technical-head.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 7
    },
    {
      id: 16,
      name: "Event Coordinator Name",
      position: "Event Coordinator",
      group: "Team Heads",
      image: "assets/images/members/event-coordinator.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 8
    },
    {
      id: 17,
      name: "Core Member Name",
      position: "Core Team Member",
      group: "Core Team",
      image: "assets/images/members/core-member-1.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 1
    },
    {
      id: 18,
      name: "Core Member Name",
      position: "Core Team Member",
      group: "Core Team",
      image: "assets/images/members/core-member-2.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 2
    },
    {
      id: 19,
      name: "Core Member Name",
      position: "Core Team Member",
      group: "Core Team",
      image: "assets/images/members/core-member-3.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 3
    },
    {
      id: 20,
      name: "Volunteer Name",
      position: "Volunteer",
      group: "Volunteers",
      image: "assets/images/members/volunteer-1.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 1
    },
    {
      id: 21,
      name: "Volunteer Name",
      position: "Volunteer",
      group: "Volunteers",
      image: "assets/images/members/volunteer-2.jpg",
      description: "",
      instagram: "", linkedin: "", email: "",
      order: 2
    }
  ],

  /* ---------------------------------------------------------------------
     FORMER OFFICE BEARERS  (secondary — opened from the ⋯ More menu)
     PLACEHOLDER names should be replaced with real former bearers.
  --------------------------------------------------------------------- */
  formerMembers: [
    { id: 1, name: "Former Member Name", position: "President", tenure: "2024–25", batch: "B.Tech 2025", image: "assets/images/former-members/former-1.jpg", instagram: "", linkedin: "" },
    { id: 2, name: "Former Member Name", position: "Vice President", tenure: "2024–25", batch: "B.Tech 2025", image: "assets/images/former-members/former-2.jpg", instagram: "", linkedin: "" },
    { id: 3, name: "Former Member Name", position: "Secretary", tenure: "2023–24", batch: "B.Tech 2024", image: "assets/images/former-members/former-3.jpg", instagram: "", linkedin: "" },
    { id: 4, name: "Former Member Name", position: "Photography Head", tenure: "2023–24", batch: "B.Tech 2024", image: "assets/images/former-members/former-4.jpg", instagram: "", linkedin: "" },
    { id: 5, name: "Former Member Name", position: "President", tenure: "2022–23", batch: "B.Tech 2023", image: "assets/images/former-members/former-5.jpg", instagram: "", linkedin: "" },
    { id: 6, name: "Former Member Name", position: "Treasurer", tenure: "2022–23", batch: "B.Tech 2023", image: "assets/images/former-members/former-6.jpg", instagram: "", linkedin: "" },
    { id: 7, name: "Former Member Name", position: "Team Head", tenure: "2021–22", batch: "B.Tech 2022", image: "assets/images/former-members/former-7.jpg", instagram: "", linkedin: "" },
    { id: 8, name: "Former Member Name", position: "Vice President", tenure: "2021–22", batch: "B.Tech 2022", image: "assets/images/former-members/former-8.jpg", instagram: "", linkedin: "" }
  ],

  /* ---------------------------------------------------------------------
     YOUTUBE VIDEOS
  --------------------------------------------------------------------- */
  videos: [
    { title: "The Bottle", thumbnail: "assets/images/social/workshop.jpg", url: "https://www.youtube.com/watch?v=IaEZrmL8chI&t=6s" },
    { title: "Alumni Meet", thumbnail: "assets/images/social/event-coverage.jpg", url: "https://www.youtube.com/watch?v=WdegYuER80E&t=116s" },
    { title: "Annual Photography Exhibition", thumbnail: "assets/images/social/exhibition.jpg", url: "https://youtube.com/" }
  ],

  /* ---------------------------------------------------------------------
     INSTAGRAM REELS
  --------------------------------------------------------------------- */
  reels: [
    { title: "Event Highlights", image: "assets/images/social/reel-01.jpg", url: "https://www.instagram.com/p/DV2p-YdDIV5/" },
    { title: "Event Highlights", image: "assets/images/social/reel-02.jpg", url: "https://www.instagram.com/reel/DV-_VkND2Dz/" },
    { title: "Event Highlights", image: "assets/images/social/reel-03.jpg", url: "https://www.instagram.com/reel/DVDFODmCARt/" },
    { title: "Event Highlights", image: "assets/images/social/reel-04.jpg", url: "https://www.instagram.com/reel/DU8kQOoD3cJ/" }
  ]

};

