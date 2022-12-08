import { Cafe, ManagedCafe } from "lib/cafe";
import { useCafeImages } from "lib/image";
import Image from "next/image";
import Link from "next/link";
import { parseE164 } from "utils";
import Crowdedness from "../contents/Crowdedness";

interface Props {
  cafe: Cafe | ManagedCafe;
}

const CafeOverlay = ({ cafe }: Props) => {
  const { mainImage } = useCafeImages(cafe.id.toString());

  return (
    <div className="font-normal p-4 rounded-md bg-gray-800 text-white w-64 min-w-fit">
      {mainImage && <Image src={mainImage.url} alt="cafe_image" width={360} height={360} className="mb-2" />}
      {!mainImage && <h4 className="text-gray-500 mb-2">대표 이미지 없음</h4>}

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
