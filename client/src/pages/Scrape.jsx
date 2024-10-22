import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

function Scrape() {
  return (
    <Wrapper>
      <div className='content'>
        <h1 className='title'>onthemarket.co.uk Scraper</h1>
        <Navbar />
        <h4 style={{ paddingBottom: '1em' }}>New Query</h4>
      </div>
    </Wrapper>
  );
}

export default Scrape;

const Wrapper = styled.div`
  margin-top: 1em;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: 700;
    font-size: 4em;
    margin: 0.5em;
  }
`;
