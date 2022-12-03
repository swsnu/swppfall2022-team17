import { useAuth } from "lib/auth";
import { createMenu } from "lib/menu";
import React, { useState } from "react";

interface Props {
  cafeId: number;
  onSuccess?: () => void;
}

const CreateMenuForm = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [isMain, setIsMain] = useState<boolean>(false);

  const { user } = useAuth();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const data = {
          cafe: props.cafeId,
          name,
          is_main: isMain,
          category,
          price: price === "" ? 0 : price,
          image: "https://cdn4.iconfinder.com/data/icons/sketchy-basic-icons/94/coffee-512.png", // TODO: upload image
        };
        await createMenu(data, user.token);
        props.onSuccess?.();
      }
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  return (
    // TODO: upload image
    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      {/* Menu name */}
      <input
        type="text"
        aria-label="menu-name"
        placeholder="메뉴 이름"
        required
        autoFocus
        onChange={(e) => setName(e.target.value)}
        className="outlined font-normal mb-2"
      />

      {/* Menu category */}
      <input
        type="text"
        aria-label="menu-category"
        placeholder="카테고리"
        required
        onChange={(e) => setCategory(e.target.value)}
        className="outlined font-normal mb-2"
      />

      {/* Menu price */}
      <input
        type="text"
        aria-label="menu-price"
        placeholder="가격"
        required
        value={price}
        onChange={(e) => {
          if (e.target.value === "") {
            setPrice("");
          } else if (!isNaN(e.target.value as any)) {
            setPrice(parseInt(e.target.value));
          }
        }}
        className="outlined font-normal mb-2 appearance-none"
      />

      {/* Menu is main checkbox */}
      <label>
        메인 메뉴입니까?
        <input
          type="checkbox"
          aria-label="menu-is-main"
          className="ml-2"
          onChange={(e) => setIsMain(e.target.checked)}
        />
      </label>

      {/* Submit button */}
      <button type="submit" className="contained mt-4">
        추가하기
      </button>
    </form>
  );
};

export default CreateMenuForm;
