import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResultPage() {
  interface ResponseData {
    output: string;
  }

  interface ServerResponse {
    data: ResponseData;
    status: number;
    statusText: string;
    headers: any;
    config: any;
  }

  const [response, setResponse] = useState<ServerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://0.0.0.0:8080/openai')
      .then((res) => {
        console.log('Response:', res);
        setResponse(res);  // Store the entire response
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="result-container">Loading...</div>;
  }

  if (error) {
    return <div className="result-container">Error: {error}</div>;
  }

  if (!response) {
    return <div className="result-container">No data available</div>;
  }

  return (
    <div className="result-container">
      <h1>Result:</h1>
      <p>{response.data.output}</p>  {/* Render the response directly */}
    </div>
  );
}
