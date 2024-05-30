import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// https://github.com/remarkjs/react-markdown
import Markdown from 'react-markdown';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

// https://github.com/yle-interactive/wiki-site/blob/main/docs/comments-to-tailored-article.md
// import { CommentsPlugin } from '@yleisradio/comments-plugin';

// Load helpers.
import slideToggle from './helpers/slideToggle.js';
import CSVtoJSON from './helpers/CSVtoJSON.js';

// Import modules.
import CourseCalling from './modules/CourseCalling.jsx';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Course({ parameters }) {
  // Data states.
  const [data, setData] = useState(false);
  const appRef = useRef(null);

  const { course } = parameters;

  const darkMode = (window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color') === 'rgb(19, 20, 21)' || window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color') === 'rgb(0, 0, 0)' || window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)');
  // const articleIDs = {
  //   keskittyminen: '20-10005783',
  //   muisti: '20-10005782',
  //   rentoutuminen: '20-10005785'
  // };
  // const commentsPluginProps = {
  //   env: 'production',
  //   theme: darkMode ? 'dark' : 'light',
  //   topicId: articleIDs[course]
  // };

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
      try {
        fetch('https://tehtava-ui.apps.yle.fi/asset-manifest.json')
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.text();
          })
          .then(body => {
            script = document.createElement('script');
            script.src = JSON.parse(body)['embed.js'];
            script.async = true;
            script.onload = () => {
              if (window.tehtavaApp && window.location.href.includes('yle')) {
                appRef.current.querySelectorAll('.poll').forEach((el) => {
                  window.tehtavaApp.mount(el.dataset.id, appRef.current.querySelector(`.poll_${el.dataset.id}`));
                });
              }
            };
            document.body.appendChild(script);
          });
      } catch (error) {
        console.error(error);
      }
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
              aspectRatio: (course === 'kutsumuskartta') ? '16:9' : '1:1',
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
          appRef.current.querySelectorAll('.areena_player_container_audio').forEach((el) => {
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
  }, [course, data]);

  const closeButton = (ref, group) => {
    slideToggle(ref, group);
    setTimeout(() => {
      scrollIntoView(ref.current.querySelector(`.exercise_description_${group}`), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 70
        },
        cancellable: false,
        time: 300
      });
    }, 200);
  };

  return (
    <div className={`app ${(darkMode) ? 'dark' : 'light'}`} ref={appRef}>
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
            9: image_copyright
            10: background
            11: extra
            12: areena_extra
            13: footer
            14: internal_comment
            */
            switch (values[0]) {
              case 'main_video':
                return (
                  <div key={uuidv4()} className={`main_video_container ${(darkMode) ? 'dark' : 'light'}`}>
                    <video autoPlay muted loop playsInline>
                      <source src={`${base_url}/assets/vid/${values[5]}.mp4`} type="video/mp4" />
                      <source src={`${base_url}/assets/vid/${values[5]}.webm`} type="video/webm" />
                    </video>
                  </div>
                );
              case 'main_image':
                return <div key={uuidv4()} className="main_image_container"><img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_3936/w_1300/dpr_2/v1700043657/${values[7]}.jpg`} alt={values[8]} /></div>;
              case 'full_main_image':
                return <div key={uuidv4()} className="main_image_container full"><img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_3936/w_1300/dpr_2/v1700043657/${values[7]}.jpg`} alt={values[8]} /></div>;
              case 'title':
                return <h1 key={uuidv4()}>{values[2]}</h1>;
              case 'subtitle':
                return <p key={uuidv4()} className="subtitle ydd-lead font-bold text-lg owl:text-xl">{values[2]}</p>;
              case 'areena_section':
                return (
                  <div className="content" key={uuidv4()}>
                    {/* Video */}
                    {values[5] && (
                    <figure className="areena_container">
                      <div className="areena_player_container" data-id={values[5]} />
                      <figcaption className="">
                        {values[6] && <span className="caption">{values[6]}</span>}
                        {' '}
                      </figcaption>
                    </figure>
                    )}
                  </div>
                );
              case 'paragraph_section':
                return (
                  <div className={values[10] === 'true' ? `content content_${course} content_withbg` : `content content_${course}`} key={uuidv4()}>
                    {/* Video */}
                    {values[5] && (
                    <figure className="areena_container">
                      <div className="areena_player_container" data-id={values[5]} />
                      <figcaption className="">
                        {values[6] && <span className="caption">{values[6]}</span>}
                        {' '}
                      </figcaption>
                    </figure>
                    )}
                    <Markdown>{values[1]}</Markdown>
                    {
                      values[11] === 'calling_exercise' && (
                      <CourseCalling values={values} key={uuidv4()} />
                      )
                    }
                  </div>
                );
              case 'title_section':
                return <h2 className="" key={uuidv4()}>{values[2]}</h2>;
              case 'exercise':
                return (
                  <div className="exercise_container" key={uuidv4()}>
                    <div className="exercise_content">
                      <div className={course === 'kutsumuskartta' ? 'exercise_toggler exercise_withbg' : 'exercise_toggler'}>
                        <button type="button" className={`exercise_button_${values[3]} with_arrow exercise_button_${course} exercise_button_${values[11]}`} onClick={() => slideToggle(appRef, values[3])}>
                          <h3>{values[2].split(';')[0]}</h3>
                          {values[2].split(';')[1] && <h4>{values[2].split(';')[1]}</h4>}
                        </button>
                      </div>
                      <div className={`exercise_description exercise_description_${values[3]}`}>
                        {values[5] && values[12].split(';')[0] === 'video_top' && (
                        <figure className="areena_container">
                          <div className="areena_player_container" data-id={values[5].split(';')[0]} />
                          <figcaption className="">
                            {values[6] && <span className="caption">{values[6].split(';')[0]}</span>}
                            {' '}
                          </figcaption>
                        </figure>
                        )}
                        {/* Text */}
                        <Markdown key={uuidv4()}>{values[1]}</Markdown>
                        {/* Audio */}
                        {values[5] && values[12].split(';')[1] === 'audio' && (
                        <figure className="areena_container areena_container">
                          <div className="areena_player_container_audio" data-id={values[5].split(';')[1]} />
                          <figcaption className="">
                            {values[6] && <span className="caption">{values[6].split(';')[1]}</span>}
                            {' '}
                          </figcaption>
                        </figure>
                        )}
                        {/* Areena */}
                        {values[5] && values[12] === '' && (
                        <figure className="areena_container">
                          <div className="areena_player_container" data-id={values[5]} />
                          <figcaption className="">
                            {values[6] && <span className="caption">{values[6]}</span>}
                            {' '}
                          </figcaption>
                        </figure>
                        )}
                        {/* Image */}
                        {values[7] && (
                          <div className="image_container">
                            <figure>
                              <img src={`https://images.cdn.yle.fi/image/upload/f_auto,fl_progressive/q_auto/w_4240/w_500/dpr_2/v1698983690/${values[7]}.jpg`} alt={values[7]} />
                              <figcaption className="">
                                {values[8] && <div className="caption">{values[8]}</div>}
                                {values[9] && <div className="copyright text-gray-60">{values[9]}</div>}
                              </figcaption>
                            </figure>
                          </div>
                        )}
                        {/* Poll */}
                        <div className={`js-ydd-yle-tehtava ydd-yle-tehtava ydd-yle-tehtava--exam poll poll_${values[4]}`} data-id={values[4]}>{values[4]}</div>
                        {/* Footer */}
                        {
                          values[13] && <Markdown key={uuidv4()}>{values[13]}</Markdown>
                        }
                        {/* Close */}
                        <div className="exercise_toggler exercise_closer"><button type="button" onClick={() => closeButton(appRef, values[3])}>Sulje harjoitus</button></div>
                      </div>
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
      {/* <div className="comments_container">
        <CommentsPlugin {...commentsPluginProps} />
      </div> */}
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
