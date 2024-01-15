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

  const handleChangeChange = (event, index) => {
    const input_fields = [...data];
    input_fields[index].change = event.target.value;
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
                    <h4>Miten on tämän homman osalta?</h4>
                    {
                    ['En pääse tekemään juuri lainkaan tällä hetkellä', 'Pääsen tekemään jonkin verran, mutta haluaisin tehdä enemmän', 'Pääsen tällä hetkellä tekemään juuri niin paljon kuin haluan'].map((value, i) => (
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
              {
                phase > 1 && (
                  <div className="change_container">
                    <h4>Voisitko kuvitella pystyväsi lisäämään tämän asian osuutta elämässäsi?</h4>
                    {
                    ['En ollenkaan', 'Ehkä hiukan', 'Voisin paljonkin'].map((value, i) => (
                      <div key={uuidv4()}>
                        <label htmlFor={`change_label_${index}_${i}`} key={uuidv4()}>
                          <input type="radio" name={`change_index_${index}`} checked={value === data[index].change} value={value} id={`change_label_${index}_${i}`} onChange={(event) => handleChangeChange(event, index)} />
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
        phase > 2 && (
          <div>VISUALISOINTI</div>
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
