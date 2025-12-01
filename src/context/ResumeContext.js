"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

// ---------- SHARED RESUME SHAPE (matches templates) ----------
const defaultResumeData = {
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

  skills: [], // ["React", "Node"]

  // templates expect: { title, company, duration, description }
  experience: [],

  // templates expect: { title, link, description }
  projects: [],

  // templates expect: { degree, school, year }
  education: [],

  // templates expect: { heading, content }
  customSections: [],
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ---------------- CONTEXT ----------------
const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [saving, setSaving] = useState(false);

  // simple top-level fields
  const updateField = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // ---------- Skills ----------
  const addSkill = useCallback((skill) => {
    if (!skill?.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill.trim()],
    }));
  }, []);

  const removeSkill = useCallback((index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  // ---------- Experience ----------
  const addExperience = useCallback(() => {
    const item = {
      id: uid(),
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, item],
    }));
  }, []);

  const updateExperience = useCallback((id, patch) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...patch } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  // ---------- Projects ----------
  const addProject = useCallback(() => {
    const item = {
      id: uid(),
      title: "",
      link: "",
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, item],
    }));
  }, []);

  const updateProject = useCallback((id, patch) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...patch } : p
      ),
    }));
  }, []);

  const removeProject = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  // ---------- Education ----------
  const addEducation = useCallback(() => {
    const item = {
      id: uid(),
      degree: "",
      school: "",
      year: "",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));
  }, []);

  const updateEducation = useCallback((id, patch) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  // ---------- Custom Sections ----------
  const addCustomSection = useCallback(() => {
    const sec = {
      id: uid(),
      heading: "",
      content: "",
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, sec],
    }));
  }, []);

  const updateCustomSection = useCallback((id, patch) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === id ? { ...s, ...patch } : s
      ),
    }));
  }, []);

  const removeCustomSection = useCallback((id) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(defaultResumeData);
  }, []);

  const value = {
    resumeData,
    setResumeData,
    saving,
    setSaving,
    updateField,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addEducation,
    updateEducation,
    removeEducation,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    resetResume,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error("useResume must be used inside <ResumeProvider>");
  }
  return ctx;
}
