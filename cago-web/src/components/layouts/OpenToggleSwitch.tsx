import { useAuth } from "lib/auth";
import { Cafe, toggleOpen } from "lib/cafe";
import { useState } from "react";

const OpenToggleSwitch = (cafe: Cafe) => {
  const { user } = useAuth();
  const [closed, switchClosed] = useState(cafe.force_closed);
  const isOpen =
    "py-2 px-4 rounded-3xl text-xs text-white font-semibold bg-slate-900 bg-slate-900 hover:bg-slate-700";
  const isClosed =
    "py-2 px-4 rounded-3xl text-xs font-semibold bg-white hover:bg-slate-50 ring-2 ring-black";

  const handleOpenToggleSwitch: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (user) await toggleOpen(cafe.id, !closed, user.token);
    switchClosed(!closed);
  };

  return (
    <button
      className={closed ? isClosed : isOpen}
      onClick={(e) => handleOpenToggleSwitch(e)}
    >
      {closed ? "준비 중" : "영업 중"}
    </button>
  );
};

export default OpenToggleSwitch;
