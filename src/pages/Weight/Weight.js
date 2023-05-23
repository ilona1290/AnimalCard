import React from "react";
import { ResponsiveLine } from '@nivo/line'
import { useParams, useNavigate } from 'react-router-dom'
import "./Weight.css"

const data = [
    {
      "id": "waga",
      "color": "hsl(126, 70%, 50%)",
      "data": [
        {
          "x": "05.09.2021",
          "y": 10
        },
        {
          "x": "05.11.2021",
          "y": 13
        },
        {
          "x": "10.01.2022",
          "y": 17
        },
        {
          "x": "07.03.2022",
          "y": 22
        },
        {
          "x": "14.05.2022",
          "y": 20
        },
        {
          "x": "14.07.2022",
          "y": 18
        },
        {
          "x": "05.09.2022",
          "y": 20
        },
        {
          "x": "14.11.2022",
          "y": 22
        },
        {
          "x": "24.01.2023",
          "y": 20
        },
        {
          "x": "14.03.2023",
          "y": 20
        },
        {
          "x": "10.05.2023",
          "y": 20
        }
      ]
    }
]

const theme = {
    axis: {
      fontSize: "2rem",
      tickColor: "#eee",
      ticks: {
        text: {
          fontSize: "1.6rem"
        }
      },
      legend: {
        text: {
          fontSize: "2.6rem",
          fontFamily: "Montserrat, sans-serif"
        }
      }
    },
  };

  function SymbolCircle() {
    return (
      <circle
        r={5}
        fill="#4158d0"
      />
    )
  }


function Weight(){
    let navigate = useNavigate();
    const {petId} = useParams();

    const handleBack = () => {
        navigate(`/pets/${petId}`)
    }
    return(
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>

        
        <div style={{ height: "90vh", width: "90%", paddingTop: "9em"}}>
        <button className="header__buttons__end__btn" onClick={handleBack} style={{position: "absolute", right: "2%", top: "3.5em"}}>
                <p>Powrót</p>
            </button>
            <ResponsiveLine
                data={data}
                colors={['#4158d0']}
                margin={{ top: 30, right: 110, bottom: 116, left: 70 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Daty ważenia',
                    legendOffset: 98,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Waga [kg]',
                    legendOffset: -57,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                pointSymbol={SymbolCircle}
                useMesh={true}
                theme={theme}
                tooltip={(input) => {
                    return (
                    <div className="chart__tooltip">
                      Data ważenia: {input.point.data.x}r. <br/>
                      Waga: {input.point.data.y} kg
                    </div>
                  )}}
                // legends={[
                //     {
                //         anchor: 'bottom-right',
                //         direction: 'column',
                //         justify: false,
                //         translateX: 100,
                //         translateY: 0,
                //         itemsSpacing: 0,
                //         itemDirection: 'left-to-right',
                //         itemWidth: 80,
                //         itemHeight: 20,
                //         itemOpacity: 0.75,
                //         symbolSize: 12,
                //         symbolShape: 'circle',
                //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
                //         effects: [
                //             {
                //                 on: 'hover',
                //                 style: {
                //                     itemBackground: 'rgba(0, 0, 0, .03)',
                //                     itemOpacity: 1
                //                 }
                //             }
                //         ]
                //     }
                // ]}
            />
        </div>
        </div>
    )
}

export default Weight;