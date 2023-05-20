import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet/hooks';

function CustomMapHandler(props) {
    const [displayDistricts, setDisplayDistricts] = useState(props.displayDistricts);

    useEffect(() => {
        props.onChange(displayDistricts);
    }, [props, displayDistricts]);    

    const map = useMapEvents({
        zoom: () => {
            if (map.getZoom() > 5) {
                setDisplayDistricts(true);
            } else {
                setDisplayDistricts(false);
            }
        }
    });
    return null;
}

export default CustomMapHandler;