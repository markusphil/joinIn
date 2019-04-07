import React from 'react';
import {Bar} from 'react-chartjs'

const BOOKINGS_BUCKETS = {
    Cheap : {
        min: 0,
        max: 10
    },
    Normal : {
        min: 10.01,
        max: 25
    },
    Expensive : {
        min: 25.01,
        max: 99999999999
    }
};

export const BookingChart = () => {
    
    return<p>The Chart!</p>
}