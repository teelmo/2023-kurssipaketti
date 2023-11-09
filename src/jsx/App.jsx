import { /* useState, */useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';

// const appID = '#app-root-2023-kurssipaketti';

const base_url = (window.location.href.includes('yle')) ? 'https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti' : '.';

function App() {
  // Data states.
  // const [data, setData] = useState(false);

  useEffect(() => {
    document.querySelectorAll('.ydd-body-content p').forEach(el => {
      if (el.innerHTML.includes('[bg_video')) {
        const content = document.querySelector('.ydd-body-content');
        const video = el.innerHTML.replace('[bg_video:', '').replace(']', '');
        el.remove();
        const video_wrapper = document.createElement('div');
        video_wrapper.classList = 'kurssipaketti-bg_video_container';
        video_wrapper.innerHTML = `<video autoPlay muted playsInline poster="" class="kurssipaketti-video" loop><source src="${base_url}/assets/vid/${video}.mp4" type="video/mp4" /><source src="" type="video/webm" /><track default kind="captions" srcLang="en" src="" />Your browser does not support the video tag.</video>`;
        content.prepend(video_wrapper);
      }
      if (el.innerHTML.includes('[navigation')) {
        const elements = el.innerHTML.replace('[navigation:', '').replace(']', '').split('|').map((nav, i) => `<li><a href="#tehtava-${i + 1}"type="button">${nav}</a></li>`);
        el.innerHTML = `<ul class="kurssipaketti-navigation">${elements.join('')}</ul>`;
      }
      if (el.querySelector('a')?.innerHTML.includes('[video')) {
        const video = el.querySelector('a').innerHTML.replace('[video:', '').replace(']', '');
        el.querySelector('a').innerHTML = `<div class="kurssipaketti-video_container"><video autoPlay muted playsInline poster="" class="kurssipaketti-video" loop><source src="${base_url}/assets/vid/${video}.mp4" type="video/mp4" /><source src="" type="video/webm" /><track default kind="captions" srcLang="en" src="" />Your browser does not support the video tag.</video></div>`;
      }
      if (el.innerHTML.includes('[anchor')) {
        const anchor = el.innerHTML.replace('[anchor:', '').replace(']', '');
        el.setAttribute('id', anchor);
        el.innerHTML = '';
        el.style.visibility = 'hidden';
      }
    });
  }, []);

  return (
    false
  );
}

export default App;
