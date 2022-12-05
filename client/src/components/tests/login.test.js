import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, fireEvent, getByText, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from 'history'




afterAll(cleanup)
afterEach(cleanup)

test('Log in form success and can send axios request', async () => {

    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<BrowserRouter><Login onSubmitForTest={onSubmit} /></BrowserRouter>)

    const button = screen.getByText('Log In')

    const usernameInput = screen.getByPlaceholderText('Username')
    fireEvent.change(usernameInput, { target: { value: 'user' } })


    const passwordInput = screen.getByPlaceholderText('Password')
    fireEvent.change(passwordInput, { target: { value: '1234' } })

    await user.click(button)
    await waitFor(() => {
        expect(onSubmit.mock.calls).toHaveLength(1)

    })

})

test('Log in form failed, no password example', async () => {

    const user = userEvent.setup()
    const onSubmit = jest.fn()


    render(<BrowserRouter><Login onSubmitForTest={onSubmit} /></BrowserRouter>)

    const button = screen.getByText('Log In')

    const usernameInput = screen.getByPlaceholderText('Username')
    fireEvent.change(usernameInput, { target: { value: 'user' } })


    const passwordInput = screen.getByPlaceholderText('Password')
    //fireEvent.change(passwordInput, { target: { value: '1234' } })

    await user.click(button)
    expect(usernameInput).toBeValid()
    expect(passwordInput).toBeInvalid()

})

