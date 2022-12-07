import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, fireEvent, getByText, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import Register from '../Register';



afterAll(cleanup)
afterEach(cleanup)

describe('testing register', () => {
    // UserEvent, this is made for example clicking button
    const user = userEvent.setup()
    // make mock function
    const onSubmit = jest.fn()
    // Lets render our component
    render(<BrowserRouter><Register onSubmitForTest={onSubmit} /></BrowserRouter>)
    // Lets get all our buttons and inputfields
    const button = screen.getByText('Create Account')
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const fullNameInput = screen.getByPlaceholderText('Full Name')
    const ageInput = screen.getByPlaceholderText('Age')

    it('Register form, all values inserted correctly', async () => {

        /// inserting values to inputfields
        fireEvent.change(usernameInput, { target: { value: 'user' } })
        fireEvent.change(passwordInput, { target: { value: '1234' } })
        fireEvent.change(fullNameInput, { target: { value: 'Jari Johnsson' } })
        fireEvent.change(ageInput, { target: { value: '2' } })

        // Submitting a from
        await user.click(button)
        await waitFor(() => expect(onSubmit.mock.calls).toHaveLength(1))

    })


    it('Register form, invalid age, age is given by string', async () => {
        // INVALID Age

        fireEvent.change(usernameInput, { target: { value: 'user' } })
        fireEvent.change(passwordInput, { target: { value: '1234' } })
        fireEvent.change(fullNameInput, { target: { value: 'Jari Johnsson' } })
        // INVALID
        fireEvent.change(ageInput, { target: { value: 'string' } })

        await user.click(button)
        await waitFor(() => {
            expect(usernameInput).toBeValid()
            expect(passwordInput).toBeValid()
            expect(fullNameInput).toBeValid()
            // Invalid because age should be number not string
            expect(ageInput).toBeInvalid()

        })
    })


    it('Register form, invalid FullNameInput, fullname is null so it should be invalid', async () => {
        // INVALID FullNameInput

        fireEvent.change(usernameInput, { target: { value: 'user' } })
        fireEvent.change(passwordInput, { target: { value: '1234' } })
        // INVALID
        fireEvent.change(fullNameInput, { target: { value: null } })
        fireEvent.change(ageInput, { target: { value: '12' } })

        await user.click(button)
        await waitFor(() => {
            expect(usernameInput).toBeValid()
            expect(passwordInput).toBeValid()
            expect(fullNameInput).toBeInvalid()
            expect(ageInput).toBeValid()
        })
    })

    it('Register form, invalid password, password is null so it should be invalid', async () => {
        // INVALID password

        fireEvent.change(usernameInput, { target: { value: 'user' } })
        // INVALID
        fireEvent.change(passwordInput, { target: { value: null } })
        fireEvent.change(fullNameInput, { target: { value: 'Jari-matti' } })
        fireEvent.change(ageInput, { target: { value: '12' } })

        await user.click(button)
        await waitFor(() => {
            expect(usernameInput).toBeValid()
            expect(passwordInput).toBeInvalid()
            expect(fullNameInput).toBeValid()
            expect(ageInput).toBeValid()
        })
    })

    it('Register form, invalid username, username is null so it should be invalid', async () => {
        // INVALID username

        // INVALID
        fireEvent.change(usernameInput, { target: { value: null } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.change(fullNameInput, { target: { value: 'Jari-matti' } })
        fireEvent.change(ageInput, { target: { value: '12' } })

        await user.click(button)
        await waitFor(() => {
            expect(usernameInput).toBeInvalid()
            expect(passwordInput).toBeValid()
            expect(fullNameInput).toBeValid()
            expect(ageInput).toBeValid()
        })
    })

})


