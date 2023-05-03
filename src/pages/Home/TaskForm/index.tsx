import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Paper,
  TextField,
} from '@mui/material'
import { FormGroup, SelectOptionIndicator, TaskFormContainer } from './styles'
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp'
import { useState } from 'react'
import GoogleMaps from '../../../components/GMapsAdressAutofill'

interface CategoryOptions {
  id: number
  color: string
  value: string
}

interface TaskTagItem {
  id: number
  value: string
  color: string
  category: string
}

export function TaskForm() {
  const tagsList: TaskTagItem[] = [
    {
      id: 1,
      value: 'Front-end',
      color: '#b53f3f',
      category: 'Front-end',
    },
    {
      id: 2,
      value: 'Back-end',
      color: '#3f51b5',
      category: 'Back-end',
    },
    {
      id: 3,
      value: 'Mobile',
      color: '#00ff26',
      category: 'Mobile',
    },
    {
      id: 4,
      value: 'Design',
      color: '#3f51b5',
      category: 'Design',
    },
    {
      id: 5,
      value: 'DevOps',
      color: '#ff00ae',
      category: 'DevOps',
    },
  ]
  const categories: CategoryOptions[] = [
    {
      id: 1,
      color: 'red',
      value: 'Shopping',
    },
    {
      id: 2,
      color: 'green',
      value: 'Studies',
    },
    {
      id: 3,
      color: 'blue',
      value: 'Entertrainment',
    },
    {
      id: 4,
      color: 'black',
      value: 'Other',
    },
  ]
  const [tags, setTags] = useState<TaskTagItem[]>(tagsList)

  return (
    <div className="formContainer">
      <TaskFormContainer>
        <Paper
          elevation={3}
          sx={{
            'margin-top': '1rem',
            padding: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <div className="row">
            {/* Category Field */}
            <FormGroup size={5}>
              <Autocomplete
                aria-required
                id="taskCategory"
                fullWidth
                options={categories}
                getOptionLabel={(option) => option.value}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <SelectOptionIndicator color={option.color} />
                    {option.value}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Category"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'Category',
                    }}
                    variant="standard"
                  />
                )}
              ></Autocomplete>
            </FormGroup>

            {/* Task Title */}
            <FormGroup size={5}>
              <TextField
                required
                id="task-title"
                name="task-title"
                label="Task Title"
                fullWidth
                variant="standard"
              />
            </FormGroup>
          </div>

          <div className="row">
            {/* Address */}
            <FormGroup size={10}>
              {/* <TextField id="task-address" label="Address" variant="standard" /> */}
              <GoogleMaps />
            </FormGroup>
          </div>

          <div className="row">
            {/* Price */}
            <FormGroup size={4}>
              <TextField
                id="task-medium-price"
                label="Task Medium Price"
                variant="standard"
              />
            </FormGroup>
            {/* WeekDays opened */}
            <FormGroup size={3}>
              <TextField
                id="task-week-days"
                label="Weekdays Opened"
                variant="standard"
              />
            </FormGroup>
            {/* Opening Hours */}
            <FormGroup size={3}>
              <TextField
                id="task-opening-hours"
                label="Opening Hours"
                variant="standard"
              />
            </FormGroup>
          </div>

          <div className="row">
            {/*  Task Description */}
            <FormGroup size={10}>
              <TextField
                id="task-description"
                label="Task Description"
                multiline
                rows={5}
                variant="standard"
              />
            </FormGroup>
          </div>

          <div className="row">
            {/*  Tags */}
            <FormGroup size={10}>
              <Autocomplete
                id="task=tags"
                multiple
                options={tags}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      label={option.value}
                      key={option.value}
                      sx={{
                        backgroundColor: option.color,
                      }}
                    />
                  ))
                }}
                getOptionLabel={(option) => option.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Add Tag"
                    variant="standard"
                  />
                )}
              ></Autocomplete>
            </FormGroup>
          </div>

          <div className="row">
            {/*  Task Description */}
            <FormGroup size={10}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<TaskAltSharpIcon />}
              >
                Create Task
              </Button>
            </FormGroup>
          </div>
        </Paper>
      </TaskFormContainer>
    </div>
  )
}
