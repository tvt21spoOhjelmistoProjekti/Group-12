import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import axios from "axios";
import { UserContext } from "../../context/UserContext";


const V6 = () => {


    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    const getData = async () => {


        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V6", config)

            console.log(response.data)

            setTableData({
                datasets: [
                    {
                        label: "CO2 Concentration Data",
                        data: response.data.map(d => ({ xAxis: d.Calendar_years_BP, value: d.CO2_concentration })),
                        borderColor: "#2CCCE4",
                        backgroundColor: "#A4DD00",
                        borderWidth: 2,

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,

                    },
                    {
                        label: "CO2 Concentration Sigma Mean Data",
                        data: response.data.map(d => ({ xAxis: d.Calendar_years_BP, value: d.concentration_sigma_mean })),
                        borderColor: '#FF9800',
                        borderWidth: 1,
                        backgroundColor: "#9F0500",
                        parsing: {
                            xAxisKey: "xAxis",
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
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            legend: {
                position: "top",

            },
            title: {
                display: true,
                text: "Ice core 800k year composite study CO2 measurements",
            },
        },
        scales: {
            x: {
                type: "linear",
                min: -60,
                max: 806000
            },
            yAxis: {
                type: "logarithmic",
            },
        },
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}
            <div className='pt-2 px-3 text-justify'>
                <p>Revised EPICA Dome C and Antarctic composite ice core atmospheric CO2 data. This new version of CO2 composite
                    replaces the old version of Luthi et al. (2008), which contains the analytical bias described in Bereiter et al. 2015
                    and lower quality data in other sections.</p>
                <div className='pt-5 font-bold font-sans hover:font-serif text-orange-400'>
                    <a href='https://www.ncei.noaa.gov/access/paleo-search/study/17975'>Study description</a>
                </div>
                <div className='pt-5 font-bold font-sans hover:font-serif text-orange-400'>
                    <a href='https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt'>Data source</a>
                </div>
            </div>
        </div>
    )
}

export default V6