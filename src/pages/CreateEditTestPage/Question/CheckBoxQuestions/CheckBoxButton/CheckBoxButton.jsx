import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Edit from 'assets/images/edit.styled';
import editSvg from 'assets/images/edit.svg';
import Cross from 'components/Cross/Cross';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import InputEdit from 'components/InputEdit/InputEdit';
import CheckBox from 'components/CheckBox';
import S from './CheckBoxButton.styled';

const CheckBoxButton = ({
  questionId,
  id,
  checkBoxObject,
  onChangeCheckBoxHandler,
  index,
}) => {
  const removeCheckBoxAnswer = useAction(removeAnswerFromRadioOrCheckBox);
  const [edit, setEdit] = useState(false);
  const [checkBoxLabel, setCheckBoxLabel] = useState(checkBoxObject.value);
  const updateField = useAction(updateFieldAnswer);

  const startEditHandler = () => {
    setEdit(true);
  };

  const changeHandler = e => {
    setCheckBoxLabel(e.currentTarget.value);
  };

  const stopEditHandlerBlur = () => {
    if (checkBoxLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: checkBoxLabel });
    }
  };

  const stopEditHandlerKey = e => {
    if (e.key === 'Enter' && checkBoxLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: checkBoxLabel });
    }
    if (e.key === 'Escape') {
      setEdit(false);
      setCheckBoxLabel(checkBoxObject.value);
    }
  };

  const deleteAnswer = () => {
    removeCheckBoxAnswer({ id: questionId, qId: id });
  };
  return (
    <Draggable shouldRespectForcePress draggableId={id} index={index}>
      {provided => (
        <S.CheckBox
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          edit={edit}
        >
          {edit ? (
            <InputEdit
              type="text"
              focus
              value={checkBoxLabel}
              handler={changeHandler}
              blur={stopEditHandlerBlur}
              keyDown={stopEditHandlerKey}
              checkMark
            />
          ) : (
            <>
              <CheckBox
                id={id}
                isChecked={checkBoxObject.isChecked}
                onChangeHandler={onChangeCheckBoxHandler}
                label={checkBoxLabel}
              />
              <Edit.Icon
                onClick={startEditHandler}
                onTouchEnd={startEditHandler}
              >
                <use xlinkHref={`${editSvg}#edit`} />
              </Edit.Icon>
              <Cross
                color="#80868b"
                rotate="135deg"
                touched
                margin="0 0 0 -20px"
                onClickHandler={deleteAnswer}
                hover
              />
            </>
          )}
        </S.CheckBox>
      )}
    </Draggable>
  );
};

export default CheckBoxButton;
CheckBoxButton.propTypes = {
  questionId: PropTypes.string,
  id: PropTypes.string,
  checkBoxObject: PropTypes.object,
  onChangeCheckBoxHandler: PropTypes.func,
  index: PropTypes.number,
};
