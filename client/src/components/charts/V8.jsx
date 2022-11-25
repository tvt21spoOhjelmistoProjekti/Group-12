import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V8 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    var colors = []
    for(var i=0; i<300; i++){
        colors.push("#"+Math.floor(Math.random()*16777215).toString(16))
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

            mappingLabels.map(c => {
                
                if(c != "Year"){
                    mappingArray.push(response.data.map(d => ({ xAxis: d.Year, value: d[c], country: c})))
                }
            })
            

            setTableData({
                datasets: mappingArray.map(c => {

                        return {
                            label: c[0].country,
                            data: c.map(d =>  ({ xAxis: d.xAxis, value: d.value*3.664})),
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
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum nunc ut mi vulputate, at tristique dolor dignissim. Nunc quis leo quis risus consectetur accumsan ac id ante. Phasellus convallis iaculis vulputate. Morbi ullamcorper velit id consequat rhoncus. Vestibulum ornare egestas augue, ut consectetur erat lacinia eu. Donec consequat pharetra nisi eget sollicitudin. Aenean lacinia varius odio. Etiam non rutrum elit. Nam a ex ullamcorper, congue mi et, ultrices sapien. Pellentesque non est quis sapien volutpat eleifend. Vivamus sed sollicitudin nibh. Nulla placerat id libero non bibendum. Vivamus non ligula lacinia lacus malesuada blandit. </p>
                    <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                        <a href='https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021'>Study description</a>
                    </div>
                    <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                        <a href='https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D '>Dataset</a>
                    </div>
            </div>
        </div>

    )

}

export default V8