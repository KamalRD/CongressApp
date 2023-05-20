import { useState } from 'react';

import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import StateLayer from './StateLayer';
import DistrictLayer from './DistrictLayer';
import CustomMapHandler from './CustomMapHandler';
import CustomPopup from './popup/popupContainer/CustomPopup';
import Navbar from '../navbar/Navbar';

import "./customMap.css"

function CustomMap() {
    const [displayDistricts, setDisplayDistricts] = useState(false);
    const [currentHover, setCurrentHover] = useState(null);

    const onZoomChange = (newDisplayValue) => {
        setDisplayDistricts(newDisplayValue);
    }

    const onHoverChange = (newHoverValue) => {
        setCurrentHover(newHoverValue);
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="mapContainer">
                <div className="map">
                    <MapContainer style={{height: "80%" , width: "80%", margin: "10% auto", borderRadius: "10px"}} zoom={3} center={[51.7314343, -120.2890619]} maxZoom={10} minZoom={3}>
                        <StateLayer displayDistricts={displayDistricts} setCurrentHover={(value) => onHoverChange(value)}></StateLayer>
                        <DistrictLayer displayDistricts={displayDistricts} setCurrentHover={(value) => onHoverChange(value)}></DistrictLayer>
                        <CustomMapHandler displayDistricts={displayDistricts} onChange={(value) => onZoomChange(value)}></CustomMapHandler>
                    </MapContainer>
                </div>
                <div className="mapPopup">
                    <CustomPopup displayDistricts={displayDistricts} currentHover={currentHover}></CustomPopup>
                </div>
            </div>
        </>
    );
};

export default CustomMap;