import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Home({ properties }) {
  return (
    <Wrapper>
      <div className='content'>
        <h1 className='title'>onthemarket.co.uk Scraper</h1>
        {properties && (
          <ul>
            {properties.map((property) => (
              <li key={property.id}>
                <h2>{property.property_title}</h2>
                <p>Price: £{property.price}</p>
                <p>Address: {property.address}</p>
                <p>Beds: {property.bed_count}</p>
                <p>
                  Agent: {property.agent_name} (Phone: {property.agent_phone})
                </p>
                <img
                  src={property.image_link}
                  alt={property.property_title}
                  width='200'
                />
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
  }
`;
