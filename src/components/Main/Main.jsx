import PictureCard from '../PictureCard/PictureCard';
import { useEffect, useState } from 'react';

const style = {
  background: 'beige',
};

const searchDateStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: 150,
  margin: '0.5rem auto',
};
const labelStyle = {
  fontSize: '0.7rem',
};
const errorStyle = {
  color: 'red',
};
const getTodayDate = () => {
  const date = new Date();
  const formattedDate =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0');
  return formattedDate;
};

const Main = () => {
  const [apod, setApod] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => getTodayDate());
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDate) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/planetary/apod?api_key=${process.env.REACT_APP_APOD_KEY}&date=${selectedDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 400) {
            setError(data.msg);
            setApod('');
          } else {
            setError('');
            setApod(data);
          }
        })
        .catch((error) => {
          setError('There was an error, please try again.');
          setApod('');
        });
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  return (
    <div style={style} data-testid='main-content'>
      <div style={searchDateStyle}>
        <label style={labelStyle} htmlFor='search-date'>
          Picture date
        </label>
        <input
          value={selectedDate}
          id='search-date'
          type='date'
          onChange={handleChange}
        />
      </div>
      {apod ? (
        <PictureCard
          date={apod.date}
          title={apod.title}
          url={apod.url}
          hdurl={apod.hdurl}
          explanation={apod.explanation}
        />
      ) : error ? (
        <div style={errorStyle}>{error}</div>
      ) : (
        <div>Loading Picture...</div>
      )}
    </div>
  );
};
export default Main;
