import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { UserContext } from '../../context/UserContext';

const V3 = () => {
    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)


    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V3", config)
            console.log(response.data.map(d => ({ time: new Date(d.Time_Montly), value: d.Average_Monthly })))
            //console.log(response.data)


            setTableData({
                datasets: [
                    {
                        label: "Annual Mean Data",
                        data: response.data.filter(d => d.Mean_Annual != 0).map(d => ({ time: new Date(d.Time_Annual + "-01-01"), value: d.Mean_Annual })),
                        borderColor: "black",
                        backgroundColor: "grey",
                        borderWidth: 2,

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    {
                        label: "Monthly mean Data",
                        data: response.data.map(d => ({ time: new Date(d.Time_Montly + "-" + d.Month), value: d.Average_Monthly })),
                        borderColor: "#000AFF",
                        borderWidth: 1,
                        backgroundColor: "#6A70FF",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
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
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958",
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

export default V3
