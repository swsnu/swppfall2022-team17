import { useAuth } from "lib/auth";
import { createProfile, defaultAvatar } from "lib/profile";
import { NextComponentType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { uploadImage } from "utils";

const   CreateProfileForm: NextComponentType = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [avatar, setAvatar] = useState<File>();

  const { user } = useAuth();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        let avatarURL = undefined;

        // Upload image if an avatar file is uploaded.
        if (avatar) {
          avatarURL = await uploadImage(avatar);
        }

        await createProfile({ display_name: displayName, avatar: avatarURL }, user.token);
      }
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files?.length > 0) {
      setAvatar(files[0]);
    }
  };

  return (
    <>
      <div className="relative w-36 h-36 mx-auto mb-6">
        <label htmlFor="avatar-upload">
          <Image
            src={avatar ? URL.createObjectURL(avatar) : defaultAvatar}
            alt="profile-default-avatar"
            fill
            className="mx-auto rounded-full border border-slate-800 cursor-pointer"
          />
        </label>
      </div>

      <input
        id="avatar-upload"
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        onChange={(e) => handleAvatarChange(e)}
        className="hidden"
      />

      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          aria-label="display-name"
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
