import P from 'prop-types';
import './styles.css';
export const TextInput = ({ searchValue = '', handleChange }) => {
  return (
    <input
      className="text-input"
      placeholder="Type your search"
      type="search"
      value={searchValue}
      onChange={handleChange}
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string,
  handleChange: P.func.isRequired,
};
