import React, {
  useRef
} from 'react';
import '../styles/styles.less';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Frontpage() {
  // Data states.
  const appRef = useRef(null);

  const darkMode = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color') === 'rgb(19, 20, 21)';

  return (
    <div className="app" ref={appRef}>
      <div className="course_selection_container">
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10005783">
            <h2>Keskittyminen</h2>
            <video autoPlay muted loop className="course_selection_video" playsInline>
              <source src={`${base_url}/assets/vid/link_video_keskittyminen${(darkMode ? '_darkmode' : '')}.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_keskittyminen${(darkMode ? '_darkmode' : '')}.webm`} type="video/webm" />
            </video>
          </a>
        </div>
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10005782">
            <h2>Muistitekniikat</h2>
            <video autoPlay muted loop className="course_selection_video" playsInline>
              <source src={`${base_url}/assets/vid/link_video_muisti${(darkMode ? '_darkmode' : '')}.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_muisti${(darkMode ? '_darkmode' : '')}.webm`} type="video/webm" />
            </video>
          </a>
        </div>
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-1000578">
            <h2>Rentoutuminen</h2>
            <video autoPlay muted loop className="course_selection_video" playsInline>
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen${(darkMode ? '_darkmode' : '')}.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen${(darkMode ? '_darkmode' : '')}.webm`} type="video/webm" />
            </video>
          </a>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Frontpage;
