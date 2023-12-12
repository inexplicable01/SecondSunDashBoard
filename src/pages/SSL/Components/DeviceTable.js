// DeviceTable.js
import React from 'react';
import { useTable } from 'react-table';
import { Button } from 'reactstrap';

const DeviceTable = ({ devices, visibleColumns, onStatusChange , handleDataIconClick}) => {


  const columns = React.useMemo(() => {
    let cols = [];
    if (visibleColumns.serialNumber) {
        cols.push({
            Header: 'Unique ID',
            accessor: 'deviceId',
            Cell: ({cell, row}) => {
                const isDeviceActive = row.original.status === 'Active';
                return (
                    <span style={{color: isDeviceActive ? 'black' : 'gray'}}>
                    {cell.value}<br/>
                        {/*{isDeviceActive &&*/}
                        {/*    // <i className="data-icon" onClick={() => handleDataIconClick(row.original)}>*/}
                        {/*    //     PushMe*/}
                        {/*    // </i>*/}
                        {/*    <Button color="secondary" className="rounded-pill" style={{ margin: '0px' }}*/}
                        {/*        onClick={() => handleDataIconClick(row.original)}>*/}
                        {/*        View Data*/}
                        {/*    </Button>*/}

                        {/*}*/}
                </span>
                );
            }
        });
    }
        if (visibleColumns.startPort) {
        cols.push({
            Header: 'Name',
            accessor: 'properties.startPort',
        });
    }
    if (visibleColumns.endPort) {
        cols.push({
            Header: 'Location',
            accessor: 'properties.endPort',
        });
    }
    if (visibleColumns.status) {
      cols.push({
        Header: '',
        accessor: 'status',
        Cell: ({ row }) => (

                          <Button color="secondary" className="rounded-pill"
                      onClick={() => handleDataIconClick(row.original)}>
                  View Data
              </Button>
            // <label className="switch">
            //
            //
            //
            //   {/*<input*/}
            //   {/*  type="checkbox"*/}
            //   {/*  checked={row.original.status === 'Active'}*/}
            //   {/*  onChange={() => onStatusChange(row.original)}*/}
            //   {/*/>*/}
            //   {/*<span className="slider"></span>*/}
            // </label>
        ),
      });
    }
    if (visibleColumns.name) {
        cols.push({
            Header: 'Owner',
            accessor: 'deviceOwner',
        });
    }
    if (visibleColumns.company) {
        cols.push({
            Header: 'Company',
            accessor: 'accountId',
        });
    }
    if (visibleColumns.lastTransmitted) {
        cols.push({
            Header: 'Last Transmitted',
            accessor: 'measurementTime',
        });
    }
    if (visibleColumns.lastLocation) {
        cols.push({
            Header: 'ICCID',
            accessor: 'iccid',
        });
    }
    if (visibleColumns.batteryLife) {
        cols.push({
            Header: 'Battery Life (Days)',
            accessor: 'estimatedBatteryLife',
        });
    }
    if (visibleColumns.registeredDate) {
        cols.push({
            Header: 'Last Transmission',
            accessor: 'properties.registeredDate',
        });
    }
    // if (visibleColumns.registeredBy) {
    //     cols.push({
    //         Header: 'Registered By',
    //         accessor: 'properties.registeredBy',
    //     });
    // }


    return cols;
}, [visibleColumns, handleDataIconClick]);
// onStatusChange,



  const data = React.useMemo(() => devices, [devices]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
                        <table {...getTableProps()} style={{border: 'solid 1px gray', width: '100%'}}>
                            <thead>
                            {headerGroups.map((headerGroup, headerGroupIndex) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                                    {headerGroup.headers.map((column, columnIndex) => (
                                        <th {...column.getHeaderProps()} key={columnIndex} style={{
                                            border: 'solid 1px gray',
                                            padding: '10px',
                                            backgroundColor: "grey"
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
                                                                   onChange={() => onStatusChange(cell.row.original)}
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
  );
};

export default DeviceTable;
