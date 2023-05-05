import { Box, Button, Dialog, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { HomeContainer } from './styles'
import { TaskForm } from './TaskForm'

export function Home() {
  const [showForm, setShowForm] = useState(false)
  return (
    <HomeContainer>
      <Box sx={{ flex: 1, textAlign: 'center' }}>
        <Button
          variant="outlined"
          sx={{ margin: 'auto' }}
          onClick={() => {
            setShowForm((show) => !show)
          }}
        >
          Add new task
        </Button>
      </Box>

      <Dialog open={showForm} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box flex={1} sx={{ justifyContent: 'space-between' }}>
            <span>Create new task</span>{' '}
            <span
              onClick={() => {
                setShowForm(false)
              }}
            >
              X
            </span>
          </Box>
        </DialogTitle>
        <TaskForm />
      </Dialog>
    </HomeContainer>
  )
}
