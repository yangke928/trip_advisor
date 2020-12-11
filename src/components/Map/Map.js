import React from "react"
import {GOOGLE_MAP_KEY} from "./config"
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {convertPosition} from "../../services/mapService";

class Map extends React.Component {

    componentDidMount() {
        if(this.props.zipcode.length === 5)
            convertPosition(this.props.zipcode).then(result =>
                this.setState({
                lat: result.places[0].latitude,
                lng: result.places[0].longitude,
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.zipcode.length === 5 && this.props.zipcode !== prevProps.zipcode)
            convertPosition(this.props.zipcode).then(result =>
                this.setState({
                    lat: result.places[0].latitude,
                    lng: result.places[0].longitude,
                }))
    }


    state = {
        lat: "",
        lng: ""
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultCenter={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng)}}
                defaultZoom={13}>
                <Marker
                    position={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng)}}>
                    <InfoWindow>
                        <div>
                            Zipcode {this.props.zipcode}
                        </div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>));
        return (
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&libraries=places`}
                loadingElement={<div style={{ height: `100%`}} />}
                containerElement={<div style={{ height: `100%`}} />}
                mapElement={<div style={{ height: `100%`}} />}
                />
        )
    }
}


export default Map
