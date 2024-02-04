import React, {useEffect, useMemo, useState} from 'react';
import {MapContainer, TileLayer, Marker, GeoJSON, Popup, useMap} from 'react-leaflet';
import ReactApexChart from "react-apexcharts";
import './DataVisualization.css';
import UpDownControl from './UpDownControl';
import L from 'leaflet';
import {blackIcon, goldIcon} from 'leaflet-color-markers';
import 'leaflet/dist/leaflet.css';
import {useSelector} from "react-redux";


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

function SetViewToFitBounds({coordinates}) {
    const map = useMap();
    map.fitBounds(coordinates);
    return null;  // No UI rendered by this component
}

const randomcoords = switchxy([
    // [47.8610025, -122.3269672],  // Sao Paulo
    // [47.6610025, -122.3269672],  // Curitiba
    // [47.3610025, -122.3269672],  // Florianopolis
    // [47.6610025, -122.3269672],  // Porto Alegre
    // [47.1258383, -122.1609394],  // Montevideo
    // [47.3610025, -122.1609394]   // Buenos Aires
])
const formatToGeoJsonDevice = (coords) => {
    console.log('geo', coords)
    return {
        type: "Feature",
        geometry: {
            type: "LineString", coordinates: coords
        }, // New Delhi
    }
}

const DataVisualization = ({device, location, temperatureData}) => {
    const {deviceData, curdevice, loading} = useSelector(state => ({
        deviceData: state.DeviceReducer.deviceData,
        curdevice: state.DeviceReducer.curdevice,
        loading: state.DeviceReducer.loading
    }));
    // const curlocation = deviceData[curdevice]?.locationhistory[0] ?? randomcoords[1]
    const [chartData, setChartData] = useState([]);
    const twentyfourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 2 hours in milliseconds
    const [selectedMetric, setSelectedMetric] = useState('Temperature');
    const currentLocationIcon = createIcon('mdi mdi-truck-plus-outline ');
    const commonOptions = {
        chart: {id: 'basic-bar'},
        xaxis: {
            type: 'datetime',
            min: twentyfourHoursAgo.getTime(),
            max: Date.now(),
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return Number(value).toPrecision(3);  // Keep only 3 significant figures
                }
            }
        },
    };

    let filteredSeries = deviceData[curdevice]?.dataseries.filter(item => new Date(item.measurementTime) >= twentyfourHoursAgo) ?? []

    const defaultCoords = [[-122.3321, 47.6062], [-122.0613245, 48.6092392]]; // Replace with your desired default coordinates[-122.3321, 47.6062], [-122.0613245, 48.6092392]

    const locationHistory = deviceData[curdevice]?.locationhistory ?? randomcoords;
    const validLocationHistory = locationHistory.length >= 2 ? locationHistory : defaultCoords;

