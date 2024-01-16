import React from 'react'
import Navbar from '../Components/Navbar';
import './LanchesDashborad.css';
import ListOfLanches from '../Components/ListOfLaunches';

const LanchesDashborad = () => {
  return (
    <div className='lanchesdashbashboard'>
        <Navbar />
        <ListOfLanches />
    </div>
  )
}

export default LanchesDashborad;