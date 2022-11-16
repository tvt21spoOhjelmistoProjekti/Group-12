import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V5 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V5_Data", config);



            setTableData({
                datasets: [
                    {
                        label: "Depth (m)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.depth })),
                        borderColor: "black",
                        backgroundColor: "black",

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1.5,

                    },

                    {
                        label: "Age of the ice (yr BP)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.age })),
                        borderColor: "red",
                        backgroundColor: "red",

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1.5,

                    },

                    {
                        label: "CO2 Concentration (ppmv)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.co2 })),
                        borderColor: "blue",
                        backgroundColor: "blue",

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1.5,

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
                text: "Vostok Ice Core CO2 measurements, 417160 - 2342 years",
            },
        },
        scales: {
            x: {
                type: "linear",

            },
            yAxis: {
                type: "logarithmic",

            },
        },
    };

    return (
        <div>{tableData && <Line options={options} data={tableData} />}</div>
    )
}

export default V5