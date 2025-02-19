import { useAppDispatch } from "@/store/hooks"
import { Note, startSetActiveNote } from "@/store/journal"
import { TurnedInNot } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useMemo } from "react"


export const SidebarItem = ({ title, body, id, date, imagesUrls }: Note) => {

  const newTitle = useMemo(()=> {
    return title.length > 1
      ? title.substring(0,17) + '...'
      : title
  }, [title])

  const dispatch = useAppDispatch()
  const onSetActiveNote = (note: Note) => {
    dispatch(startSetActiveNote(note))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => onSetActiveNote({id, title, body, date, imagesUrls })}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle || "Lorem Title"} title={title}/>
          <ListItemText secondary={body || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ratione minima, mollitia maiores in assumenda natus quaerat aut sit accusamus."}/>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}