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

const CafeDashboardAddPicture: NextPageWithLayout = () => {
  const router = useRouter();
  const { cafe_id } = router.query;
  const { cafeImages, mainImage } = useCafeImages(cafe_id);
  const { user } = useAuth();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleMainImageSet = async () => {
    if (!!user) {
      await setMainImage(parseInt(cafe_id as string), cafeImages[imageIndex].id, user.token);
      setImageIndex(0);
      console.log(imageIndex);
      console.log(cafeImages);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!!user && files && files?.length > 0) {
      const file = files[0];
      const url = await uploadImage(file);
      await postCafeImage(parseInt(cafe_id as string), url, user.token);
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
            className="contained w-full mt-2 disabled:bg-slate-500"
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

CafeDashboardAddPicture.getLayout = (page) => (
  <RequireLogin>
    <RequireManager>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireManager>
  </RequireLogin>
);

export default CafeDashboardAddPicture;
