import { collection, doc, setDoc } from "firebase/firestore/lite"
import { AppDispatch, RootState } from "../store"
import { Note } from "./journalSlice"
import { FirebaseDB } from "@/firebase/config"


export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    const { uid } = getState().auth

    const newNote: Omit<Note, "id" | "imagesUrls" > = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)


     
  }
}