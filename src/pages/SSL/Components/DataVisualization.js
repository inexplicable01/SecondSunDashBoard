import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {MapContainer, TileLayer, Marker, GeoJSON, Popup, Circle, useMap} from 'react-leaflet';
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
    // if coordinates
    const map = useMap();
    if (coordinates && coordinates.length > 0){
          map.fitBounds(coordinates);
    }

    return null;  // No UI rendered by this component
}

const randomcoords = switchxy([
    // [47.8610025, -122.3269672],  // Sao Paulo
    // [47.6610025, -122.3269672],  // Curitibad
    // [47.3610025, -122.3269672],  // Florianopolis
    // [47.6610025, -122.3269672],  // Porto Alegre
    // [47.1258383, -122.1609394],  // Montevideo
    // [47.3610025, -122.1609394]   // Buenos Aires
])

const seattleTimeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
        year: 'numeric', // Add year in the numeric format (e.g., 2023)
    month: '2-digit', // Add month in the 2-digit format (e.g., 03)
    day: '2-digit', // Add day in the 2-digit format (e.g., 04)
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: false
});
const daytimeframe = 7

const daysAgo = new Date(Date.now() - daytimeframe * 24 * 60 * 60 * 1000);
const now = new Date();

// Generate the array of timestamps for each hour
const hourlyTimestamps = generateHourlyTimestamps(daysAgo, now);


function generateHourlyTimestamps(start, end) {
    // Set start date to the nearest hour before the actual start time
    let current = new Date(start);
    current.setMinutes(0, 0, 0); // Resets minutes, seconds, and milliseconds

    // If the adjusted start time is after the actual start time, subtract one hour
    if (current.getTime() > start) {
        current.setHours(current.getHours() - 1);
    }

    let timestamps = [];
    while (current.getTime() < end) {
        timestamps.push(current.getTime());
        current.setHours(current.getHours() + 1); // Increment by one hour
    }

    return timestamps;
}


const DataVisualization = ({device, location, temperatureData}) => {
    const [viewDays, setViewDays] = useState(1)
    const {deviceData, curdevice, loading} = useSelector(state => ({
        deviceData: state.DeviceReducer.deviceData,
        curdevice: state.DeviceReducer.curdevice,
        loading: state.DeviceReducer.loading
    }));
    // const curlocation = deviceData[curdevice]?.locationhistory[0] ?? randomcoords[1]
    const [chartData, setChartData] = useState([]);
    const daysAgo = new Date(Date.now() - viewDays * 24 * 60 * 60 * 1000); // 2 hours in milliseconds
    const [selectedMetric, setSelectedMetric] = useState('Temperature');
    const currentLocationIcon = createIcon('mdi mdi-truck-minus ');
    const commonOptions = {
        chart: {id: 'basic-bar'},
        xaxis: {
            type: 'datetime',
            min: daysAgo.getTime(),
            max: Date.now(),
            // tickAmount: 10,
            categories: hourlyTimestamps, // Set the calculated hourly timestamps
            labels: {
                formatter: function (val) {
                    // Format the date to show only the hour
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/Los_Angeles',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).format(new Date(val));
                },
            },
            // Adjust 'tickAmount' to suit how many ticks you'd like to show across the axis
            tickAmount: 24,
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return Number(value).toPrecision(3);  // Keep only 3 significant figures
                }
            }
        },
    };

    // useMemo to memoize filteredSeries
    const filteredSeries = useMemo(() => {
        const daysAgo = new Date(Date.now() - viewDays * 24 * 60 * 60 * 1000);
        return deviceData[curdevice]?.dataseries.filter(item => new Date(item.measurementTime) >= daysAgo) ?? [];
    }, [deviceData, curdevice, viewDays]); // Dependencies that, when changed, will recalculate filteredSeries

    const defaultCoords = [[-122.3321, 47.6062], [-122.0613245, 48.6092392]]; // Replace with your desired default coordinates[-122.3321, 47.6062], [-122.0613245, 48.6092392]

    const geoJsonData = useMemo(() => {
        const dataseries = deviceData[curdevice]?.dataseries ?? randomcoords;
        // console.log('useMemo dataseries',dataseries)
        const daysAgo = new Date(Date.now() - viewDays * 24 * 60 * 60 * 1000);
        return {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: dataseries.filter(item => item.coordinates
                    && item.coordinates.latitude != null && item.coordinates.longitude != null && (new Date(item.measurementTime) >= daysAgo))
                    .map(item => [item.coordinates.longitude, item.coordinates.latitude, item.locationAccuracy]),
            }, // New Delhi
        }
    }, [deviceData, curdevice, viewDays]);


    // console.log('geoJsonData.geometry',geoJsonData.geometry)
    const validLocationHistory = deviceData[curdevice] && deviceData[curdevice].dataseries?.length >= 2
        ? geoJsonData.geometry.coordinates
        : defaultCoords;
    const metricChange = useCallback((metric) => {
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
    }, [filteredSeries]);

    useEffect(() => {
        metricChange(selectedMetric)
    }, [metricChange, selectedMetric])
    const handleMetricChange = (event) => {
        // console.log('event',event)
        const metric = event.target.value;
        setSelectedMetric(metric);
        metricChange(selectedMetric)

    };
    const keysArray = deviceData[curdevice]?.dataseries?.map((_, index) => `key${index}`) ?? ['defaultKey'];
    // console.log('dataseries', deviceData[curdevice]?.dataseries)
    // console.log('keysArray',keysArray)
    // console.log('geoJsonData',geoJsonData)
    //  console.log('validLocationHistory',validLocationHistory)
    // validLocationHistory
// geoJsonData
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
                                <GeoJSON key={`geojson-${device.deviceId}-${Date.now()}`} data={geoJsonData}/>
                                {
                                    deviceData[curdevice]?.dataseries.map((item, index) => (
                                        <>
                                            <Marker position={[item.coordinates.latitude, item.coordinates.longitude]}
                                                    key={`marker-${index}`}
                                                    icon={currentLocationIcon}
                                            >
                                                <Popup>{`Point ${index + 1}, Accuracy:${item.locationAccuracy}\n
                                            time: ${seattleTimeFormatter.format(new Date(item.measurementTime))} PT time`}</Popup>
                                            </Marker>
                                            <Circle
                                                center={[item.coordinates.latitude, item.coordinates.longitude]}
                                                radius={item.locationAccuracy} // This should be your parameter that determines the size of the circle
                                                key={`circle-${index}`}
                                                // color="blue" // You can customize your circle color
                                                fillColor="blue" // You can customize your fill color
                                                fillOpacity={0.01} // You can customize your fill opacity
                                            />
                                        </>
                                    ))
                                }
                                <GeoJSON key={keysArray}
                                         data={geoJsonData}/>
                            </MapContainer>

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

                                <div className="slider-container">
                                    <span className="slider-label">1 day</span>
                                    <input
                                        type="range"
                                        min="1" // Minimum value
                                        max="7" // Maximum value
                                        value={viewDays}
                                        onChange={(e) => setViewDays(Number(e.target.value))}
                                    />
                                    <span className="slider-label">7 days</span>
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


// const startPort = [-22.9068, -43.1729];
// // const endPortswitched = device.geometry.coordinates[device.geometry.coordinates.length - 1];
// const endPort = [-34.6037, -58.3816];
// const startIcon = createIcon('mdi mdi-crosshairs-gps');
// const endIcon = createIcon('mdi mdi-flag-checkered');