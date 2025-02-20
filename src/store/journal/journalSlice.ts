import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Note {
  id: string
  title: string
  body: string
  date: number
  imagesUrls: string[] | []
}

export interface NoteUpdate {
  id?: string
  title: string
  body: string
  date: number
  imagesUrls?: string[] | []
}


export type NoteOptionalIdImages = Omit<Note, "id" | "imagesUrls"> & Partial<Pick<Note, "id" | "imagesUrls">>;


export interface JournalState {
  isSaving: boolean
  messageSaved: string
  notes: Note[]
  active: Note | null
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
} 

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false

      const noteIndex = state.notes.findIndex(note => note.id === action.payload.id)
      if(noteIndex >= 0) state.notes[noteIndex] = action.payload

      state.messageSaved = `La nota con título ${action.payload.title} fue actualizada correctamente`
    },
    setPhotosToActiveNote: (state, action: PayloadAction<Note['imagesUrls']>) => {
      if(!state.active) return
      state.active.imagesUrls = [...(state.active?.imagesUrls ?? []), ...action.payload]
      state.isSaving = false
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action: PayloadAction<Pick<Note, 'id'>>) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  addNewEmptyNote, 
  deleteNoteById, 
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNote, 
  savingNewNote, 
  setPhotosToActiveNote,
  clearNotesLogout
} = journalSlice.actions
// export const selectTemplate = (state: RootState) => state.