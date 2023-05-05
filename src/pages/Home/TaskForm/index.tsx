import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
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
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
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
  const weekdays: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }
  const weekdaysList: string[] = Object.keys(weekdays)

  const [tags, setTags] = useState<TaskTagItem[]>(tagsList)
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([])
  const [price, setPrice] = useState('')

  const handleChangeWeekday = (
    event: SelectChangeEvent<typeof selectedWeekdays>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedWeekdays(typeof value === 'string' ? value.split(',') : value)
  }

  const handleInputPrice = (event: any) => {
    let value = event.target.value
    value = value.replace(/\D+/g, '')
    setPrice(currencyFormatter.format(value / 100 || 0))
  }
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
            <FormGroup size={3}>
              <TextField
                id="task-medium-price"
                label="Medium Price"
                variant="standard"
                value={price}
                onChange={handleInputPrice}
              />
            </FormGroup>
            {/* WeekDays opened */}
            <FormGroup size={4}>
              <FormControl>
                <InputLabel id="task-week-days">Weekdays Opened</InputLabel>
                <Select
                  labelId="task-week-days"
                  id="task-week-days-opened"
                  multiple
                  value={selectedWeekdays}
                  onChange={handleChangeWeekday}
                  input={<Input id="select-weekdays" />}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.25,
                      }}
                    >
                      {selected
                        .sort((a, b) => weekdays[a] - weekdays[b])
                        .map((value: string) => (
                          <Chip
                            key={value}
                            size="small"
                            label={value.charAt(0)}
                            title={value}
                          />
                        ))}
                    </Box>
                  )}
                >
                  {weekdaysList.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                minRows={2}
                variant="filled"
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
            {/*  Principal Link */}
            <FormGroup size={10}>
              <TextField
                id="task-principal-link"
                label="Principal Link"
                variant="standard"
              />
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
