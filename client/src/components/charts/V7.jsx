import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V7 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V7", config);



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
                text: "Evolution of global temperature over the past two million years",
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
                <p>Reconstructions of Earth’s past climate strongly influence our
                    understanding of the dynamics and sensitivity of the climate
                    system. Yet global temperature has been reconstructed for only a few
                    isolated windows of time1,2
                    , and continuous reconstructions across
                    glacial cycles remain elusive. Here I present a spatially weighted
                    proxy reconstruction of global temperature over the past 2 million
                    years estimated from a multi-proxy database of over 20,000 sea
                    surface temperature point reconstructions. Global temperature
                    gradually cooled until roughly 1.2 million years ago and cooling
                    then stalled until the present. The cooling trend probably stalled
                    before the beginning of the mid-Pleistocene transition 3
                    , and pre-
                    dated the increase in the maximum size of ice sheets around 0.9
                    million years ago 4–6 . Thus, global cooling may have been a pre-
                    condition for, but probably is not the sole causal mechanism of,
                    the shift to quasi-100,000-year glacial cycles at the mid-Pleistocene
                    transition. Over the past 800,000 years, polar amplification
                    (the amplification of temperature change at the poles relative to
                    global temperature change) has been stable over time, and global
                    temperature and atmospheric greenhouse gas concentrations have
                    been closely coupled across glacial cycles. A comparison of the new
                    temperature reconstruction with radiative forcing from greenhouse
                    gases estimates an Earth system sensitivity of 9 degrees Celsius
                    (range 7 to 13 degrees Celsius, 95 per cent credible interval) change
                    in global average surface temperature per doubling of atmospheric
                    carbon dioxide over millennium timescales. This result suggests that
                    stabilization at today’s greenhouse gas levels may already commit
                    Earth to an eventual total warming of 5 degrees Celsius (range 3 to
                    7 degrees Celsius, 95 per cent credible interval) over the next few
                    millennia as ice sheets, vegetation and atmospheric dust continue
                    to respond to global warming.</p>
                <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                    <a href='https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf'>Study description</a>
                </div>
                <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                    <a href='http://carolynsnyder.com/publications.php -> http://carolynsnyder.com/papers/Snyder_Data_Figures.zip'>Dataset</a>
                </div>
            </div>
        </div>

    )
}

export default V7