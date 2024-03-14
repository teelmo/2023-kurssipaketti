import React, {
  useState, useRef/* , useCallback */
} from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

// Import modules.
import WordCloud from './WordCloud.jsx';

// Import helpers.
import helperList from '../helpers/List.js';

function CourseCalling({ values }) {
  // Data states.
  const [helperListValue, setHelperListValue] = useState('default');
  const [data, setData] = useState([{
    value: ''
  }]);
  const [phase, setPhase] = useState(0);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const appRef = useRef(null);

  const choices = ['En pääse tekemään juuri lainkaan tällä hetkellä', 'Pääsen tekemään jonkin verran, mutta haluaisin tehdä enemmän', 'Pääsen tällä hetkellä tekemään juuri niin paljon kuin haluan'];

  const increasePhase = () => {
    setButtonIsDisabled(true);
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
    let value_for_test = '';
    input_fields.forEach(el => {
      value_for_test += el.value;
    });
    setButtonIsDisabled(value_for_test === '');
    if (input_fields[input_fields.length - 1].value !== '') {
      input_fields.push({
        index: index + 1,
        value: ''
      });
    }
    setData(input_fields);
  };

  const populateInputChange = (event) => {
    const input_fields = [...data];
    setHelperListValue(event.target.value);
    input_fields[input_fields.length - 1].value = event.target.value;
    input_fields.push({
      index: input_fields.length,
      value: ''
    });
    setData(input_fields);
    setButtonIsDisabled(false);
  };

  const handleRankChange = (event, index) => {
    const input_fields = [...data];
    input_fields[index].rank = event.target.value;
    setData(input_fields);
    let value_for_test = false;
    input_fields.forEach(el => {
      if (el.rank === undefined && el.value !== '') {
        value_for_test = true;
      }
    });
    setButtonIsDisabled(value_for_test);
  };

  return (
    <div className="exercise_container" ref={appRef} key="course_calling" style={{ backgroundColor: '#f5f6f8' }}>
      <div className="exercise_content">
        <h3>{values[2].split(';')[0]}</h3>
        {values[2].split(';')[1] && <h4>{values[2].split(';')[1]}</h4>}
        {
          phase === 0 && (
            <select className="helper_list" onChange={(event) => populateInputChange(event)} value={helperListValue}>
              <option disabled value="default">Inspiraatiota voit napata apulistalta</option>
              <option disabled>– – – – –</option>
              {
                helperList.map(el => (<option value={el} key={uuidv4()}>{el}</option>))
              }
            </select>
          )
        }
        <div className="input_container">
          {
            data && data.map((el, index) => (
              <div className="input_field_container" key={`input_field_container_${el.index}`}>
                { phase === 0 && (
                  <label htmlFor={`text_label_${index}`}>
                    <span className="number">
                      {index + 1}
                      .
                      {' '}
                    </span>
                    <input type="text" id={`text_label_${index}`} value={el.value} onChange={(event) => handleInputChange(event, index)} />
                  </label>
                )}
                {
                  (phase > 0 && data[index].value) && (
                    <div className="rank_container">
                      <h4>
                        <span className="number">
                          {index + 1}
                          .
                          {' '}
                        </span>
                        Arvioi nykytilanteesi:
                        {' '}
                        <span className="value">{data[index].value}</span>
                      </h4>
                      <p>Miten usein tätä lempipuuhaa nykyisin.</p>
                      {
                      choices.map((value, i) => (
                        <div key={uuidv4()} className="row">
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
        <div className="button_container">
          <button type="button" onClick={() => increasePhase()} className="ready" disabled={buttonIsDisabled}>Valmista tuli</button>
        </div>
        {
          phase > 1 && (
            <div>
              <div className="result_container">
                {data.filter(el => el.rank === choices[0]).length > 0 && (
                  <div>
                    <h4>Asiat joita et tee mutta tahtoisit</h4>
                    <p>Näihin panostamalla saat eniten hyötyä</p>
                    <ul>
                      {
                        data.filter(el => el.rank === choices[0]).map(el => (
                          <li className="result_row" key={uuidv4()}>{el.value}</li>
                        ))
                      }
                    </ul>
                  </div>
                )}
                {data.filter(el => el.rank === choices[1]).length > 0 && (
                  <div>
                    <h4>Asiat joita et teet liian vähän siihen miten tahtoisit</h4>
                    <p>Näihin panostamalla saat paljon hyötyä</p>
                    <ul>
                      {
                      data.filter(el => el.rank === choices[1]).map(el => (
                        <li className="result_row" key={uuidv4()}>{el.value}</li>
                      ))
                    }
                    </ul>
                  </div>
                )}
                {data.filter(el => el.rank === choices[2]).length > 0 && (
                  <div>
                    <h4>Asiat jotka ovat kunnossa</h4>
                    <p>Älä unohda näitä</p>
                    <ul>
                      {
                      data.filter(el => el.rank === choices[2]).map(el => (
                        <li className="result_row" key={uuidv4()}>{el.value}</li>
                      ))
                    }
                    </ul>
                  </div>
                )}
                {(data.filter(el => el.rank === choices[0]).length === 0 && data.filter(el => el.rank === choices[1]).length === 0) && (
                  <div>
                    <h3>Kaikki näyttää olevan hienosti</h3>
                  </div>
                )}
              </div>
              <div className="word_cloud_container">
                {
                  (data.filter(el => el.rank === choices[0] || el.rank === choices[1]).length > 1) && (
                    <WordCloud rank_0={data.filter(el => el.rank === choices[0])} rank_1={data.filter(el => el.rank === choices[1])} />
                  )
                }
              </div>
              <h3>Tuunaa elämäsi!</h3>
              <p>Nyt näet paremmin, mihin haluaisit aikaasi käyttää. Voit alkaa suunnata tarmosi siihen, että työssäsi ja vapaa-aikana on enemmän näitä juuri sinulle tärkeitä asioita.</p>
              <p>Suurin muutos tapahtuu, kun lisäät arkeesi niitä juttuja, joita et tällä hetkellä tee, tai joita teet hyvin vähän.</p>
              <p>Joitakin asioita et pysty heti toteuttamaan täysillä. Aloita silloin mikroskooppisen pienellä ensiaskeleella. Olisiko mahdollista omistaa viisitoista minuuttia viikossa kaipaamallesi lempipuuhalle?</p>
            </div>
          )
        }
      </div>
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
