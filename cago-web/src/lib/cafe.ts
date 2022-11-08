import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";

interface Cafe {
  id: number;
  token: string;
}

export const registerCafe = async (
  registrationNumber: string,
  businessName: string,
  representativeName: string,
  address: string,
  phoneNumber: string
) => {
  try {
    await getCagoRequest<{
      id: number;
      registration_number: string;
      business_name: string;
    }>("post")("/cafes/", {
      registration_number: registrationNumber,
      business_name: businessName,
      representative_name: representativeName,
      address,
      phone_number: phoneNumber,
    });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("이미 등록된 카페입니다.");
      }
    }
  }
};

export const isUniqueCafe = async (
  registrationNumber: string,
  businessName: string
) => {
  try {
    await getCagoRequest<{
      id: number;
      registrationNumber: string;
      businessName: string;
    }>("post")("/cafes/", {
      registration_number: registrationNumber,
      business_name: businessName,
    });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        return false;
      } else {
        return true;
      }
    }
  }
};
