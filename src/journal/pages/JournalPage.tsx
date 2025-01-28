import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"



export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad quod voluptates ullam odio reiciendis necessitatibus, repellendus cupiditate optio unde iure dolor illum praesentium. Voluptatibus quos iste, consectetur ducimus dignissimos totam.
      </Typography> */}

      {/* <NothingSelectedView /> */}
      {/* Nothing selected */}
      <NoteView />
    </JournalLayout>
  )
}