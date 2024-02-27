import React, {
  useState, useEffect, useRef/* , useCallback */
} from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

function CourseCalling({ values }) {
  // Data states.
  const [data, setData] = useState([{
    value: ''
  }]);
  const [phase, setPhase] = useState(0);
  const appRef = useRef(null);

  useEffect(() => {

  });

  const increasePhase = () => {
    if (data[data.length - 1].value === '') {
      const deleteVal = [...data];
      deleteVal.splice(data.length - 1, 1);
      setData(deleteVal);
    }
    setPhase(phase + 1);
  };

  const handleInputChange = (event, index) => {
    const input_fields = [...data];
    input_fields[index].value = event.target.value;
    if (input_fields[input_fields.length - 1].value !== '') {
      input_fields.push({
        value: ''
      });
    }
    setData(input_fields);
  };

  const handleRankChange = (event, index) => {
    const input_fields = [...data];
    input_fields[index].rank = event.target.value;
    setData(input_fields);
  };

  return (
    <div className="exercise_container" ref={appRef} key="course_calling">
      <h3>{values[2].split(';')[0]}</h3>
      {values[2].split(';')[1] && <h4>{values[2].split(';')[1]}</h4>}
      <div className="input_container">
        {
          data && data.map((el, index) => (
            <div className="input_field_container" key={`input_field_container_${el}`}>
              <label htmlFor={`text_label_${index}`}>
                <span className="label">
                  {index + 1}
                  .
                  {' '}
                </span>
                <input type="text" id={`text_label_${index}`} value={el.value} onChange={(event) => handleInputChange(event, index)} />
              </label>
              {
                phase > 0 && (
                  <div className="rank_container">
                    <h4>Pisteytä tämä puuhasi</h4>
                    {
                    ['En pääse tekemään juuri lainkaan tällä hetkellä (1p)', 'Pääsen tekemään jonkin verran, mutta haluaisin tehdä enemmän (2p)', 'Pääsen tällä hetkellä tekemään juuri niin paljon kuin haluan (3p)'].map((value, i) => (
                      <div key={uuidv4()}>
                        <label htmlFor={`rank_label_${index}_${i}`}>
                          <input type="radio" name={`question_index_${index}`} checked={value === data[index].rank} value={value} id={`rank_label_${index}_${i}`} onChange={(event) => handleRankChange(event, index)} />
                          <span className="label">{value}</span>
                        </label>
                      </div>
                    ))
                  }
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
      <button type="button" onClick={() => increasePhase()}>Valmista tuli</button>
      {
        phase > 1 && (
          <div>
            <h3>VISUALISOINTI TULOKSISTA!</h3>
            <p>Nyt näet paremmin, mihin haluaisit aikasi käyttää.Oma kutsumuskarttasi paljastaa, mitkä tekemisen muodot ovat sinulle niin innostavia, että olet valmis tekemään niitä tuntikausia, päivästä ja vuodesta toiseen.</p>
            <p>Voit alkaa suunnata tarmosi siihen, että työssäsi ja vapaa-aikana on enemmän näitä juuri sinulle tärkeitä asioita. Suurin muutos tapahtuu, kun lisäät arkeesi niitä juttuja, joille annoit vain yhden pisteen. </p>
            <p>Joitakin asioita et pysty toteuttamaan. Anna niiden jäädä mielen pohjalle kutkuttamaan. Voit edistää niitä todella pienin askelin, esimerkiksi vain katsomalla Youtubesta aiheeseen liittyvän videon.</p>
            <p>Never say never, jonakin päivänä mahdottomalta tuntuva voikin onnistua. Frank Martela neuvoo ajattelemaan elämää jaksoissa. </p>
          </div>
        )
      }
    </div>
  );
}

CourseCalling.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  values: PropTypes.array.isRequired
};

CourseCalling.defaultProps = {
};

export default CourseCalling;
