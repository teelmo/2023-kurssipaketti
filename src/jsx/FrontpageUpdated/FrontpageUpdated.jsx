import React from 'react';
import '../../styles/FrontpageUpdated/index.less';

import CustomTag from './Tag.jsx';

import courses from '../../../assets/data/frontpagedata';
import Card from './Card.jsx';
import bg from '../../../assets/img/frontpageupdated/bg_kurssikokonaisuus.png';
import Button from './Button.jsx';

function FrontpageUpdated() {
  return (
    <div id="frontpage-updated">
      <div className="gradient">
        <img src={bg} alt="" />
      </div>
      <div className="wrapper-container">
        <div className="wrapper">

          <main className="grid-container">
            <section className="hero-grid">
              <picture>
                <source type="image/avif" srcSet="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-12924056655bf4eb0c91.avif" />
                <source type="image/webp" srcSet="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-12924056655bf4eb0c91.webp" />
                <img alt="ALTTEKSTI" src="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-12924056655bf4eb0c91.jpg" />
              </picture>
              <div className="hero-tekstit">
                <div className="tag-wrapper">
                  <CustomTag>
                    <h1>Ylen kurssisisällöt</h1>
                  </CustomTag>
                </div>
                <h2>
                  Kehitä itseäsi ja osaamistasi helppojen harjoitteiden avulla
                </h2>
                <div className="ingressi">
                  <p>
                    Paranna keskittymiskykyäsi tai rentoudu aktivoimalla vagushermoasi. Opettele muistitekniikoita, kokeile kutsumuskarttaa tai löydä apua eron pohtimiseen.
                  </p>
                  <p>
                    Nämä arkeen mahtuvat harjoitukset on kehitetty yhdessä asiantuntijoiden kanssa.
                  </p>

                </div>
              </div>
              <ul id="kurssi-buttons">
                {courses.map((e) => (
                  <li>
                    {/* eslint-disable */}
                      <a href={e.link}>
                        <Button
                          link={e.link}
                          label={e.title}
                        />
                      </a>
                      {/* eslint-enable */}
                  </li>
                ))}
              </ul>
            </section>

            <ul className="grid">
              {courses.map((e) => (
                <Card data={e} />
              ))}
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
}

export default FrontpageUpdated;
