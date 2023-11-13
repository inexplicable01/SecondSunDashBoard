import React from 'react';
import {MapContainer, TileLayer, Marker, GeoJSON, Popup, useMap} from 'react-leaflet';
import ReactApexChart from "react-apexcharts";
import '../DataVisualization.css';
import UpDownControl from '../UpDownControl';
import L from 'leaflet';
import { blackIcon , goldIcon} from 'leaflet-color-markers';
import 'leaflet/dist/leaflet.css';

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

function getRandomElement(arr) {
    if (arr.length <= 2) {
        throw new Error("The array should have more than 2 elements");
    }

    const randomIndex = Math.floor(Math.random() * (arr.length - 2)) + 1;
    return [arr[randomIndex][1],arr[randomIndex][0]]
}

function switchxy(arr) {
    return arr.map(subArray => {
        if (subArray.length >= 2) {
            return [subArray[1], subArray[0], ...subArray.slice(2)];
        }
        return subArray;  // Return as-is if less than 2 elements
    });
}


const createIcon = (iconClass) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `<span class="${iconClass}" style="font-size:24px;"></span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
}
function SetViewToFitBounds({ coordinates }) {
    const map = useMap();
    map.fitBounds(coordinates);
    return null;  // No UI rendered by this component
}
const DataVisualization = ({device, location, temperatureData}) => {
    const curlocation = getRandomElement(device.geometry.coordinates)
    const startPort = [device.geometry.coordinates[0][1],device.geometry.coordinates[0][0]];
    const endPortswitched = device.geometry.coordinates[device.geometry.coordinates.length - 1];
    const endPort = [endPortswitched[1],endPortswitched[0]];
    const startIcon = createIcon('mdi mdi-crosshairs-gps');
    const endIcon = createIcon('mdi mdi-flag-checkered');
    const currentLocationIcon = createIcon('mdi mdi-truck-plus-outline ');
    // Icons
    // const startIcon = new L.Icon({
    //   iconUrl: 'path_to_start_icon.png',
    //   iconSize: [25, 41],
    // });
    //
    // const endIcon = new L.Icon({
    //   iconUrl: 'path_to_end_icon.png',
    //   iconSize: [25, 41],
    // });
    //
    // const currentLocationIcon = new L.Icon({
    //   iconUrl: 'path_to_current_location_icon.png',
    //   iconSize: [25, 41],
    // });


    return (
        <div className="data-visualization-container">

            <div className="map-container">

                {/*{console.log('device', device)}*/}
                <MapContainer scrollWheelZoom={false}
                    center={curlocation} zoom={13} style={{height: '100vh', width: '100%'}}>
                    <SetViewToFitBounds coordinates={switchxy(device.geometry.coordinates)} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={startPort} >
                        <Popup>Start Port</Popup>
                    </Marker>

                    <Marker position={endPort} >
                        <Popup>End Port</Popup>
                    </Marker>

                    <Marker position={curlocation} icon={currentLocationIcon} >
                        <Popup>Current Location</Popup>
                    </Marker>
                    <GeoJSON key={device.properties.name} data={device}/>
                </MapContainer>
            </div>

            <div className="plot-section">
                <div className="temperature-plot-container">
                    <h4>Temperature (°C)</h4>
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