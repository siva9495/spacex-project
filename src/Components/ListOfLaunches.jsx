import React, { useState, useEffect } from 'react';
import './ListOfLaunches.css';

const ListOflaunches = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    // Fetch SpaceX launches from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const data = await response.json();

        // Filter launches with flickr_images
        const launchesWithImages = data
          .filter((launch) => launch.links.flickr_images && launch.links.flickr_images.length > 0)
          .sort((a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc));

        setLaunches(launchesWithImages);
      } catch (error) {
        console.error('Error fetching SpaceX launches:', error);
      }
    };

    fetchData();
  }, []);

  // Function to format date like 'JANUARY 14, 2024'
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className='listoflaunches'>
      <div className='launches_filters'>
        <div className='filter_select'>
          <select id='select_launches'>
            <option value=''>Select</option>
            <option value='upcoming'>Upcoming</option>
            <option value='past'>Past</option>
          </select>
        </div>
      </div>
      <div className='list_launches'>
        <div className='loading_launches'>
          <h4>LAUNCHES</h4>
        </div>
        {/* {launches.map((launch) => (
          <div key={launch.flight_number} className='lanch_space'>
            <img src={launch.links.flickr_images[0]} alt='Flickr Img' />
            <span id='date_mission'>{formatDate(launch.launch_date_utc)}</span>
            <span id='mission_name'>{launch.mission_name.toUpperCase()}</span>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ListOflaunches;
