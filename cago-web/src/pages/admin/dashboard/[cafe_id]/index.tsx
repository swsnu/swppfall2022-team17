import CagoAdminHeader from "components/layouts/CagoAdminHeader";
import Container from "components/layouts/Container";
import RequireLogin from "components/layouts/RequireLogin";
import { NextPageWithLayout } from "pages/_app";
import { useRouter } from "next/router";

const ManagedCafeMain: NextPageWithLayout = () => {
    const router = useRouter()
    const {cafe_id} = router.query
    return (<div>
        HI there! Maybe you are {cafe_id}
    </div>)
}

ManagedCafeMain.getLayout = (page) => (
    <RequireLogin>
      <CagoAdminHeader />
      <Container>{page}</Container>
    </RequireLogin>
  );
  
  export default ManagedCafeMain;