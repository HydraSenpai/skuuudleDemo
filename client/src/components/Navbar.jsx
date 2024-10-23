import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <Wrapper>
      <Link to='/' className='btn'>
        All Data
      </Link>
      <Link to='/data' className='btnn'>
        Analysis
      </Link>
      <Link to='/query' className='btn'>
        Location Query
      </Link>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  .btnn {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-100);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.75rem 1.5rem;
    /* box-shadow: var(--shadow-2); */
    /* transition: var(--transition); */
    text-transform: capitalize;
    display: inline-block;
    font-size: 1.25em;
    cursor: not-allowed;
  }
`;
