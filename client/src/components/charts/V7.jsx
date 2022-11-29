import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V7 = ({ V10_Data, V7_Data }) => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [data_link, setData_link] = useState("")
    const [desc_link, setDesc_link] = useState("")

    const getData = async () => {
        try {


            var response = []
            var responseV10 = []

            setDescription(response.data[0].description)
            setData_link(response.data[0].data_link)
            setDesc_link(response.data[0].desc_link)


            if (!V10_Data && !V7_Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V7", config);
                responseV10 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V10", config);
            } else {
                response.data = V7_Data
                responseV10.data = V10_Data
            }

            setTableData({
                datasets: [
                    {
                        label: "CO2 (ppm)",
                        data: response.data.map(d => ({ xAxis: d.time, value: d.co2 })),
                        borderColor: "blue",
                        backgroundColor: "blue",
                        yAxisID: 'y',

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1,
                        order: 2
                    },

                    {
                        label: "Change in Global Average Surface Temperature",
                        data: response.data.map(d => ({ xAxis: d.time, value: d.temp_change })),
                        borderColor: "red",
                        backgroundColor: "red",
                        yAxisID: 'y1',

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1,
                        order: 3
                    },
                    {
                        label: "Human events",
                        data: responseV10.data.filter(d => d.YearsAgo < 2000000 && 1000 < d.YearsAgo).map(d => ({ xAxis: d.YearsAgo / 1000, value: d.value, event: d.Event })),
                        borderColor: "black",
                        backgroundColor: "black",
                        yAxisID: 'y1',

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },

                        borderWidth: 1,
                        pointRadius: 4,
                        showLine: false,
                        order: 1
                    },

                ],
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const options = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        stacked: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Evolution of global temperature over the past two million years",
            },
            tooltip: {
                boxWidth: 10,
                width: 100,
                callbacks: {
                    label: function (item) {
                        if (item.datasetIndex == 2) {
                            var substr1 = item.dataset.data[item.dataIndex].event.substr(0, 100)
                            var substr2 = item.dataset.data[item.dataIndex].event.substr(100 + 1)
                            if (item.dataset.data[item.dataIndex].event.charAt(99 != " ")) {
                                substr1 += "-"
                            }
                            return [substr1, substr2]
                        } else {
                            return item.dataset.label + " :" + item.formattedValue + " CO2"
                        }
                    }
                },
            },
        },
        scales: {
            x: {
                type: "linear",
                display: "true",
                align: "center",
                title: {
                    display: "true",
                    text: "Kiloyears before present",
                }

            },
            y: {
                type: "linear",
                display: "true",
                position: "left",
                title: {
                    display: "true",
                    text: "CO2 / ppm",
                    color: "blue",
                }

            },
            y1: {
                type: "linear",
                display: "true",
                position: "right",
                title: {
                    display: "true",
                    text: "Temp change / thousand years",
                    color: "red",
                },
                grid: {
                    drawOnChartArea: false,
                }

            },
        },
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}
            <div className='pt-2 px-3 text-justify'>
                <p>{description}</p>
                <div className='pt-5 font-bold font-sans hover:font-extrabold text-blue-500'>
                    <a href={desc_link} target="_blank">Study description</a>
                </div>
                <div className='pt-5 font-bold font-sans hover:font-extrabold text-blue-500'>
                    <a href={data_link} target="_blank">Dataset</a>
                </div>

            </div>
        </div>

    )
}

export default V7