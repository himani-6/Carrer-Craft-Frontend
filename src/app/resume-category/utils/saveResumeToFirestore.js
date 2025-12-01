import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export async function saveResumeToFirestore(data, category, template, userId) {
  try {
    const resumeId = `${category}_${template}`;

    await setDoc(
      doc(db, "users", userId, "resumes", resumeId),
      {
        updatedAt: new Date(),
        category,
        template,
        resumeData: data,
        previewPath: `/resume-category/${category}/${template}/preview`,
      },
      { merge: true }
    );

    return true;
  } catch (err) {
    console.error("❌ Firestore save failed:", err);
    return false;
  }
}
