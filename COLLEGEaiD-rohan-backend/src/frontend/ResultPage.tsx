import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import './LoginPage.css'; // You can change this if you have a separate CSS file for ResultPage

export default function ResultPage() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('')


  useEffect(() => {
    axios.get('http://0.0.0.0:8080/openai')
    .then((response) => {

      setData(response.data.output)
      setLoading("false")
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
      setError("Failed to fetch data")
      setLoading("false")
    })
}, [])

  return (
    <div className = "result-container">
      <h1>Result</h1>
      <div dangerouslySetInnerHTML={{ __html: data}} />
    </div>
  );
}
