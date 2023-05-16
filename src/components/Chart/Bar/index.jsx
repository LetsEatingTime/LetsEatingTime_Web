// TODO : 차트에 데이터 연결하기

import React, { useEffect, useState } from "react";
import axios from "axios";

import { ResponsiveBar } from "@nivo/bar";

export const URL = process.env.REACT_APP_API;

const Barchart = () => {
    const [data, setData] = useState([]);

    const handle = {
        padClick: (data) => {
            console.log(data);
        },
        legendClick: (data) => {
            console.log(data);
        },
    };
    useEffect(() => {
        const URL_PieBreakfast = `${URL}/api/statistic/meal-attend?type=breakfast`;
        axios
            .get(URL_PieBreakfast)
            .then((response) => {
                const data = response.data.data;
                // console.log(data);
                setData(prevData => [...prevData, ...data.map(item => ({...item}))]);
            })
            .catch((error) => {
                console.log(error);
            });
        const URL_PieLunch = `${URL}/api/statistic/meal-attend?type=lunch`;
        axios
            .get(URL_PieLunch)
            .then((response) => {
                const data = response.data.data;
                // console.log(data);
                setData(prevData => [...prevData, ...data.map(item => ({...item}))]);
            })
            .catch((error) => {
                console.log(error);
            });
        const URL_PieDinner = `${URL}/api/statistic/meal-attend?type=dinner`;
        axios
            .get(URL_PieDinner)
            .then((response) => {
                const data = response.data.data;
                // console.log(data);
                setData(prevData => [...prevData, ...data.map(item => ({...item}))]);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(data);
    }, []);
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: "420px", height: "420px" }}>
            <ResponsiveBar
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={1.8}
                cornerRadius={8}
                colors={["#FFAAAA", "#84FF79"]}
                borderWidth={1}
                activeOuterRadiusOffset={8}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor="#000000"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                theme={{
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: "#000000",
                        },
                    },
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: "#000000",
                        },
                    },
                }}
                onClick={handle.padClick}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "olive",
                                },
                            },
                        ],
                        onClick: handle.legendClick,
                    },
                ]}
            />
        </div>
    );
};

export default Barchart;
