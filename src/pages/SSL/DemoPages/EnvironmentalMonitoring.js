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

const EnvironmentalMonitoring = () => {
        // State to hold devices
        document.title = "Environmental Monitoring Devices | Second Sun Labs";
const fakedata = [
  { name: 'Harper Moore', location: 'San Diego' },
  { name: 'Benjamin Taylor', location: 'San Diego' },
  { name: 'Noah Wilson', location: 'Los Angeles' },
  { name: 'Ava Miller', location: 'Phoenix' },
  { name: 'Sophia Johnson', location: 'Houston' },
  { name: 'Logan Hernandez', location: 'San Diego' },
  { name: 'Charlotte Anderson', location: 'San Jose' },
  { name: 'Sophia Jones', location: 'Houston' },
  { name: 'Lucas Brown', location: 'Houston' },
  { name: 'Sophia Martinez', location: 'Los Angeles' }
]
        return <DeviceManagement title='Environmental Monitoring' fdata={fakedata}/>
    }
;

export default EnvironmentalMonitoring;