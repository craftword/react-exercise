import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data

export default function Chart() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('api/stats');
      setData(result.data);
    };
    fetchData();
  }, []);

  const details = [
    { name: 'billedTotal', key: data && data.data.billedTotal },
    { name: 'cashBilledTotal', key1: data && data.data.cashBilledTotal },
    { name: 'nonCashBilledTotal', key2: data && data.data.nonCashBilledTotal },
  ];
  return (
    <React.Fragment>
      <Title>Statistics</Title>
      {console.log(details)}

      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={details}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="key" fill="#8884d8" />
          <Bar dataKey="key1" fill="#ff84d8" />
          <Bar dataKey="key2" fill="#cchjdg" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
