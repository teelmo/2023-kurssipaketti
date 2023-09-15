import React, { /* useState, */useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';

// const appID = '#app-root-2023-kurssipaketti';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Data states.
  // const [data, setData] = useState(false);

  useEffect(() => {
    // const data_file = (window.location.href.includes('unctad.org')) ? '/sites/default/files/data-file/2023-kurssipaketti.json' : './assets/data/data.json';
    try {
      // fetch(data_file)
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw Error(response.statusText);
      //     }
      //     return response.text();
      //   })
      //   .then(body => setData(JSON.parse(body)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h2>Voi paremmin -treenipaketti</h2>
        <h4>Tervetuloa kehittämään itseäni helpoilla harjoitteilla! Valitse alta omasi.</h4>
        <div className="class_selection">
          {
            [{
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              stars: 3,
              title: 'Keskity paremmin'
            }, {
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              stars: 5,
              title: 'Rentoutta arkeen'
            }, {
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              stars: 1,
              title: 'Muisti ja oppiminen'
            }].map(el => (
              <div className="class_container" key={el.title}>
                <h3>{el.title}</h3>
                <div className="image_container"><img src={el.img} alt="Class" /></div>
                <div className="stars_container">
                  {
                    Array(el.stars).fill().map(() => <div className="star_container" key={uuidv4()}><img src="./assets/data/img/star.jpg" alt="Star" /></div>)
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className="class_content_container">
          <h3>Tee itsestäsi mestarikeskittyjä!</h3>
          <h4>Harhaileeko mielesi, katsotko vähän väliä puhelinta tai meiliä ja tuntuuko yhteen asiaan keskittyminen vaikealta?</h4>
          <p>Opi hallitsemaan mieltäsi ja siirtämään huomiosi mieltä harhailevista ajatuksista siihen, mitä olet juuri nyt tekemässä.</p>
          <ul>
            <li>
              <strong>Asiantuntijat:</strong>
              {' '}
              Aivotutkijat Katri Saarikivi ja Mona Moisala
            </li>
            <li>
              <strong>Sisältö:</strong>
              {' '}
              Viisi harjoitusta, jotka voit suorittaa arjen keskellä ilman erillistä aikaa tai työvälineitä.
            </li>
            <li>
              <strong>Aikataulu:</strong>
              {' '}
              Voit edetä harjoituksissa omassa tahdissasi, mutta varmimmin keskittymiskykysi paranee, jos seuraat alla annettuja ohjeita ja aikatauluja.
            </li>
            <li>
              <strong>Vuorovaikutus:</strong>
              {' '}
              Voit jakaa huomioitasi muiden harjoituksia tekevien kanssa ja esittää kysymyksiä asiantuntijoille kommenttikentässä. Kysymyksiin vastataan tiistaisin.
            </li>
          </ul>
          <p>Chateissa pääset kysymään ja keskustelemaan aiheesta livenä asiantuntijoiden kanssa.</p>

          <h4>Livechatit:</h4>
          <ul>
            <li>15.11.2023 klo 17-18 aivotutkija Katri Saarikivi</li>
            <li>20.11.2023 klo 17-18 työelämäprofessori Lauri Järvilehto</li>
            <li>20.11.2023 klo 18-19 aivotutkija Mona Moisala</li>
          </ul>
          <p>Haluatko muistutuksen kesken olevista harjoituksista? Paina x-merkkiä ja lisää muistutus omaan kalenteriisi.</p>
          <p>Hyviä harjoituksia!</p>
          <div className="exercise_selection">
            {
            [{
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              duration: '2 minuuttia',
              title: 'Syö keskittyneesti'
            }, {
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              stars: '5–10 minuuttia',
              title: 'Keskity yhteen asiaan ennen nukkumaanmenoa'
            }, {
              img: 'https://i.ytimg.com/vi/6sta6Gkpgcw/maxresdefault.jpg',
              duration: '5 minuuttia',
              title: 'Kokeile hypnoosia'
            }].map((el, i) => (
              <div className="exercise_container" key={el.title}>
                <h4>
                  Harjoitus
                  {' '}
                  {i + 1}
                  :
                  {' '}
                  {el.title}
                </h4>
                <div className="image_container"><img src={el.img} alt="Exercise" /></div>
                <div className="duration_container">
                  Kesto:
                  {' '}
                  {el.duration}
                </div>
              </div>
            ))
          }
          </div>
          <div className="exercise_content_container">
            <h3>Harjoitus 1: Syö keskittyneesti</h3>
            <p>Tämä harjoitus auttaa sinua tuomaan tietoista läsnäoloa ja keskittymistä arkipäivän rutiineihin. Tavoitteena on huomata kaikki ne yksityiskohdat ja aistimukset, jotka yleensä saattavat jäädä huomaamatta automaattisen toiminnan aikana. Voit valita myös jonkun toisen arkisen toiminnan, jota teet päivittäin. Tärkeintä on keskittyä ja olla läsnä kyseisessä toiminnassa täysillä.</p>
            <p>https://areena.yle.fi/1-61690732</p>
            <ol>
              <li>Sulje ensin silmäsi ja tee muutama syvä hengitys rentoutuaksesi.</li>
              <li>Avaa sitten silmäsi. Keskity jokaiseen yksityiskohtaan ja aistimukseen. Miltä ruoka näyttää, miltä se tuoksuu, miltä se maistuu, miltä se tuntuu suussasi tai millaisia ääniä tai tunteita se herättää?</li>
              <li>Syö hitaasti ja tietoisesti. Huomioi pienimmätkin yksityiskohdat, liikkeet ja omat tuntemuksesi ja keskity vain ja ainoastaan ruokailuun.</li>
              <li>Jos mieli alkaa harhailla, palauta se takaisin kiinnittämällä huomiota esimerkiksi ruoan väreihin tai makuihin.</li>
              <li>Kun olet päättänyt ruokailun, mieti millaisia tuntemuksia harjoitus herätti ja miten läsnäolosi vaikutti kokemukseesi. Voit kirjata huomioitasi harjoituksesta muistiin alle ja katsoa, muuttuvatko huomiosi seuraavan viikon aikana.</li>
              <li>Tee tämä harjoitus viikon ajan joka päivä samalla ruokailullasi (aamupala, lounas, iltaruoka jne). Kirjaa huomiosi päivä kerrallaan alle.</li>
            </ol>
            <h4>Miltä harjoitus tuntui?</h4>
            <ul className="poll">
              <li>
                <input type="radio" name="poll" />
                {' '}
                Oli vaikeaa ja unohdin tehdä.
              </li>
              <li>
                <input type="radio" name="poll" />
                {' '}
                Ihan ok, vähän ajatus harhaili kyllä.
              </li>
              <li>
                <input type="radio" name="poll" />
                {' '}
                Vau, enpä ole ennen näin keskittyneesti syönyt!
              </li>
              <li>
                <input type="radio" name="poll" />
                {' '}
                Ei taida olla mun juttuni.
              </li>
            </ul>
            <p>Tuntuiko harjoitus vaikealta tai kaipaatko neuvoa johonkin kohtaan? Kommentoi, keskustele muiden kanssa ja kysy, asiantuntijamme vastaa.</p>

            <h4>
              Merkitse harjoitus tehdyksi
              {' '}
              <input type="checkbox" />
              {' '}
            </h4>
            <p>Hienoa, ensimmäinen harjoitus takana! Sitten seuraavaan!</p>

          </div>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
