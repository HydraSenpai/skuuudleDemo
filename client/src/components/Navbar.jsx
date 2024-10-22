import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <Wrapper>
      <Link to='/' className='btn'>
        Data
      </Link>
      <Link to='/data' className='btn'>
        Analysis
      </Link>
      <Link to='/scrape' className='btn'>
        New Scrape Query
      </Link>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
`;
