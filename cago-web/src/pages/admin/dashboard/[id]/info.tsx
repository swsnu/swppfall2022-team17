import Container from "components/layouts/Container"
import { NextPageWithLayout } from "pages/_app"
import { useRouter } from 'next/router'
import CagoAdminHeader from "components/layouts/CagoAdminHeader"
import CafeIntroductionForm from "components/forms/CafeIntroductionForm"

const Info: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <CafeIntroductionForm/>
            HI! This is for test for info page! And This is your Cafe ID : {id}
        </>
    )
}

Info.getLayout = (page) => {
    return (
        <>
            <CagoAdminHeader />
            <Container>{page}</Container>
        </>
    )
}

export default Info