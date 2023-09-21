import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useTable} from 'react-table';
import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {ports, generateDeviceData} from './DummyData';
import './DeviceManagement.css';
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, CustomInput} from 'reactstrap';
import ColumnVisibilityModal from './ColumnVisibilityModal';
import DataVisualization from './DataVisualization';


const location = [51.505, -0.09]; // [latitude, longitude]
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
    const location = useLocation();
    const [clickedDeviceData, setClickedDeviceData] = useState(null);
    const {serialNumber, name, company, startPort, endPort} = location.state || {};
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

    const [devices, setDevices] = useState([...generateDeviceData.features,
        ...(getIncomingDevice() ? [getIncomingDevice()] : [])

    ]);
    const handleCheckboxChange = (e) => {
        setVisibleColumns({
            ...visibleColumns,
            [e.target.name]: e.target.checked
        });
    };
    const data = React.useMemo(() => devices, [devices]);
const handleDataIconClick = useCallback((device) => {
    setClickedDeviceData(device);
    if (showDeviceData) {
        const height = dataDivRef.current.scrollHeight + 'px';
        setMaxHeight(height);
    }
    setShowDeviceData(!showDeviceData);
}, [showDeviceData]);

    const columns = React.useMemo(() => {
        let cols = [];
        if (visibleColumns.serialNumber) {
            cols.push({
                Header: 'Serial Number',
                accessor: 'properties.serialNumber',
                Cell: ({cell, row}) => {
                    const isDeviceActive = row.original.properties.status === 'Active';
                    return (
                        <span style={{color: isDeviceActive ? 'black' : 'gray'}}>
                    {cell.value}
                            {isDeviceActive &&
                                <i className="data-icon" onClick={() => handleDataIconClick(row.original)}>
                                    📊
                                </i>
                            }
                </span>
                    );
                }
            });
        }
        if (visibleColumns.status) {
            cols.push({
                Header: 'Status',
                accessor: 'properties.status',
            });
        }
        if (visibleColumns.name) {
            cols.push({
                Header: 'Owner',
                accessor: 'properties.name',
            });
        }
        if (visibleColumns.company) {
            cols.push({
                Header: 'Company',
                accessor: 'properties.company',
            });
        }
        if (visibleColumns.lastTransmitted) {
            cols.push({
                Header: 'Last Transmitted',
                accessor: 'properties.lastTransmitted',
            });
        }
        if (visibleColumns.lastLocation) {
            cols.push({
                Header: 'Last Location',
                accessor: 'properties.lastLocation',
            });
        }
        if (visibleColumns.batteryLife) {
            cols.push({
                Header: 'Battery Life (%)',
                accessor: 'properties.batteryLife',
            });
        }
        if (visibleColumns.registeredDate) {
            cols.push({
                Header: 'Registered Date',
                accessor: 'properties.registeredDate',
            });
        }
        if (visibleColumns.registeredBy) {
            cols.push({
                Header: 'Registered By',
                accessor: 'properties.registeredBy',
            });
        }
        if (visibleColumns.startPort) {
            cols.push({
                Header: 'Start Port',
                accessor: 'properties.startPort',
            });
        }
        if (visibleColumns.endPort) {
            cols.push({
                Header: 'End Port',
                accessor: 'properties.endPort',
            });
        }

        return cols;
    }, [visibleColumns, handleDataIconClick]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});


    const toggleColumnVisibility = (key) => {
        setVisibleColumns(prev => ({...prev, [key]: !prev[key]}));
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleStatusChange = (rowData) => {
        // Toggle the status of the given row data and update the devices state
        const updatedDevices = devices.map(device => {
            if (device === rowData) {

                return {
                    ...device,
                    properties: {
                        ...device.properties,
                        status: device.properties.status === 'Active' ? 'Inactive' : 'Active'
                    }
                };
            }
            return device;
        });

        setDevices(updatedDevices);
    };

    document.title = "Registered Devices | Second Sun Labs";

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
                                    <DataVisualization device={clickedDeviceData} location={location} temperatureData={temperatureData}/>
                                </div>
                            )}
                            <div>   </div>
                            <div className="side-by-side-container">
                                <h3>Registered Devices</h3>
                                <button onClick={toggleModal}>Show/Hide Columns</button>
                            </div>

                            <table {...getTableProps()} style={{border: 'solid 1px gray', width: '100%'}}>
                                <thead>
                                {headerGroups.map((headerGroup, headerGroupIndex) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                                        {headerGroup.headers.map((column, columnIndex) => (
                                            <th {...column.getHeaderProps()} key={columnIndex} style={{
                                                border: 'solid 1px gray',
                                                padding: '10px'
                                            }}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                {rows.map((row, rowIndex) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={rowIndex}>
                                            {row.cells.map((cell, cellIndex) => (
                                                <td {...cell.getCellProps()} key={cellIndex} style={{
                                                    border: 'solid 1px gray',
                                                    padding: '10px'
                                                }}>
                                                    {cell.column.id === 'properties.status'
                                                        ? (
                                                            <label className="switch">
                                                                <input type="checkbox"
                                                                       checked={cell.value === 'Active'}
                                                                       onChange={() => handleStatusChange(cell.row.original)}
                                                                />
                                                                <span className="slider"></span>
                                                            </label>
                                                        )
                                                        : cell.render('Cell')
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
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
};

export default DeviceManagement;
