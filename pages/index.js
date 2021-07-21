import React, { useState, useEffect } from "react";

import Head from "next/head";
import RangedData from "../components/RangedData";
import RangedRounds from "../components/RangedRounds";
import CandleTimer from "../components/CandleTimer";
import OracleTimer from "../components/OracleTimer";
import Timer from "../components/Timer";
import RoundOracle from "../components/RoundOracle";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_HOST } from "../api_host";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

function Home({ averages, timing, oracle }) {
  const [fetching, setFetching] = useState(false);
  const [currentTiming, setTiming] = useState(timing);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (fetching === false) {
        setFetching(true);
        const res = await fetch(`${API_HOST}/api/scrape/timing`);

        if (res.status === 200) {
          const data = await res.json();
          setTiming(data);
        }
        setFetching(false);
      }
    }, 1000 * 10);
    return () => clearInterval(interval);
  });

  const { candleTiming, oracle: lastOracle } = currentTiming;
  return (
    <div style={{ marginTop: "15px" }}>
      <Head>
        <title>Bull vs Bear</title>
        <meta
          name="description"
          content="Insightful data on pancakeswap predictions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div>
          <RangedData averages={averages} />
          <hr />
          <CandleTimer candleTiming={candleTiming} />
          <OracleTimer candleTiming={parseInt(lastOracle.date)} />
          <Timer oracle={lastOracle} />
        </div>
        <RoundOracle oracle={oracle} />
      </Wrapper>
      <hr />
      <RangedRounds rounds={averages.entries} />
    </div>
  );
}

//getStaticProps
export async function getServerSideProps(context) {
  // https://pcs-predictions.herokuapp.com
  let res = await fetch(`${API_HOST}/api/scrape/2H`);
  const averages = await res.json();

  res = await fetch(`${API_HOST}/api/scrape/timing`);
  const timing = await res.json();

  res = await fetch(`${API_HOST}/api/scrape/current-oracle`);
  const oracle = await res.json();

  // TODO error handling
  //if (averages.error) return { notFound: true };
  return {
    props: { averages, timing, oracle },
  };
}

export default Home;
