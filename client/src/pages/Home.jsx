import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

function Home({ properties, loading }) {
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
        {properties && (
          <ul className='cards'>
            {properties
              .filter((property) => property.price > 0)
              .map((property) => (
                <div className='card'>
                  <li key={property.id}>
                    <img
                      src={property.image_link}
                      alt={property.property_title}
                      className='image'
                    />
                    <div className='info'>
                      <h5>{property.property_title}</h5>
                      <p>Price: £{property.price}</p>
                      <p>Address: {property.address}</p>
                      <p>Beds: {property.bed_count}</p>
                      <p>
                        Agent: {property.agent_name} (Phone:{' '}
                        {property.agent_phone})
                      </p>
                    </div>
                  </li>
                </div>
              ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
}

export default Home;

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
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 400px); /* 3 equal-width columns */
    gap: 10px;
  }
  .card {
    background-color: white;
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  .card:hover {
    box-shadow: var(--shadow-4);
  }
  p {
    padding: 0;
    margin: 0;
  }
  .image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--borderRadius);
  }
  .info {
    margin: 1em;
    text-align: left;
  }
`;
