"use client";

"use client";

import toast from "react-hot-toast";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import * as PREVIEWS from "../../PreviewLayouts";
import "../../../print.css";

const NEON_INPUT =
  "focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:ring-offset-0 transition-shadow transition-colors";

/**
 * Canonical resume schema shared by all templates
 */
const emptyResume = {
  fullName: "",
  role: "",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  photoUrl: "",
  skills: [],
  experience: [], // { id, title, company, duration, description, bullets[] }
  projects: [], // { id, title, link, description, bullets[] }
  education: [], // { id, degree, school, year }
  customSections: [], // { id, heading, type, content }
};

/**
 * Visible editor section rules per template
 */
const TEMPLATE_SECTIONS = {
  CreativeArtistic: {
    contact: false,
    projects: true,
    experience: true,
    skills: true,
    education: false,
  },

  CreativePortfolio: {
    contact: true,
    projects: true,
    experience: true,
    skills: true,
    education: false,
  },

  CreativeColorBurst: {
    contact: true,
    projects: false,
    experience: true,
    skills: true,
    education: true,
    photo: false, // 🚫 hide photo uploader!
  },

  CreativeGrid: {
    contact: true,
    projects: true,
    experience: true,
    skills: true,
    education: true,
    tools: true, // NEW
    photo: false, // Prevent photo field
  },

  CreativeModern: {
    contact: true,
    skills: true,
    education: true,
    experience: true,
    projects: true,
    summary: true,
    customSections: true,
    photo: false,
  },

  CreativeElegant: {
    contact: true,
    projects: false,
    experience: true,
    skills: true,
    education: true,
    photo: false,
  },

  CreativeVisual: {
    basic: true,
    contact: true, // includes phone, email, linkedin, github, portfolio
    experience: true,
    education: true,
    skills: true,
    customSections: true,
    tools: false,
    photo: true,
    summary: false,
  },

  CreativeBold: {
    contact: true,
    projects: true,
    experience: true,
    skills: true,
    education: true,
    tools: false, // no tools section in this template
    photo: false,
  },

  ProfessionalClassic: {
    fullName: true,
    role: true,

    // CONTACT fields enabled
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Sections enabled
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    customSections: true,

    // Sections NOT used by this template
    photo: false,
    tools: false,
  },

  ProfessionalElegant: {
    contact: true,
    projects: true,
    experience: true,
    skills: true,
    education: true,

    // NEW flags so your config.* works
    certifications: true,
    languages: true,

    // things this template does NOT use
    tools: false,
    photo: false, // so profile photo field disappears
  },

  ProfessionalMinimalist: {
    // left/right sections that should appear in the editor
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,

    // NEW: only ProfessionalMinimalist has Languages
    languages: true,

    // things this template does NOT use
    certifications: false,
    tools: false,
    photo: false,
  },

  ProfessionalModern: {
    photo: false,
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    languages: false,
    certifications: false,
    tools: false,
    customSections: true,
  },

  ProfessionalCorporate: {
    skills: true,
    contact: true,
    certifications: true,
    experience: true,
    education: true,
    projects: true,
    customSections: true,

    // Disabled features
    languages: false,
    tools: false,
    photo: false,
  },

  ProfessionalCreative: {
    skills: true,
    languages: true,
    certifications: true,
    customSections: true,
    photo: false,
    experience: true,
    education: true,
    projects: true,
    contact: true,
  },

  ProfessionalCompact: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,

    // Contact fields
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // Disabled fields for this template
    photo: false,
    languages: false,
    certifications: false,
    profile: false,
    tools: false,
    customSections: false,
  },

  // inside templateConfigs.professional
  ProfessionalPremium: {
    // BASIC
    photo: false,
    profile: false,

    // SECTIONS
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,

    // EXTRA ARRAYS
    certifications: true, // shown as "Certifications & Achievements"
    achievements: true, // merged with certifications in the template
    languages: false,
    tools: false,

    // ALWAYS keep custom sections enabled
    customSections: true,
  },

  // add this to your page.js templates config
  ModernClean: {
    // core sections visible in editor & preview
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,

    // Contact fields (make these available in editor)
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true, // location/address

    // Template-specific toggles
    photo: false, // no profile photo in this template
    languages: false, // languages not shown by default
    certifications: false, // certifications not shown by default
    profile: false, // "profile" (left-side bio) disabled
    tools: false, // tools section disabled by default

    // allow custom sections (user can add arbitrary extra sections)
    customSections: true,
  },

  ModernBold: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,

    // All contact fields enabled
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // Not used in this template
    photo: false,
    languages: false,
    certifications: false,
    tools: false,
    profile: false,

    // Allow user-added sections
    customSections: true,
  },

  ModernSlidebar: {
    // ENABLED sections
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    languages: true, // MUST BE TRUE for languages to appear
    contact: true,
    customSections: true,

    // Contact fields
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // DISABLED — these MUST be false
    photo: false, // TURN THIS OFF → removes profile photo
    tools: false,
    certifications: false,
    profile: false,
  },

  ModernElegant: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    customSections: true,
    contact: true,

    // Contact fields
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // Disabled fields
    photo: false,
    tools: false,
    languages: false,
    profile: false,
  },

  ModernTech: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,
    customSections: true,

    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    photo: false,
    languages: false,
    certifications: false,
    tools: false,
    profile: false,
  },

  ModernMinimalist: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    contact: true,
    projects: true,
    customSections: true,

    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    photo: false,
    languages: false,
    profile: false,
    tools: false,
    certifications: false,
  },

  ModernCreative: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    languages: true,
    contact: true,
    customSections: true,

    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    photo: false,
    tools: false,
    certifications: false,
    profile: false,
  },

  ModernProfessional: {
    // ENABLED SECTIONS
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,
    customSections: true,

    // Contact fields
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // DISABLED (Not used in this template)
    photo: false,
    tools: false,
    certifications: false,
    languages: false,
    profile: false,
  },

  MinimalistClassic: {
    // BASIC HEADER FIELDS
    fullName: true,
    role: true,

    // CONTACT FIELDS (this template uses only these 3)
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // CORE SECTIONS
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false, // ❌ this template does NOT have a projects section
    languages: false, // ❌ not included in this template
    certifications: false, // ❌ not included
    tools: false, // ❌ not included
    photo: false, // ❌ this template has NO profile photo

    // CUSTOM SECTIONS (MUST ALWAYS BE TRUE)
    customSections: true,
  },

  MinimalistModern: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,
    customSections: true,

    // Contact fields
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Disabled fields
    photo: false,
    tools: false,
    languages: false,
    certifications: false,
    profile: false,
  },

  MinimalistOnePage: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    contact: true,

    // contact fields
    email: true,
    phone: true,
    linkedin: true,

    // disabled
    projects: false,
    customSections: false,
    photo: false,
    tools: false,
    languages: false,
    certifications: false,
    profile: false,
  },

  MinimalistElegant: {
    // ENABLED SECTIONS
    summary: true,
    experience: true,
    education: true,
    skills: true,
    customSections: true,

    // CONTACT FIELDS (ALL ON)
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // DISABLED SECTIONS (NOT IN TEMPLATE)
    photo: false,
    tools: false,
    languages: false,
    projects: false, // ❗This template does NOT include projects
    certifications: false,
    profile: false,
  },

  MinimalistSidebar: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    customSections: true,
    languages: true,

    // CONTACT
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // DISABLED
    photo: false,
    tools: false,
    certifications: false,
    profile: false,
  },

  MinimalistCompact: {
    // ENABLED sections (these toggles let the editor show/hide whole sections)
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,
    customSections: true, // allow users to add arbitrary custom sections

    // Contact fields available in the editor for this template
    // (editor will present inputs for every true field)
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // DISABLED — must be false for templates that don't support these features
    photo: false,
    languages: false,
    tools: false,
    certifications: false,
    profile: false,
  },

  MinimalistCreative: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    contact: true,
    customSections: true,

    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    tools: true,

    photo: false,
    languages: false,
    certifications: false,
  },

  MinimalistProfessional: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false, // ❌ NOT in this template
    tools: false, // ❌ NOT in this template
    photo: false, // ❌ NOT in this template
    languages: false, // ❌ NOT in this template
    contact: true, // ✔ email, phone, linkedin
    customSections: true, // ✔ allowed at bottom
  },

  TechnicalModern: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    customSections: true,

    // Contact NOT used in template
    contact: true,
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    address: true,

    // Disabled
    photo: false,
    tools: false,
    languages: false,
  },

  TechnicalDeveloper: {
    fullName: true,
    role: true,

    // Contact fields (all enabled)
    contact: true,
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    location: true,

    // Explicitly disable photo so editor won't show it for this template
    photo: false,

    // Main content blocks
    summary: true,
    experience: {
      enabled: true,
      multiple: true,
      fields: ["title", "company", "duration", "description"],
    },
    projects: {
      enabled: true,
      multiple: true,
      fields: ["name", "description", "stack", "link"],
    },
    education: {
      enabled: true,
      multiple: true,
      fields: ["degree", "school", "year", "details"],
    },
    skills: {
      enabled: true,
      multiple: true,
      simpleList: true,
    },

    // Custom sections allowed (placed at the end in component)
    customSections: true,
  },

  TechnicalEngineer: {
    summary: true,
    experience: true,
    education: true,
    skills: false, // no direct skills panel, they come from custom sections
    projects: false, // not used in this template
    photo: false,

    contact: {
      email: true,
      phone: true,
      linkedin: true,
      github: true,
      portfolio: true,
      address: true,
    },

    customSections: true, // VERY IMPORTANT — everything comes from here

    // recommended custom section headings:
    // "Operating Systems"
    // "Networking"
    // "Automation Tools"
    // "Cloud Platforms"
    // "Certifications"
  },

  TechnicalInnovator: {
    // Core sections visible in editor
    summary: true,
    experience: true,
    projects: true,
    education: true,
    certifications: true, // maps to customSections with "achievement" heading
    customSections: true, // allow arbitrary extra sections

    // Contact controls (all supported)
    contact: {
      email: true,
      phone: true,
      address: true,
      linkedin: true,
      github: true,
      portfolio: true,
    },

    // Not using photo
    photo: false,
    skills: false, // skills are just part of customSections or projects; change to true if you want explicit skills panel
  },

  TechnicalAnalyst: {
    summary: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    customSections: true,
    contact: true,
    fullName: true,
    role: true,
    email: true,
    phone: true,
    linkedin: true,
    github: true,
    portfolio: true,
    photo: false,
  },

  TechnicalArchitect: {
    fullName: true,
    role: true,
    summary: true,
    contact: true,
    email: true,
    phone: true,
    address: true,
    experience: true,
    education: true,
    customSections: true,
    skills: true,
    projects: false,
    photo: false,
  },

  TechnicalAI: {
    summary: true,

    skills: {
      enabled: true,
      type: "list", // simple array of skills
    },

    experience: {
      enabled: true,
      type: "experience", // title, company, duration, description/bullets
    },

    projects: {
      enabled: true,
      type: "projects", // title, description, link
    },

    education: {
      enabled: true,
      type: "education", // degree, school, year, optional description
    },

    certifications: {
      enabled: true,
      type: "list", // simple array
    },

    photo: false, // ensure photo never appears

    customSections: true,
  },

  FresherSimple: {
    fullName: true,
    role: true,

    // CONTACT
    email: true,
    phone: true,

    // SUMMARY / OBJECTIVE
    summary: true,

    // SKILLS
    skills: true,

    // PROJECTS
    projects: true,

    // CERTIFICATIONS
    certifications: true,

    // EDUCATION
    education: true,

    // CUSTOM SECTION
    customSections: true,

    // NOT USED IN THIS TEMPLATE
    contact: true,
    linkedin: true,
    github: true,
    address: true,
    tools: false,
    languages: false,
    experience: false,
    photo: false, // fresher template does NOT have experience section
  },

  FresherStudent: {
    summary: true,
    objective: true, // mapped to summary/objective
    skills: true,
    projects: true,
    certifications: true,
    internships: true,
    education: true,
    academicAchievements: true,

    // FULL CONTACT BLOCK (matches your makeCustomSection exactly)
    contact: {
      enabled: true,
      fields: {
        email: true,
        phone: true,
        address: true,
        linkedin: true,
        github: true,
        portfolio: true,
      },
    },
  },

  // Custom sections always enabled
  customSections: true,

  // No profile image in this template
  profileImage: false,

  // Header fields
  header: {
    fullName: true,
    role: true,
    college: true,
  },

  FresherCampus: {
    fullName: true,
    role: true,

    // CONTACT (all 6 fields)
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // STUDENT / BATCH INFO
    batch: true,

    // SUMMARY / OBJECTIVE
    summary: true,
    objective: true,

    // SKILLS
    skills: true,

    // PROJECTS
    projects: true,

    // EXPERIENCE (use this for internships / training too)
    experience: true,

    // EDUCATION
    education: true,

    // CUSTOM SECTIONS (dynamic)
    customSections: true,

    // PROFILE IMAGE
    photo: false,
  },

  FresherModern: {
    fullName: true,
    role: true,

    summary: true,

    skills: {
      enabled: true,
      multiple: true,
      photo: false,
    },

    projects: {
      enabled: true,
      multiple: true,
      fields: {
        title: true,
        description: true,
        link: true,
        type: true,
        category: true,
        tags: true,
        stack: true,
      },
    },

    // Experience is enabled — template will display either data.experience or data.internships
    experience: {
      enabled: true,
      multiple: true,
      aliasFor: ["internships"], // indicates backend/editor that internships can feed experience
    },

    education: {
      enabled: true,
      multiple: true,
      fields: {
        degree: true,
        school: true,
        year: true,
        cgpa: true,
        percentage: true,
      },
    },

    achievements: {
      enabled: true, // will map to customSection whose heading includes "achievement" or fallback data.achievements
      multiple: true,
    },

    certifications: {
      enabled: true, // will map to customSection whose heading includes "certif" or fallback data.certifications
      multiple: true,
    },

    customSections: {
      enabled: true,
      multiple: true,
      fields: {
        heading: true,
        content: true,
      },
    },
  },

  FresherCreative: {
    fullName: true,
    role: true,

    // Main sections
    summary: true, // Objective / Summary
    skills: true, // simple skill list (no progress bars)
    projects: true,
    experience: true, // internships mapped to experience
    education: true,
    certifications: false,

    // We replaced "Relevant Coursework" with experience above

    // Custom / misc
    customSections: true, // always render custom sections at the end

    // Contact block (full support)
    contact: false,
    // UI flags
    photo: false, // explicitly disabled (no profile photo)
  },

  FresherElegant: {
    fullName: true,
    role: true,

    // Contact
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Main sections
    summary: true,
    skills: true,
    projects: true,
    education: true,

    // Experience (used in your corrected version)
    experience: true,

    // Custom Sections
    customSections: true,

    // No photo in this template
    photo: false,
  },

  FresherProfessional: {
    fullName: true,
    role: true,

    // Contact Section
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Main Sections
    summary: true, // Professional Summary
    skills: true, // Key Skills
    projects: true, // Projects
    certifications: true, // Certifications
    education: true, // Education

    // This template does NOT include experience
    experience: false,

    // Custom Sections
    customSections: true,

    // This template does NOT support photo
    photo: false,
  },

  FresherTechStarter: {
    fullName: true,
    role: true,

    // Contact
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Sections
    summary: true, // Objective
    skills: true, // Technical Skills
    projects: true, // Academic Projects
    experience: true, // Replaces Coursework
    education: true, // Education

    // Custom Sections
    customSections: true,

    // No photo in this template
    photo: false,
  },

  InternationalUSA: {
    fullName: true,
    role: true,

    // Contact Section
    contact: true,
    email: true,
    phone: true,
    address: true, // Location
    linkedin: true,
    github: true,
    portfolio: true,

    // Main Sections
    summary: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,

    // Custom Sections
    customSections: true,

    // This template does NOT support a photo
    photo: false,
  },

  InternationalCanada: {
    fullName: true,
    role: true,

    // Contact
    contact: true,
    email: true,
    phone: true,
    address: true, // Location
    linkedin: true,
    github: true,
    portfolio: true,

    // Main Sections
    summary: true,
    skills: true,
    experience: true, // Work Experience
    education: true,
    projects: true,
    certifications: true,
    volunteer: true, // Volunteer Experience

    // Custom Sections
    customSections: true,

    // No photo for this template
    photo: false,
  },

  InternationalUK: {
    fullName: true,
    role: true,

    // Contact Section
    contact: true,
    email: true,
    phone: true,
    address: true, // Location
    linkedin: true,
    github: true,
    portfolio: true,

    // LEFT COLUMN SECTIONS
    summary: true, // Personal Profile
    skills: true, // Core Skills
    achievements: true, // Achievements
    languages: true, // Languages (replacing "Additional Information")

    // RIGHT COLUMN SECTIONS
    experience: true, // Employment History
    education: true,
    certifications: true,

    // Custom Sections (added at bottom right)
    customSections: true,

    // This template does NOT use a photo
    photo: false,
  },

  InternationalGermany: {
    fullName: true,
    role: true,

    // PHOTO SUPPORT
    photo: true,

    // CONTACT / PERSONAL INFO
    contact: true,
    email: true,
    phone: true,
    address: true, // Location
    linkedin: true,
    github: true,
    portfolio: true,

    // LEFT COLUMN
    skills: true,
    languages: true,
    certifications: true, // Certificates

    // RIGHT COLUMN
    summary: true, // Professional Summary
    experience: true, // Work Experience
    education: true,

    // CUSTOM SECTIONS (added bottom-right)
    customSections: true,
  },

  InternationalAustralia: {
    fullName: true,
    role: true,

    // Contact Section
    contact: true,
    email: true,
    phone: true,
    address: true, // Location
    linkedin: true,
    github: true,
    portfolio: true,

    // Main Sections
    summary: true, // Professional Summary
    skills: true, // Key Capabilities
    experience: true, // Employment History
    education: true,
    certifications: true,

    // Custom Sections (at bottom)
    customSections: true,

    // This template does NOT use a photo
    photo: false,
  },

  InternationalUAE: {
    // Basic info
    fullName: true,
    role: true,
    photo: true, // Template supports a profile photo

    // Contact Information (6 fields)
    contact: true,
    email: true,
    phone: true,
    address: true, // Used as 'location'
    linkedin: true,
    github: true,
    portfolio: true,

    // Left column sections
    skills: true,
    languages: true,
    certifications: true,

    // Right column sections
    summary: true,
    experience: true,
    education: true,

    // Custom sections allowed at bottom right
    customSections: true,
  },

  InternationalEU: {
    fullName: true,
    role: true,
    photo: true,

    // Contact (6 Fields)
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Left Column
    skills: true,
    languages: true,

    // Right Column
    summary: true,
    experience: true,
    education: true,

    // Custom Section Support
    customSections: true,
  },

  InternationalAsia: {
    fullName: true,
    role: true,
    photo: true,

    // Contact (6 fields)
    contact: true,
    email: true,
    phone: true,
    address: true,
    linkedin: true,
    github: true,
    portfolio: true,

    // Main Sections
    summary: true,
    skills: true,
    experience: true,
    education: true,

    // Custom Sections enabled
    customSections: true,
  },

  __default: {
    contact: true,
    projects: true,
    experience: true,
    skills: true,
    education: true,
  },
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// Approx A4 height at 96dpi
const PAGE_HEIGHT_PX = 1122;
const SAFE_MARGIN = 40;

