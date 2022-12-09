import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V8 = ({ V8_Data }) => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [data_link, setData_link] = useState("")                                              //Declaring variables
    const [desc_link, setDesc_link] = useState("")

    var colors = []
    for (var i = 0; i < 300; i++) {
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16))                        //Making an array of 300 random colors
    }

    const getData = async () => {
        try {


            var response = []
            if (!V8_Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`                                      //Checking that user it authorized
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V8", config);     //Getting chartdata from db
            } else {
                response.data = V8_Data
            }
            const mappingLabels = Object.keys(response.data[0]);
            const mappingArray = []

            setDescription(response.data[0].description)
            setData_link(response.data[0].data_link)                                            //Setting description and link variables
            setDesc_link(response.data[0].desc_link)

            mappingLabels.map(c => {


                if (c != "Year" && c != "description" && c != "data_link" && c != "desc_link") {                            //Filtering out not needed labels
                    mappingArray.push(response.data.map(d => ({ xAxis: d.Year, value: d[c], country: c })))                 //Creating an array of labels

                }
            })


            setTableData({
                datasets: mappingArray.map(c => {

                    return {                                                                                            //Setup for the datasets
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
            legend: {                                                                                           //Chart options for ui and layout
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

    if (tableData) {
        return (
            //Html code to export
            <div className='h-auto'><div className='h-[1500px]'><Line options={options} data={tableData} /></div>
                <div className='pt-2 pl-3 text-justify pr-4'>
                    <p>{description}</p>
                    <div className='pt-5 font-bold font-sans hover:font-extrabold text-blue-500'>
                        <a href={desc_link} target="_blank">Study description</a>
                    </div>
                    <div className='pt-5 font-bold font-sans hover:font-extrabold text-blue-500 '>
                        <a href={data_link} target="_blank">Dataset</a>
                    </div>

                </div>
            </div>

        )
    }
    return (
        <div className='flex justify-center items-center'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        </div>
    )

}

export default V8