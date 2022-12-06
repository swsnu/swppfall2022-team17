import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  images: string[];
  onIndexChange?: (index: number) => void;
}

const ImageView = (props: Props) => {
  const { images, onIndexChange } = props;

  const [index, setIndex] = useState<number>(0);

  // The actual index to use, bounded in the range [0, n).
  const boundedIndex = ((index % images.length) + images.length) % images.length;

  // Callback when the index is changed.
  useEffect(() => {
    onIndexChange?.(boundedIndex);
  }, [boundedIndex, onIndexChange]);

  return (
    <figure className="relative w-[40rem] max-w-full aspect-video shadow-lg rounded">
      {images.length > 0 ? (
        <>
          <Image src={images[boundedIndex]} alt="cafe-image" sizes="50vw" fill className="rounded" />

          {/* Image slide controls. */}
          <button
            className="z-50 absolute left-0 bottom-1/2 translate-y-1/2 text-black"
            onClick={(e) => setIndex((index) => index - 1)}
          >
            <FaChevronLeft size={35} />
          </button>
          <button
            className="z-50 absolute right-0 bottom-1/2 translate-y-1/2 text-black"
            onClick={(e) => setIndex((index) => index + 1)}
          >
            <FaChevronRight size={35} />
          </button>
        </>
      ) : (
        // Placeholder when no image to show.
        <div className="flex justify-center items-center w-full h-full">
          <h3 className="text-lg text-slate-600">이미지가 없습니다.</h3>
        </div>
      )}
    </figure>
  );
};

export default ImageView;
