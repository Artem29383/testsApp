import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import RadioButton from 'pages/CreateEditTestPage/Question/RadioQuestions/RadioButton';
import useAction from 'hooks/useAction';
import { toggleChecked } from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './RadioQuestions.styled';

const RadioQuestions = ({ id, quest, errorMsg }) => {
  const { entities, ids } = quest;
  const toggleRadio = useAction(toggleChecked);
  const resetErrorChange = useCheckChangeQuest(id, errorMsg);
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
    <Droppable droppableId={id} type={id}>
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
  quest: PropTypes.object,
  errorMsg: PropTypes.string,
};
