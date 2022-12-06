import React, { FC, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  images: string[];
  style: {
    height: number;
    width: number;
  };
  onIndexChange?: (index: number) => void;
}

// Function as an album component.
const ImageView: FC<Props> = (props: Props) => {
  // loop list to make the movement fluent
  const imageList = [
    props.images[props.images?.length - 1],
    ...props.images,
    props.images[0],
  ];

  const [index, setIndex] = useState(1);

  const { onIndexChange } = props;

  const [style, setStyle] = useState({
    transform: `translateX(-${props.style.width}px)`,
    transition: `all 0.5s ease-in-out`,
  });

  const toRight = () => {
    setIndex(index + 1);
    onIndexChange?.(index);
    setStyle({
      transform: `translateX(-${(index + 1) * props.style.width}px)`,
      transition: `all 0.5s ease-in-out`,
    });
  };

  const toLeft = () => {
    setIndex(index - 1);
    onIndexChange?.(index);
    setStyle({
      transform: `translateX(-${(index - 1) * props.style.width}px)`,
      transition: `all 0.5s ease-in-out`,
    });
  };

  //0ms transtion for loop functioning
  useEffect(() => {
    if (index === 0) {
      setIndex(imageList.length - 2);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${
            (imageList.length - 2) * props.style.width
          }px)`,
          transition: "0ms",
        });
      }, 100);
    }

    if (index >= imageList?.length - 1) {
      setIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${props.style.width}px)`,
          transition: "0ms",
        });
      }, 100);
    }
  }, [index, imageList.length]);

  return (
    <div className="flex flex-row justify-center">
      <button className="text-black text-xl " onClick={toLeft}>
        <FaChevronLeft size="32" />
      </button>
      <div
        className={`relative overflow-hidden w-[${props.style.width}px] h-[${props.style.height}px]`}
      >
        <div
          className="absolute left-0 top-0 flex flex-row h-full items-center"
          style={style}
          placeholder={"이미지가 없습니다"}
        >
          {imageList?.map((image, key) => {
            return (
              <div
                className={`flex align-center justify-center w-[${props.style.width}px] h-[${props.style.height}px]`}
                key={key}
              >
                <img
                  src={image}
                  key={key}
                  alt="http://placehold.it/800x600"
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
      <button className="text-black text-xl " onClick={toRight}>
        <FaChevronRight size="32" />
      </button>
    </div>
  );
};

export default ImageView;
