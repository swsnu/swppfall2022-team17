import cafes from "data/cafes.json";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface CafePopupProps {
  id: number;
  name: string;
  address: string;
  phone: string;
}

let isAlreadyLoaded = false;

const CafePopup = (props: CafePopupProps) => {
  const { id, name, address, phone } = props;
  return (
    <div className="font-normal p-4 rounded-md bg-slate-800 text-white w-64 min-w-fit">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p>주소: {address}</p>
      {phone && <p>전화번호: {phone}</p>}
      <Link href={`/cafes/${id}`} className="outlined block w-full text-center mt-4">
        자세히
      </Link>
    </div>
  );
};

const CafesMap = () => {
  const [loaded, setLoaded] = useState<boolean>(isAlreadyLoaded);
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const [selectedCafe, setSelectedCafe] = useState<number>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords);
    });
  }, []);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        type="text/javascript"
        onLoad={() =>
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          })
        }
      />
      {loaded && coords && (
        <Map
          center={{ lat: coords.latitude, lng: coords.longitude }}
          level={5}
          className="w-full h-[calc(100vh-4rem)]"
          onClick={() => setSelectedCafe(undefined)}
        >
          <CustomOverlayMap position={{ lat: coords.latitude, lng: coords.longitude }}>
            <span className="h-5 w-5 inline-block rounded-full bg-red-600 drop-shadow-lg" />
          </CustomOverlayMap>

          {cafes.map((cafe) => (
            <>
              <MapMarker
                key={cafe.id}
                position={{ lat: parseFloat(cafe.y), lng: parseFloat(cafe.x) }}
                onClick={() => setSelectedCafe(cafe.id)}
              />
              <CustomOverlayMap
                position={{ lat: parseFloat(cafe.y), lng: parseFloat(cafe.x) }}
                zIndex={99}
                clickable={true}
              >
                {cafe.id === selectedCafe && (
                  <CafePopup id={cafe.id} name={cafe.name} address={cafe.address} phone={cafe.phone} />
                )}
              </CustomOverlayMap>
            </>
          ))}
        </Map>
      )}
    </>
  );
};

export default CafesMap;