// Now use validLocationHistory in your component
    const convertToSeattleTime = (utcTime) => {
        if (!utcTime) return 'Not exist';

        const date = new Date(utcTime);
        return date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    };
    const geoJsonData = useMemo(() => {
        return formatToGeoJsonDevice(deviceData[curdevice]?.locationhistory ?? randomcoords);
    }, [deviceData, curdevice]);
    // console.log('Cure Location ', [curlocation[1], curlocation[0]])
    // console.log('device', curdevice, '  ', deviceData[curdevice]?.locationhistory ?? defaultCoords)
    // console.log('device', curdevice, '  ', deviceData[curdevice])


    const metricChange = (metric) => {
        // console.log('metric',metric)
        let newData = [];
        switch (metric) {
            case 'Temperature':
                newData = filteredSeries.map(item => ({
                    x: new Date(item.measurementTime),
                    y: item.temperature
                }))
                break;
            case 'Humidity':
                newData = filteredSeries.map(item => ({
                    x: new Date(item.measurementTime),
                    y: item.humidity
                }))
                break;
            case 'Light Intensity':
                newData = filteredSeries.map(item => ({
                    x: new Date(item.measurementTime),
                    y: item.light
                }))
                break;
            case 'Shock':
                newData = filteredSeries.map(item => ({
                    x: new Date(item.measurementTime),
                    y: item.accelerationG
                }))
                break;
            default:
                newData = [];
        }

        // Assume newData is formatted correctly for ApexChart
        // console.log('newData',newData)
        setChartData(newData);
    }

    useEffect(() => {
        metricChange(selectedMetric)
    }, [selectedMetric, deviceData, curdevice])
    const handleMetricChange = (event) => {
        // console.log('event',event)
        const metric = event.target.value;
        setSelectedMetric(metric);
        metricChange(selectedMetric)


    };


    return (<div>
            {loading ? (<div className="loading-screen">
                    {/* Display a loading indicator here */}
                    <p>Loading...</p>
                </div>) :
                (
                    <div className="data-visualization-container">
                        <div className="map-container">


                            <MapContainer scrollWheelZoom={false}
                                          zoom={8} className="map-container-container">
                                <SetViewToFitBounds coordinates={switchxy(validLocationHistory)}/>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                {/*<Marker position={startPort} >*/}
                                {/*    <Popup>Start Port</Popup>*/}
                                {/*</Marker>*/}

                                {/*<Marker position={endPort} >*/}
                                {/*    <Popup>End Port</Popup>*/}
                                {/*</Marker>*/}
                                {/* Current Location Marker */}
                                {/*                    <Marker position={[curlocation[1], curlocation[0]]} icon={currentLocationIcon}>*/}
                                {/*                        <Popup>Current Location</Popup>*/}
                                {/*                    </Marker>*/}

                                <GeoJSON key={`geojson-${device.deviceId}-${Date.now()}`} data={geoJsonData}/>

                                {
                                    geoJsonData.geometry.coordinates.map((coord, index) => (
                                        <Marker position={[coord[1], coord[0]]} key={`marker-${index}`}
                                                icon={currentLocationIcon}>
                                            <Popup>{`Point ${index + 1}`}</Popup>
                                        </Marker>
                                    ))
                                }

                                <GeoJSON key={deviceData[curdevice]?.locationhistory ?? defaultCoords}
                                         data={geoJsonData}/>
                            </MapContainer>

                            {/*<MapContainer scrollWheelZoom={false} zoom={8} className="map-container-container">*/}


                            {/*    */}


                            {/*    /!* GeoJSON for the route *!/*/}
                            {/*    <GeoJSON key={`geojson-${device.deviceId}-${Date.now()}`} data={geoJsonData}/>*/}

                            {/*    /!* Loop through coordinates and create a marker for each *!/*/}
                            {/*    {*/}
                            {/*        geoJsonData.features[0].geometry.coordinates.map((coord, index) => (*/}
                            {/*            <Marker position={[coord[1], coord[0]]} key={`marker-${index}`}>*/}
                            {/*                <Popup>{`Point ${index}`}</Popup>*/}
                            {/*            </Marker>*/}
                            {/*        ))*/}
                            {/*    }*/}
                            {/*</MapContainer>*/}

                        </div>
                        {/*           {console.log('device sdfdsf', temperature)}*/}

                        {/*{console.log('device sdfdsf', deviceData[curdevice]?.temperaturehistory ?? 'default_value')}*/}
                        <div className="plot-section">
                            <div className="temperature-plot-container">


                                <div>
                                    <select value={selectedMetric} onChange={handleMetricChange}>
                                        <option value="Temperature">Temperature</option>
                                        <option value="Humidity">Humidity</option>
                                        <option value="Light Intensity">Light Intensity</option>
                                        <option value="Shock">Shock</option>
                                    </select>
                                </div>
                                <br/>

                                <h4>{selectedMetric}</h4>
                                <ReactApexChart
                                    options={commonOptions}
                                    series={[{
                                        name: selectedMetric,
                                        data: chartData
                                    }]}
                                    type="line"
                                    width="100%"
                                />
                            </div>


                            <div className="control-buttons">
                                {/*{console.log('device sdfdsf', deviceData[curdevice]?.currenthumidity ?? 'default_value')}*/}
                                <UpDownControl
                                    label="Humidity"
                                    // initialValue={deviceData[curdevice]['currenthumidity']}
                                    initialValue={deviceData[curdevice]?.currenthumidity ?? '-'}
                                    onChange={(limits) => console.log('Humidity limits:', limits)}
                                    minLimit={0}
                                    maxLimit={100}
                                />
                                <UpDownControl
                                    label="Luminosity"
                                    initialValue={deviceData[curdevice]?.currentluminosity ?? '-'}
                                    onChange={(limits) => console.log('Luminosity limits:', limits)}
                                    minLimit={0}
                                    maxLimit={100}
                                />
                                <UpDownControl
                                    label="Shock (g)"
                                    initialValue={deviceData[curdevice]?.currentshock ?? '-'}
                                    onChange={(limits) => console.log('Shock limits:', limits)}
                                    minLimit={0}
                                    maxLimit={10}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DataVisualization;


const startPort = [-22.9068, -43.1729];
// const endPortswitched = device.geometry.coordinates[device.geometry.coordinates.length - 1];
const endPort = [-34.6037, -58.3816];
const startIcon = createIcon('mdi mdi-crosshairs-gps');
const endIcon = createIcon('mdi mdi-flag-checkered');