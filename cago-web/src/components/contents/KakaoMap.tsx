import Script from "next/script";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

interface Props {
  children?: React.ReactNode;
  className?: string;
  displayCurrentLocation?: boolean;
  onClick?: () => void;
  onCurrentLocationChange?: (coord: Coordinates) => void;
  onCenterChange?: (map: kakao.maps.Map) => void;
  onCreate?: (map: kakao.maps.Map) => void;
}

export interface Coordinates {
  x: number;
  y: number;
}

let isAlreadyLoaded = false;
let watchPositionId = -1;

const KakaoMap = (props: Props) => {
  const [loaded, setLoaded] = useState<boolean>(isAlreadyLoaded);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>();

  useEffect(() => {
    // Initialize with cached location.
    const lastLocation = localStorage.getItem("last-location");
    if (lastLocation) {
      setCurrentLocation(JSON.parse(lastLocation));
    }

    // Get current location from geolocation API.
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({ x: position.coords.longitude, y: position.coords.latitude });
    });

    // Watch current position of the device, and modify center if changed. Useful in mobile device.
    if (watchPositionId == -1) {
      watchPositionId = navigator.geolocation.watchPosition((position) => {
        setCurrentLocation({ x: position.coords.longitude, y: position.coords.latitude });
      });
    }
  }, []);

  // If current location is changed, call the callback and store it to local storage.
  const { onCurrentLocationChange } = props;
  useEffect(() => {
    if (currentLocation) {
      onCurrentLocationChange?.(currentLocation);
      localStorage.setItem("last-location", JSON.stringify({ x: currentLocation.x, y: currentLocation.y }));
    }
  }, [currentLocation, onCurrentLocationChange]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        type="text/javascript"
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }}
      />

      {loaded && currentLocation && (
        // Draw a map centered at the current position.
        <Map
          center={{ lng: currentLocation!.x, lat: currentLocation!.y }}
          level={3}
          maxLevel={4}
          className={"w-full h-full" + " " + props.className} // class name can be passed as a prop.
          // Handle the callbacks.
          onClick={() => props.onClick?.()}
          onCenterChanged={(map) => props.onCenterChange?.(map)}
          onCreate={(map) => props.onCreate?.(map)}
        >
          {/* Draw red mark at the current positon. */}
          {props.displayCurrentLocation && (
            <CustomOverlayMap position={{ lng: currentLocation.x, lat: currentLocation.y }}>
              <span className="h-5 w-5 inline-block rounded-full bg-red-600 drop-shadow-lg" />
            </CustomOverlayMap>
          )}

          {props.children}
        </Map>
      )}
    </>
  );
};

export default KakaoMap;
