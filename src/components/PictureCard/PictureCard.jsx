const style = {
  maxWidth: 800,
  margin: 'auto',
};

const imageBoxStyle = {
  display: 'flex',
  alignItems: 'flex-start',
};
const descriptionStyle = {
  margin: 0,
  padding: '0 1rem',
  textAlign: 'Justify',
};
const imageContainerStyle = {
  textAlign: 'right',
};
const captionStyle = {
  fontSize: '0.9rem',
};

const PictureCard = ({ date, explanation, title, url, hdurl }) => {
  return (
    <div style={style}>
      <h1>{title}</h1>
      <div style={imageBoxStyle}>
        <div style={imageContainerStyle}>
          <a href={hdurl}>
            <img height='230px' src={url} alt={title} />
          </a>
          <span style={captionStyle}>{date}</span>
        </div>
        <div>
          <p style={descriptionStyle}>{explanation}</p>
        </div>
      </div>
    </div>
  );
};
export default PictureCard;
