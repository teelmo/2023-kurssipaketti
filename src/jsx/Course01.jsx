import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown';

// Load helpers.
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';
import slideToggle from './helpers/SlideToggle.js';
import CSVtoJSON from './helpers/CSVtoJSON.js';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Course01() {
  // Data states.
  const [data, setData] = useState(false);
  const appRef = useRef(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let script;
    if (data) {
      script = document.createElement('script');
      script.src = 'https://tehtava-ui.apps-test.yle.fi/static/js/embed.4e5a3e6d.js';
      script.async = true;
      script.onload = () => {
        if (window.tehtavaApp && window.location.href.includes('yle')) {
          appRef.current.querySelectorAll('.poll').forEach((el) => {
            window.tehtavaApp.mount(el.dataset.id, appRef.current.querySelector(`.poll_${el.dataset.id}`));
          });
        }
      };
      document.body.appendChild(script);
    }
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [data]);

  useEffect(() => {
    let script;
    if (data) {
      script = document.createElement('script');
      script.src = 'https://player-v2.yle.fi/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.ylePlayer !== 'undefined') {
          appRef.current.querySelectorAll('.areena_player_container').forEach((el) => {
            const props = {
              autoplay: false,
              id: el.dataset.id,
              webKitPlaysInline: true
            };
            // https://github.com/Yleisradio/player-static/wiki/Player-embed-instructions
            if (window.ylePlayer && window.location.href.includes('yle')) {
              window.ylePlayer.render({
                element: el, props
              });
            }
          });
        }
      };
      document.body.appendChild(script);
    }
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [data]);

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

  return (
    <div className="app" ref={appRef}>
      <video autoPlay muted loop className="background_video">
        <source src={`${base_url}/assets/vid/${(window.location.hash.substr(1)) ? `${window.location.hash.substr(1)}.mp4` : 'vihrea.mp4'}`} type="video/mp4" />
      </video>
      <div className="content_container">
        {
          data && data.slice(1).map((values) => {
            /*
            0: type
            1: content
            2: title
            3: group
            4: poll_id
            5: areena_id
            6: ims_id
            7: image_caption
            */
            switch (values[0]) {
              case 'paragraph_section':
                return <div className="content" key={uuidv4()}><Markdown>{values[1]}</Markdown></div>;
              case 'title_section':
                return <h2 className="" key={uuidv4()}>{values[1]}</h2>;
              case 'exercise':
                return (
                  <div className="exercise_container" key={uuidv4()}>
                    <div className="exercise_toggler ">
                      <button type="button" className={`exercise_button_${values[3]} with_arrow`} onClick={() => slideToggle(appRef, values[3])}>
                        <h3>{values[2].split(';')[0]}</h3>
                        <h4>{values[2].split(';')[1]}</h4>
                      </button>
                    </div>
                    <div className={`exercise_description exercise_description_${values[3]}`}>
                      {/* Text */}
                      <Markdown key={uuidv4()}>{values[1]}</Markdown>
                      {/* Video */}
                      {values[5] && <div className="areena_player_container" data-id={values[5]}><a href={`https://areena.yle.fi/${values[5]}`}>{values[5]}</a></div>}
                      {values[6] && (
                        <div className="image_container">
                          <figure>
                            <img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_4240/w_500/dpr_2/v1698983690/${values[6]}.jpg`} alt={values[7]} />
                            <figcaption className="text-xs pt-8">
                              {values[7] && <div className="image_caption text-gray-70">{values[7]}</div>}
                              {values[8] && <div className="image_copyright text-gray-60">{values[8]}</div>}
                            </figcaption>
                          </figure>
                        </div>
                      )}
                      {/* Poll */}
                      <div className={`js-ydd-yle-tehtava ydd-yle-tehtava ydd-yle-tehtava--exam poll poll_${values[4]}`} data-id={values[4]}>{values[4]}</div>
                      {/* Close */}
                      <div className="exercise_toggler"><button type="button" onClick={() => slideToggle(appRef, values[3])}>Sulje harjoitus</button></div>
                    </div>
                  </div>
                );
              case 'poll_section':
                return (
                  <div className="poll_container" key={uuidv4()}>
                    <div className={`js-ydd-yle-tehtava ydd-yle-tehtava ydd-yle-tehtava--exam poll poll_${values[4]}`} data-id={values[4]}>{values[4]}</div>
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
