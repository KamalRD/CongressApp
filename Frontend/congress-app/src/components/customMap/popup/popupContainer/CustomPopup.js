import { useEffect, useState } from 'react';
import './customPopup.css';

import StatePopup from '../statePopup/StatePopup';
import DistrictPopup from '../districtPopup/DistrictPopup';

function CustomPopup(props) {
    const [ displayDistricts, setDisplayDistricts ] = useState(props.displayDistricts);

    useEffect(() => {
        setDisplayDistricts(props.displayDistricts);
    }, [props]);

    return (
        <>
            { displayDistricts ? <DistrictPopup currentHover={props.currentHover} ></DistrictPopup> : <StatePopup currentHover={props.currentHover}></StatePopup>}
        </>
    );
};

export default CustomPopup;