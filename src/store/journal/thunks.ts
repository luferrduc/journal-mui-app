import { collection, doc, setDoc } from "firebase/firestore/lite"
import { AppDispatch, RootState } from "../store"
import { addNewEmptyNote, Note, NoteOptionalIdImages, NoteUpdate, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice"
import { FirebaseDB } from "@/firebase/config"
import { loadNotes } from "@/journal/helpers"


export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    dispatch(savingNewNote())
    
    const { uid } = getState().auth

    const newNote: NoteOptionalIdImages = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imagesUrls: []
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    newNote.id = newDoc.id
    dispatch(addNewEmptyNote(newNote as Note))
    dispatch(setActiveNote(newNote as Note))
  }
}


export const startLoadingNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    const { uid } = getState().auth

    //* Otra forma de hacerlo en vez del loadNotes
    // const querySnapshot = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`))
    // const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))    
    //*
    if(!uid) throw new Error('El uid del usuario no existe')
  
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))

  }
}


export const startSetActiveNote = (note: Note) => {
  return async (dispatch: AppDispatch) => {

    dispatch(setActiveNote(note))
  }
}


export const startUpdateNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    
    dispatch(setSaving())
    const { uid } = getState().auth
    const { active: note } = getState().journal

    if(!uid) throw new Error('El uid del usuario no existe')
    if(!note) throw new Error('No hay una nota activa para actualizar')

    const noteToSave: NoteUpdate = {
      ...note
    } 
    delete noteToSave.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToSave, {
      merge: true
    })

    dispatch(updateNote(note))
  }
}