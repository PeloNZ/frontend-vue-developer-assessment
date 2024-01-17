import { render, screen } from '@testing-library/vue'
import { test, expect } from 'vitest'
import App from './App.vue'

test('renders the footer text', () => {
  render(App)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeTruthy()
})

test('get items when mounted', async () => {
  render(App)

  const listElement = screen.getByText('Showing 0 Item(s)')
  expect(listElement).toBeTruthy();
})

// todo test functionality
// get items
// add item
// mark item completed
// show errors