/**
 * Smarter paginate:
 *  - Reset all content back into the first .resume-page
 *  - Then re-append children one by one, measuring total height
 *  - When the accumulated height doesn't fit, move the next block to a new .resume-page
 *
 * NOTE: We treat each DIRECT child of .resume-page as a block (header, sections, etc.)
 *       and we do NOT depend on any ".resume-section" class in templates.
 */
function paginateResume() {
  if (typeof document === "undefined") return;

  const previewRoot = document.getElementById("resume-preview");
  if (!previewRoot) return;

  // The inner .resume-doc rendered by the template
  const doc = previewRoot.querySelector(".resume-doc") || previewRoot;
  if (!doc) return;

  const allPages = Array.from(doc.querySelectorAll(".resume-page"));
  if (allPages.length === 0) return;

  const firstPage = allPages[0];

  // --- STEP 1: move everything back into the first page ---
  for (let i = 1; i < allPages.length; i++) {
    const page = allPages[i];
    while (page.firstChild) {
      firstPage.appendChild(page.firstChild);
    }
    page.remove();
  }

  const PAGE_HEIGHT = PAGE_HEIGHT_PX;
  const MARGIN = SAFE_MARGIN;

  let currentPage = firstPage;
  let currentHeight = 0;

  // We split by direct children inside .resume-page (header, sections, etc.)
  const items = Array.from(firstPage.children);

  items.forEach((item) => {
    const itemHeight = item.offsetHeight || 0;

    // If adding this block would overflow A4, create a new page
    if (
      currentHeight + itemHeight > PAGE_HEIGHT - MARGIN &&
      currentPage.children.length > 0
    ) {
      const newPage = firstPage.cloneNode(false); // clone with same classes/styles, no children
      doc.appendChild(newPage);
      currentPage = newPage;
      currentHeight = 0;
    }

    currentPage.appendChild(item);
    currentHeight += itemHeight;
  });
}

