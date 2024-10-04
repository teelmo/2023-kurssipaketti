import React from 'react';
import '../../styles/FrontpageUpdated/index.less';

import CustomTag from './Tag.jsx';

import courses from '../../../assets/data/frontpagedata';
import Card from './Card.jsx';
import Button from './Button.jsx';

function FrontpageUpdated() {
  return (
    <div id="frontpage-updated">
      <div className="gradient">
        <picture>
          <source type="image/avif" srcSet="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/bg_kurssikokonaisuus.avif" />
          <source type="image/webp" srcSet="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/bg_kurssikokonaisuus.webp" />
          <img alt="" src="https://lusi-dataviz.test.ylestatic.fi/2023-kurssipaketti/ims_images/bg_kurssikokonaisuus.png" />
        </picture>
      </div>
      <div className="wrapper-container">
        <div className="wrapper">

          <main className="grid-container">
            <section className="hero-grid">
              <picture>
                <source type="image/avif" srcSet="https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-1297662666068c83e993.avif" />
                <source type="image/webp" srcSet="https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-1297662666068c83e993.webp" />
                <img alt="" src="https://lusi-dataviz.ylestatic.fi/2023-kurssipaketti/ims_images/1_1/1_1_1x_39-1297662666068c83e993.jpg" />
              </picture>
              <section className="hero-tekstit">
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
              </section>
              <ul id="kurssi-buttons" aria-label="Kurssin valintaan tarkoitetut pikanäppäimet">
                {courses.map((e) => (
                  <li>
                    {/* eslint-disable */}
                        <Button
                          link={e.link}
                          label={e.title}
                        />
                      {/* eslint-enable */}
                  </li>
                ))}
              </ul>
            </section>

            <ul className="grid" aria-label="Kurssiaiheet">
              {courses.map((e) => (
                <Card data={e} />
              ))}
            </ul>
          </main>
          <p style={{ textAlign: 'center' }} />
        </div>
      </div>
    </div>
  );
}

export default FrontpageUpdated;
