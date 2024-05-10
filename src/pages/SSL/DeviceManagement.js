import React, {useState, useRef, useEffect, useCallback} from "react";

import {useLocation} from "react-router-dom";

import {Button, Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {ports, generateDeviceData} from './Components/DummyData';
import './DeviceManagement.css';
import ColumnVisibilityModal from './Components/ColumnVisibilityModal';
import DataVisualization from './Components/DataVisualization';
import DeviceTable from './Components/DeviceTable';
import {useSelector, useDispatch} from "react-redux";
import {fetchAccountID, fetchDeviceData} from '../../store/deviceData/action'

const DeviceManagement = (props) => {
        // State to hold devices
        // document.title = "Registered Devices | Second Sun Labs";
        const {deviceids, devices, alldeviceloading} = useSelector(state => ({
            deviceids: state.DeviceReducer.deviceids,
            devices: state.DeviceReducer.devices,
            alldeviceloading: state.DeviceReducer.alldeviceloading
        }));
        const dataDivRef = useRef(null);
        const [maxHeight, setMaxHeight] = useState('0px');
        const dispatch = useDispatch();

        const [clickedDeviceData, setClickedDeviceData] = useState(null);

        const [visibleColumns, setVisibleColumns] = useState({
            serialNumber: true,
            devicegroupid: true,
            deviceType: true,
            company: true,
            status: true,
            lastTransmitted: true,
            lastLocation: true,
            imei: true,
            batteryLife: true,
            registeredDate: true,
            registeredBy: true,
            startPort: true,
            location: true,
        });
        const [showCheckboxes, setShowCheckboxes] = useState(false); // state to toggle visibility of checkboxes
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [greenDeviceCount, setGreenDeviceCount] = useState(0)
        const [orangeDeviceCount, setOrangeDeviceCount] = useState(0)
        const [blackDeviceCount, setBlackDeviceCount] = useState(0)
// Render checkboxes
        const allColumns = Object.keys(visibleColumns);  // Get all column keys
        const [showDeviceData, setShowDeviceData] = useState(false);
        const [deviceTypes, setDeviceTypes] = useState([]);
        const [selectedTypes, setSelectedTypes] = useState(new Set());

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


        const handleFetchAccountID = useCallback((accountID) => {
            dispatch(fetchAccountID(accountID));
        }, [dispatch]);

        // console.log('devices', devices)
        useEffect(() => {
            handleFetchAccountID('PlaceHolder');
        }, [handleFetchAccountID, dispatch]); //


        const handleCheckboxChange = (e) => {
            setVisibleColumns({
                ...visibleColumns,
                [e.target.name]: e.target.checked
            });
        };


        const handleDataIconClick = useCallback((device) => {
            setClickedDeviceData(device);
            // console.log(device)
            // console.log(device.deviceId)
            dispatch(fetchDeviceData(device.deviceId, 7));
            if (showDeviceData && dataDivRef.current.scrollHeight) {
                const height = dataDivRef.current.scrollHeight + 'px';
                // const height =  '500px';
                setMaxHeight(height);
            }
            setShowDeviceData(!showDeviceData);
        }, [showDeviceData, dispatch]);


        const toggleColumnVisibility = (key) => {
            setVisibleColumns(prev => ({...prev, [key]: !prev[key]}));
        }

        const toggleModal = () => {
            setIsModalOpen(!isModalOpen);
        };

        useEffect(() => {
            const types = new Set(devices.map(device => device.deviceType)); // Adjust device.type based on your data structure
            setDeviceTypes([...types]);
            setSelectedTypes(types);
        }, [devices]);

        const toggleDeviceType = (type) => {
            setSelectedTypes(prevSelected => {
                const newSelected = new Set(prevSelected);
                if (newSelected.has(type)) {
                    newSelected.delete(type);
                } else {
                    newSelected.add(type);
                }
                return newSelected;
            });
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


        useEffect(() => {
            if (!showDeviceData) {
                const timer = setTimeout(() => {
                    setMaxHeight('0px');
                }, 300); // This delay should match the sum of the transition duration of opacity and its delay
                return () => clearTimeout(timer);
            }
        }, [showDeviceData]);

        useEffect(() => {
            let g = 0;
            let o = 0;
            let b = 0;

            devices.forEach((device) => {
                // Assuming 'measurementTime' is a property of 'device'
                const measurementTime = new Date(device.measurementTime);
                const currentTime = new Date();
                // Calculate the difference in minutes
                const timeDifference = (currentTime - measurementTime) / (1000 * 60);
                if (selectedTypes.has(device.deviceType)) {
                    if (timeDifference < 10) {
                        g += 1;
                    } else if (timeDifference >= 10 && timeDifference <= 30) {
                        o += 1;
                    } else {
                        b += 1;
                    }
                }
                // Increment counters based on the time difference

            });

            setBlackDeviceCount(b);
            setOrangeDeviceCount(o);
            setGreenDeviceCount(g);
        }, [devices, selectedTypes]); // Make sure this dependency list is correct

        let newdevices = [];

        if (Array.isArray(devices)) {

            devices.sort((a, b) => a.deviceId - b.deviceId);
            newdevices = devices.map((device, index) => ({
                ...device,
                // name: namelocationdata[index]?.name,
                // location: namelocationdata[index]?.location,
            }));
            console.log('newdevices are updated.')
        }
        console.log('clickedDeviceData',clickedDeviceData)

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <BreadCrumb title={props.title ? props.title : 'Registered Devices'} pageTitle="Devices"/>
                        <h1>
                            Active: <span style={{color: 'green'}}> {greenDeviceCount}</span>
                            {' '}Maybe Active: <span style={{color: 'orange'}}>{orangeDeviceCount}</span>
                            {' '}Not Active:<span style={{color: 'white'}}>{blackDeviceCount}</span>
                        </h1>
                        {showCheckboxes &&
                            <div className="checkbox-container">
                                <input type="checkbox" id="serialNumber" checked={visibleColumns.serialNumber}
                                       onChange={() => toggleColumnVisibility('serialNumber')}/>
                                <label htmlFor="serialNumber">Serial Number</label>
                            </div>
                        }
                        <div>
                            {deviceTypes.map((type) => (
                                <label key={type} style={{padding: '5px'}}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.has(type)}
                                        onChange={() => toggleDeviceType(type)}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>


                        <Row>
                            <Col xs={3}>
                                <div className="side-by-side-container">
                                    <h3>Registered Devices</h3>
                                    <Button color="secondary" className="rounded-pill"
                                            onClick={() => handleFetchAccountID('PlaceHolder')}>
                                        Refresh List
                                    </Button>
                                    {/*<button onClick={toggleModal}>Show/Hide Columns</button>*/}
                                </div>

                                <div className="device-table-container">
                                    {alldeviceloading ? <div className="loading-screen">
                                            {/* Display a loading indicator here */}
                                            <p>Loading All Device Menu...</p>
                                        </div> :

                                        <DeviceTable
                                            devices={newdevices.filter(device => selectedTypes.has(device.deviceType))}
                                            visibleColumns={visibleColumns}
                                            onStatusChange={handleStatusChange}
                                            handleDataIconClick={handleDataIconClick}
                                        />

                                    }
                                </div>
                            </Col>
                            <Col xs={9}>
                                <div>
                                    {clickedDeviceData && (
                                        <div className={`clicked-device-data ${showDeviceData ? 'open' : ''}`}
                                            // style={{padding:'20px' , margin:'20px'}}
                                        >
                                            <div className="side-by-side-container">
                                                <Button color="secondary" className="rounded-pill"
                                                        onClick={() => handleDataIconClick(clickedDeviceData)}>
                                                    Refresh Device {clickedDeviceData.deviceId}
                                                </Button>
                                            </div>
                                            <DataVisualization device={clickedDeviceData} location={location}/>
                                        </div>
                                    )}
                                </div>
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
