// @EXTERNALS
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
// @COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Averages from '../components/Rounds/Averages';
// import RoundsHistory from '../components/Rounds/RoundsHistory';
import RoundOracle from '../components/Oracle/RoundOracle';
import TVCharts from '../components/Charts/TVCharts';
import OracleHistory from '../components/Oracle/OracleHistory';
import RangedChartBasic from '../components/Charts/RangedChartBasic';
import Timers from '../components/Timer/Timers';
import SearchRound from '../components/Rounds/SearchRound';
// import RoundsChart from '../components/Charts/RoundsChart';
// @MISC
import { API_HOST } from '../api_host';

const Wrapper = styled.div`
  margin-top: 10px;
  background-color: #11131a;
  padding: 0 8%;
`;

const RootWrapper = styled.div`
  background-color: #11131a;
  color: #d8d8d8;
  margin: 0;
  font-family: 'Roboto', sans-serif !important;
`;

function Home({ averages, timing, oracle, averagesWithHistory }) {
  return (
    <>
      <Head>
        <title>Bull vs Bear</title>
        <meta name="description" content="Insightful data on pancakeswap predictions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <RootWrapper>
          <Header />

          <Wrapper className="container-fluid pt-2">
            <Timers timing={timing} />
            <RoundOracle oracle={oracle} />
            <OracleHistory limit={60} />
            <TVCharts />
            <RangedChartBasic />
            <Averages averages={averages} />

            {/* <RoundsChart /> */}
            <SearchRound lastRounds={averagesWithHistory.entries} />
          </Wrapper>
          <Footer />
        </RootWrapper>
      </>
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

  // TODO error handling
  //if (averages.error) return { notFound: true };
  return {
    props: { averages, averagesWithHistory, timing, oracle },
  };
}

export default Home;
