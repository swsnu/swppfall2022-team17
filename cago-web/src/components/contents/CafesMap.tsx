import { AxiosError } from "axios";
import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import useSWR from "swr";
import { getCagoRequest } from "utils";
import CafeOverlay from "./CafeOverlay";
import KakaoMap, { Coordinates } from "./KakaoMap";

export interface Cafe {
  id: number;
  is_managed: false;
  name: string;
  phone_number: string;
  location: string[];
  address: string;
}

export interface ManagedCafe extends Omit<Cafe, "is_managed"> {
  is_managed: true;
  avatar: string;
  crowdedness: 0 | 1 | 2 | 3;
  force_closed: boolean;
  introduction: string;
  managers: number[];
  owner: number;
  registration_number: number;
}

const greyMarker = "https://i.imgur.com/LmqKNbd.png";
const redMarker = "https://i.imgur.com/js6V323.png";

const CafesMap = () => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [currentMapCenter, setCurrentMapCenter] = useState<Coordinates>();
  const [cafeSearchCenter, setCafeSearchCenter] = useState<Coordinates>();
  const [selectedCafe, setSelectedCafe] = useState<Cafe | ManagedCafe>();

  const { data: cafes } = useSWR<(Cafe | ManagedCafe)[], AxiosError>(
    cafeSearchCenter && `/cafes/?location=${cafeSearchCenter.x},${cafeSearchCenter.y}`,
    getCagoRequest()
  );

  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Button to refetch the cafes on the center of the map. */}
      {currentMapCenter && (
        <button
          className="fixed contained z-50 top-20 right-1/2 translate-x-1/2 shadow-lg"
          onClick={() => {
            setCafeSearchCenter(currentMapCenter);
            setSelectedCafe(undefined);
          }}
        >
          다시 검색하기
        </button>
      )}
      <KakaoMap
        displayCurrentLocation
        // Remove the overlay on clicking the map.
        onClick={() => setSelectedCafe(undefined)}
        // Initialize the cafe listing location to the current location.
        onCurrentLocationChange={(coord) => {
          if (!cafeSearchCenter) setCafeSearchCenter(coord);
        }}
        onCenterChange={(map) => {
          const x = map.getCenter().getLng();
          const y = map.getCenter().getLat();
          setCurrentMapCenter({ x, y });
        }}
        onCreate={(map) => setMap(map)}
      >
        {/* Display markers and overlay of the selected cafe */}
        {cafes &&
          cafes.map((cafe) => (
            <div key={cafe.id}>
              <MapMarker
                position={{ lng: parseFloat(cafe.location[0]), lat: parseFloat(cafe.location[1]) }}
                onClick={() => {
                  setSelectedCafe(cafe);
                  // Place the overlay at the center of the map.
                  const lat = parseFloat(cafe.location[1]) - 0.002;
                  const lng = parseFloat(cafe.location[0]) + 0.0015;
                  map?.setCenter(new kakao.maps.LatLng(lat, lng));
                }}
                image={{
                  src: cafe.is_managed ? redMarker : greyMarker,
                  size: {
                    width: 52,
                    height: 52,
                  },
                }}
              />
              <CustomOverlayMap
                position={{ lng: parseFloat(cafe.location[0]), lat: parseFloat(cafe.location[1]) }}
                zIndex={99}
                clickable={true}
              >
                {cafe.id === selectedCafe?.id && <CafeOverlay cafe={cafe} />}
              </CustomOverlayMap>
            </div>
          ))}
      </KakaoMap>
    </div>
  );
};

export default CafesMap;
