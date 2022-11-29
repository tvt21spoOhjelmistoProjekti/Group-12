import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const optionalDesc = "Northern Hemisphere temperature reconstruction for the 1-1979 years by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data.";

const V1 = ({ v1Data, v2Data }) => {

    const [tableData, setTableData] = useState(null)
    const [options, setOptions] = useState(null)
    const [detailsV1, setDetailsV1] = useState(null)
    const [detailsV2, setDetailsV2] = useState(null)

    const [showMore, setShowMore] = useState(false);

    const { user, setUser } = useContext(UserContext)



    const getData = async (v1Data, v2Data) => {


        try {
            var response = []
            var response2 = []
            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }
            if (!v1Data && !v2Data) {
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V1", config);
                response2 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V2", config);
            } else {
                response.data = v1Data;
                response2 = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V2", config);
            }
            setDetailsV1(response.data.filter(d => d.description || d.SourceLink || d.SourceLinkUrl).map(d => ({ desc: d.description, SourceLink: d.SourceLink, SourceLinkUrl: d.SourceLinkUrl })))
            setDetailsV2(response2.data.filter(d => d.description || d.SourceLink || d.SourceLinkUrl).map(d => ({ desc: d.description, SourceLink: d.SourceLink, SourceLinkUrl: d.SourceLinkUrl })))
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
                        data: response.data.filter(d => d.anomaly_nha !== 0).map(d => ({ time: (d.time_nha + "-01-01"), value: d.anomaly_nha })),
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
                        data: response2.data.map(d => {

                            if (d.Year < 10) {
                                return { time: new Date("000" + d.Year + "-01-01"), value: d.T }
                            } else {
                                return { time: new Date("00" + d.Year + "-01-01"), value: d.T }
                            }
                        }),
                        borderColor: "#f64aff",
                        borderWidth: 2,
                        backgroundColor: "#f64aaa",
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        hidden: true
                    },
                ],
            })

            setOptions({
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
                        text: "Temperature Anomalies from 1850",
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy',
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
            console.log(error)
        }
    }

    useEffect(() => {
        getData(v1Data, v2Data)

    }, [])



    return (
        <>{tableData &&
            <div>
                <div>
                    <Line options={options} data={tableData} />
                </div>
                <div className='m-3'>
                    <p className="font-bold">Description</p>
                    <p>{detailsV1[0].desc}</p>
                    <h1> <p className="font-bold">{"(Optional data)"}</p> {showMore ? detailsV2[0].desc : `${detailsV2[0].desc.substring(0, 100)}`}</h1>

                    <div className={showMore ? 'flex' : 'hidden'}>
                        <ul className='mt-3 list-disc'>
                            <label className='font-semibold'>Sources</label>

                            {detailsV1.map((data, index) => {
                                return (
                                    <li className='ml-5' key={index}>
                                        <a href={data.SourceLinkUrl}>{data.SourceLink}</a>
                                    </li>
                                )
                            })}
                            {detailsV2.map((data, index) => {
                                return (
                                    <li className='ml-5' key={index}>
                                        <a href={data.SourceLinkUrl}>{data.SourceLink}</a>
                                    </li>
                                )
                            })}


                        </ul>
                    </div>

                    <h1 onClick={() => setShowMore(!showMore)} className='cursor-pointer text-blue-500 mt-3'>{showMore ? "Show Less" : " Show More"}</h1>
                </div>
            </div>} </>
    )
}

export default V1