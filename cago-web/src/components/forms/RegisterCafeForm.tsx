import { registerCafe } from "lib/cafe";
import React, { useState } from "react";

const RegisterCafeForm = () => {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [representativeName, setRepresentativeName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      await registerCafe(
        registrationNumber,
        businessName,
        representativeName,
        address,
        phoneNumber
      );
    } catch (e) {
      const error = e as Error;
      window.alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <>
        <input
          type="text"
          placeholder="사업자 등록 번호"
          required
          autoFocus
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="text"
          placeholder="상호"
          required
          onChange={(e) => setBusinessName(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="text"
          placeholder="대표자 성명"
          required
          onChange={(e) => setRepresentativeName(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="text"
          placeholder="소재지"
          required
          onChange={(e) => setAddress(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <input
          type="text"
          placeholder="카페 전화번호"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="outlined font-normal mb-2"
        />
        <button type="submit" className="contained">
          카페 등록하기
        </button>
      </>
    </form>
  );
};
export default RegisterCafeForm;
