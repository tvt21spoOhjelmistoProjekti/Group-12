import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'

const V1 = () => {

    const [tableData, setTableData] = useState(null)

    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V1");
            const response2 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V2");



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
                        label: "Optional",
                        data: response2.data.map(d => ({ time: new Date(d.Year + "-01-01"), value: d.T })),
                        borderColor: "yellow",
                        borderWidth: 1,
                        backgroundColor: "yellow",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 1,
                        hidden: true
                    },
                ],
            })

        } catch (error) {
            console.log("err")
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Temperature Anomalies from 1850",
            },
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
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}</div>
    )
}

export default V1