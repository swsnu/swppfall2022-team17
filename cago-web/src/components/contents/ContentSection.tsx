import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const ContentSection = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col justify-center max-h-[60vh] my-4">
      <div className="text-2xl font-bold w-full mb-4">{title}</div>
      <div className="max-h-[50vh] overflow-y">{children}</div>
    </div>
  );
};

export default ContentSection;
