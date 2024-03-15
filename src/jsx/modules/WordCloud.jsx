import React, {
  useEffect, useState/* , useCallback */
} from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function WordCloud({ rank_0, rank_1 }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const shortest = rank_0.concat(rank_1).reduce((a, b) => (a.length <= b.value.length ? a.length : b.value.length));

    const rank_0_values = rank_0.map(el => <div className="rank_value rank_0_value" style={{ fontSize: `${(Math.max(24 * (shortest / el.value.length), 14))}px`, left: `${getRandomArbitrary(-30, 30)}px` }}>{el.value}</div>);
    const rank_1_values = rank_1.map(el => <div className="rank_value rank_1_value" style={{ fontSize: `${(Math.max(24 * (shortest / el.value.length), 14))}px`, left: `${getRandomArbitrary(-30, 30)}px` }}>{el.value}</div>);

    setData(rank_0_values.concat(rank_1_values));
  }, [rank_0, rank_1]);

  return (
    <div>
      <h3>Tuunaa arkea näillä tekemisillä</h3>
      <p>Nappaa tästä kuva, jotta muistat mitä asioita kaipaat lisää.</p>
      <div className="word_cloud">
        {
          data && data.map(el => <div key={uuidv4()}>{el}</div>)
        }
      </div>
    </div>
  );
}

WordCloud.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  rank_0: PropTypes.array,
  /* eslint-disable-next-line react/forbid-prop-types */
  rank_1: PropTypes.array
};

WordCloud.defaultProps = {
  rank_0: [],
  rank_1: []
};

export default WordCloud;
