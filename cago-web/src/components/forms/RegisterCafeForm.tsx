import KakaoMap, { Coordinates } from "components/maps/KakaoMap";
import { useAuth } from "lib/auth";
import { registerCafe } from "lib/cafe";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { toE164 } from "utils";

interface SearchedCafe {
  name: string;
  phone_number: string;
  address: string;
  location: Coordinates;
}

const blackMarker =
  "https://cdn3.iconfinder.com/data/icons/summer-glyph-24-px/24/Gps_location_marker_location_pin_location_pointer_map_locator-512.png";

const RegisterCafeForm = () => {
  /*
  (1) Search location by address (geocoding)
  (2) Search cafes by the location (place search)
  (3) Show the cafes on the map
  (4) Select the cafe to register by clicking one of the markers
  */
  const [map, setMap] = useState<kakao.maps.Map>();
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [searchedCafes, setSearchedCafes] = useState<SearchedCafe[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<SearchedCafe>();

  // Form states. Name and phone number will be set when a cafe is selected on the map.
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();

  // Stuffs to do when the cafe is selected.
  useEffect(() => {
    if (selectedCafe) {
      map?.setCenter(new kakao.maps.LatLng(selectedCafe.location.y, selectedCafe.location.x));
      setSearchAddress(selectedCafe.address);
      setName(selectedCafe.name);
      setPhoneNumber(selectedCafe.phone_number);
    }
  }, [selectedCafe, map]);

  const handleSearch: React.FormEventHandler = (e) => {
    e.preventDefault();

    // Search location by 'searchAddress' using geocoding.
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchAddress, (result, status) => {
      // Geocoding failed.
      if (status !== "OK" || result.length == 0) {
        window.alert("올바른 주소를 입력해주세요.");
        return;
      }

      // Get the coordinates.
      const x = parseFloat(result[0].x);
      const y = parseFloat(result[0].y);

      // Place search on the searched location.
      const ps = new kakao.maps.services.Places();
      ps.categorySearch(
        "CE7", // cafe
        (result) => {
          const data = result.map((d) => ({
            name: d.place_name,
            phone_number: d.phone,
            address: d.road_address_name,
            location: { x: parseFloat(d.x), y: parseFloat(d.y) },
          }));
          setSearchedCafes(data);

          // Select the first cafe in the result.
          if (data.length == 0) {
            window.alert("주변에 카페가 없습니다.");
          } else {
            setSelectedCafe(data[0]);
          }
        },
        { x, y, sort: kakao.maps.services.SortBy.DISTANCE }
      );
    });
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    // Register as a managed cafe.
    if (selectedCafe && user) {
      try {
        await registerCafe(
          {
            address: selectedCafe?.address,
            location: `${selectedCafe?.location.x},${selectedCafe?.location.y}`,
            registration_number: parseInt(registrationNumber),
            name,
            phone_number: toE164(phoneNumber),
          },
          user.token
        );
        // Redirect to dashboard after successfully registering the cafe.
        router.push("/admin/dashboard");
      } catch (e) {
        const error = e as Error;
        window.alert(error.message);
      }
    }
  };

  return (
    <>
      {/* Search by address */}
      <form onSubmit={(e) => handleSearch(e)} className="flex justify-between items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="주소"
          autoFocus
          required
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          className="outlined font-normal w-full"
        />
        <button className="outlined min-w-fit">검색</button>
      </form>

      {/* Map */}
      <div className="h-96 mb-4">
        <KakaoMap className="rounded-lg shadow outlined" onCreate={(map) => setMap(map)}>
          {/* Display markers of the cafes. */}
          {searchedCafes.map((cafe) => {
            return (
              <div key={cafe.name + cafe.location.x}>
                <MapMarker
                  position={{ lng: cafe.location.x, lat: cafe.location.y }}
                  onClick={() => setSelectedCafe(cafe)}
                  image={{
                    src: blackMarker,
                    size: {
                      width: 32,
                      height: 32,
                    },
                  }}
                />
              </div>
            );
          })}
        </KakaoMap>
      </div>

      {/* Form */}
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="tel"
          placeholder="사업자 등록 번호"
          required
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="text"
          placeholder="카페명"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="tel"
          placeholder="전화번호"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <button type="submit" className="contained">
          등록하기
        </button>
      </form>
    </>
  );
};

export default RegisterCafeForm;
