import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, fireEvent, getByText, waitFor } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import V1 from '../charts/V1';
import { dataForChart } from './ChartMockData';

beforeEach(() => {


})

it('renders content V1', async () => {

    const { getByText } = render(<BrowserRouter><V1 v1Data={dataForChart} /></BrowserRouter>)

    await new Promise((r) => setTimeout(r, 2000));

    await waitFor(() => {
        expect(getByText('Description')).toBeInTheDocument()
    })

})