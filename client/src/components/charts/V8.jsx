import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V8 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [data_link, setData_link] = useState("")
    const [desc_link, setDesc_link] = useState("")

    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    var colors = []
    for (var i = 0; i < 300; i++) {
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16))
    }

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V8", config);
            const mappingLabels = Object.keys(response.data[0]);
            const mappingArray = []

            setDescription(response.data[0].description)
            setData_link(response.data[0].data_link)
            setDesc_link(response.data[0].desc_link)

            mappingLabels.map(c => {

                
                if(c != "Year" && c != "description" && c != "data_link" && c != "desc_link"){
                    mappingArray.push(response.data.map(d => ({ xAxis: d.Year, value: d[c], country: c})))

                }
            })


            setTableData({
                datasets: mappingArray.map(c => {

                    return {
                        label: c[0].country,
                        data: c.map(d => ({ xAxis: d.xAxis, value: d.value * 3.664 })),
                        borderColor: colors,
                        backgroundColor: colors,
                        yAxisID: 'y',

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1,
                        fill: true
                    }
                })
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
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                }
            },
            title: {
                display: "true",
                text: "CO2 emissions by country",
            },
        },
        layout: {
            autoPadding: "true",
        },
        scales: {
            x: {
                type: "linear",
                display: "true",
                align: "center",
                min: 1959,
                title: {
                    display: "true",
                    text: "Year",
                }

            },
            y: {
                type: "linear",
                display: "true",
                stacked: "true",
                position: "left",
                title: {
                    display: "true",
                    text: "Million tonnes of CO2",
                }

            },
        },
    };

    return (
        
        <div className='max-h-[1300px]'>{tableData && <Line options={options} data={tableData} />}
            <div className='pt-2 pl-3 text-justify'>
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

export default V8