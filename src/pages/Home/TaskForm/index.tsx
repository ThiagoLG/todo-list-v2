import { useState } from 'react'
import { FormGroup, TaskFormContainer } from './styles'

export function TaskForm() {
  const [category, setCategory] = useState('Comer')

  const categories = ['Passeio', 'Comida']
  const subCategories = {
    Passeio: ['Cultural', 'Natureza'],
    Comida: ['Fast Food', 'Restaurante', 'Típico'],
  }

  return (
    <div className="formContainer">
      <TaskFormContainer>
        <div className="row">
          <FormGroup size={5}>
            <label htmlFor="title">Category</label>
            <select value={category}>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup size={5}>
            <label htmlFor="">Opção</label>
            <select></select>
          </FormGroup>
        </div>

        <div className="row">
          <FormGroup size={10}>
            <label htmlFor="title">Description</label>
            <input type="text" name="description" />
          </FormGroup>
        </div>
      </TaskFormContainer>
    </div>
  )
}
