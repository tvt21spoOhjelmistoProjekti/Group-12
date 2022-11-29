import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V5 = ({ V5_Data }) => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [data_link, setData_link] = useState("")
    const [desc_link, setDesc_link] = useState("")

    const getData = async () => {

        try {
            var response = []

            if (!V5_Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V5_Data", config);
            } else {
                response.data = V5_Data;
            }

            setDescription(response.data[0].description)
            setData_link(response.data[0].data_link)
            setDesc_link(response.data[0].desc_link)


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
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (item) {
                        console.log(item)
                        let returnValue = `${item.dataset.label == "Depth (m)" ? "Depth" : "CO2 Concentration"}: ${item.formattedValue} ${item.dataset.label == "Depth (m)" ? "m" : "ppmv"}`
                        return returnValue
                    }
                },
            },
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
                title: {
                    display: "true",
                    text: "Years before present",
                },

            },
            yAxis: {
                type: "logarithmic",


            },
        },
    };

    return (
        <div className='max-w-[1000px]'>
            {tableData && <Line options={options} data={tableData} />}
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

export default V5