/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// @EXTERNALS
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
// import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
// @COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import OracleHistory from '../components/Oracle/OracleHistory';
import Timers from '../components/Timer/Timers';
import Averages from '../components/Rounds/Averages';
// @MISC

const Wrapper = styled.div`
  margin-top: 10px;
  background-color: #11131a;
`;

const RootWrapper = styled.div`
  background-color: #11131a;
  color: #d8d8d8;
  margin: 0;
  font-family: 'Roboto', sans-serif !important;
`;

const TableWrapper = styled.div`
  text-align: left;
  border-radius: 4px;
  border: 1px solid #26a69a;
  height: auto;
`;

const About = () => {
  const handleClipboard = (ADDRESS) => {
    const tooltip = document.querySelector(`#harb > .tooltiptextSpecial`);

    if (tooltip && !tooltip.classList.contains('tooltip-visible')) {
      tooltip.classList.add('tooltipAnim');
      tooltip.classList.add('tooltip-visible');
      setTimeout(() => {
        if (tooltip) {
          tooltip.classList.remove('tooltip-visible');
          tooltip.classList.remove('tooltipAnim');
        }
      }, 3000);
    }

    navigator.clipboard.writeText(ADDRESS);
  };

  return (
    <>
      <Head>
        <title>Bull vs Bear - About</title>
        <meta name="description" content="Insightful data on pancakeswap predictions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RootWrapper>
        <Header />

        <div className="container-fluid">
          <Wrapper>
            <div className="mt-5 mb-5">
              <div className="container">
                <div className="col-8 offset-2" id="introduction">
                  <h1 className="mb-3 text-main">Introduction</h1>
                  <div className="row mb-5">
                    <div className="row">
                      <p className="ms-1">
                        Im <b>0xHarb</b>, a software engineer & crypto enjoyooor that loves to experiment
                      </p>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-4">
                        <Image alt="0xHarb" src="/0xharb.jpg" class="profile-img" width="250" height="250" />
                      </div>

                      <div className="col-lg-8">
                        <p className="paragraph">
                          This project started from the idea of scraping the{' '}
                          <a href="https://pancakeswap.finance/prediction" target="_blank" rel="noreferrer">
                            pancakeswap
                          </a>{' '}
                          predictions data to see if I could have an edge over other players. I started by building a
                          script to watch over pancakeswap & scraped all the data I deemed useful, after which I decided
                          to build an app to visualize the data in an more accessible manner
                          <br /> After a 1000 rounds of bets played using this, I had roughly <b>65% WR</b> and sizable
                          gains, so I started looking at automating my betting process with a bot aswell
                        </p>
                      </div>
                    </div>
                    <div className="row col-lg-4">
                      <div className="text-center justify-content-center">
                        <p className="text-muted text-center">Crypto Enjoyooor</p>

                        <a className="m-2" target="_blank" rel="noreferrer" href="https://github.com/ablin42">
                          <FontAwesomeIcon className="fa-icon" icon={faGithub} />
                        </a>
                        <a className="m-2" target="_blank" rel="noreferrer" href="https://twitter.com/0xharb">
                          <FontAwesomeIcon className="fa-icon" icon={faTwitter} />
                        </a>
                        <a className="m-2 " href="#">
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={faEthereum}
                            style={{ width: '22px' }}
                            onClick={() => handleClipboard('0xCC61d2bb1A215f19922eCF81613bEa3253713371')}
                          />
                          <div className="tooltipSpecial" id="harb">
                            <span className="tooltiptextSpecial">Copied to clipboard!</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="album">
                  <div className="container smaller-container pt-5">
                    <div className="container-decorated">
                      <div className="col-lg-8 offset-lg-2">
                        <h1 className="mb-4 text-start text-main">About bullvsbear</h1>
                        <div className="text-start">
                          <h2>Why ?</h2>
                          <p className="paragraph">
                            As mentioned in the intro, this tool first started as a mean to have an edge over the other
                            players of pancakeswap predictions. EV used to be far better before the pancakeswap update,
                            but now it's more of a nice-to-have tool if you want to play. The <b>API</b> can also be
                            used if you wish to create a bot or "AI" to play the predictions, some endpoints aren't
                            documented in the <b>API</b> but feel free to DM me if you have ideas involving automation
                          </p>
                          <h2 className="mt-5">How it works</h2>
                          <p>
                            There are 4 pieces of software in total, of which 3 are accessible to the public
                            <h5 className="mt-2">
                              <a target="_blank" href="https://github.com/ablin42/prediction-scraping" rel="noreferrer">
                                prediction-scraping
                              </a>
                            </h5>
                            A script that scrapes the data using pupeeter; It checks for changes on the page and save
                            them to a database when they happen. Changes includes new <b>Oracle</b> update, pool
                            increasing, new rounds..
                            <h5 className="mt-3">
                              <a target="_blank" href="https://github.com/ablin42/prediction-api" rel="noreferrer">
                                prediction-api
                              </a>
                            </h5>
                            The server that handles request to access the scraped data, this <b>API</b> is used both by
                            the bot & bullvsbear
                            <h5 className="mt-3">
                              <a target="_blank" href="https://github.com/ablin42/bullvsbear" rel="noreferrer">
                                bullvsbear
                              </a>
                            </h5>
                            The app that displays scraped data, it's basically all the meaningfull data served from the{' '}
                            <b>API</b> baked in a single page for ease of use
                            <h5 className="mt-3">
                              <a href="#notAvailable">bestbetsbots</a>
                            </h5>
                            A betting bot I mentioned in the intro, which is <b>not available to the public</b>. It uses
                            the <b>API</b> data, and also simulate betting on each new round while also saving the data
                            with which the bet was made
                          </p>
                          <h2 className="mt-5">Key Concepts</h2>
                          <h5 className="mt-4">Oracle</h5>
                          <div className="row">
                            <div className="col-4">
                              <TableWrapper>
                                <table className="table table-dark table-striped shadow p-0 m-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">Oracle price</th>
                                      <th scope="col" style={{ color: '#26a69a' }}>
                                        300.935$
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">BNB price</th>
                                      <td style={{ color: '#26a69a' }}>301.125$</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Time left</th>
                                      <td>00:43</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">New candle in</th>
                                      <td>13.1s</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </TableWrapper>
                            </div>

                            <div className="col-8">
                              This is the standard oracle view on bullvsbear, each new entry correspond to an update in
                              the <b>Last Price</b> on pancakeswap
                              <br />
                              <br />
                              <b>Oracle Price</b> refers to the "Last Price" on pancakeswap <br />
                              <b>BNB Price</b> refers to the price of BNB on binance at the time of the snapshot
                              <br /> <b>Time Left</b> is the time left before the round ends <br />
                              <b>New Candle In</b> is the time before a new 5mn candle appears on the charts
                            </div>
                          </div>
                          <h5 className="mt-4">Timers</h5>
                          <Timers />

                          <div className="row mt-2">
                            <div className="col-4 text-center">
                              <p>Seconds left for the current 5mn candle, this can be useful to time your bet</p>
                            </div>
                            <div className="col-4 text-center">
                              <p>
                                Seconds since the <b>Oracle</b> was updated, you can use this to your advantage by
                                timing refreshes at the end of a round
                              </p>
                            </div>
                            <div className="col-4 text-center">
                              <p>
                                Time left before the current round ends, 20-15s left is a sweet spot to place your bet
                              </p>
                            </div>
                          </div>

                          <h5 className="mt-4">Intervals</h5>
                          <OracleHistory limit={25} />

                          <p>
                            The <b>intervals</b> displayed above are the interval of <b>Oracle</b> refreshes, making it
                            easy to spot anomaly within refresh timing. At the time of writing, a refresh happens every
                            20 to 30 seconds
                            <br />
                            <i>
                              Note: in precedent version, oracle used to refresh every 90s on average, sometimes up to
                              +180 seconds !!
                            </i>
                          </p>

                          <h5 className="mt-4">Safe / Risky</h5>
                          <p>
                            In bullvsbear context, the <b>Safe</b> keyword refers to the bet side with the lowest payout
                            of the 2, the "Safer" one. Inversely the <b>Risky</b> keyword refers to the side with the
                            highest payout, the "Riskier" one
                          </p>

                          <h2 className="mt-5">Tips</h2>
                          <p className="paragraph">
                            In a typical setup, you would wait for the confluence of atleast some of the indicators
                            displayed on the website. I've had the most success entering bets when a new candle was just
                            newly formed, with an oracle refresh as recent as possible & a 0.1-0.2 price difference
                            between the Oracle & the charted BNB price
                          </p>
                          <div className="row mb-4">
                            <div className="col-5 pt-2 ps-0">
                              {/* <Image alt="averages" src="/screenshots/averages.png" width="350" height="500" /> */}
                              <Averages hide />
                            </div>
                            <div className="col-7">
                              <p>
                                Checking the recent results of rounds can be quite useful to determine the trend, adapt
                                your strategy <br />
                                On top of that I recommend checking the EV chart for a quick look at which strategy is
                                performing better
                              </p>
                              <p></p>

                              <div className="shadow mb-2">
                                <img
                                  alt="charts"
                                  src="/screenshots/chart.png"
                                  width="100%"
                                  height="100%"
                                  layout="fixed"
                                  className="rounded-1"
                                />
                              </div>
                              <i className="text-center d-inline-block">
                                Note: You can <b>group/ungroup</b> the results by hour to check if some hours are more
                                profitable than others
                              </i>
                            </div>
                          </div>
                          <p>
                            You can check the history of any past rounds by entering the round number in the search bar
                            at the bottom of the page.
                            <br />
                          </p>
                          <i>
                            Note: When the Oracle Price is below the Open price, it will be highlighted in red,
                            inversely it will be highlighted in green if it's above the Open Price. The same applies to
                            BNB Price in the history table
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
        <Footer />
      </RootWrapper>
    </>
  );
};

export default About;
