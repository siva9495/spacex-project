import React, { useState, useEffect } from 'react';
import './ListOfLaunches.css';

const ListOflaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'https://api.spacexdata.com/v3/launches';

        if (selectedFilter === 'upcoming') {
          apiUrl += '/upcoming';
        } else if (selectedFilter === 'past') {
          apiUrl += '/past';
        }

        setIsLoading(true);

        const response = await fetch(apiUrl);
        const data = await response.json();

        // For 'upcoming' and 'null', no need for flickr_images validation
        // For 'past', do the flickr_images validation
        const launchesWithImages = (selectedFilter === 'past' || selectedFilter === '')
          ? data.filter((launch) => launch.links.flickr_images && launch.links.flickr_images.length > 0)
          : data;

        // Sort launches by date in descending order
        const sortedLaunches = launchesWithImages.sort((a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc));

        setLaunches(sortedLaunches);

        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } catch (error) {
        console.error('Error fetching SpaceX launches:', error);
      }
    };

    fetchData();
  }, [selectedFilter]);

  //function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  const handleSelectFilter = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
  }

  return (
    <div className='listoflaunches'>
      <div className='launches_filters'>
        <div className='filter_select'>
          <select id='select_launches' onChange={handleSelectFilter} value={selectedFilter}>
            <option value=''>Select</option>
            <option value='upcoming'>Upcoming</option>
            <option value='past'>Past</option>
          </select>
        </div>
      </div>
      <div className='list_launches'>
        {isLoading && (
            <div className='loading_launches'>
              <h4>LAUNCHES</h4>
            </div>
        )}
          {!isLoading &&
            launches.map((launch) => (
              <div key={launch.flight_number} className='lanch_space'>
                <img src={launch.links.flickr_images[0]} alt='Flickr Img' />
                <span id='date_mission'>{formatDate(launch.launch_date_utc)}</span>
                <span id='mission_name'>{launch.mission_name.toUpperCase()}</span>
              </div>
          ))}
      </div>
    </div>
  );
};

export default ListOflaunches;
