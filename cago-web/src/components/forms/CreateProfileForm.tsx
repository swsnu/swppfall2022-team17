import { useAuth } from "lib/auth";
import { createCustomerProfile, defaultAvatar } from "lib/customer-profile";
import { NextComponentType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CreateProfileForm: NextComponentType = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();

  // const redirect = (router.query.redirect as string | undefined) ?? "/";
  const redirect = "/cafes";

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await createCustomerProfile({ display_name: displayName }, user.token);
        router.replace(redirect);
      }
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  return (
    <>
      <Image
        src={defaultAvatar}
        alt="customer-profile-default-avatar"
        width={150}
        height={150}
        className="mx-auto rounded-full border border-slate-800 mb-6"
      />
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="표시 이름"
          required
          autoFocus
          onChange={(e) => setDisplayName(e.target.value)}
          className="contained font-normal mb-2"
        />
        <button type="submit" className="outlined">
          확인
        </button>
      </form>
    </>
  );
};

export default CreateProfileForm;
