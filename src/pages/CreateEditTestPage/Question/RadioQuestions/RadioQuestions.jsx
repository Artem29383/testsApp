import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import RadioButton from 'pages/CreateEditTestPage/Question/RadioQuestions/RadioButton';
import useAction from 'hooks/useAction';
import { toggleChecked } from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import useSelector from 'hooks/useSelector';
import { getQuestionEntities, getQuestionIds } from 'models/test/selectors';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ id }) => {
  const entities = useSelector(getQuestionEntities, id);
  const ids = useSelector(getQuestionIds, id);
  const toggleRadio = useAction(toggleChecked);
  const resetErrorChange = useCheckChangeQuest(id);
  const changeRadioHandler = e => {
    const checkedId = ids.filter(qId => entities[qId].isChecked);
    const radioId = e.currentTarget.id;
    toggleRadio({ id, radioId, checkedId });
    resetErrorChange(ids.length);
  };

  const radioBtns = ids.map((qId, index) => (
    <RadioButton
      key={entities[qId].id}
      questionId={id}
      index={index}
      id={entities[qId].id}
      radioObject={entities[qId]}
      onChangeHandler={changeRadioHandler}
    />
  ));

  return (
    <Droppable droppableId={id} type="subItem">
      {provided => (
        <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
          {radioBtns}
          {provided.placeholder}
        </S.DragZone>
      )}
    </Droppable>
  );
};
export default RadioQuestions;
RadioQuestions.propTypes = {
  id: PropTypes.string,
};
