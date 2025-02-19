// import { RootState } from '...'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Note {
  id: string
  title: string
  body: string
  date: number
  imagesUrls: string[] | []
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
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
    
    },
    updateNote: (state, action: PayloadAction<Note>) => {
    
    },
    deleteNoteById: (state, action: PayloadAction<Pick<Note, 'id'>>) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setSaving, updateNote, savingNewNote } = journalSlice.actions
// export const selectTemplate = (state: RootState) => state.