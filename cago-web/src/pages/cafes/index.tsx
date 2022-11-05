import Container from "components/layouts/Container";
import { NextPageWithLayout } from "pages/_app";

const Cafes: NextPageWithLayout = () => {
  return (
    <main>
      <h1>Cafes</h1>
    </main>
  );
};

Cafes.getLayout = (page) => <Container>{page}</Container>;

export default Cafes;
