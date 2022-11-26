import { useAuth } from "lib/auth";
import Link from "next/link";
import { parseE164 } from "utils";
import { ManagedCafe } from "./CafesMap";
import CafeToggleSwitch from "./CafeToggleSwitch";

interface Props {
  cafe: ManagedCafe;
}

const CafeSummary = ({ cafe }: Props) => {
  const { user } = useAuth();

  return (
    <div className="relative">
      <Link
        href={`/admin/dashboard/${cafe.id}`}
        className="block w-full pl-12 pr-24 py-5 shadow-lg rounded-lg"
      >
        {/* Name */}
        <h2 className="text-lg font-bold mb-2">{cafe.name}</h2>

        {/* Address & phone */}
        <div className="md:flex">
          <h3>{cafe.address}</h3>
          <div className="px-4 hidden md:block">|</div>
          <h3>{parseE164(cafe.phone_number)}</h3>
        </div>
      </Link>

      {/* Toggle Switch */}
      <div className="z-50 absolute right-6 bottom-1/2 translate-y-1/2">
        <CafeToggleSwitch cafe={cafe} />
      </div>
    </div>
  );
};

export default CafeSummary;
