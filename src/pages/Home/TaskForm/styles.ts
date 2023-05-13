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
  size?: keyof typeof FORM_GROUP_SIZE
  color?: string
}

// Component Styling
export const TaskFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  /* width: 40rem; */
  gap: 0.5rem;
  margin: auto;

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .paper {
    margin-top: 1rem;
    padding: 1rem;
    box-sizing: border-box;
  }

  .multiSelectBox {
    display: flex;
    flex: 1;
    flex-wrap: 'wrap';
    gap: 0.5rem;
  }
`

export const FormGroup = styled.div<TaskFormProps>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: auto;
  width: ${(props) => FORM_GROUP_SIZE[props.size || 10]};
  padding: 0.5rem;
`

export const SelectOptionIndicator = styled.div<TaskFormProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
`
