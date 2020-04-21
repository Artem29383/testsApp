import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Edit from 'assets/images/edit.styled';
import InputEdit from 'components/InputEdit';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import Cross from 'components/Cross';
import Radio from 'components/Radio';
import editSvg from 'assets/images/edit.svg';
import S from './RadioButton.styled';

const RadioButton = ({
  id,
  name,
  radioObject,
  questionId,
  index,
  onChangeHandler,
}) => {
  const [radioLabel, setRadioLabel] = useState(radioObject.value);
  const [edit, setEdit] = useState(false);
  const updateField = useAction(updateFieldAnswer);
  const removeAnswer = useAction(removeAnswerFromRadioOrCheckBox);

  const changeRadioLabelHandler = e => {
    setRadioLabel(e.currentTarget.value);
  };

  const startEdit = () => {
    setEdit(true);
  };

  const endEditBlur = () => {
    if (radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: radioLabel });
    }
  };

  const endEditKeyDown = e => {
    if (e.key === 'Escape') {
      setRadioLabel(radioObject.value);
      setEdit(false);
    }
    if (e.key === 'Enter' && radioLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, qId: id, value: radioLabel });
    }
  };

  const deleteAnswer = () => {
    removeAnswer({ id: questionId, qId: id });
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
              handler={changeRadioLabelHandler}
              value={radioLabel}
              blur={endEditBlur}
              keyDown={endEditKeyDown}
              checkMark
            />
          ) : (
            <>
              <Radio
                name={name}
                id={id}
                isChecked={radioObject.isChecked}
                label={radioLabel}
                onChangeHandler={onChangeHandler}
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

export default RadioButton;
RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  radioObject: PropTypes.object,
  questionId: PropTypes.string,
  setCheckedId: PropTypes.func,
  index: PropTypes.number,
  onChangeHandler: PropTypes.func,
};
