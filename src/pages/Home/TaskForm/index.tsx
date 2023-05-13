/* eslint-disable no-unused-vars */
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { currencyFormatter } from '../../../services/utils'
import { CategoryOptions, TaskTagItem } from '../../../models/task.models'

// #region Content (temporary)
const tagsList: TaskTagItem[] = [
  {
    id: 1,
    value: 'Front-end',
    color: '#c57d7d',
    category: 'Front-end',
  },
  {
    id: 2,
    value: 'Back-end',
    color: '#8393eb',
    category: 'Back-end',
  },
  {
    id: 3,
    value: 'Mobile',
    color: '#96dfa1',
    category: 'Mobile',
  },
  {
    id: 4,
    value: 'Design',
    color: '#8896e4',
    category: 'Design',
  },
  {
    id: 5,
    value: 'DevOps',
    color: '#ed94d1',
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
// #endregion

export function TaskForm() {
  const [tags] = useState<TaskTagItem[]>(tagsList)
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([])
  const [price, setPrice] = useState('R$ 0,00')
  let selectedTags: any = []

  const TaskFormValidationSchema = z.object({
    category: z.string().nonempty('Seleção de categoria é obrigatória'),
    title: z.string().nonempty('Obrigatório preencher o título da task'),
    // address: z.string(),
    price: z.string(),
    weekdaysOpened: z.array(z.string()),
    tags: z
      .array(z.string())
      .transform((e) => console.log(e))
      .refine(() => {
        return !selectedTags.length
      }),
    description: z.string().nonempty(),
    principalLink: z.string().nullable(),
  })

  type TaskItemFormData = z.infer<typeof TaskFormValidationSchema>

  const { register, handleSubmit, formState, trigger } =
    useForm<TaskItemFormData>({
      resolver: zodResolver(TaskFormValidationSchema),
    })

  const { errors } = formState

  function handleChangeWeekday(event: SelectChangeEvent<string[]>) {
    const value = event.target.value
    setSelectedWeekdays(typeof value === 'string' ? value.split(',') : value)
    trigger('weekdaysOpened')
  }

  const handleInputPrice = (event: any) => {
    let value = event.target.value
    value = value.replace(/\D+/g, '')
    setPrice(currencyFormatter.format(value / 100 || 0))
  }

  function handleSubmitForm(data: TaskItemFormData) {
    console.log(data)
  }

  return (
    <div className="formContainer">
      <TaskFormContainer onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <Paper className="paper" elevation={3}>
          <div className="row">
            {/* Category Field */}
            <FormGroup size={5}>
              <Autocomplete
                fullWidth
                options={categories}
                getOptionLabel={(option) => option.value}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <SelectOptionIndicator color={option.color} />
                    {option.value}
                  </Box>
                )}
                onBlur={() => trigger('category')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('category')}
                    label="Select a Category"
                    inputProps={{
                      ...params.inputProps,
                    }}
                    variant="standard"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              ></Autocomplete>
            </FormGroup>

            {/* Task Title */}
            <FormGroup size={5}>
              <TextField
                fullWidth
                label="Task Title *"
                variant="standard"
                autoComplete="false"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </FormGroup>
          </div>

          <div className="row">
            {/* Address */}
            <FormGroup size={10}>
              <GoogleMaps />
            </FormGroup>
          </div>

          <div className="row">
            {/* Price */}
            <FormGroup size={3}>
              <TextField
                {...register('price')}
                label="Medium Price"
                required={false}
                variant="standard"
                value={price}
                onChange={handleInputPrice}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </FormGroup>
            {/* WeekDays opened */}
            <FormGroup size={4}>
              <FormControl>
                <InputLabel id="task-week-days">Weekdays Opened</InputLabel>
                <Select
                  labelId="task-week-days"
                  multiple
                  {...register('weekdaysOpened')}
                  value={selectedWeekdays}
                  onChange={handleChangeWeekday}
                  input={<Input id="select-weekdays" />}
                  error={!!errors.weekdaysOpened}
                  renderValue={(selected) => (
                    <Box className="multiSelectBox">
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
                label="Opening Hours"
                variant="standard"
                autoComplete="false"
              />
            </FormGroup>
          </div>

          <div className="row">
            {/*  Task Description */}
            <FormGroup size={10}>
              <TextField
                multiline
                label="Task Description"
                {...register('description')}
                minRows={2}
                variant="filled"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </FormGroup>
          </div>

          <div className="row">
            {/*  Tags */}
            <FormGroup size={10}>
              <Autocomplete
                // {...register('tags')}
                {...register('tags')}
                onChange={(e, v) => {
                  selectedTags = v
                  trigger('tags')
                }}
                multiple
                options={tags}
                renderTags={(tagValue, getTagProps) => {
                  selectedTags = tagValue
                  // console.log(selectedTags)
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
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                  />
                )}
              ></Autocomplete>
            </FormGroup>
          </div>

          <div className="row">
            {/*  Principal Link */}
            <FormGroup size={10}>
              <TextField
                label="Principal Link"
                variant="standard"
                {...register('principalLink')}
                error={!!errors.principalLink}
                helperText={errors.principalLink?.message}
              />
            </FormGroup>
          </div>

          <div className="row">
            {/*  Task Create Button */}
            <FormGroup size={10}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<TaskAltSharpIcon />}
                type="submit"
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
