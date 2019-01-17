import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow
} from "react-google-maps";
import Cacher from "services/cacher";

const MapComponent = props => {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      if
      {isLocationLoaded && !isError && (
        <Circle center={coordinates} radius={500} />
      )}
      {isLocationLoaded && isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            Uuuuups, there is problem to find location on the map, we are trying
            to resolve problem as fast as possible. Contact host for additional
            informations if you are still interested in booking this place. We
            are sorry for incoviniance.
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const withGeoCode = WrappedComponent => {
  return class extends Component {
    constructor() {
      super();

      this.cacher = new Cacher();

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentWillMount() {
      this.geoCodedLocation();
    }

    geoCodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = {
              lat: geometry.lat(),
              lng: geometry.lng()
            };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            this.setState({ isError: true, isLocationLoaded: true });
          }
        });
      });
    }

    geoCodedLocation() {
      let location = this.props.location;

      //Random location and error location  for testing
      // if (Math.floor(Math.random() * 10) > 5) {
      //   location = "asdasdasdsa";
      // }
      if (this.cacher.isValueCached(location)) {
        this.setState({
          coordinates: this.cacher.getCachedValue(location),
          isLocationLoaded: true
        });
        console.log("Coordinates comming from cache");
      } else {
        this.geoCodeLocation(location).then(
          coordinates => {
            this.setState({
              coordinates,
              isLocationLoaded: true
            });
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    render() {
      console.log("MapComponent", this.props.location);
      return <WrappedComponent {...this.state} />;
    }
  };
};

const MapWithGeocode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));

export default MapWithGeocode;
