// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @COMPONENTS
import RoundsHistory from "./RoundsHistory";
import RoundOracleHistory from "../Oracle/RoundOracleHistory";
// @MISC
import { API_HOST } from "../../api_host";

const Wrapper = styled.div`
  margin: 15px 0;
`;

// * TAKES A SETTER FUNCTION, DISPLAY RANGE OPTIONS AS BUTTONS, FETCHES DATA AND SET IT FOR PARENT *
export default function SearchRound({ lastRounds }) {
  const [round, setRound] = useState(null);
  const [oracle, setOracle] = useState(null);
  const [field, setField] = useState("");
  const [selectedRound, setSelected] = useState(null);
  lastRounds.splice(15, 12);

  async function handleClick(event) {
    try {
      event.preventDefault();
      const res = await fetch(`${API_HOST}/api/rounds/one/${field}`);
      const resOracle = await fetch(`${API_HOST}/api/oracle/one/${field}`);

      if (res.status === 200) {
        const data = await res.json();
        setRound(data);
      }
      if (resOracle.status === 200) {
        const dataOracle = await resOracle.json();
        setOracle(dataOracle);
      }
    } catch (err) {
      console.log("An error occured with the API");
    }
  }

  async function handleChange(event) {
    const value = event.target.value;
    setField(value);
  }

  async function handleButton(roundId) {
    const roundNumber = roundId.substr(1);
    const res = await fetch(`${API_HOST}/api/rounds/one/${roundNumber}`);
    const resOracle = await fetch(`${API_HOST}/api/oracle/one/${roundNumber}`);

    if (res.status === 200) {
      const data = await res.json();
      setRound(data);
    }
    if (resOracle.status === 200) {
      const dataOracle = await resOracle.json();
      setOracle(dataOracle);
    }
    setSelected(roundId);
  }

  const rounds = [];
  rounds.push(round);
  const activeBtn = "btn btn-outline-primary active ml-1 mr-1";
  const btn = "btn btn-outline-primary ml-1 mr-1";
  return (
    <Wrapper>
      <Wrapper style={{ justifyContent: "center", display: "flex" }}>
        <form className="form-inline" onSubmit={(e) => handleClick(e)}>
          <div className="form-group mr-3">
            <input
              type="text"
              name="round-search"
              id="round-search"
              className="p-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button
            type="button"
            className="btn btn-outline-primary ml-1 mr-1"
            onClick={(e) => handleClick(e)}
          >
            Search
          </button>
          {lastRounds.map((round) => {
            return (
              <button
                key={round.roundId}
                type="button"
                className={selectedRound === round.roundId ? activeBtn : btn}
                onClick={() => handleButton(round.roundId)}
              >
                {round.roundId}
              </button>
            );
          })}
        </form>
      </Wrapper>
      {oracle && <RoundOracleHistory oracle={oracle} />}
      {round && <RoundsHistory rounds={rounds} />}
    </Wrapper>
  );
}
