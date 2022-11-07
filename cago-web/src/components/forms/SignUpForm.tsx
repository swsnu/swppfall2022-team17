import { isUniqueEmail, login, signup } from "lib/auth";
import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [currentStage, setCurrentStage] = useState<"email" | "password">("email");

  const passwordMatch = password === passwordConfirm;

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (currentStage === "email") {
      if (await isUniqueEmail(email)) {
        setCurrentStage("password");
      } else {
        window.alert("이미 사용중인 이메일입니다.");
      }
    } else {
      await signup(email, password, passwordConfirm);
      await login(email, password);
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      {currentStage === "email" && (
        <>
          <input
            type="email"
            placeholder="이메일"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="outlined font-normal mb-2"
          />
          <button type="submit" className="contained">
            계속하기
          </button>
        </>
      )}
      {currentStage === "password" && (
        <>
          <input
            type="password"
            placeholder="비밀번호"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="outlined font-normal mb-2"
          />
          {!passwordMatch && <p className="text-red-700 text-sm text-right">비밀번호가 다릅니다.</p>}
          <input
            type="password"
            placeholder="비밀번호 확인"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="outlined font-normal mb-2"
          />
          <button type="submit" disabled={!passwordMatch} className="contained">
            가입하기
          </button>
        </>
      )}
    </form>
  );
};
export default SignUpForm;
