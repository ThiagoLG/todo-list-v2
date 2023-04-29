import { Box, Button } from '@mui/material'
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

      <Box
        sx={{ transition: '200ms', transform: `scale(${showForm ? 1 : 0})` }}
      >
        <TaskForm />
      </Box>
    </HomeContainer>
  )
}
