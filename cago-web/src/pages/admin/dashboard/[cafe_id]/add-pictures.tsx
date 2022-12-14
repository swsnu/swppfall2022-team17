import ImageView from "components/contents/ImageView";
import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import RequireManager from "components/layouts/RequireManager";
import { useAuth } from "lib/auth";
import { postCafeImage, setMainImage, useCafeImages } from "lib/image";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useState } from "react";
import { uploadImage } from "utils";

const AddPictures: NextPageWithLayout = () => {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { cafeImages, mainImage } = useCafeImages(cafeId);
  const { user } = useAuth();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleMainImageSet = async () => {
    if (!!user) {
      await setMainImage(parseInt(cafeId), cafeImages[imageIndex].id, user.token);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!!user && files && files?.length > 0) {
      const file = files[0];
      const url = await uploadImage(file);
      await postCafeImage(parseInt(cafeId), url, user.token);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mt-8">카페 사진 설정하기</h1>
      <div>
        <div className="max-w-full w-fit mx-auto mt-6">
          <ImageView
            images={cafeImages.map((ci) => ci.url)}
            onIndexChange={(index) => setImageIndex(index)}
          />
        </div>
        {cafeImages.length > 0 && (
          <button
            className="contained w-full mt-2 disabled:bg-gray-500"
            disabled={mainImage?.id === cafeImages[imageIndex]?.id}
            onClick={(e) => handleMainImageSet()}
          >
            대표 이미지로 설정
          </button>
        )}
        <label htmlFor="upload-image">
          <div className="outlined w-full mt-2 text-center cursor-pointer">이미지 업로드</div>
        </label>
      </div>

      <input
        id="upload-image"
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        className="hidden"
        onChange={(e) => handleImageUpload(e)}
      />
    </main>
  );
};

AddPictures.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default AddPictures;
