import { questionVariable } from 'styles/constants';

export function checkValidationTest(
  questions,
  ids,
  setValidQuest,
  setInvalidQuest
) {
  const validQuestions = [];
  const inValidQuestions = [];
  ids.forEach(id => {
    if (
      questions[id].type === questionVariable.one ||
      questions[id].type === questionVariable.some
    ) {
      if (questions[id].answer.ids.length < 2) {
        inValidQuestions.push({
          id,
          errorMsg: 'Нужно больше двух вариантов ответа',
        });
      } else {
        const isRightAnswer = questions[id].answer.ids.some(
          qId => questions[id].answer.entities[qId].isChecked
        );
        if (!isRightAnswer) {
          inValidQuestions.push({
            id,
            errorMsg: 'Отсутствует правильный ответ',
          });
        } else {
          validQuestions.push(id);
        }
      }
    }
    if (questions[id].type === questionVariable.number) {
      validQuestions.push(id);
    }
  });
  if (inValidQuestions.length === 0) {
    if (validQuestions.length !== 0) {
      validQuestions.forEach(qId => {
        setValidQuest(qId);
      });
    }
    return true;
  }

  inValidQuestions.forEach(q => {
    setInvalidQuest({ id: q.id, errorMsg: q.errorMsg });
  });
  return false;
}
