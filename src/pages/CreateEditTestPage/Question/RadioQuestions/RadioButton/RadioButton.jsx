import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Edit from 'assets/images/edit.styled';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  toggleChecked,
  updateFieldAnswer,
} from 'models/test/reducer';
import Cross from 'components/Cross';
import Radio from 'components/Radio';
import editSvg from 'assets/images/edit.svg';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './RadioButton.styled';

const RadioButton = ({ id, radioObject, questionId, index, ids, errorMsg }) => {
  const [radioLabel, setRadioLabel] = useState(radioObject.value);
  const [edit, setEdit] = useState(false);
  const updateField = useAction(updateFieldAnswer);
  const removeAnswer = useAction(removeAnswerFromRadioOrCheckBox);
  const toggleRadio = useAction(toggleChecked);
  const resetErrorChange = useCheckChangeQuest(questionId, errorMsg);

  const handleChange = useCallback(
    radioId => {
      toggleRadio({ id: questionId, radioId });
      resetErrorChange(ids.length);
    },
    [ids, toggleRadio, resetErrorChange]
  );

  const changeRadioLabelHandler = useCallback(
    e => {
      setRadioLabel(e.currentTarget.value);
    },
    [radioLabel]
  );

  const startEdit = () => {
    setEdit(true);
  };

  const endEditBlur = () => {
    if (radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, answerId: id, value: radioLabel });
    }
  };

  const endEditKeyDown = e => {
    if (e.key === 'Escape') {
      setRadioLabel(radioObject.value);
      setEdit(false);
    }
    if (e.key === 'Enter' && radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, answerId: id, value: radioLabel });
    }
  };

  const deleteAnswer = () => {
    removeAnswer({ id: questionId, answerId: id });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <S.Radio
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          edit={edit}
        >
          {edit ? (
            <InputEdit
              type="text"
              focus
              onHandler={changeRadioLabelHandler}
              value={radioLabel}
              onBlur={endEditBlur}
              onKeyDown={endEditKeyDown}
              checkMark
            />
          ) : (
            <>
              <Radio
                id={id}
                isChecked={radioObject.isChecked}
                label={radioLabel}
                onChange={handleChange}
              />
              <Edit.Icon onClick={startEdit} onTouchEnd={startEdit}>
                <use xlinkHref={`${editSvg}#edit`} />
              </Edit.Icon>
              <Cross
                touched
                color="#80868b"
                rotate="135deg"
                margin="0 0 0 -20px"
                onClickHandler={deleteAnswer}
                hover
              />
            </>
          )}
        </S.Radio>
      )}
    </Draggable>
  );
};

export default memo(RadioButton);
RadioButton.propTypes = {
  id: PropTypes.string,
  radioObject: PropTypes.object,
  questionId: PropTypes.string,
  index: PropTypes.number,
  ids: PropTypes.array,
  errorMsg: PropTypes.string,
};
