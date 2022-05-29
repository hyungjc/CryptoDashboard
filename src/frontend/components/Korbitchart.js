import React, {useState, useEffect} from 'react'
import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import httpClient from '../../httpClient'
Chart.register(ArcElement);


const Korbitchart = () => {


        useEffect(() => {
                const fetchAPI = async() => {
                        const resp = await httpClient.get("//localhost:5000/dashboard")
                        const data = resp.data
                        console.log("From fetchapi", Object.values(data).map((crypto) => crypto.current))

                        setChartData({
                                labels: Object.keys(data).map((crypto) => crypto),
                                datasets: [
                                        {
                                                label: "Price in KRW",
                                                data: Object.values(data).map((crypto) => crypto.current),
                                        
                                                backgroundColor: [
                                                        "#ffbb11",
                                                        "#ecf0f1",
                                                        "#50AF95"
                                                ]
                                        }
                                ]
                        });


                        
                };
                fetchAPI()
        }, []);

        const [chartData, setChartData] = useState({})

        // const data = {
        //         labels: ['Mon','Tue','Wed','Thurs','Fri'],
        //         datasets: [
        //             {
        //                 label: 'Attendance for Week 1',
        //                 data: [25,24,25,25,3],
        //                 borderColor: ['rgba(255,206,86,0.2)'],
        //                 backgroundColor: ['rgba(232,99,132,1)',
        //                 'rgba(232,211,6,1)',
        //                 'rgba(54,162,235,1)',
        //                 'rgba(255,159,64,1)',
        //                 'rgba(153,102,255,1)' ],
        //                 pointBackgroundColor: 'rgba(255,206,86,0.2)',
        //             }
            
        //         ]
        //     }

        const options = {
                plugins: {
                    title: {
                        display: true,
                        text: 'Doughnut Chart',
                        color:'blue',
                        font: {
                            size:34
                        },
                        padding:{
                            top:30,
                            bottom:30
                        },
                        responsive:true,
                        animation:{
                            animateScale: true,
                                       }
                    }
                }
            
            }
  return (
    <div><Doughnut data = {chartData} options = {options}/></div>
  )
}

export default Korbitchart