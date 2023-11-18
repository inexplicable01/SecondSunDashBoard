import React, {useState, useRef, useEffect, useCallback} from "react";

import {useLocation} from "react-router-dom";

import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {ports, generateDeviceData} from './DummyData';
import './DeviceManagement.css';
import ColumnVisibilityModal from './ColumnVisibilityModal';
import DataVisualization from './Components/DataVisualization';
import DeviceTable from './Components/DeviceTable';
import {useSelector, useDispatch} from "react-redux";
import {fetchAccountID} from '../../store/deviceData/action'

const temperatureData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Temperature',
        data: [12, 19, 3, 5, 2],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};


const DeviceManagement = () => {
        // State to hold devices
        document.title = "Registered Devices | Second Sun Labs";
        const {deviceids, devices} = useSelector(state => ({
            deviceids: state.DeviceReducer.deviceids,
            devices: state.DeviceReducer.devices
        }));
        const dispatch = useDispatch();

        const [clickedDeviceData, setClickedDeviceData] = useState(null);

        const [visibleColumns, setVisibleColumns] = useState({
            serialNumber: true,
            name: true,
            company: true,
            status: true,
            lastTransmitted: true,
            lastLocation: true,
            batteryLife: true,
            registeredDate: true,
            registeredBy: true,
            startPort: true,
            endPort: true,
        });
        const [showCheckboxes, setShowCheckboxes] = useState(false); // state to toggle visibility of checkboxes
        const [isModalOpen, setIsModalOpen] = useState(false);
// Render checkboxes
        const allColumns = Object.keys(visibleColumns);  // Get all column keys
        const [showDeviceData, setShowDeviceData] = useState(false);

        const [fastdemodata, setFastDemoData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);


        //this needs to be taken care of via Redux.
        const location = useLocation();
        const {serialNumber, name, company, startPort, endPort} = location.state || {};
        const getIncomingDevice = () => {
            if (serialNumber) {
                return {

                    name, // assuming you want to use the name in your device data, if not, remove this
                    company, // if this is not in the structure of device data, remove this
                    serialNumber,
                    lastTransmitted: `2023-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')} 12:00`, // random date in 2023, or you might have another date logic
                    lastLocation: 'Home', // you might need logic here if you have location data for incoming device
                    batteryLife: Math.floor(90 + Math.random() * 11), // random battery percentage from 10 to 100, or use incoming device data
                    registeredDate: new Date().toISOString().split('T')[0], // this uses today's date for the registeredDate of the incoming device
                    registeredBy: name, // I'm assuming the registeredBy is the name provided in the form
                    startPort,
                    endPort,
                };
            }
            return null;
        };

        const handleFetchAccountID = (accountID) => {
            dispatch(fetchAccountID(accountID));
        };
        useEffect(() => {
            // Define a function to calculate the new devices array
            dispatch(fetchAccountID('blahfakafake'));
        }, [dispatch]); // This effect runs whenever `fastdemodata` changes

        // useEffect(() => {
        //     async function fetchData() {
        //         try {
        //             // console.log('gothere')
        //             const response = await fetch('http://35.160.4.251:5000/Devices/demoFast', {
        //                 method: 'GET',
        //                 mode: 'cors',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     // other headers as needed
        //                 },
        //                 // credentials: 'include'  // If you need to include credentials like cookies
        //             })
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             } else {
        //                 const result = await response.json();
        //                 console.log(result)
        //                 setFastDemoData({
        //                     type: "Feature",
        //                     geometry: {
        //                         type: "LineString", coordinates: [
        //                             [-43.1729, -22.9068],  // Rio de Janeiro
        //                             [-46.6333, -23.5505],  // Sao Paulo
        //                             [-49.2718, -25.4289],  // Curitiba
        //                             [-48.5044, -27.6146],  // Florianopolis
        //                             [-51.2177, -30.0346],  // Porto Alegre
        //                             [-56.1882, -34.9033],  // Montevideo
        //                             [-58.3816, -34.6037]   // Buenos Aires
        //                         ]
        //                     }, // Buenos Aires
        //                     properties: {
        //                         name: result.deviceId, // assuming you want to use the name in your device data, if not, remove this
        //                         company: result.deviceOwner, // if this is not in the structure of device data, remove this
        //                         serialNumber: 'NeedtoAdd',
        //                         lastTransmitted: result.measurementTime, // random date in 2023, or you might have another date logic
        //                         lastLocation: 'Home', // you might need logic here if you have location data for incoming device
        //                         batteryLife: result.estimatedBatteryLife, // random battery percentage from 10 to 100, or use incoming device data
        //                         registeredDate: new Date().toISOString().split('T')[0], // this uses today's date for the registeredDate of the incoming device
        //                         registeredBy: result.deviceOwner, // I'm assuming the registeredBy is the name provided in the form
        //                         startPort: 'startPort',
        //                         endPort: 'EndPort',
        //                     }
        //                 });
        //             }
        //
        //         } catch (error) {
        //             console.log(error)
        //             setError(error);
        //         } finally {
        //             setLoading(false);
        //         }
        //     }
        //
        //     console.log('not async')
        //     fetchData();
        // }, []);


        // console.log('fakee data', generateDeviceData.features[0])
        // console.log('fastdemodata', fastdemodata)

        // const [devices, setDevices] = useState([]);





        const handleCheckboxChange = (e) => {
            setVisibleColumns({
                ...visibleColumns,
                [e.target.name]: e.target.checked
            });
        };


        const handleDataIconClick = useCallback((device) => {
            setClickedDeviceData(device);
            if (showDeviceData) {
                const height = dataDivRef.current.scrollHeight + 'px';
                setMaxHeight(height);
            }
            setShowDeviceData(!showDeviceData);
        }, [showDeviceData]);


        const toggleColumnVisibility = (key) => {
            setVisibleColumns(prev => ({...prev, [key]: !prev[key]}));
        }

        const toggleModal = () => {
            setIsModalOpen(!isModalOpen);
        };


        const handleStatusChange = (rowData) => {
            // Toggle the status of the given row data and update the devices state
            // const updatedDevices = devices.map(device => {
            //     if (device === rowData) {
            //
            //         return {
            //             ...device,
            //             properties: {
            //                 ...device.properties,
            //                 status: device.properties.status === 'Active' ? 'Inactive' : 'Active'
            //             }
            //         };
            //     }
            //     return device;
            // });
            //
            // setDevices(updatedDevices);
        };


        const dataDivRef = useRef(null);
        const [maxHeight, setMaxHeight] = useState('0px');

        useEffect(() => {
            if (!showDeviceData) {
                const timer = setTimeout(() => {
                    setMaxHeight('0px');
                }, 300); // This delay should match the sum of the transition duration of opacity and its delay
                return () => clearTimeout(timer);
            }
        }, [showDeviceData]);
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <BreadCrumb title="Registered Devices" pageTitle="Devices"/>
                        <Row>
                            <Col xs={12}>

                                {showCheckboxes &&
                                    <div className="checkbox-container">
                                        <input type="checkbox" id="serialNumber" checked={visibleColumns.serialNumber}
                                               onChange={() => toggleColumnVisibility('serialNumber')}/>
                                        <label htmlFor="serialNumber">Serial Number</label>
                                    </div>
                                }
                                {clickedDeviceData && (
                                    <div className={`clicked-device-data ${showDeviceData ? 'open' : ''}`}>
                                        <h3>Device {clickedDeviceData.properties.name}</h3>
                                        <DataVisualization device={clickedDeviceData} location={location}
                                                           temperatureData={temperatureData}/>
                                    </div>
                                )}
                                <div></div>
                                <div className="side-by-side-container">
                                    <h3>Registered Devices</h3>
                                    <button onClick={toggleModal}>Show/Hide Columns</button>
                                </div>
                                <DeviceTable
                                    devices={devices}
                                    visibleColumns={visibleColumns}
                                    onStatusChange={handleStatusChange}
                                    handleDataIconClick={handleDataIconClick}
                                />


                            </Col>
                        </Row>

                        <ColumnVisibilityModal
                            isVisible={isModalOpen}
                            toggleModal={toggleModal}
                            visibleColumns={visibleColumns}
                            handleCheckboxChange={handleCheckboxChange}
                            allColumns={allColumns}
                        />
                    </Container>
                </div>
            </React.Fragment>
        );
    }
;

export default DeviceManagement;
