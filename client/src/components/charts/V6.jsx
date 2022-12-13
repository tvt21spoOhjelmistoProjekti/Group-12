import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import axios from "axios";
import { UserContext } from "../../context/UserContext";


const V6 = ({ V6Data }) => {


    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [studydesc, setStudydesc] = useState("")
    const [datasource, setDatasource] = useState("")


    const getData = async () => {


        try {

            var response = []
            if (!V6Data) {
                var config = {
                    headers: {
                        'Authorization': `Basic ${user.token}`
                    }
                }
                response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V6", config)
            } else {
                response.data = V6Data
            }

            setDescription(response.data[0].description)
            setStudydesc(response.data[0].studydesc)
            setDatasource(response.data[0].datasource)


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

                    }

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
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            intersect: false,
        },
        stacked: false,
        plugins: {
            legend: {
                position: "top"

            },
            title: {
                display: true,
                text: "Ice core 800k year composite study CO2 measurements",
            },
        },
        scales: {
            x: {
                type: "linear",
                min: -900,
                max: 806000,
                reverse: "true"
            },
            yAxis: {
                type: "linear",
                min: 150,
                max: 400
            },
        },
    };

    if (tableData) {

        return (
            <div >
                <div className='min-h-[600px] max-h-[600px]'>
                    <Line options={options} data={tableData} />
                </div>
                <div className='pt-2 px-3 text-justify'>
                    <p>{description}</p>
                    <div className='pt-5 font-bold font-sans text-blue-500'>
                        <a href={studydesc}>Study description</a>
                    </div>
                    <div className='pt-5 font-bold font-sans text-blue-500'>
                        <a href={datasource}>Data source</a>
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

export default V6