import React, { useContext, useState, useEffect, useRef, createContext } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line, Doughnut, getElementAtEvent, getDatasetAtEvent, Pie } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const V9 = () => {

    const { user, setUser } = useContext(UserContext)

    const [tableData, setTableData] = useState(null)
    const [detailedTableData, setDetailedTableData] = useState(null)
    const [options, setOptions] = useState(null)

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V9", config);
            console.log(response.data)

            setTableData({
                labels: response.data.filter(d => d.Sector3 != "").map(d => d.Sector3),
                datasets: [
                    {
                        label: 'GLobal CO2 emissions by sectors',
                        data: response.data.filter(d => d.Share_of_global_greenhouse_gas_emissions3 != "").map(d => d.Share_of_global_greenhouse_gas_emissions3),
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

            setOptions({
                plugins: {
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
                    }

                },
                onClick: function (evt, element) {
                    if (element.length > 0) {

                        console.log(element[0]);
                        if (element[0].index == 0) {
                            setDetailedTableData(response.data.filter(d => 1 <= d.id && d.id <= 6).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Energy" })))
                        } else if (element[0].index == 1) {

                            setDetailedTableData(response.data.filter(d => 7 == d.id || d.id == 8).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Industrial process" })))
                        } else if (element[0].index == 2) {

                            setDetailedTableData(response.data.filter(d => 16 == d.id || 17 == d.id).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "Waste" })))
                        } else if (element[0].index == 3) {

                            setDetailedTableData(response.data.filter(d => 9 <= d.id && d.id <= 15).map(d => ({ id: d.id, label: d.Sub_sector2, value: d.Share_of_global_greenhouse_gas_emissions2, sector: "(AFOLU)" })))
                        }


                    }

                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const doughnutLabelsLine = {
        afterDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                    const { x, y } = datapoint.tooltipPosition()
                    const halfheight = height / 2;
                    const halfwidth = width / 2;

                    const xLine = x >= halfwidth ? x + 40 : x - 40;
                    const yLine = y >= halfheight ? y + 40 : y - 40;
                    const extraLine = x >= halfwidth ? 40 : -40;
                    const extraLine2 = x >= halfwidth ? 0 : -40;

                    /*ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(xLine, yLine)
                    ctx.lineTo(xLine + extraLine, yLine)
                    ctx.strokeStyle = dataset.borderColor[index]
                    ctx.stroke();
                    */

                    const textWidth = ctx.measureText(chart.data.labels[index]).width;
                    ctx.font = "16px Arial"

                    //ctx.textAlign = "top"
                    ctx.textBaseline = 'bottom'
                    ctx.fillText(chart.data.labels[index], x, y);


                })
            });
        }
    }




    return (
        <>
            <div className='flex justify-center mt-2'>
                <h1 className='font-bold text-2xl'>Global CO2 emissions by sectors {"(%)"}</h1>
            </div>
            <div className='flex flex-col lg:flex-row lg:w-1/2 ml-4 mb-4'>
                {tableData && <Doughnut data={tableData} plugins={[ChartDataLabels]}
                    options={options}
                />}
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
        </>
    )
}

export default V9