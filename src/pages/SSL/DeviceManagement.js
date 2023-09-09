import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useTable} from 'react-table';
import {Col, Container, Row} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {ports} from './DummyData';

const DeviceManagement = () => {
    // State to hold devices
    const location = useLocation();
    const {serialNumber, name, company, startPort, endPort} = location.state || {};

    const generateDummyData = (numberOfDevices) => {
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson'];
        const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];
        // const ports = ['Port of Los Angeles', 'Port of New York', 'Port of Houston', 'Port of Seattle', 'Port of Miami'];

        const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

        return Array.from({length: numberOfDevices}).map(() => ({
            name: name? name:'John Bob',
            company: company? company:'Bob Shipping',
            serialNumber: Math.floor(10000 + Math.random() * 90000).toString(),  // random 5 digit number
            lastTransmitted: `2023-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')} 12:00`, // random date in 2023
            lastLocation: getRandomItem(locations),
            batteryLife: Math.floor(10 + Math.random() * 91), // random battery percentage from 10 to 100
            registeredDate: `2023-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')}`, // random date in 2023
            registeredBy: getRandomItem(names),
            startPort: getRandomItem(ports),
            endPort: getRandomItem(ports),
        }));
    }
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

    const [devices, setDevices] = useState([
        ...(getIncomingDevice() ? [getIncomingDevice()] : []),
        ...generateDummyData(9)
    ]);

    const data = React.useMemo(() => devices, [devices]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Serial Number',
                accessor: 'serialNumber',
            },
                        {
                Header: 'Owner',
                accessor: 'name',
            },
                        {
                Header: 'Company',
                accessor: 'company',
            },
            {
                Header: 'Last Transmitted',
                accessor: 'lastTransmitted',
            },
            {
                Header: 'Last Location',
                accessor: 'lastLocation',
            },
            {
                Header: 'Battery Life (%)',
                accessor: 'batteryLife',
            },
            {
                Header: 'Registered Date',
                accessor: 'registeredDate',
            },
            {
                Header: 'Registered By',
                accessor: 'registeredBy',
            },
            {
                Header: 'Start Port',
                accessor: 'startPort',
            },
            {
                Header: 'End Port',
                accessor: 'endPort',
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});
    document.title = "Registered Devices | Second Sun Labs";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Registered Devices" pageTitle="Devices"/>
                    <Row>
                        <Col xs={12}>
                            <h3>Registered Devices</h3>
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
                                                }}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DeviceManagement;
