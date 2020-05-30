import React, { useCallback, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Edit from 'assets/images/edit.styled';
import editSvg from 'assets/images/edit.svg';
import Cross from 'components/Cross/Cross';
import useAction from 'hooks/useAction';
import {
  removeAnswerFromRadioOrCheckBox,
  toggleCheckBox,
  updateFieldAnswer,
} from 'models/test/reducer';
import InputEdit from 'components/InputEdit/InputEdit';
import CheckBox from 'components/CheckBox';
import useCheckChangeQuest from 'hooks/useCheckChangeQuest';
import S from './CheckBoxButton.styled';

const CheckBoxButton = ({
  questionId,
  id,
  checkBoxObject,
  index,
  ids,
  errorMsg,
}) => {
  const removeCheckBoxAnswer = useAction(removeAnswerFromRadioOrCheckBox);
  const [edit, setEdit] = useState(false);
  const [checkBoxLabel, setCheckBoxLabel] = useState(checkBoxObject.value);
  const updateField = useAction(updateFieldAnswer);
  const setToggleCheckBox = useAction(toggleCheckBox);
  const resetErrorChange = useCheckChangeQuest(questionId, errorMsg);
  const handleChange = useCallback(
    checkId => {
      setToggleCheckBox({
        id: questionId,
        checkedId: checkId,
      });
      resetErrorChange(ids.length);
    },
    [questionId, resetErrorChange, setToggleCheckBox]
  );

  const handleInputStartEdit = useCallback(() => {
    setEdit(true);
  }, [edit]);

  const handleInputChange = useCallback(
    e => {
      setCheckBoxLabel(e.currentTarget.value);
    },
    [checkBoxLabel]
  );

  const handleInputBlur = useCallback(() => {
    if (checkBoxLabel.trim()) {
      setEdit(false);
      updateField({ id: questionId, answerId: id, value: checkBoxLabel });
    }
  }, [edit, checkBoxLabel]);

  const handleInputKey = useCallback(
    e => {
      if (e.key === 'Enter' && checkBoxLabel.trim()) {
        setEdit(false);
        updateField({ id: questionId, answerId: id, value: checkBoxLabel });
      }
      if (e.key === 'Escape') {
        setEdit(false);
        setCheckBoxLabel(checkBoxObject.value);
      }
    },
    [checkBoxLabel, edit]
  );

  const handleDeleteAnswerClick = useCallback(() => {
    removeCheckBoxAnswer({ id: questionId, answerId: id });
  }, [removeCheckBoxAnswer]);
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
              checkMark
              onHandler={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKey}
            />
          ) : (
            <>
              <CheckBox
                id={id}
                isChecked={checkBoxObject.isChecked}
                label={checkBoxLabel}
                onChange={handleChange}
              />
              <Edit.Icon
                onClick={handleInputStartEdit}
                onTouchEnd={handleInputStartEdit}
              >
                <use xlinkHref={`${editSvg}#edit`} />
              </Edit.Icon>
              <Cross
                color="#80868b"
                rotate="135deg"
                margin="0 0 0 -20px"
                hover
                touched
                onClickHandler={handleDeleteAnswerClick}
              />
            </>
          )}
        </S.CheckBox>
      )}
    </Draggable>
  );
};

CheckBoxButton.propTypes = {
  questionId: PropTypes.string,
  id: PropTypes.string,
  checkBoxObject: PropTypes.object,
  index: PropTypes.number,
  ids: PropTypes.array,
  errorMsg: PropTypes.string,
};

export default memo(CheckBoxButton);
