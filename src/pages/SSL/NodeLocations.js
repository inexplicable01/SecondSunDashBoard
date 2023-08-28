import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, GeoJSON} from "react-leaflet";
import axios from "axios";
import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {Grid, Config} from "gridjs-react";

const NodeLocations = () => {
    const [deviceData, setDeviceData] = useState(null);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
    const fetchDeviceData = async () => {
        try {
            // const response = await axios.get("/api/devices"); // Replace with your API endpoint
            // setDeviceData(response.data);
            // Hardcoded dummy GeoJSON data
            setDeviceData({
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [-122.4194, 37.7749]}, // San Francisco, USA
                        properties: {name: "Device 1", temperature: 23, humidity: 45, pressure: 1013, acceleration: 2}
                    },
                    {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [103.8198, 1.3521]}, // Singapore
                        properties: {name: "Device 2", temperature: 25, humidity: 55, pressure: 1513, acceleration: 4}
                    },
                    {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [12.4964, 41.9028]}, // Rome, Italy
                        properties: {
                            name: "Device 3",
                            temperature: 253,
                            humidity: 455,
                            pressure: 16713,
                            acceleration: 2
                        },
                    },
                    {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [77.2090, 28.6139]}, // New Delhi, India
                        properties: {
                            name: "Device 4",
                            temperature: 453,
                            humidity: 425,
                            pressure: 156713,
                            acceleration: 2
                        },
                    },
                    {
                        type: "Feature",
                        geometry: {type: "Point", coordinates: [-58.4173, -34.6118]}, // Buenos Aires, Argentina
                        properties: {
                            name: "Device 5",
                            temperature: 73,
                            humidity: 465,
                            pressure: 10946713,
                            acceleration: 2
                        },
                    },
                ],
            });
            setLastRefreshTime(new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Error fetching device data:", error);
        }
    };
    // Function to add Popup to each feature
    const onEachFeature = (feature, layer) => {
        layer.on({
            click: () => setSelectedDevice(feature.properties),
        });
        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
    };

  useEffect(() => {
    fetchDeviceData();
    const deviceDataInterval = setInterval(() => {
      fetchDeviceData();
    }, 60000);
    return () => clearInterval(deviceDataInterval);
  }, []);

  const tableConfig = {
    columns: ["Attribute", "Value"],
    data: selectedDevice ? Object.entries(selectedDevice) : [],
  };
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
                        <button onClick={fetchDeviceData}>Refresh</button>
  {lastRefreshTime && <div>Last refreshed at: {lastRefreshTime}</div>}
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flex: "70%"}}>
                                <MapContainer
                                    center={[0, 0]} // Initial world view
                                    zoom={2}
                                    style={{height: "60vh", width: "100%"}}
                                    scrollWheelZoom={false} // Disable scroll wheel zoom}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {deviceData && (
                                        <GeoJSON
                                            data={deviceData}
                                            onEachFeature={onEachFeature} // Attach Popup to each feature
                                        />
                                    )}
                                </MapContainer>
                            </div>
                            <div style={{flex: "30%", overflowX: "auto"}}>
                                <Grid {...tableConfig} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NodeLocations;