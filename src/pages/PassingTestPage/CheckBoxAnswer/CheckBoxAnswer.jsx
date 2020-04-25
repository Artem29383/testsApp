import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswersCheckBox,
  setErrorMessage,
  setStatusInvalid,
  setUserTouchedAnswer,
  toggleCheckBox,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import S from './CheckBoxAnswer.styled';

const CheckBoxAnswer = ({ questId, questIndex, currentQuest }) => {
  const setThisQuest = useAction(setDataCurrentQuest);
  const checkedId = currentQuest.answer.ids.filter(
    ans => currentQuest.answer.entities[ans].isChecked
  );
  const resetAllChecked = useAction(setDefaultAnswersCheckBox);
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const idsAnswerOptions = useSelector(getIdsAnswerOptionsQuSel);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedAnswer);
  const toggleBoxHandler = useAction(toggleCheckBox);
  const setInvalid = useAction(setStatusInvalid);

  useEffect(() => {
    setThisQuest({
      correctAnswer: checkedId,
      entities: currentQuest.answer.entities,
      ids: currentQuest.answer.ids,
      questId,
      userAnswer: [],
    });
    resetAllChecked(checkedId);
    setError('');
    if (answeredQuestsIds.includes(questId)) {
      setUserAnswerFromCache({
        questId,
        answers: answeredQuestsEntities[questId].userAnswer,
      });
    }
  }, [questIndex]);

  const changeCheckBox = e => {
    const checkBoxId = e.currentTarget.id;
    if (currentQuest.isValid) {
      setInvalid(questId);
    }
    toggleBoxHandler(checkBoxId);
    setError('');
  };

  return idsAnswerOptions.map(id => (
    <S.CheckBox key={id}>
      <CheckBox
        onChangeHandler={changeCheckBox}
        label={answerOptions[id].value}
        id={id}
        isChecked={answerOptions[id].isChecked}
      />
    </S.CheckBox>
  ));
};

CheckBoxAnswer.propTypes = {
  questId: PropTypes.string,
  questIndex: PropTypes.number,
  currentQuest: PropTypes.object,
};

export default CheckBoxAnswer;
