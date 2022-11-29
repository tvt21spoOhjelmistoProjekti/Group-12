import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { UserContext } from '../../context/UserContext';

const V3_V4 = ({ V3_V4_data, V10_Data }) => {
    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)



    const getData = async () => {
        try {


            var response = []
            var response2 = []

            if (!V3_V4_data && !V10_Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V3_V4", config)
                response2 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V10", config)
            } else {
                response.data = V3_V4_data
                response2.data = V10_Data
            }

            console.log(response2)

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
                    {
                        label: "Optional DSS",
                        data: response.data.filter(d => d.DSS_Year_AD != 0).map(d => ({ time: new Date(d.DSS_Year_AD + "-01-01"), value: d.DSS_CO2_Mixing_Ratio })),
                        borderColor: "green",
                        backgroundColor: "grey",
                        borderWidth: 2,


                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        hidden: true

                    },


                    {
                        label: "Optional DE",
                        data: response.data.filter(d => d.DE_Year_AD != 0).map(d => ({ time: new Date(d.DE_Year_AD + "-01-01"), value: d.DE_CO2_Mixing_Ratio })),
                        borderColor: "purple",
                        backgroundColor: "grey",
                        borderWidth: 2,

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        hidden: true

                    },
                    {
                        label: "Optional DE08",
                        data: response.data.filter(d => d.DE08_Year_AD != 0).map(d => ({ time: new Date(d.DE08_Year_AD + "-01-01"), value: d.DE08_CO2_Mixing_ratio })),
                        borderColor: "red",
                        backgroundColor: "grey",
                        borderWidth: 2,

                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        hidden: true

                    },
                    {
                        label: "Human events 1006 -> 1950",
                        data: response2.data.filter(d => d.Year > 1100).map(d => ({ time: new Date(d.Year + "-01-01"), value: d.value, event: d.Event })),
                        borderColor: "black",
                        backgroundColor: "black",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        borderWidth: 2,
                        pointRadius: 2,
                        showLine: false,
                        hidden: true

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
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
        stacked: false,
        plugins: {
            tooltip: {
                boxWidth: 10,
                width: 100,
                callbacks: {
                    label: function (item) {
                        if (item.datasetIndex == 5) {
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
        <div>
            {tableData && <div className='min-h-[400px]'><Line options={options} data={tableData} /></div>}
            <div className='m-3'>
                <h1> <p className="font-bold">{"What does this chart show ?"}</p> Line chart results of Atmospheric Carbon Dioxide measurements at Mauna Loa for the past 65 years, and optional data for CO2 measurements compared to 3 different ice sample types starting from year 1006.  </h1>

                <ul className='mt-3 list-disc'>
                    <label className='font-semibold'>Sources</label>
                    <li className='ml-5'>
                        <a href='https://gml.noaa.gov/ccgg/trends/'>Data source for annual and monthly data.</a>
                    </li>
                    <li className='ml-5'>
                        <a href='https://gml.noaa.gov/ccgg/about/co2_measurements.html'>Measurement description. </a>
                    </li>
                    <li className='ml-5'>
                        <a href='https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat'>Data source for optional data.</a>
                    </li>
                    <li className='ml-5'>
                        <a href='https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html'>Optional data measurement description.</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default V3_V4
