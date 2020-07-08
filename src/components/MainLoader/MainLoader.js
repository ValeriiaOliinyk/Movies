import React from 'react';
import Loader from 'react-loader-spinner';
import './MainLoader.scss';

const MainLoader = () => (
  <div className="Loader">
    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
  </div>
);

export default MainLoader;
