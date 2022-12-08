import React, { useContext, useState, useEffect, useRef, createContext } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line, Doughnut, getElementAtEvent, getDatasetAtEvent, Pie } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const V9 = ({ V9Data }) => {

    const { user, setUser } = useContext(UserContext)

    const [tableData, setTableData] = useState(null)
    const [detailedTableData, setDetailedTableData] = useState(null)
    const [description, setDescription] = useState([])
    const [responseData, setResponseData] = useState(null)


    const getData = async () => {
        try {


            var response = []
            if (!V9Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V9", config);
            } else {
                response.data = V9Data;
            }
            console.log(response)
            setResponseData(response)
            setDescription(response.data.filter(d => d.description || d.sourceLink || d.sourcelinkURL).map(d => ({ desc: d.description, sourceLink: d.sourceLink, sourcelinkURL: d.sourcelinkURL })))
            setTableData({
                labels: response.data.filter(d => d.Sector3 != "").map(d => d.Sector3),
                datasets: [
                    {
                        label: 'AFOLU',
                        data: response.data.filter(d => 9 <= d.id && d.id <= 15).map(d => ({ value: d.Share_of_global_greenhouse_gas_emissions2, name: d.Sub_sector2 })),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        circumference: 66,
                        rotation: 292,
                        hidden: true
                    },
                    {
                        label: 'Waste',
                        data: response.data.filter(d => 16 == d.id || d.id == 17).map(d => ({ value: d.Share_of_global_greenhouse_gas_emissions2, name: d.Sub_sector2 })),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        circumference: 10,
                        rotation: 282,
                        hidden: true
                    },
                    {
                        label: 'Industrial processes',
                        data: response.data.filter(d => 7 == d.id || d.id == 8).map(d => ({ value: d.Share_of_global_greenhouse_gas_emissions2, name: d.Sub_sector2 })),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        circumference: 19,
                        rotation: 263,
                        hidden: true
                    },
                    {
                        label: 'Energy',
                        data: response.data.filter(d => 1 <= d.id && d.id <= 6).map(d => ({ value: d.Share_of_global_greenhouse_gas_emissions2, name: d.Sub_sector2 })),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        circumference: 263,
                        hidden: true
                    },
                    {
                        label: 'GLobal CO2 emissions by sectors',
                        data: response.data.filter(d => d.Share_of_global_greenhouse_gas_emissions3 != "").map(d => ({ value: d.Share_of_global_greenhouse_gas_emissions3, name: d.Sector3 })),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
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
        plugins: {
            tooltip: {
                boxWidth: 10,
                width: 100,
                callbacks: {
                    label: function (item) {
                        if (item.datasetIndex == 4) {
                            return item.label + ": " + item.formattedValue
                        }
                        return item.raw.name + ": " + item.formattedValue
                    }
                },
            },
            legend: {
                display: true,
                position: "top",
                align: "center",
                fontFamily: "Allianz-Neo",
                textDirection: 'ltr',
                labels: {
                    usePointStyle: true,
                    fontColor: "#006192",
                },

                onClick: (e) => e.stopPropagation()
            },
            datalabels: {
                formatter: (value, context) => {
                    return value.value;
                }
            }
        },
        onClick: function (evt, element) {
            if (element) {
                if (element[0].index == 0) {
                    setDetailedTableData(responseData.data.filter(d => 1 <= d.id && d.id <= 6).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Energy" })))

                    const newState = tableData.datasets.map(obj => {
                        if (obj.label === 'GLobal CO2 emissions by sectors') {
                            return obj
                        }
                        if (obj.label === "Energy") {
                            return { ...obj, hidden: false }
                        }
                        return { ...obj, hidden: true }
                    })

                    setTableData({ ...tableData, datasets: newState })
                } else if (element[0].index == 1) {
                    setDetailedTableData(responseData.data.filter(d => 7 == d.id || d.id == 8).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Industrial process" })))
                    const newState = tableData.datasets.map(obj => {
                        if (obj.label === 'GLobal CO2 emissions by sectors') {
                            return obj
                        }
                        if (obj.label === "Industrial processes") {
                            return { ...obj, hidden: false }
                        }
                        return { ...obj, hidden: true }
                    })

                    setTableData({ ...tableData, datasets: newState })

                } else if (element[0].index == 2) {
                    setDetailedTableData(responseData.data.filter(d => 16 == d.id || 17 == d.id).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Waste" })))
                    const newState = tableData.datasets.map(obj => {
                        if (obj.label === 'GLobal CO2 emissions by sectors') {
                            return obj
                        }
                        if (obj.label === "Waste") {
                            return { ...obj, hidden: false }
                        }
                        return { ...obj, hidden: true }
                    })
                    setTableData({ ...tableData, datasets: newState })

                } else if (element[0].index == 3) {
                    setDetailedTableData(responseData.data.filter(d => 9 <= d.id && d.id <= 15).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "(AFOLU)" })))
                    const newState = tableData.datasets.map(obj => {
                        if (obj.label === 'GLobal CO2 emissions by sectors') {
                            return obj
                        }
                        if (obj.label === "AFOLU") {
                            return { ...obj, hidden: false }
                        }
                        return { ...obj, hidden: true }
                    })
                    setTableData({ ...tableData, datasets: newState })
                }


            }

        }
    }


    if (tableData) {

        return (
            <> <div>

                <div className='flex justify-center mt-2'>
                    <h1 className='font-bold text-2xl'>Global CO2 emissions by sectors {"(%)"}</h1>
                </div>
                <div className='flex flex-col lg:flex-row lg:w-1/2 ml-4 mb-4'>
                    <Doughnut data={tableData} plugins={[ChartDataLabels]}
                        options={options}
                    />


                    {detailedTableData &&
                        <div className='flex flex-col min-w-full justify-center mt-3 lg:mt-0'>
                            <p className='font-bold'>Detailed data from {detailedTableData[0].sector}</p>
                            {detailedTableData.map((d, i) => {
                                return (
                                    <p key={i}>{d.label}: {d.value} %</p>
                                )
                            })}</div>
                    }
                </div>



                <div className='p-3'>
                    <h1 className='font-bold'>Description</h1>
                    <p>{description[0].desc}</p>
                    <a href={description[0].sourcelinkURL}><p className='font-bold pt-4 text-blue-500'>{description[0].sourceLink}</p></a>
                </div>
            </div>
            </>
        )
    }
    return (
        <div className='flex justify-center items-center'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        </div>
    )
}

export default V9