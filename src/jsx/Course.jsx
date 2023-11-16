import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown';

// https://github.com/yle-interactive/wiki-site/blob/main/docs/comments-to-tailored-article.md
import { CommentsPlugin } from '@yleisradio/comments-plugin';

// Load helpers.
import slideToggle from './helpers/SlideToggle.js';
import CSVtoJSON from './helpers/CSVtoJSON.js';

const commentsPluginProps = {
  env: 'production',
  theme: 'light',
  topicId: '20-10000501' // Test with 7-740449
};

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Course({ parameters }) {
  // Data states.
  const [data, setData] = useState(false);
  const appRef = useRef(null);

  const { course } = parameters;

  // Fetch data.
  const fetchData = useCallback(() => {
    const data_file = `${base_url}/assets/data/2023-kurssipaketti_${course}.csv`;
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
  }, [course]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let script;
    if (data) {
      script = document.createElement('script');
      script.src = 'https://tehtava-ui.apps.yle.fi/static/js/embed.8b4391f6.js';
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
              aspectRatio: '1:1',
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
      <video autoPlay muted loop className="background_video" playsInline>
        <source src={`${base_url}/assets/vid/bg_video_${course}.mp4`} type="video/mp4" />
        <source src={`${base_url}/assets/vid/bg_video_${course}.webm`} type="video/webm" />
      </video>
      <div className={`content_container content_container_${course}`}>
        {
          data && data.slice(1).map((values) => {
            /*
            0: type
            1: content
            2: title
            3: group
            4: poll_id
            5: areena_id
            6: areena_caption
            7: ims_id
            8: image_caption
            9: image_copyrighht
            */
            switch (values[0]) {
              case 'title':
                return <h1>{values[2]}</h1>;
              case 'main_image':
                return <div className="main_image_container"><img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_3936/w_1300/dpr_2/v1700043657/${values[7]}.jpg`} alt={values[8]} /></div>;
              case 'subtitle':
                return <p className="subtitle ydd-lead font-bold text-lg owl:text-xl">{values[2]}</p>;
              case 'paragraph_section':
                return <div className="content" key={uuidv4()}><Markdown>{values[1]}</Markdown></div>;
              case 'title_section':
                return <h2 className="" key={uuidv4()}>{values[2]}</h2>;
              case 'exercise':
                return (
                  <div className="exercise_container" key={uuidv4()}>
                    <div className="exercise_toggler ">
                      <button type="button" className={`exercise_button_${values[3]} with_arrow`} onClick={() => slideToggle(appRef, values[3])}>
                        <h3>{values[2].split(';')[0]}</h3>
                        {values[2].split(';')[1] && <h4>{values[2].split(';')[1]}</h4>}
                      </button>
                    </div>
                    <div className={`exercise_description exercise_description_${values[3]}`}>
                      {/* Text */}
                      <Markdown key={uuidv4()}>{values[1]}</Markdown>
                      {/* Video */}
                      {values[5] && (
                      <figure className="areena_container">
                        <div className="areena_player_container" data-id={values[5]} />
                        <figcaption className="text-xs pt-8">
                          {values[6] && <span className="caption text-gray-70">{values[8]}</span>}
                          {' '}
                          <a href={`https://areena.yle.fi/${values[5]}`} className="text-gray-70">Toista Yle Areenassa</a>
                        </figcaption>
                      </figure>
                      )}
                      {values[7] && (
                        <div className="image_container">
                          <figure>
                            <img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_4240/w_500/dpr_2/v1698983690/${values[7]}.jpg`} alt={values[7]} />
                            <figcaption className="text-xs pt-8">
                              {values[8] && <div className="caption text-gray-70">{values[8]}</div>}
                              {values[9] && <div className="copyright text-gray-60">{values[9]}</div>}
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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CommentsPlugin {...commentsPluginProps} />
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Course.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  parameters: PropTypes.object
};

Course.defaultProps = {
  parameters: { course: 'muisti' }
};

export default Course;
