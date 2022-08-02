// *EXTERNALS*
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faGem } from '@fortawesome/free-solid-svg-icons';

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
          <div>
            <strong>
              <Link href="/" className="navbar-brand d-flex align-items-center">
                bullvsbear
              </Link>
            </strong>
          </div>
          <Wrapper>
            <Link passHref href="/">
              <button className="btn btn-primary m-1" style={{ float: 'right' }}>
                About
              </button>
            </Link>
            <a href="https://pcs-prediction-api.herokuapp.com/" target="_blank" rel="noreferrer">
              <button className="btn btn-primary m-1" style={{ float: 'right' }}>
                API
              </button>
            </a>
          </Wrapper>
        </div>
      </div>
    </header>
  );
};

export default Header;
