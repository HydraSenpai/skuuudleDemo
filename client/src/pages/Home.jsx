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
        <h4 style={{ paddingBottom: '1em' }}>Scraped Items...</h4>
        {properties && (
          <ul className='cards'>
            {properties
              .filter((property) => property.price > 0)
              .map((property) => (
                <li key={property.id} className='card'>
                  <img
                    src={property.image_link}
                    alt={property.property_title}
                    className='image'
                  />
                  <div className='info'>
                    <h5>{property.property_title}</h5>
                    <div className='subinfo'>
                      <p>Price: £{property.price}</p>
                      <p>Address: {property.address}</p>
                      <p>Property Type: {property.property_type}</p>
                      <p>Beds: {property.bed_count}</p>
                      <p>
                        Location: longitude:{property.longitude}, latitude:
                        {property.latitude}
                      </p>
                      <p>
                        Agent: {property.agent_name} (Phone:{' '}
                        {property.agent_phone})
                      </p>
                    </div>
                  </div>
                </li>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
  }
  .card {
    background-color: white;
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
    transition: var(--transition);
    display: flex;
    flex-direction: row;
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
    width: 500px;
    height: 300px;
    object-fit: cover;
    border-radius: var(--borderRadius);
  }
  .info {
    margin: 2em 1em;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .subinfo {
    display: flex;
    flex-direction: column;
  }
`;
