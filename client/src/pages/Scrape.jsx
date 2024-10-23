import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

function Scrape({ setProperties, setLoading, loading }) {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState();
  const [stats, setStats] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost:5000/location?location=${encodeURIComponent(location)}`
    ).then((response) =>
      response
        .json()
        .then((data) => {
          setLocations(data.properties);
          setStats({
            mean_price: data.mean_price,
            mean_bed_count: data.mean_bed_count,
            mean_price_by_type: data.mean_price_by_type,
            lowest_price: data.lowest_price,
            highest_price: data.highest_price,
            properties_length: data.properties_length,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })
    );
  };

  // 'mean_price': mean_price,
  // 'mean_bed_count': mean_bed_count,
  // 'mean_price_by_property_type': mean_price_by_type,
  // 'lowest_price': lowest_price,
  // 'highest_price': highest_price,
  // 'properties': properties_dict,

  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
    }
  }, []);

  // Handler for input change (updates state as user types)
  const handleInputChange = (event) => {
    const newLocation = event.target.value;
    setLocation(newLocation);
    localStorage.setItem('location', newLocation);
  };

  const renderStats = (stats) => {
    return (
      <div>
        <h2>Statistics</h2>

        {/* Check if there's data to display */}
        {stats && (
          <table>
            <thead>
              <tr>
                <th>Statistic</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {stats.highest_price !== null &&
                stats.highest_price !== undefined && (
                  <tr>
                    <td>Highest Price</td>
                    <td>${stats.highest_price}</td>
                  </tr>
                )}
              {stats.lowest_price !== null &&
                stats.lowest_price !== undefined && (
                  <tr>
                    <td>Lowest Price</td>
                    <td>${stats.lowest_price}</td>
                  </tr>
                )}
              {stats.mean_bed_count !== null &&
                stats.mean_bed_count !== undefined && (
                  <tr>
                    <td>Mean Bed Count</td>
                    <td>{stats.mean_bed_count}</td>
                  </tr>
                )}
              {stats.mean_price !== null && stats.mean_price !== undefined && (
                <tr>
                  <td>Mean Price</td>
                  <td>${stats.mean_price.toFixed(2)}</td>
                </tr>
              )}
              {stats.properties_length !== null &&
                stats.properties_length !== undefined && (
                  <tr>
                    <td>No. Properties</td>
                    <td>{stats.properties_length}</td>
                  </tr>
                )}

              {/* Check if mean_price_by_property_type exists and is not empty */}
              {stats.mean_price_by_type &&
                Object.keys(stats.mean_price_by_type).length > 0 && (
                  <>
                    <tr>
                      <td colSpan='2'>
                        <h3>Mean Price by Property Type:</h3>
                      </td>
                    </tr>
                    {Object.entries(stats.mean_price_by_type).map(
                      ([type, price]) =>
                        price !== null &&
                        price !== undefined && (
                          <tr key={type}>
                            <td>{type}</td>
                            <td>${price.toFixed(2)}</td>
                          </tr>
                        )
                    )}
                  </>
                )}
            </tbody>
          </table>
        )}
      </div>
    );
  };

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
        <div className='stats'>
          {stats && Object.keys(stats).length > 0 ? (
            renderStats(stats)
          ) : (
            <p>No stats available.</p>
          )}
        </div>
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
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  th {
    background-color: #4caf50; /* Green background */
    color: white; /* White text */
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;

    &:nth-child(even) {
      background-color: #f2f2f2; /* Zebra stripes */
    }

    &:hover {
      background-color: #f1f1f1; /* Highlight on hover */
    }
  }
  tr {
    &:hover {
      background-color: #e9e9e9; /* Row highlight */
    }
  }
`;
