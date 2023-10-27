import PropTypes from 'prop-types';

export const Button = props => {
  return <button {...props} />;
};

Button.propTypes = {
  onclick: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};
