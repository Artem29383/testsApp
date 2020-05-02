import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import CheckBoxButton from 'pages/CreateEditTestPage/Question/CheckBoxQuestions/CheckBoxButton';
import useAction from 'hooks/useAction';
import { toggleCheckBox } from 'models/test/reducer';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './CheckBoxQuestions.styled';

const CheckBoxQuestions = ({ id, quest }) => {
  const { entities, ids } = quest.answer;
  const setToggleCheckBox = useAction(toggleCheckBox);
  const resetErrorChange = useCheckChangeQuest(id);

  const changeCheckBoxHandler = e => {
    const checkId = e.currentTarget.id;
    setToggleCheckBox({
      id,
      qId: checkId,
      isChecked: entities[checkId].isChecked,
    });
    resetErrorChange(ids.length);
  };

  const checkBoxVariable = ids.map((qId, index) => {
    return (
      <CheckBoxButton
        index={index}
        key={qId}
        questionId={id}
        id={entities[qId].id}
        checkBoxObject={entities[qId]}
        onChangeCheckBoxHandler={changeCheckBoxHandler}
      />
    );
  });

  return (
    <Droppable droppableId={id} type="subItem">
      {provided => (
        <S.DragZone ref={provided.innerRef} {...provided.droppableProps}>
          {checkBoxVariable}
          {provided.placeholder}
        </S.DragZone>
      )}
    </Droppable>
  );
};

export default CheckBoxQuestions;
CheckBoxQuestions.propTypes = {
  id: PropTypes.string,
  quest: PropTypes.object,
};
