import { questionVariable } from 'styles/constants';

export function testResult(answers, ids, userAnswers) {
  let countsCorrectAnswers = 0;
  ids.forEach(id => {
    if (userAnswers[id].type === questionVariable.one) {
      const [answer] = userAnswers[id].userAnswer;
      if (answers[id].answer.entities[answer].isChecked) {
        countsCorrectAnswers += 1;
      }
    }
    if (userAnswers[id].type === questionVariable.number) {
      const [answer] = userAnswers[id].userAnswer;
      if (
        answer ===
        answers[id].answer.entities[userAnswers[id].userAnswer[1]].value
      ) {
        countsCorrectAnswers += 1;
      }
    }
    if (userAnswers[id].type === questionVariable.some) {
      const answer = userAnswers[id].userAnswer;
      const isTrue = answer.every(
        res => answers[id].answer.entities[res].isChecked
      );
      if (isTrue) {
        countsCorrectAnswers += 1;
      }
    }
  });
  return countsCorrectAnswers;
}
