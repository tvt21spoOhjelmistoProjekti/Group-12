import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';
import 'chartjs-plugin-zoom';

const V1 = () => {

    const [tableData, setTableData] = useState(null)
    const [options, setOptions] = useState(null)
    const { user, setUser } = useContext(UserContext)


    const getData = async () => {


        try {
            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V1", config);
            const response2 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V2", config);




            setTableData({
                datasets: [
                    {
                        label: "Global Annual",
                        data: response.data.map(d => ({ time: new Date(d.time_ga), value: d.anomaly_ga })),
                        borderColor: "black",
                        backgroundColor: "grey",

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 0.9,

                    },
                    {
                        label: "Global Monthly",
                        data: response.data.map(d => ({ time: new Date(d.time_gm), value: d.anomaly_gm })),
                        borderColor: "black",
                        backgroundColor: "grey",

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 0.9,

                    },
                    ////////////////////////////////////////////
                    {
                        label: "Southern Hemisphere Monthly",
                        data: response.data.map(d => ({ time: new Date(d.time_shm), value: d.anomaly_shm })),
                        borderColor: "red",
                        borderWidth: 1,
                        backgroundColor: "#FF6B6B",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    {
                        label: "Southern Hemisphere Annual",
                        data: response.data.map(d => ({ time: new Date(d.time_sha), value: d.anomaly_sha })),
                        borderColor: "red",
                        borderWidth: 1,
                        backgroundColor: "#FF6B6B",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    /////////////////////////////////////////////////
                    {
                        label: "Northern Hemisphere Monthly",
                        data: response.data.map(d => ({ time: new Date(d.time_nhm), value: d.anomaly_nhm })),
                        borderColor: "#000AFF",
                        borderWidth: 1,
                        backgroundColor: "#6A70FF",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    {
                        label: "Northern Hemisphere Annual",
                        data: response.data.filter(d => d.anomaly_nha !== 0).map(d => ({ time: new Date(d.time_nha + "-01-01"), value: d.anomaly_nha })),
                        borderColor: "#000AFF",
                        borderWidth: 1,
                        backgroundColor: "#6A70FF",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    {
                        label: "(Optional) Northern Hemisphere temperature reconstruction",
                        data: response2.data.map(d => ({ time: new Date(d.Year + "-01-01"), value: d.T })),
                        borderColor: "#f64aff",
                        borderWidth: 2,
                        backgroundColor: "#f64aaa",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 1,
                        hidden: true
                    },
                ],
            })

            setOptions({
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Temperature Anomalies from 1850",
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            enabled: true,
                            drag: true,
                            mode: 'xy'
                        }
                    }

                },
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "month",
                        },
                    },
                    yAxis: {
                        type: "linear",
                    },
                },

            })

        } catch (error) {
            console.log("err")
        }
    }

    useEffect(() => {
        getData()
    }, [])



    return (
        <div>{tableData && <Line options={options} data={tableData} />}
            <div className='m-3'>
                <p> <storng className="font-bold">{"(Optional data)"}</storng> Northern Hemisphere temperature reconstruction for the 1850-1979 years by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data.</p>

                <ul className='mt-3 list-disc'>
                    <label className='font-semibold'>Sources</label>
                    <li className='ml-5'>
                        <a href='https://www.metoffice.gov.uk/hadobs/hadcrut5/'>Temperature Anomalies from 1850</a>
                    </li>
                    <li className='ml-5'>
                        <a href='https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005'>Optional data</a>
                    </li>
                    <li className='ml-5'>
                        <a href='https://gml.noaa.gov/ccgg/about/co2_measurements.html'>Optional data measurement description</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default V1