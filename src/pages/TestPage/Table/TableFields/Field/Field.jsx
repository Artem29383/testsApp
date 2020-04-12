import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getTestsSelector } from 'models/tests/selectors';
import routes from 'constants/routes';
import S from './Field.styled';

const Field = ({ id, f, label }) => {
  const tests = useSelector(getTestsSelector);
  return (
    <S.ThText data-label={label}>
      <S.Link to={`${routes.passing}/${id}`}>
        <S.ThDiv>
          <S.Text data-id={id}>{tests[id][f]}</S.Text>
        </S.ThDiv>
      </S.Link>
    </S.ThText>
  );
};

Field.propTypes = {
  id: PropTypes.string,
  f: PropTypes.string,
  label: PropTypes.string,
};

export default Field;
