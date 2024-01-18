import { fireEvent, render, screen } from '@testing-library/vue'
import { expect, test } from 'vitest'
import App from './App.vue'

test('renders the footer text', () => {
  render(App)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeTruthy()
})

test('add button toggle disabled by description value and clear button', async () => {
  const addButton = screen.getByRole('button', { name: /addItem/i })
  expect(addButton.getAttribute('disabled')).toBe('')

  const descriptionInputElement = screen.getByRole('textbox', { name: /descriptionInput/i })
  const testInput = 'Test description text'
  await fireEvent.update(descriptionInputElement, testInput)

  expect(addButton.getAttribute('disabled')).toBe(null)

  const clearButtonElement = screen.getByRole('button', { name: /clearForm/i })
  await fireEvent.click(clearButtonElement)

  expect(addButton.getAttribute('disabled')).toBe('')
//   expect(descriptionInputElement).equals('')
})
// // todo test functionality
// // get items
// // add item
// // mark item completed
// // show errors
