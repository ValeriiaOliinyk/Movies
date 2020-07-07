import React from 'react';
import './Error.scss';

const Error = ({ text }) => (
  <p className="Error">Something went wrong: {text}</p>
);

export default Error;
