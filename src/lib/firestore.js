import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function saveATSHistory(userId, result) {
  try {
    const ref = await addDoc(collection(db, "atsHistory"), {
      userId,
      score: result.score || 0,
      createdAt: serverTimestamp(),
      result: result,   // SAVE FULL RESULT HERE
    });

    return ref.id;  // ⭐ return document ID
  } catch (err) {
    console.error("Error saving ATS result:", err);
    return null;
  }
}

