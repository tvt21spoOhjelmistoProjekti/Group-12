import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V8 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V8", config);
            //console.log(Object.keys(response.data[0]));
            //console.log(response.data.map(d => d))
            const mappingLabels = Object.keys(response.data[0]);
            const mappingArray = []

            mappingLabels.map(c => {
                //console.log(c)
                
                if(c != "Year"){
                    mappingArray.push(response.data.map(d => ({ xAxis: d.Year, value: d[c], country: c })))
                }
            })

            //console.log(mappingLabels)
            //console.log(mappingArray)

            // response.data.filter(d => d[c] == c).map(d => ({ xAxis: d.Year, value: d[c]}))
            
            setTableData({
                datasets: mappingArray.map(c => {
                        console.log(c.map(d => d.xAxis))
                        return {
                            label: c[0].country,
                            data: c.map(d =>  ({ xAxis: d.xAxis, value: d.value})),
                            borderColor: "blue",
                            backgroundColor: "blue",
                            yAxisID: 'y',
                            
                            parsing: {
                                xAxisKey: "xAxis",
                                yAxisKey: "value",
                            },
                            pointRadius: 0,
                            borderWidth: 1,
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
                text: "CO2 emissions by country",
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
        },
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}
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