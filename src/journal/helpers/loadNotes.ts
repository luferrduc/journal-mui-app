import { FirebaseDB } from "@/firebase/config"
import { Note } from "@/store/journal"
import { collection, getDocs } from "firebase/firestore/lite"


export const loadNotes = async (uid: string = '') => {

  if(!uid) throw new Error('El uid del usuario no existe')


  // TODO: Manejar errores con trycatch
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  const notes: Note[] = []
  docs.forEach( doc => {
    notes.push({ id: doc.id, ...doc.data()} as Note)
  })


  return notes
  
}