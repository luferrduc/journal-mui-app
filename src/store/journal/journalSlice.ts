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

export interface JournalState {
  isSaving: boolean
  messageSaved: string
  notes: Note[] | []
  active: Note | null
}

const initialState: JournalState = {
  isSaving: true,
  messageSaved: '',
  notes: [],
  active: null
} 

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload]
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
    
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
export const { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setSaving, updateNote } = journalSlice.actions
// export const selectTemplate = (state: RootState) => state.