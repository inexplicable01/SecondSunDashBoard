import React, {useState, useRef, useEffect, useCallback} from "react";
import DeviceManagement from "../DeviceManagement";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchAccountID, fetchDeviceData} from "../../../store/deviceData/action";
import {Col, Container, Row} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeviceTable from "../Components/DeviceTable";
import DataVisualization from "../Components/DataVisualization";
import ColumnVisibilityModal from "../Components/ColumnVisibilityModal";

const InfrastructureManagement = () => {
        // State to hold devices
        document.title = "Infrastructure Management Devices | Second Sun Labs";
const fakedata = [
  { name: 'Benjamin Thomas', location: 'New York' },
  { name: 'Harper Martinez', location: 'New York' },
  { name: 'Amelia Miller', location: 'San Antonio' },
  { name: 'Ethan Moore', location: 'San Diego' },
  { name: 'James Rodriguez', location: 'New York' },
  { name: 'Harper Wilson', location: 'New York' },
  { name: 'James Thomas', location: 'Chicago' },
  { name: 'Evelyn Martinez', location: 'Los Angeles' },
  { name: 'Lucas Miller', location: 'Houston' },
  { name: 'Sophia Johnson', location: 'Chicago' }
]
        return <DeviceManagement title='Infrastructure Management'  fdata={fakedata}  />
    }
;

export default InfrastructureManagement;