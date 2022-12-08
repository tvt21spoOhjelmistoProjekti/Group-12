import React, { useContext, useState, useEffect } from 'react'
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V5 = ({ V5_Data }) => {

    const [tableData, setTableData] = useState(null)                                    //Declaring variables
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [data_link, setData_link] = useState("")
    const [desc_link, setDesc_link] = useState("")

    const getData = async () => {

        try {
            var response = []

            if (!V5_Data) {
                var config = {                                                              //Checking that user it authorized
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V5_Data", config);        //Getting chartdata from db
            } else {
                response.data = V5_Data;
            }

            setDescription(response.data[0].description)
            setData_link(response.data[0].data_link)                                            //Setting description and extra links from db to variables
            setDesc_link(response.data[0].desc_link)


            setTableData({
                datasets: [
                    {
                        label: "Depth (m)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.depth })),                  //Mapping through database to setup dataset for chart
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
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.co2 })),                //Setting up second dataset
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
            console.log(error)                                                          //Catch in case of error
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
        plugins: {                                                                          //Chart options for the layout and ui
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
            yAxis: {                                                                    //Setting the y axis to be logarithmic
                type: "logarithmic",


            },
        },
    };

    if (tableData) {
        return (
            <div className='max-w-[1000px]'>
                <Line options={options} data={tableData} />
                <div className='pt-2 px-3 text-justify'>
                    <p>{description}</p>
                    <div className='pt-5 font-bold font-sans  text-blue-500'>
                        <a href={desc_link} target="_blank">Study description</a>
                    </div>
                    <div className='pt-5 font-bold font-sans  text-blue-500'>
                        <a href={data_link} target="_blank">Dataset</a>
                    </div>

                </div>
            </div>                                                                                      //Writing the html code to show chart, description and links
        )
    }

    return (
        <div className='flex justify-center items-center'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        </div>
    )
}

export default V5