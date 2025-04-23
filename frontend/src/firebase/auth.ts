import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app  from "./firebaseConfig";

const auth = getAuth(app);

export const loginWithFirebase = async (
  email: string,
  password: string
): Promise<{ token: string; uid: string }> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return { token, uid: userCredential.user.uid };
};