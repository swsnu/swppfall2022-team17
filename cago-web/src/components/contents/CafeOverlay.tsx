import Image from "next/image";
import Link from "next/link";
import { parseE164 } from "utils";
import { Cafe, ManagedCafe } from "./CafesMap";
import Crowdedness from "./Crowdedness";

const CafeOverlay = ({ cafe }: { cafe: Cafe | ManagedCafe }) => {
  return (
    <div className="font-normal p-4 rounded-md bg-slate-800 text-white w-64 min-w-fit">
      {/* TODO: replace with actual repr. image of the cafe. */}
      <Image
        src="https://live.staticflickr.com/65535/50245686993_33e8c2d21a_c.jpg"
        alt="cafe_image"
        width={360}
        height={360}
        className="mb-2"
      />
      <h2 className="text-xl font-semibold mb-2">{cafe.name}</h2>

      {/* Crowdedness */}
      {cafe.is_managed && (
        <div className="mb-3">
          <h3 className="mb-1">혼잡도</h3>
          <Crowdedness crowdedness={cafe.crowdedness} />
        </div>
      )}

      {/* Address */}
      <p>주소: {cafe.address}</p>

      {/* Phone number */}
      {cafe.phone_number && <p>전화번호: {parseE164(cafe.phone_number)}</p>}

      {/* 'Details' button */}
      {cafe.is_managed && (
        <Link href={`/cafes/${cafe.id}/info`} className="outlined block w-full text-center mt-4">
          자세히
        </Link>
      )}
    </div>
  );
};

export default CafeOverlay;
