import React from 'react';
import '../../styles/FrontpageUpdated/Button.less';
import PropTypes from 'prop-types';

function Button({ link, label }) {
  return (
    <a href={link}>
      <button type="button" aria-label={label} aria-disabled="false" className="fp_button">{label}</button>
    </a>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default Button;