export default function TemplateEditorPage() {
  const params = useParams();
  const { category = "unknown", template = "Template" } = params || {};

  const storageKey = `rc_resume_${category}_${template}`;

  const [data, setData] = useState(emptyResume);
  const [saving, setSaving] = useState(false);
  const [mobileMode, setMobileMode] = useState("edit");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const config = TEMPLATE_SECTIONS[template] || TEMPLATE_SECTIONS.__default;

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      console.warn("Failed to read saved resume:", err);
    }
  }, [storageKey]);

  // Auto-save to localStorage
  useEffect(() => {
    setSaving(true);
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (err) {
        console.warn("Failed to save resume:", err);
      }
      setSaving(false);
    }, 600);
    return () => clearTimeout(t);
  }, [data, storageKey]);

  // ------ UPDATE HELPERS ------
  const updateField = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addArrayItem = (field, factory) => {
    setData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), factory()],
    }));
  };

  const updateArrayItem = (field, id, patch) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  };

  const removeArrayItem = (field, id) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((item) => item.id !== id),
    }));
  };

  const moveArrayItem = (field, id, direction) => {
    setData((prev) => {
      const arr = [...(prev[field] || [])];
      const index = arr.findIndex((i) => i.id === id);
      if (index === -1) return prev;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= arr.length) return prev;

      const [item] = arr.splice(index, 1);
      arr.splice(newIndex, 0, item);

      return { ...prev, [field]: arr };
    });
  };

  // Factories
  const makeExperience = () => ({
    id: uid(),
    title: "",
    company: "",
    duration: "",
    description: "",
    bullets: [],
  });

  const makeProject = () => ({
    id: uid(),
    title: "",
    link: "",
    description: "",
    bullets: [],
  });

  const makeEducation = () => ({
    id: uid(),
    degree: "",
    school: "",
    year: "",
  });

  const makeCustomSection = (type) => {
    if (type === "contact") {
      return {
        id: uid(),
        heading: "Contact",
        type: "contact",
        content: {
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          github: "",
          portfolio: "",
        },
      };
    }

    return {
      id: uid(),
      heading: "New Section",
      type: type === "bullets" ? "bullets" : "text",
      content: type === "bullets" ? [] : "",
    };
  };

  // Photo Upload
  const handlePhotoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = URL.createObjectURL(file);
      updateField("photoUrl", url);
    } catch (err) {
      console.error("Photo upload failed:", err);
      alert("Failed to load photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const previewRef = useRef(null);

  const handleClearDraft = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear this draft? This action cannot be undone."
    );
    if (!confirmDelete) return;

    localStorage.removeItem(storageKey);
    setData(emptyResume);
    alert("Draft cleared successfully!");
  };

  // Auto paginate whenever preview DOM changes (content, text, sections)
  useEffect(() => {
    const previewRoot = document.getElementById("resume-preview");
    if (!previewRoot) return;

    const observer = new MutationObserver(() => {
      // debounce a bit so rapid edits don't spam
      if (window._resumePaginateTimer) {
        clearTimeout(window._resumePaginateTimer);
      }
      window._resumePaginateTimer = setTimeout(() => {
        paginateResume();
      }, 80);
    });

    observer.observe(previewRoot, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // initial run
    paginateResume();

    return () => {
      observer.disconnect();
      if (window._resumePaginateTimer) {
        clearTimeout(window._resumePaginateTimer);
      }
    };
  }, [data]);

  // PRINT PDF
  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  // Preview component lookup
  const RawPreviewComponent =
    PREVIEWS[template] ||
    PREVIEWS.DefaultPreview ||
    (() => <div>No preview found for this template.</div>);

  const PreviewComponent = RawPreviewComponent;

  // Auto-focus first input on load
  useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.querySelector("input");
    if (el) el.focus();
  }, []);

  const panelVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white">
      <div
        className="relative"
        style={{
          background:
            "radial-gradient(circle at top, rgba(79,70,229,0.35), transparent 55%), #020617",
        }}
      >
        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 pt-5 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-indigo-300 tracking-tight">
              {template.replace(/([A-Z])/g, " $1").trim()} — Editor
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Live editing with autosave enabled. Left: editor • Right: A4
              preview.
            </p>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              {saving ? "Saving draft..." : "All changes saved locally"}
            </p>
          </div>
          <div className="flex items-center gap-3 no-print">
            <button
              onClick={() => {
                window.location.href = `/resume-category/${category}/${template}/preview`;
              }}
              className="px-3 py-2 text-xs md:text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/40"
            >
              Full Preview
            </button>

            <button
              onClick={handleClearDraft}
              className="px-3 py-2 text-xs md:text-sm rounded-lg bg-red-500 hover:bg-red-600 shadow-md shadow-red-400/40"
            >
              Clear Draft
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="md:grid md:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.6fr)] md:gap-6">
            {/* LEFT: EDITOR */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="show"
              className={`editor-panel w-full md:w-auto mb-8 md:mb-0 ${
                mobileMode === "preview" ? "hidden md:block" : "block"
              }`}
            >
              <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-5 shadow-2xl shadow-slate-900/80 backdrop-blur">
                {/* BASIC INFO */}
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold text-indigo-300 mb-2">
                    Basic Info
                  </h3>

                  <input
                    value={data.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Full name"
                    className={`w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                  />

                  <input
                    value={data.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    placeholder="Job title (e.g. Software Engineer)"
                    className={`w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                  />
                </section>

                {/* CONTACT */}
                {config.contact && (
                  <section className="mt-6 space-y-3">
                    <h3 className="text-sm font-semibold text-indigo-300 mb-1">
                      Contact
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        value={data.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Email"
                        className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                      />

                      <input
                        value={data.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Phone"
                        className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                      />
                    </div>

                    <input
                      value={data.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Location (City, Country)"
                      className={`w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        value={data.linkedin}
                        onChange={(e) =>
                          updateField("linkedin", e.target.value)
                        }
                        placeholder="LinkedIn URL"
                        className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs ${NEON_INPUT}`}
                      />

                      <input
                        value={data.github}
                        onChange={(e) => updateField("github", e.target.value)}
                        placeholder="GitHub URL"
                        className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs ${NEON_INPUT}`}
                      />

                      <input
                        value={data.portfolio}
                        onChange={(e) =>
                          updateField("portfolio", e.target.value)
                        }
                        placeholder="Portfolio / Website"
                        className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs ${NEON_INPUT}`}
                      />
                    </div>
                  </section>
                )}

                {/* PHOTO */}
                {config.photo !== false && (
                  <section className="mt-6">
                    <h3 className="text-sm font-semibold text-indigo-300 mb-2">
                      Profile Photo
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoFileChange}
                          className="text-xs text-gray-300"
                        />
                        {uploadingPhoto && (
                          <span className="text-[11px] text-indigo-300">
                            Loading…
                          </span>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* SUMMARY */}
                <section className="mt-6">
                  <h3 className="text-sm font-semibold text-indigo-300 mb-2">
                    Summary
                  </h3>
                  <textarea
                    rows={4}
                    value={data.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                    placeholder="Short professional summary"
                    className={`w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm resize-y ${NEON_INPUT}`}
                  />
                </section>

                {/* SKILLS */}
                {config.skills && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Skills
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <input
                        id="skillInput"
                        placeholder="Type skill and press Add"
                        className={`flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const v = e.currentTarget.value.trim();
                            if (!v) return;
                            updateField("skills", [...(data.skills || []), v]);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          const el = document.getElementById("skillInput");
                          if (!el) return;
                          const v = el.value.trim();
                          if (!v) return;
                          updateField("skills", [...(data.skills || []), v]);
                          el.value = "";
                        }}
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(data.skills || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs"
                        >
                          {typeof skill === "string"
                            ? skill
                            : skill?.name || ""}
                          <button
                            type="button"
                            className="text-[10px] text-red-300"
                            onClick={() =>
                              updateField(
                                "skills",
                                (data.skills || []).filter((_, i) => i !== idx)
                              )
                            }
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* CERTIFICATIONS */}
                {config.certifications && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Certifications
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <input
                        id="certInput"
                        placeholder="Type certification and press Add"
                        className={`flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const v = e.currentTarget.value.trim();
                            if (!v) return;
                            updateField("certifications", [
                              ...(data.certifications || []),
                              v,
                            ]);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          const el = document.getElementById("certInput");
                          if (!el) return;
                          const v = el.value.trim();
                          if (!v) return;
                          updateField("certifications", [
                            ...(data.certifications || []),
                            v,
                          ]);
                          el.value = "";
                        }}
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(data.certifications || []).map((item, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs"
                        >
                          {item}
                          <button
                            type="button"
                            className="text-[10px] text-red-300"
                            onClick={() =>
                              updateField(
                                "certifications",
                                (data.certifications || []).filter(
                                  (_, i) => i !== idx
                                )
                              )
                            }
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* LANGUAGES */}
                {config.languages && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Languages
                      </h3>
                    </div>

                    <div className="flex gap-2">
                      <input
                        id="langInput"
                        placeholder="Type language and press Add"
                        className={`flex-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-sm ${NEON_INPUT}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const v = e.currentTarget.value.trim();
                            if (!v) return;
                            updateField("languages", [
                              ...(data.languages || []),
                              v,
                            ]);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          const el = document.getElementById("langInput");
                          if (!el) return;
                          const v = el.value.trim();
                          if (!v) return;
                          updateField("languages", [
                            ...(data.languages || []),
                            v,
                          ]);
                          el.value = "";
                        }}
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(data.languages || []).map((item, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs"
                        >
                          {item}
                          <button
                            type="button"
                            className="text-[10px] text-red-300"
                            onClick={() =>
                              updateField(
                                "languages",
                                (data.languages || []).filter(
                                  (_, i) => i !== idx
                                )
                              )
                            }
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* EXPERIENCE */}
                {config.experience && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Experience
                      </h3>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5 border border-white/10"
                        onClick={() =>
                          addArrayItem("experience", makeExperience)
                        }
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(data.experience || []).map((exp) => {
                        const bullets = Array.isArray(exp.bullets)
                          ? exp.bullets
                          : [];
                        return (
                          <div
                            key={exp.id}
                            className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2 text-xs"
                          >
                            <div className="flex justify-between gap-2">
                              <input
                                value={exp.title || ""}
                                onChange={(e) =>
                                  updateArrayItem("experience", exp.id, {
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Job title"
                                className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                              />

                              <input
                                value={exp.company || ""}
                                onChange={(e) =>
                                  updateArrayItem("experience", exp.id, {
                                    company: e.target.value,
                                  })
                                }
                                placeholder="Company"
                                className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                              />
                            </div>

                            <input
                              value={exp.duration || ""}
                              onChange={(e) =>
                                updateArrayItem("experience", exp.id, {
                                  duration: e.target.value,
                                })
                              }
                              placeholder="Duration (e.g. 2022 – Present)"
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                            />

                            <textarea
                              rows={2}
                              value={exp.description || ""}
                              onChange={(e) =>
                                updateArrayItem("experience", exp.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Short description (optional)"
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 resize-y ${NEON_INPUT}`}
                            />

                            <div className="mt-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] text-gray-300">
                                  Bullet points
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                    onClick={() =>
                                      moveArrayItem("experience", exp.id, -1)
                                    }
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                    onClick={() =>
                                      moveArrayItem("experience", exp.id, 1)
                                    }
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    className="text-[11px] text-red-300 ml-1"
                                    onClick={() =>
                                      removeArrayItem("experience", exp.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              {bullets.map((b, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-2 items-start mb-1"
                                >
                                  <textarea
                                    rows={1}
                                    value={b || ""}
                                    onChange={(e) => {
                                      const nextBullets = [...bullets];
                                      nextBullets[idx] = e.target.value;
                                      updateArrayItem("experience", exp.id, {
                                        bullets: nextBullets,
                                      });
                                    }}
                                    placeholder="Bullet point"
                                    className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                  />
                                  <button
                                    type="button"
                                    className="text-[11px] text-red-300"
                                    onClick={() => {
                                      const nextBullets = bullets.filter(
                                        (_, i) => i !== idx
                                      );
                                      updateArrayItem("experience", exp.id, {
                                        bullets: nextBullets,
                                      });
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="text-[11px] text-indigo-300 mt-1"
                                onClick={() =>
                                  updateArrayItem("experience", exp.id, {
                                    bullets: [...bullets, ""],
                                  })
                                }
                              >
                                + Add bullet
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* PROJECTS */}
                {config.projects && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Projects
                      </h3>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5 border border-white/10"
                        onClick={() => addArrayItem("projects", makeProject)}
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(data.projects || []).map((proj) => {
                        const bullets = Array.isArray(proj.bullets)
                          ? proj.bullets
                          : [];
                        return (
                          <div
                            key={proj.id}
                            className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2 text-xs"
                          >
                            <input
                              value={proj.title || ""}
                              onChange={(e) =>
                                updateArrayItem("projects", proj.id, {
                                  title: e.target.value,
                                })
                              }
                              placeholder="Project title"
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                            />

                            <input
                              value={proj.link || ""}
                              onChange={(e) =>
                                updateArrayItem("projects", proj.id, {
                                  link: e.target.value,
                                })
                              }
                              placeholder="Project link (optional)"
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                            />

                            <textarea
                              rows={2}
                              value={proj.description || ""}
                              onChange={(e) =>
                                updateArrayItem("projects", proj.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Short description"
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 resize-y ${NEON_INPUT}`}
                            />

                            <div className="mt-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] text-gray-300">
                                  Bullet points
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                    onClick={() =>
                                      moveArrayItem("projects", proj.id, -1)
                                    }
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                    onClick={() =>
                                      moveArrayItem("projects", proj.id, 1)
                                    }
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    className="text-[11px] text-red-300 ml-1"
                                    onClick={() =>
                                      removeArrayItem("projects", proj.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              {bullets.map((b, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-2 items-start mb-1"
                                >
                                  <textarea
                                    rows={1}
                                    value={b || ""}
                                    onChange={(e) => {
                                      const nextBullets = [...bullets];
                                      nextBullets[idx] = e.target.value;
                                      updateArrayItem("projects", proj.id, {
                                        bullets: nextBullets,
                                      });
                                    }}
                                    placeholder="Bullet point"
                                    className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                  />
                                  <button
                                    type="button"
                                    className="text-[11px] text-red-300"
                                    onClick={() => {
                                      const nextBullets = bullets.filter(
                                        (_, i) => i !== idx
                                      );
                                      updateArrayItem("projects", proj.id, {
                                        bullets: nextBullets,
                                      });
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="text-[11px] text-indigo-300 mt-1"
                                onClick={() =>
                                  updateArrayItem("projects", proj.id, {
                                    bullets: [...bullets, ""],
                                  })
                                }
                              >
                                + Add bullet
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* EDUCATION */}
                {config.education && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Education
                      </h3>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5 border border-white/10"
                        onClick={() => addArrayItem("education", makeEducation)}
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(data.education || []).map((edu) => (
                        <div
                          key={edu.id}
                          className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2 text-xs"
                        >
                          <input
                            value={edu.degree || ""}
                            onChange={(e) =>
                              updateArrayItem("education", edu.id, {
                                degree: e.target.value,
                              })
                            }
                            placeholder="Degree"
                            className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                          />

                          <input
                            value={edu.school || ""}
                            onChange={(e) =>
                              updateArrayItem("education", edu.id, {
                                school: e.target.value,
                              })
                            }
                            placeholder="Institute / University"
                            className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                          />

                          <input
                            value={edu.year || ""}
                            onChange={(e) =>
                              updateArrayItem("education", edu.id, {
                                year: e.target.value,
                              })
                            }
                            placeholder="Year / Duration"
                            className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                          />

                          <div className="flex justify-between mt-1">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("education", edu.id, -1)
                                }
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("education", edu.id, 1)
                                }
                              >
                                ↓
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-[11px] text-red-300"
                              onClick={() =>
                                removeArrayItem("education", edu.id)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* TOOLS */}
                {config.tools && (
                  <section className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-indigo-300">
                        Tools
                      </h3>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5 border border-white/10"
                        onClick={() =>
                          addArrayItem("tools", () => ({
                            id: Date.now(),
                            name: "",
                          }))
                        }
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(data.tools || []).map((tool) => (
                        <div
                          key={tool.id}
                          className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2 text-xs"
                        >
                          <input
                            value={tool.name || ""}
                            onChange={(e) =>
                              updateArrayItem("tools", tool.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder="Tool name (Figma, Git, VS Code, etc.)"
                            className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                          />

                          <div className="flex justify-between mt-1">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("tools", tool.id, -1)
                                }
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("tools", tool.id, 1)
                                }
                              >
                                ↓
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-[11px] text-red-300"
                              onClick={() => removeArrayItem("tools", tool.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* CUSTOM SECTIONS */}
                <section className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-indigo-300">
                      Custom Sections
                    </h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5"
                        onClick={() =>
                          addArrayItem("customSections", () =>
                            makeCustomSection("text")
                          )
                        }
                      >
                        + Text
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5"
                        onClick={() =>
                          addArrayItem("customSections", () =>
                            makeCustomSection("bullets")
                          )
                        }
                      >
                        + Bullets
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 text-[11px] rounded-md bg-white/5"
                        onClick={() =>
                          addArrayItem("customSections", () =>
                            makeCustomSection("contact")
                          )
                        }
                      >
                        + Contact
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(data.customSections || []).map((sec) => {
                      const type = sec.type || "text";
                      const bullets =
                        type === "bullets" && Array.isArray(sec.content)
                          ? sec.content
                          : [];
                      const isContact = type === "contact";

                      return (
                        <div
                          key={sec.id}
                          className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              value={sec.heading || ""}
                              onChange={(e) =>
                                updateArrayItem("customSections", sec.id, {
                                  heading: e.target.value,
                                })
                              }
                              placeholder="Section heading (e.g. Awards)"
                              className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                            />

                            <select
                              value={type}
                              onChange={(e) => {
                                const newType = e.target.value;
                                let newContent;

                                if (newType === "bullets") {
                                  newContent = Array.isArray(sec.content)
                                    ? sec.content
                                    : [];
                                } else if (newType === "contact") {
                                  const base =
                                    sec.content &&
                                    typeof sec.content === "object" &&
                                    !Array.isArray(sec.content)
                                      ? sec.content
                                      : {};
                                  newContent = {
                                    email: base.email || "",
                                    phone: base.phone || "",
                                    address: base.address || "",
                                    linkedin: base.linkedin || "",
                                    github: base.github || "",
                                    portfolio: base.portfolio || "",
                                  };
                                } else {
                                  newContent =
                                    typeof sec.content === "string"
                                      ? sec.content
                                      : "";
                                }

                                updateArrayItem("customSections", sec.id, {
                                  type: newType,
                                  content: newContent,
                                });
                              }}
                              className={`p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                            >
                              <option value="text">Text</option>
                              <option value="bullets">Bullets</option>
                              <option value="contact">Contact block</option>
                            </select>
                          </div>

                          {/* CONTENT UI */}
                          {type === "bullets" ? (
                            <div className="space-y-2">
                              {bullets.map((b, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <input
                                    value={b || ""}
                                    onChange={(e) => {
                                      const next = [...bullets];
                                      next[idx] = e.target.value;
                                      updateArrayItem(
                                        "customSections",
                                        sec.id,
                                        {
                                          content: next,
                                        }
                                      );
                                    }}
                                    placeholder="Bullet point"
                                    className={`flex-1 p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                  />
                                  <button
                                    type="button"
                                    className="text-[11px] text-red-300"
                                    onClick={() => {
                                      const next = bullets.filter(
                                        (_, i) => i !== idx
                                      );
                                      updateArrayItem(
                                        "customSections",
                                        sec.id,
                                        { content: next }
                                      );
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="text-[11px] text-indigo-300"
                                onClick={() =>
                                  updateArrayItem("customSections", sec.id, {
                                    content: [...bullets, ""],
                                  })
                                }
                              >
                                + Add bullet
                              </button>
                            </div>
                          ) : isContact ? (
                            <div className="space-y-2">
                              {(() => {
                                const c =
                                  sec.content &&
                                  typeof sec.content === "object" &&
                                  !Array.isArray(sec.content)
                                    ? sec.content
                                    : {};

                                const update = (patch) => {
                                  updateArrayItem("customSections", sec.id, {
                                    content: { ...c, ...patch },
                                  });
                                };

                                return (
                                  <>
                                    <input
                                      value={c.email || ""}
                                      onChange={(e) =>
                                        update({ email: e.target.value })
                                      }
                                      placeholder="Email"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                    <input
                                      value={c.phone || ""}
                                      onChange={(e) =>
                                        update({ phone: e.target.value })
                                      }
                                      placeholder="Phone"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                    <input
                                      value={c.address || ""}
                                      onChange={(e) =>
                                        update({ address: e.target.value })
                                      }
                                      placeholder="Location / Address"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                    <input
                                      value={c.linkedin || ""}
                                      onChange={(e) =>
                                        update({ linkedin: e.target.value })
                                      }
                                      placeholder="LinkedIn URL"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                    <input
                                      value={c.github || ""}
                                      onChange={(e) =>
                                        update({ github: e.target.value })
                                      }
                                      placeholder="GitHub URL"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                    <input
                                      value={c.portfolio || ""}
                                      onChange={(e) =>
                                        update({ portfolio: e.target.value })
                                      }
                                      placeholder="Portfolio / Website"
                                      className={`w-full p-2 rounded bg-slate-950 border border-slate-700 ${NEON_INPUT}`}
                                    />
                                  </>
                                );
                              })()}
                            </div>
                          ) : (
                            <textarea
                              rows={3}
                              value={
                                typeof sec.content === "string"
                                  ? sec.content
                                  : ""
                              }
                              onChange={(e) =>
                                updateArrayItem("customSections", sec.id, {
                                  content: e.target.value,
                                })
                              }
                              placeholder="Write section content..."
                              className={`w-full p-2 rounded bg-slate-950 border border-slate-700 resize-y ${NEON_INPUT}`}
                            />
                          )}

                          <div className="flex justify-between items-center pt-1">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("customSections", sec.id, -1)
                                }
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="text-[11px] px-2 py-0.5 rounded bg-white/5"
                                onClick={() =>
                                  moveArrayItem("customSections", sec.id, 1)
                                }
                              >
                                ↓
                              </button>
                            </div>

                            <button
                              type="button"
                              className="text-[11px] text-red-300"
                              onClick={() =>
                                removeArrayItem("customSections", sec.id)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </motion.div>

            {/* DIVIDER */}
            <div className="print-divider hidden md:flex items-stretch justify-center">
              <div className="w-[2px] rounded-full bg-gradient-to-b from-indigo-400 via-fuchsia-500 to-cyan-400 shadow-[0_0_18px_rgba(129,140,248,0.9)]" />
            </div>

            {/* RIGHT: PREVIEW */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="show"
              className={`preview-panel w-full md:w-auto ${
                mobileMode === "edit" ? "hidden md:block" : "block"
              }`}
            >
              <div className="flex justify-center">
                <div
                  id="resume-preview"
                  ref={previewRef}
                  className="resume-doc"
                >
                  <PreviewComponent data={data} />
                </div>
              </div>

              {/* Mobile toggle */}
              <div className="mt-4 flex items-center justify-between gap-3 md:hidden no-print">
                <button
                  onClick={() => setMobileMode("edit")}
                  className={`flex-1 text-center py-2 rounded-lg ${
                    mobileMode === "edit"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  Edit
                </button>

                <button
                  onClick={() => setMobileMode("preview")}
                  className={`flex-1 text-center py-2 rounded-lg ${
                    mobileMode === "preview"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  Preview
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
