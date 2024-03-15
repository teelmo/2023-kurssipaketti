import React, {
  useRef
} from 'react';
import '../styles/styles.less';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function Frontpage() {
  // Data states.
  const appRef = useRef(null);

  return (
    <div className="app" ref={appRef}>
      <div className="course_selection_container">
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10006474">
            <h2>Kutsumuskartta</h2>
            <video autoPlay muted loop className="course_selection_video dark" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen_darkmode.jpg`}>
              <source src={`${base_url}/assets/vid/kutsumuskartta.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/kutsumuskartta.webm`} type="video/webm" />
            </video>
            <video autoPlay muted loop className="course_selection_video light" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen.jpg`}>
              <source src={`${base_url}/assets/vid/kutsumuskartta.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/kutsumuskartta.webm`} type="video/webm" />
            </video>
          </a>
        </div>
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10005783">
            <h2>Keskittyminen</h2>
            <video autoPlay muted loop className="course_selection_video dark" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen_darkmode.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_keskittyminen_darkmode.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_keskittyminen_darkmode.webm`} type="video/webm" />
            </video>
            <video autoPlay muted loop className="course_selection_video light" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_keskittyminen.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_keskittyminen.webm`} type="video/webm" />
            </video>
          </a>
        </div>
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10005782">
            <h2>Muistitekniikat</h2>
            <video autoPlay muted loop className="course_selection_video dark" playsInline poster={`${base_url}/assets/img/link_video_muisti_darkmode.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_muisti_darkmode.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_muisti_darkmode.webm`} type="video/webm" />
            </video>
            <video autoPlay muted loop className="course_selection_video light" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_muisti.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_muisti.webm`} type="video/webm" />
            </video>
          </a>
        </div>
        <div className="course_selection_video_container">
          <a href="https://aihe.yle.fi/aihe/a/20-10005785">
            <h2>Rentoutuminen</h2>
            <video autoPlay muted loop className="course_selection_video dark" playsInline poster={`${base_url}/assets/img/link_video_rentoutuminen_darkmode.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen_darkmode.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen_darkmode.webm`} type="video/webm" />
            </video>
            <video autoPlay muted loop className="course_selection_video light" playsInline poster={`${base_url}/assets/img/link_video_keskittyminen.jpg`}>
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen.mp4`} type="video/mp4" />
              <source src={`${base_url}/assets/vid/link_video_rentoutuminen.webm`} type="video/webm" />
            </video>
          </a>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Frontpage;
