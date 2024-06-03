import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown';
import Button from './Button.jsx';

function ButtonRender({ link }) {
  return (
    <Button
      link={link}
      label="Tutustu kurssiin"
    />
  );
}

function Card({ data }) {
  const [alt, setAlt] = useState(null);
  // write fetch function that gets a txt file, then saves it to a state

  useEffect(() => {
    fetch(`https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/alts/alt_${data.img}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log(`got text ${text}`);
        setAlt(text);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  }, [data.img]);

  return (
    <li className="article-container" data-wide={data.wide}>
      <article data-wide={data.wide} style={{ background: data.background }}>
        <picture data-image={data.img}>
          <source type="image/avif" srcSet={`https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_${data.img}.avif`} />
          <source type="image/webp" srcSet={`https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_${data.img}.webp`} />
          <img src={`https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_${data.img}.jpg`} alt={alt} />
        </picture>
        <div>
          <h3>{data.title}</h3>
          <Markdown>{data.text}</Markdown>
          {data.wide && <ButtonRender link={data.link} />}
        </div>
        {!data.wide && <ButtonRender link={data.link} />}
      </article>
    </li>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    wide: PropTypes.bool,
    background: PropTypes.string,
  }).isRequired,
};

ButtonRender.propTypes = {
  link: PropTypes.string.isRequired
};

export default Card;
