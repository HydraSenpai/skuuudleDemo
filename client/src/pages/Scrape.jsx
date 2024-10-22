import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useState } from 'react';

function Scrape({ setProperties, setLoading }) {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost:5000/location?location=${encodeURIComponent(location)}`
    ).then((response) =>
      response
        .json()
        .then((data) => {
          setLocations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })
    );
  };

  // Handler for input change (updates state as user types)
  const handleInputChange = (event) => {
    setLocation(event.target.value); // Update location state with input value
  };

  return (
    <Wrapper>
      <div className='content'>
        <h1 className='title'>onthemarket.co.uk Scraper</h1>
        <Navbar />
        <h4 style={{ paddingBottom: '1em' }}>New Query</h4>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor='location' className='form-label'>
            Location:
          </label>
          <input
            type='text'
            id='location'
            name='location'
            value={location} // Controlled component: value is tied to state
            onChange={handleInputChange} // Update state on input change
            placeholder='Enter a location'
            className='form-input'
          />
          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
        {locations && (
          <ul className='cards'>
            {locations
              .filter((location) => location.price > 0)
              .map((location) => (
                <li key={location.id} className='card'>
                  <img
                    src={location.image_link}
                    alt={location.property_title}
                    className='image'
                  />
                  <div className='info'>
                    <h5>{location.property_title}</h5>
                    <div className='subinfo'>
                      <p>Price: £{location.price}</p>
                      <p>Address: {location.address}</p>
                      <p>location Type: {location.property_type}</p>
                      <p>Beds: {location.bed_count}</p>
                      <p>
                        Location: longitude:{location.longitude}, latitude:
                        {location.latitude}
                      </p>
                      <p>
                        Agent: {location.agent_name} (Phone:{' '}
                        {location.agent_phone})
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
  .form-input {
    margin-bottom: 1em;
    font-size: 1.5em;
    padding: 1em;
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
