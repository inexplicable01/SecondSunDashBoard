import React from 'react';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import ReactApexChart from "react-apexcharts";
import './DataVisualization.css';
import UpDownControl from './UpDownControl';

const dataLength = 20;
const time = Array.from({length: dataLength}, (_, i) => `${i}:00`);
const temperature = Array.from({length: dataLength}, () => Math.random() * 10 + 20);

const commonOptions = {
    chart: {id: 'basic-bar'},
    xaxis: {categories: time},
    yaxis: {
        labels: {
            formatter: function (value) {
                return Number(value).toPrecision(3);  // Keep only 3 significant figures
            }
        }
    },
};

const fakelocation = [51.505, -0.09];

const DataVisualization = ({device, location, temperatureData}) => {
    return (
        <div className="data-visualization-container">

            <div className="map-container">
                Location for Device {device.properties.name}
                <MapContainer center={fakelocation} zoom={13} style={{height: '50vh', width: '100%'}}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={fakelocation}/>
                </MapContainer>
            </div>

            <div className="plot-section">
                <div className="temperature-plot-container">
                    <h1>Temperature (°C)</h1>
                    <ReactApexChart
                        options={commonOptions}
                        series={[{name: 'Temperature', data: temperature}]}
                        type="line"
                        width="100%"
                    />
                </div>

                <div className="control-buttons">
                        <UpDownControl
                            label="Humidity"
                            initialValue={50}
                            onChange={(limits) => console.log('Humidity limits:', limits)}
                            minLimit={0}
                            maxLimit={100}
                        />
                        <UpDownControl
                            label="Luminosity"
                            initialValue={70}
                            onChange={(limits) => console.log('Luminosity limits:', limits)}
                            minLimit={0}
                            maxLimit={100}
                        />
                        <UpDownControl
                            label="Shock (g)"
                            initialValue={5}
                            onChange={(limits) => console.log('Shock limits:', limits)}
                            minLimit={0}
                            maxLimit={10}
                        />
                </div>
            </div>
        </div>
    );
};

export default DataVisualization;