// @EXTERNALS
import React from "react";
import Head from "next/head";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
// @COMPONENTS
import Averages from "../components/Rounds/Averages";
import RoundsHistory from "../components/Rounds/RoundsHistory";
import RoundOracle from "../components/Oracle/RoundOracle";
import TVCharts from "../components/Charts/TVCharts";
import OracleHistory from "../components/Oracle/OracleHistory";
import RangedChartBasic from "../components/Charts/RangedChartBasic";
import Timers from "../components/Timer/Timers";
// @MISC
import { API_HOST } from "../api_host";

const Wrapper = styled.div`
  margin-top: 10px;
  background-color: #171b26;
`;

const RootWrapper = styled.div`
  background-color: #171b26;
  color: #d8d8d8;
  padding: 0 3%;
  margin: 0;
  font-family: "Roboto", sans-serif !important;
`;

function Home({ averages, timing, oracle, averagesWithHistory, oracles }) {
  return (
    <>
      <Head>
        <title>Bull vs Bear</title>
        <meta
          name="description"
          content="Insightful data on pancakeswap predictions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RootWrapper className="container-fluid">
        <Wrapper>
          <Timers timing={timing} />
          <RoundOracle oracle={oracle} />
          <OracleHistory oracles={oracles.oraclesData} />
        </Wrapper>
        <TVCharts />
        <Averages averages={averages} />
        <RangedChartBasic />
        <RoundsHistory rounds={averagesWithHistory.entries} />
      </RootWrapper>
    </>
  );
}

//getStaticProps
export async function getServerSideProps() {
  let res = await fetch(`${API_HOST}/api/rounds/period/2H`);
  const averages = await res.json();

  res = await fetch(`${API_HOST}/api/rounds/period/2H/history`);
  const averagesWithHistory = await res.json();

  res = await fetch(`${API_HOST}/api/oracle/timing`);
  const timing = await res.json();

  res = await fetch(`${API_HOST}/api/oracle/current`);
  const oracle = await res.json();

  res = await fetch(`${API_HOST}/api/oracle/limit/70`);
  const oracles = await res.json();

  // TODO error handling
  //if (averages.error) return { notFound: true };
  return {
    props: { averages, averagesWithHistory, timing, oracle, oracles },
  };
}

export default Home;
