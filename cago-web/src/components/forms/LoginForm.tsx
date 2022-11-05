import { login } from "lib/auth";
import { NextComponentType } from "next";
import React, { useState } from "react";

const LoginForm: NextComponentType = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
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
      <input
        type="email"
        placeholder="이메일"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="outlined font-normal mb-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        required
        onChange={(e) => setPassword(e.target.value)}
        className="outlined font-normal mb-2"
        autoComplete="new-password"
      />
      <button type="submit" className="contained">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
