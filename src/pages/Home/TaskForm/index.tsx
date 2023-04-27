import { Autocomplete, Box, Paper, TextField } from '@mui/material'
import { FormGroup, SelectOptionIndicator, TaskFormContainer } from './styles'

export function TaskForm() {
  const categories = [
    {
      id: 1,
      color: 'red',
      value: 'Compras',
    },
    {
      id: 2,
      color: 'green',
      value: 'Estudos',
    },
    {
      id: 3,
      color: 'blue',
      value: 'Compras',
    },
  ]

  return (
    <div className="formContainer">
      <TaskFormContainer>
        <Paper elevation={3}>
          <div className="row">
            {/* Category Field */}
            <FormGroup size={5}>
              <Autocomplete
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
                      autoComplete: 'new-password',
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

          {/*  Task Description */}
          <div className="row">
            <FormGroup size={10}>
              <TextField
                id="task-description"
                label="Task Description"
                multiline
                rows={3}
                variant="standard"
              />
            </FormGroup>
          </div>
        </Paper>
      </TaskFormContainer>
    </div>
  )
}
