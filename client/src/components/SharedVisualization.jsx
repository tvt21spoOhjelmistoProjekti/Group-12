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
import V8 from './charts/V8'
import V9 from './charts/V9'

const SharedVisualization = () => {
    const { urlParam } = useParams()

    const [details, setDetails] = useState([])
    const [chartData, setChartData] = useState([])
    const [chartData2, setChartData2] = useState([])

    const getData = async () => {
        try {
            var response = await axios.get(process.env.REACT_APP_REQUEST_URL + "getvisualization/" + urlParam)
            console.log(response)

            setDetails(response.data.details)
            let charts1 = [];
            let chartDataObj = {};
            var charts2 = [];
            var counter = 1;


            if (response.data?.V1 && response.data?.V2) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V1 v1Data={response.data.V1} v2Data={response.data.V2} /></div>]
                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V1 v1Data={response.data.V1} v2Data={response.data.V2} /></div>]
                }
                counter++;
            }
            if (response.data?.V3_V4 && response.data?.V10) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V3_V4 V10_Data={response.data.V10} V3_V4_data={response.data.V3_V4} /> </div>]
                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V3_V4 V10_Data={response.data.V10} V3_V4_data={response.data.V3_V4} /> </div>]
                }
                counter++;
                counter++;
            }
            if (response.data?.V5_Data) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V5 V5_Data={response.data.V5_Data} /></div>]
                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V5 V5_Data={response.data.V5_Data} /></div>]
                }
                counter++;
            }
            if (response.data?.V6) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V6 V6Data={response.data.V6} /></div>]

                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V6 V6Data={response.data.V6} /></div>]
                }
                counter++;
            }
            if (response.data?.V7 && response.data?.V10) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V7 V10_Data={response.data.V10} V7_Data={response.data.V7} /></div>]

                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V7 V10_Data={response.data.V10} V7_Data={response.data.V7} /></div>]
                }
                counter++;
            }

            if (response.data?.V8) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V8 V8_Data={response.data.V8} /></div>]
                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V8 V8_Data={response.data.V8} /></div>]
                }
                counter++;
            }

            if (response.data?.V9) {
                if (response.data.details.columns == 2 && counter % 2 === 0) {
                    charts2 = [...charts2, <div className='bg-white rounded shadow-2xl'> <V9 V9Data={response.data.V9} /></div>]
                } else {
                    charts1 = [...charts1, <div className='bg-white rounded shadow-2xl'> <V9 V9Data={response.data.V9} /></div>]
                }
                counter++;
            }
            setChartData(charts1)
            setChartData2(charts2)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (

        <div className='flex flex-col space-y-6 justify-center items-center bg-blue-400 p-20'>
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
            {details.columns == 1
                ?
                <div className={details.columns == 1 ? 'px-8 w-screen lg:w-2/5 flex flex-col space-y-8' : 'grid grid-cols-1 lg:grid-cols-2 gap-10 xl:px-20'}>
                    {chartData}
                </div>

                :

                <div className='flex flex-col lg:flex-row gap-10 p-4 lg:p-24 w-screen'>
                    <div className='w-full lg:w-1/2 flex flex-col gap-10'>{chartData} </div>
                    <div className='w-full lg:w-1/2 flex flex-col gap-10'>{chartData2} </div>
                </div>
            }
        </div>

    )
}

export default SharedVisualization