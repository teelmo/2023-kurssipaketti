import React, { useState, useEffect } from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown';

// Load helpers.
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';
import CSVtoJSON from './helpers/CSVtoJSON.js';

// const appID = '#app-root-2023-kurssipaketti';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Course01() {
  // Data states.
  const [data, setData] = useState(false);

  // Fetch data.
  const fetchData = () => {
    const data_file = `${base_url}/assets/data/2023-kurssipaketti_example.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => {
          setData(CSVtoJSON(body));
        });
    } catch (error) {
      console.error(error);
    }
  };

  const url = 'https://tehtava-ui.apps-test.yle.fi/static/js/embed.4e5a3e6d.js';
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
      fetchData();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  useEffect(() => {
    if (window.tehtavaApp && window.location.href.includes('yle.fi')) {
      document.querySelectorAll('.poll').forEach((poll) => {
        window.tehtavaApp.mount(poll.dataset.id, document.querySelector(`.poll_${poll.dataset.id}`));
      });
    }
  }, [data]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (window.tehtavaApp) {
  //       window.tehtavaApp.mount('47-7e80d39e-05d6-47f9-b41e-04d8ac9c30e2', document.querySelector('.js-ydd-yle-tehtava-testi'));
  //       clearInterval(interval);
  //     }
  //   }, 100);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   fetch('https://tehtava.api-test.yle.fi/v1/public/exams.json?uuid=7e80d39e-05d6-47f9-b41e-04d8ac9c30e2')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(body => {
  //       document.querySelector('.testi-result').innerHTML = body.meta.count;
  //     });
  // }, []);

  const slideToggle = (group) => {
    const container = document.querySelector(`.exercise_description_${group}`);
    /** Slide down. */
    if (!container.classList.contains('active')) {
      container.classList.add('active');
      container.style.height = 'auto';

      /** Get the computed height of the container. */
      const height = `${container.clientHeight}px`;

      /** Set the height of the content as 0px, */
      /** so we can trigger the slide down animation. */
      container.style.height = '0px';

      /** Do this after the 0px has applied. */
      /** It's like a delay or something. MAGIC! */
      setTimeout(() => {
        container.style.height = height;
      }, 0);

      /** Slide up. */
    } else {
      /** Set the height as 0px to trigger the slide up animation. */
      container.style.height = '0px';

      /** Remove the `active` class when the animation ends. */
      container.addEventListener('transitionend', () => {
        container.classList.remove('active');
      }, { once: true });
    }
  };

  return (
    <div className="app">
      <video autoPlay muted loop id="myVideo">
        <source src="./assets/vid/vihrea.mp4" type="video/mp4" />
      </video>
      <div className="content_container">
        {
          data && data.slice(1).map((values) => {
            switch (values[0]) {
              case 'paragraph_section':
                return <div className="" key={uuidv4()}><Markdown>{values[1]}</Markdown></div>;
              case 'title_section':
                return <h2 className="" key={uuidv4()}>{values[1]}</h2>;
              case 'exercise':
                return (
                  <div className="exercise_container" key={uuidv4()}>
                    <div className="exercise_toggler">
                      <button type="button" onClick={() => slideToggle(values[4])}>
                        <h3>{values[2].split(';')[0]}</h3>
                        <h4>{values[2].split(';')[1]}</h4>
                      </button>
                    </div>
                    <div className={`exercise_description exercise_description_${values[4]}`}>
                      <Markdown key={uuidv4()}>{values[1]}</Markdown>
                      <div key={uuidv4()} className={`poll poll_${values[3]}`} data-id={values[3]}>{values[3]}</div>
                      <div className="exercise_toggler"><button type="button" onClick={() => slideToggle(values[4])}>Sulje harjoitus</button></div>
                    </div>
                  </div>
                );
              default:
                return '';
            }
          })
        }
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Course01;
