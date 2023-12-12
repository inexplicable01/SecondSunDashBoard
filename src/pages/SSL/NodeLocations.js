import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, GeoJSON, Polyline, Marker, Popup} from "react-leaflet";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {Grid, Config} from "gridjs-react";
import L from 'leaflet';
import {generateDeviceData, locationsGeoJSON} from './Components/DummyData';
import './NodeLocations.css';
import {useSelector, useDispatch} from "react-redux";
import {fetchAccountID} from "../../store/deviceData/action";

const NodeLocations = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedDevice, setSelectedDevice] = useState(null);
            const {deviceids, devices, deviceData} = useSelector(state => ({
            deviceids: state.DeviceReducer.deviceids,
            devices: state.DeviceReducer.devices,
                deviceData: state.DeviceReducer.deviceData,
        }));
    // const [filteredDeviceData, setFilteredDeviceData] = useState(null);
    // const [deviceData, setDeviceData] = useState(generateDeviceData);
    // console.log('generateDeviceData', generateDeviceData)
    // const deviceFeature = deviceData.features.find(device => device.properties.name === selectedDevice);
    // const filteredDeviceData = deviceFeature ? {
    //     type: "FeatureCollection",
    //     features: [deviceFeature]
    // } : null;
        useEffect(() => {
            // Define a function to calculate the new devices array
            dispatch(fetchAccountID('blahfakafake'));
        }, [dispatch]); // This effect runs whenever `fastdemodata` changes
    document.title = "Device Locations | SSL ";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Device Locations" pageTitle="Main"/>
                    <Row>
                        <Col xs={12}>
                        </Col>
                    </Row>

                    <div>
                        {selectedDevice ? `Selected Device: ${selectedDevice}` : 'No device selected'}

                        {/*<button onClick={fetchDeviceData}>Refresh</button>*/}
                        {/*{lastRefreshTime && <div>Last refreshed at: {lastRefreshTime}</div>}*/}
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flex: "80%"}}>
                                <MapContainer
                                    center={[0, 0]}
                                    zoom={2}
                                    style={{height: "60vh", width: "100%"}}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {/*{deviceData.map((feature, idx) => {*/}
                                    {/*    // Assuming the last coordinate in the path is the current location of the device*/}
                                    {/*    const currentLocation = feature.geometry.coordinates[feature.geometry.coordinates.length - 1];*/}
                                    {/*    const switchxy = [currentLocation[1], currentLocation[0]]*/}
                                    {/*    return (*/}
                                    {/*        <Marker key={idx} position={switchxy}*/}
                                    {/*                eventHandlers={{*/}
                                    {/*                    click: () => {*/}
                                    {/*                        // Update the state with the device's name when the marker is clicked*/}
                                    {/*                        setSelectedDevice(feature.properties.name);*/}
                                    {/*                    }*/}
                                    {/*                }}*/}

                                    {/*        >*/}
                                    {/*            <Popup>*/}
                                    {/*                {feature.properties.name}*/}
                                    {/*                <table>*/}
                                    {/*                    <tbody>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td><strong>Temp:</strong></td>*/}
                                    {/*                        <td>{feature.properties.temperature}°C</td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td><strong>Pressure:</strong></td>*/}
                                    {/*                        <td>{feature.properties.pressure}hPa</td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td><strong>Luminosity:</strong></td>*/}
                                    {/*                        <td>{feature.properties.luminosity} lux</td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    <tr>*/}
                                    {/*                        <td><strong>Shock:</strong></td>*/}
                                    {/*                        <td>{feature.properties.shock}g</td>*/}
                                    {/*                    </tr>*/}
                                    {/*                    </tbody>*/}
                                    {/*                </table>*/}
                                    {/*            </Popup>*/}
                                    {/*        </Marker>*/}
                                    {/*    );*/}
                                    {/*})}*/}
                                    {/*{console.log('filteredDeviceData', filteredDeviceData)}*/}
                                    {/*{filteredDeviceData && <GeoJSON key={selectedDevice} data={filteredDeviceData}/>}*/}
                                </MapContainer>


                            </div>
                            {/*<div style={{flex: "30%", overflowX: "auto"}}>*/}
                            {/*    <Grid {...tableConfig} />*/}
                            {/*    <button onClick={seeMoreData}>See More Data</button>  /!* New button *!/*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NodeLocations;