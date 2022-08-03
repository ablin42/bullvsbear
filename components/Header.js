// *EXTERNALS*
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
// *INTERNALS*

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <strong>
            <Link href="/" className="navbar-brand d-flex align-items-center">
              bullvsbear
            </Link>
          </strong>
          <Wrapper>
            <Link passHref href="/About">
              <button className="btn btn-primary btn-sm m-1">About</button>
            </Link>
            <a href="https://pcs-prediction-api.herokuapp.com/" target="_blank" rel="noreferrer">
              <button className="btn btn-primary btn-sm m-1">API</button>
            </a>
          </Wrapper>
        </div>
      </div>
    </header>
  );
};

export default Header;
