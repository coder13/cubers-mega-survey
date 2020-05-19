import React from 'react';
// import useSWR from 'swr';
// import fetch from 'isomorphic-unfetch';

function HomePage({ foo }) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  console.log(9, error);

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  if (!data) {
    fetch('/api/spreadsheet')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        return res.json()
      })
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        setError(e);
      })
    return <div/>;
  }

  console.log(14, data);

  return (
    <div>
      {data[0].map((q, i) => (
        <div>
          <h3>{q}</h3>
          <p>{data.slice(1).map(r => r[i]).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage