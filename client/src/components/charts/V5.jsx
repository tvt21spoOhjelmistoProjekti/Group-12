import React, { useContext, useState, useEffect } from 'react'

import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import axios from 'axios'
import { UserContext } from '../../context/UserContext';

const V5 = () => {

    const [tableData, setTableData] = useState(null)
    const { user, setUser } = useContext(UserContext)

    const getData = async () => {
        try {

            const config = {
                headers: {
                    'Authorization': `Basic ${user.token}`
                }
            }

            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "chart/V5_Data", config);



            setTableData({
                datasets: [
                    {
                        label: "Depth (m)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.depth })),
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
                        label: "Age of the ice (yr BP)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.age })),
                        borderColor: "red",
                        backgroundColor: "red",

                        parsing: {
                            xAxisKey: "xAxis",
                            yAxisKey: "value",
                        },
                        pointRadius: 0,
                        borderWidth: 1.5,

                    },

                    {
                        label: "CO2 Concentration (ppmv)",
                        data: response.data.map(d => ({ xAxis: d.age_mean, value: d.co2 })),
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
                text: "Vostok Ice Core CO2 measurements, 417160 - 2342 years",
            },
        },
        scales: {
            x: {
                type: "linear",

            },
            yAxis: {
                type: "logarithmic",

            },
        },
    };

    return (
        <div className='max-w-[1000px]'>{tableData && <Line options={options} data={tableData} />}
            <div className='pt-2 pl-3 text-justify'>
                <p>In January 1998, the collaborative ice-drilling project between Russia, the United States, and France at the Russian Vostok station in East Antarctica yielded the deepest ice core ever recovered, reaching a depth of 3,623 m (Petit et al. 1997, 1999). Ice cores are unique with their entrapped air inclusions enabling direct records of past changes in atmospheric trace-gas composition. The extension of the Vostok CO2 record shows that the main trends of CO2 are similar for each glacial cycle. Major transitions from the lowest to the highest values are associated with glacial-interglacial transitions. During these transitions, the atmospheric concentrations of CO2 rises from 180 to 280-300 ppmv (Petit et al. 1999). <br></br>The extension of the Vostok CO2 record shows the present-day levels of CO2 are unprecedented during the past 420 kyr. Pre-industrial Holocene levels (~280 ppmv) are found during all interglacials, with the highest values (~300 ppmv) found approximately 323 kyr BP. When the Vostok ice core data were compared with other ice core data (Delmas et al. 1980; Neftel et al. 1982) for the past 30,000 - 40,000 years, good agreement was found between the records: all show low CO2 values [~200 parts per million by volume (ppmv)] during the Last Glacial Maximum and increased atmospheric CO2 concentrations associated with the glacial-Holocene transition. According to Barnola et al. (1991) and Petit et al. (1999) these measurements indicate that, at the beginning of the deglaciations, the CO2 increase either was in phase or lagged by less than ~1000 years with respect to the Antarctic temperature, whereas it clearly lagged behind the temperature at the onset of the glaciations.</p>
                    <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                        <a href='https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html'>Study description</a>
                    </div>
                    <div className='pt-5 font-bold font-sans hover:font-serif text-blue-500'>
                        <a href='https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2'>Dataset</a>
                    </div>
            </div>
        </div>

    )
}

export default V5