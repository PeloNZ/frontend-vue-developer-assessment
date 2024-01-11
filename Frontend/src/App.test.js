import { render, screen } from '@testing-library/vue'
import { test, expect } from 'vitest'
import App from './App.vue'

test('renders the footer text', () => {
  render(App)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeTruthy()
})

// todo test functionality
// get items
// add item
// mark item completed
// show errors
