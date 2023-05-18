// TODO : 차트에 데이터 연결하기

import React, { useEffect, useState } from "react";
import axios from "axios";

import { ResponsiveBar } from "@nivo/bar";

export const URL = process.env.REACT_APP_API;

const Barchart = () => {
    // const [data, setData] = useState([]);
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);

    // const setDatabreakfast = async (responsedata) => {
    //     setBreakfast(...responsedata);
    //     console.log(breakfast);
    // };

    useEffect(() => {
        const URL_PieBreakfast = `${URL}/api/statistic/meal-attend?type=breakfast`;
        axios
            .get(URL_PieBreakfast)
            .then((response) => {
                const responsedata = response.data.data;
                
                setBreakfast(responsedata);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: "420px", height: "420px" }}>
            <ResponsiveBar
                // data={[
                //     {
                //         result: "breakfast",
                //         "급식 먹음": 82,
                //         "급식 안먹음": 82,
                //     },
                // ]}
                data={[
                    {
                        result: "breakfast",
                        "급식 먹음": 82,
                        "급식 안먹음": 82,
                    },
                ]}
                keys={["급식 먹음", "급식 안먹음"]}
                indexBy="result"
                // margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "nivo" }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                // fill={[
                //     {
                //         match: {
                //             id: "fries",
                //         },
                //         id: "dots",
                //     },
                //     {
                //         match: {
                //             id: "sandwich",
                //         },
                //         id: "lines",
                //     },
                // ]}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "급식 통계",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "급식 통계",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={(e) =>
                    e.id + ": " + e.formattedValue + " in 급식 통계: " + e.indexValue
                }
            />
        </div>
    );
};

export default Barchart;
