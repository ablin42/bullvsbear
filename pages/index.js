import Head from "next/head";
import RangedData from "../components/RangedData";
import RangedRounds from "../components/RangedRounds";

function Home({ averages }) {
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
      <RangedData averages={averages} />
      <RangedRounds rounds={averages.entries} />
    </div>
  );
}

//getStaticProps
export async function getServerSideProps(context) {
  // TODO VAR ENV
  // !
  // https://pcs-predictions.herokuapp.com
  const res = await fetch(
    `https://pcs-predictions.herokuapp.com/api/scrape/2H`
  );
  const averages = await res.json();

  if (averages.error) return { notFound: true };
  return {
    props: { averages },
  };
}

export default Home;
