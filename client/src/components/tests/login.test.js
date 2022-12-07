import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, fireEvent, getByText, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { BrowserRouter } from "react-router-dom";



afterAll(cleanup)
afterEach(cleanup)

test('Log in form success and can send axios request', async () => {

    // UserEvent, this is made for example clicking button
    const user = userEvent.setup()
    // make mock function
    const onSubmit = jest.fn()

    // Lets render our component
    render(<BrowserRouter><Login onSubmitForTest={onSubmit} /></BrowserRouter>)


    // Lets get all our buttons and inputfields
    const button = screen.getByText('Log In')
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')

    // inserting values to inputfields
    fireEvent.change(usernameInput, { target: { value: 'user' } })
    fireEvent.change(passwordInput, { target: { value: '1234' } })

    // Submitting a from
    await user.click(button)
    expect(onSubmit.mock.calls).toHaveLength(1)

})

test('Log in form failed, no password example', async () => {
    // UserEvent, this is made for example clicking button
    const user = userEvent.setup()
    // make mock function
    const onSubmit = jest.fn()

    // Lets render our component
    render(<BrowserRouter><Login onSubmitForTest={onSubmit} /></BrowserRouter>)

    // Lets get all our buttons and inputfields
    const button = screen.getByText('Log In')

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')


    /// inserting values to inputfields
    fireEvent.change(usernameInput, { target: { value: 'user' } })

    // Submitting a from
    await user.click(button)
    expect(usernameInput).toBeValid()
    expect(passwordInput).toBeInvalid()

})

