import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Radio from 'components/Radio';
import useAction from 'hooks/useAction';
import {
  setDataCurrentQuest,
  setDefaultAnswersRadio,
  setErrorMessage,
  setStatusInvalid,
  setUserTouchedAnswer,
  toggleChecked,
} from 'models/passTest/reducer';
import useSelector from 'hooks/useSelector';
import {
  getAllUserAnsweredEntitiesSel,
  getAllUserAnsweredIdSel,
  getAnswerOptionsQuSel,
  getIdsAnswerOptionsQuSel,
} from 'models/passTest/selectors';
import nanoid from 'nanoid';
import S from './RadioAnswer.styled';

const RadioAnswer = ({ questId, questIndex, currentQuest }) => {
  const setThisQuest = useAction(setDataCurrentQuest);
  const nameRadio = nanoid();
  const resetAllChecked = useAction(setDefaultAnswersRadio);
  const answerOptions = useSelector(getAnswerOptionsQuSel);
  const idsAnswerOptions = useSelector(getIdsAnswerOptionsQuSel);
  const toggleRadio = useAction(toggleChecked);
  const setError = useAction(setErrorMessage);
  const answeredQuestsIds = useSelector(getAllUserAnsweredIdSel);
  const answeredQuestsEntities = useSelector(getAllUserAnsweredEntitiesSel);
  const setUserAnswerFromCache = useAction(setUserTouchedAnswer);
  const setInvalid = useAction(setStatusInvalid);

  useEffect(() => {
    const checkedId = currentQuest.answer.ids.filter(
      ans => currentQuest.answer.entities[ans].isChecked
    );
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

  const changeRadioHandler = e => {
    const checkedId = idsAnswerOptions.find(
      qId => answerOptions[qId].isChecked
    );
    const radioId = e.currentTarget.id;
    if (currentQuest.isValid) {
      setInvalid(questId);
    }
    toggleRadio({ radioId, checkedId });
    setError('');
  };

  return idsAnswerOptions.map(id => (
    <S.Radio key={answerOptions[id].id}>
      <Radio
        id={answerOptions[id].id}
        label={answerOptions[id].value}
        name={nameRadio}
        isChecked={answerOptions[id].isChecked}
        onChangeHandler={changeRadioHandler}
      />
    </S.Radio>
  ));
};

RadioAnswer.propTypes = {
  questId: PropTypes.string,
  questIndex: PropTypes.number,
  currentQuest: PropTypes.object,
};

export default RadioAnswer;
