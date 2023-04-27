import styled from 'styled-components'

// Component Properties
const FORM_GROUP_SIZE = {
  1: '10%',
  2: '20%',
  3: '30%',
  4: '40%',
  5: '50%',
  6: '60%',
  7: '70%',
  8: '80%',
  9: '90%',
  10: '100%',
} as const

interface TaskFormProps {
  size: keyof typeof FORM_GROUP_SIZE
}

// Component Styling
export const TaskFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;
  gap: 0.5rem;
  margin: auto;

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const FormGroup = styled.div<TaskFormProps>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: auto;
  width: ${(props) => FORM_GROUP_SIZE[props.size]};
  padding: 0.5rem;

  label {
    font-weight: 600;
  }
  input,
  select {
    font-size: 1.25rem;
    padding: 0.25rem;
    /* border-radius: 0.25rem; */
    border: 1px solid #ccc;
    color: ${(props) => props.theme['gray-700']};
    box-shadow: 0px 1px 3px ${(props) => props.theme['prirmary-color']};
    border-color: transparent transparent
      ${(props) => props.theme['prirmary-color']} transparent;

    &:focus,
    &:focus-visible {
      outline: 0;
    }
  }
`
