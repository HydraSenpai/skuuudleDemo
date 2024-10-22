import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

function Data({ properties, loading }) {
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          margin: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='loading loading-center-horizontal'></div>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className='content'>
        <h1 className='title'>onthemarket.co.uk Scraper</h1>
        <Navbar />
      </div>
    </Wrapper>
  );
}

export default Data;

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
