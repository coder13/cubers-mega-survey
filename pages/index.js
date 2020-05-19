import React from 'react';
import { VictoryPie } from 'victory';

function Question({ title, visualization }) {
  return (
    <div>
      <h3>{title}</h3>
      {visualization}
    </div>
  )
}

const histogram = (data, column) => {
  const responses = {};
  data.slice(1).forEach(row => {
    const res = row[column];
    if (!res) return;
    if (!responses[res]) {
      responses[res] = 1;
    } else {
      responses[res]++;
    }
  });
  return Object.keys(responses).map(i => ({
    x: i,
    y: responses[i],
  }));
}

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

  console.log(14, histogram(data, 0));

  return (
    <div>
      <Question
        title={data[0][0]}
        visualization={(
          <div style={{
            width: '50%',
            height: '50%'
          }}>
            <VictoryPie
              data={histogram(data, 0)}
              responsive="true"
              style={{
                labels: {
                  fontSize: '8px'
                }
              }}
            />
          </div>
        )}
      />
    </div>
  );
}

export default HomePage