import React from 'react'
import { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, fireEvent, getByText, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import Navbar from '../Navbar'

global.ResizeObserver = require('resize-observer-polyfill')


afterAll(cleanup)
afterEach(cleanup)

test('It should get to deleteAcc function', async () => {

    // make mock function
    const deleteMockFunction = jest.fn()

    const exampleContext = {
        status: "logged_in",
        token: "TOKEN",
        username: "USERNAME",
        userId: "4",
        fullname: "PEKKA"
    }
    // Lets render our component
    render(
        <BrowserRouter>
            <Navbar deleteMockFunction={deleteMockFunction} exampleContext={exampleContext} />
        </BrowserRouter>
    )
    fireEvent.click(screen.getByText('PEKKA'))
    fireEvent.click(screen.getByText('Delete account'))
    await waitFor(() => expect(deleteMockFunction.mock.calls).toHaveLength(1))
})

test('It should not get because button named {Delete account} is never clicked', async () => {

    // make mock function
    const deleteMockFunction = jest.fn()

    const exampleContext = {
        status: "logged_in",
        token: "TOKEN",
        username: "USERNAME",
        userId: "4",
        fullname: "PEKKA"
    }
    // Lets render our component
    render(
        <BrowserRouter>
            <Navbar deleteMockFunction={deleteMockFunction} exampleContext={exampleContext} />
        </BrowserRouter>
    )
    fireEvent.click(screen.getByText('PEKKA'))

    await waitFor(() => expect(deleteMockFunction.mock.calls).toHaveLength(0))
})