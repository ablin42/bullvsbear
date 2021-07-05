import Head from "next/head";
import RangedData from "../components/RangedData";

function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Bull vs Bear</title>
        <meta
          name="description"
          content="Insightful data on pancakeswap predictions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RangedData data={data} />
    </div>
  );
}

export async function getStaticProps(context) {
  // TODO VAR ENV
  // !
  const res = await fetch(
    `https://pcs-predictions.herokuapp.com/api/scrape/1D`
  );
  const data = await res.json();

  if (data.error) return { notFound: true };
  return {
    props: { data },
  };
}

export default Home;
