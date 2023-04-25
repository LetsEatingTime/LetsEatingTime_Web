import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Style from '../../style/Meal_style.module.css';

export const API_URL = process.env.REACT_APP_API;
const Flex = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const Meal = () => {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');

    useEffect(() => {


        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const today = year + month + day;

        const URL = `${API_URL}/openapi/meal?date=${today}`;
        axios.post(URL)
            .then(response => {
                // console.log(response.data);
                const mealRequest = response.data;
                if (mealRequest.status === 200) {
                    const mealToday = mealRequest.data;
                    if (mealToday) {
                        // console.log(mealToday.breakfast.menu);
                        setBreakfast(mealToday.breakfast.menu.join('\n'));
                        setLunch(mealToday.lunch.menu.join('\n'));
                        setDinner(mealToday.dinner.menu.join('\n'));
                    } else {
                        console.log('급식이 없습니다.');
                    }
                } else {
                    console.log('서버 에러');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <Flex>
                <div className={Style.box}>
                    <pre>{breakfast}</pre>
                </div>
                <div className={Style.box}>
                    <pre>{lunch}</pre>
                </div>
                <div className={Style.box}>
                    <pre>{dinner}</pre>
                </div>
            </Flex>
        </div>
    );
};

export default Meal;