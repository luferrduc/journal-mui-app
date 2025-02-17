import { AuthError, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { RegisterWithEmail } from "@/store/auth";


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



export const registerWithEmailAndPassword = async ({ email, password, fullName }: RegisterWithEmail) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = response.user

    // TODO: actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser!, { displayName: fullName })

    return {
      ok: true,
      uid,
      photoURL,
      displayName: fullName,
      email
    }

  } catch (error) {
    
    return {
      ok: false,
      errorMessage: (error as Error).message
    }
  }
}


export const signInEmailAndPassword = async ({ email, password }: Omit<RegisterWithEmail, "fullName">) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { user } = response
    const { displayName, photoURL, uid } = user

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    }
  } catch (error) {
    
    return {
      ok: false,
      errorMessage: (error as Error).message
    }
  }
}


export const logoutApp =  async () => {
  try {
    await FirebaseAuth.signOut()

    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: (error as Error).message
    }
  }
} 