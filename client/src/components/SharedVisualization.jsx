import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import V1 from './charts/V1'
import V3_V4 from './charts/V3'
import V5 from './charts/V5'
import V6 from './charts/V6'
import V7 from './charts/V7'
import V9 from './charts/V9'

const SharedVisualization = () => {
    const { urlParam } = useParams()

    const [details, setDetails] = useState([])
    const [chartData, setChartData] = useState([])

    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "getvisualization/" + urlParam)
            //console.log(response)

            setDetails(response.data.details)
            let test = [];
            let chartDataObj = {};

            if (response.data?.V1 && response.data?.V2) {
                chartDataObj = { ...chartDataObj, V1: response.data.V1 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V1 v1Data={response.data.V1} v2Data={response.data.V2} /></div>]
            }
            if (response.data?.V3) {
                chartDataObj = { ...chartDataObj, V3: response.data.V3 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V3_V4 /> </div>]
            }
            if (response.data?.V5) {
                chartDataObj = { ...chartDataObj, V5: response.data.V5 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V5 /></div>]
            }
            if (response.data?.V6) {
                chartDataObj = { ...chartDataObj, V6: response.data.V6 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V6 /></div>]
            }
            if (response.data?.V7) {
                chartDataObj = { ...chartDataObj, V7: response.data.V7 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V7 /></div>]
            }

            if (response.data?.V9) {
                chartDataObj = { ...chartDataObj, V9: response.data.V9 }
                test = [...test, <div className='bg-white rounded shadow-2xl'> <V9 /></div>]
            }
            setChartData(test)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='flex flex-col space-y-6 justify-center items-center bg-blue-400 pt-20 pb-20'>
            <div className='rounded px-8 lg:w-2/5 flex flex-col '>
                <div className='bg-white rounded px-8 w-full flex flex-col py-3'>
                    <p className='font-bold text-2xl'>
                        {details.title}
                    </p>
                    <p className='text-xl'>
                        {details.description}
                    </p>
                </div>
            </div>

            <div className={details.columns == 2 ? 'px-8 w-screen lg:w-2/5 flex flex-col space-y-8' : 'grid grid-cols-1 lg:grid-cols-2 gap-10 xl:px-20'}>
                {chartData}
            </div>
        </div>
    )
}

export default SharedVisualization