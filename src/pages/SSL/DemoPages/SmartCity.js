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

const SmartCity = () => {
        // State to hold devices
        document.title = "Environmental Monitoring Devices | Second Sun Labs";
const fakedata = [
  { name: 'Logan Brown', location: 'San Diego' },
  { name: 'Ava Wilson', location: 'San Antonio' },
  { name: 'Elijah Moore', location: 'New York' },
  { name: 'Mia Hernandez', location: 'Dallas' },
  { name: 'Isabella Rodriguez', location: 'San Diego' },
  { name: 'Aiden Jones', location: 'Philadelphia' },
  { name: 'Emma Anderson', location: 'Los Angeles' },
  { name: 'James Jones', location: 'Houston' },
  { name: 'Elijah Taylor', location: 'Los Angeles' },
  { name: 'Elijah Rodriguez', location: 'Dallas' }
]
        return <DeviceManagement title='Smart City' fdata={fakedata}   />
    }
;

export default SmartCity;