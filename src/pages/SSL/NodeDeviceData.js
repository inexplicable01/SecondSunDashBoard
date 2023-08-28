import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";
import {Col, Container, Row} from 'reactstrap';
import { useLocation } from "react-router-dom";
import BreadCrumb from '../../Components/Common/BreadCrumb';

const NodeDeviceData = () => {
     const location = useLocation();
  const [data, setData] = useState({
    time: [],
    temperature: [],
    humidity: [],
    acceleration: [],
  });
const [selectedDevice, setSelectedDevice] = useState('Device 1');
  const fetchData = async () => {
    try {
      // Uncomment this when you have an API endpoint
      // const response = await fetch("your-api-endpoint");
      // const data = await response.json();

      // Dummy Data
      const dataLength = 20;
      const time = Array.from({ length: dataLength }, (_, i) => `${i}:00`);
      const temperature = Array.from({ length: dataLength }, () => Math.random() * 10 + 20);
      const humidity = Array.from({ length: dataLength }, () => Math.random() * 10 + 40);
      const acceleration = Array.from({ length: dataLength }, () => Math.random() * 2 + 1);

      setData({
        time,
        temperature,
        humidity,
        acceleration,
      });
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const deviceFromUrl = urlParams.get("device");
        if (deviceFromUrl) {
            setSelectedDevice(deviceFromUrl);
        }
    }, [location.search]);
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(intervalId);
  }, [selectedDevice]);

const commonOptions = {
  chart: { id: 'basic-bar' },
  xaxis: { categories: data.time },
  yaxis: {
    labels: {
      formatter: function (value) {
        return Number(value).toPrecision(3);  // Keep only 3 significant figures
      }
    }
  },
};

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%'
    };

    const chartStyle = {
        width: '70%'
    };

    document.title = "Node Device Data | SSL";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Device Data" pageTitle="Main"/>
                    <h1>Time Series Data</h1>

                          <select onChange={(e) => setSelectedDevice(e.target.value)} value={selectedDevice}>
        <option value="Device 1">Device 1</option>
        <option value="Device 2">Device 2</option>
        <option value="Device 3">Device 3</option>
        <option value="Device 4">Device 4</option>
        <option value="Device 5">Device 5</option>
      </select>

                    {/*<button onClick={fetchData}>Refresh Data</button>*/}
                    <div style={chartContainerStyle}>

                        <div style={chartStyle}>
                            <h1>Temperature (°C)</h1>

                            <ReactApexChart
                                options={commonOptions}
                                series={[{name: 'Temperature', data: data.temperature}]}
                                type="line"
                                width="100%"
                            />
                        </div>
                        <div style={chartStyle}>
                            <h1>Humidity (%)</h1>
                            <ReactApexChart
                                options={commonOptions}
                                series={[{name: 'Humidity', data: data.humidity}]}
                                type="line"
                                width="100%"
                            />
                        </div>
                        <div style={chartStyle}>
                            <h1>Acceleration (m/s²)</h1>
                            <ReactApexChart
                                options={commonOptions}
                                series={[{name: 'Acceleration', data: data.acceleration}]}
                                type="line"
                                width="100%"
                            />
                        </div>
                    </div>
                </Container>

            </div>
        </React.Fragment>
    )
        ;
};

export default NodeDeviceData;