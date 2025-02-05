import { AuthError, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result) --> 
    // await signInWithRedirect( FirebaseAuth, googleProvider );
    // const newResult = await getRedirectResult(FirebaseAuth)
    // const user = newResult?.user
    const { displayName, email, photoURL, uid } = result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL, 
      uid
    }

  } catch (error) {
    console.error(error)
    const authError = error as AuthError;
    // const errorCode = authError.code;
    const errorMessage = authError.message;
    
    return {
      ok: false,
      errorMessage
    }
  }
}