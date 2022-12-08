import { useAuth } from "lib/auth";
import { ManagedCafe } from "lib/cafe";
import { mutate } from "swr";
import { getCagoRequest } from "utils";

interface Props {
  cafe: ManagedCafe;
}

const ActivityToggleButton = ({ cafe }: Props) => {
  const { user } = useAuth();

  const openClassName =
    "py-2 px-4 rounded-3xl text-sm text-white font-semibold bg-slate-900 bg-slate-900 hover:bg-slate-700";
  const closedClassName =
    "py-2 px-4 rounded-3xl text-sm font-semibold bg-white hover:bg-slate-50 ring-2 ring-black";

  const handleToggle: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    if (user) {
      await getCagoRequest("patch", user.token)(`/cafes/${cafe.id}/`, {
        force_closed: !cafe.force_closed,
      });
      mutate(`/cafes/${cafe.id}/`);
      mutate(`/cafes/?manager=${user.id}`);
    }
  };

  return (
    <button className={cafe.force_closed ? closedClassName : openClassName} onClick={(e) => handleToggle(e)}>
      {cafe.force_closed ? "준비 중" : "영업 중"}
    </button>
  );
};

export default ActivityToggleButton;
