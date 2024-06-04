import React from 'react';
import '../../styles/FrontpageUpdated/Tag.less';
import PropTypes from 'prop-types';

function Tag({ children }) {
  return (
    <div className="tag">
      {children}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Tag;
