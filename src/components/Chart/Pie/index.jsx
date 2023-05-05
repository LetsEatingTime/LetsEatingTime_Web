import React, { useEffect, useState } from "react";
import axios from "axios";

import { ResponsivePie } from "@nivo/pie";

export const API_URL = process.env.REACT_APP_API;

const Piechart = () => {
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
        const URL = `${API_URL}/api/statistic/meal-application`;
        axios
            .get(URL)
            .then((response) => {
                const data = response.data.data;
                // console.log(data);
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div style={{ width: "420px", height: "420px" }}>
            <ResponsivePie
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

export default Piechart;
