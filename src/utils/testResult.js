import { questionVariable } from 'styles/constants';

export function testResult(answers, ids, userAnswers) {
  const invalidQuest = [];
  ids.forEach(id => {
    if (userAnswers[id]) {
      if (userAnswers[id].type !== questionVariable.some) {
        const isValid = !!userAnswers[id].answer[0];
        if (!isValid) {
          invalidQuest.push(id);
        }
      } else {
        const isValid = !!Object.keys(userAnswers[id].answer).length;
        if (!isValid) {
          invalidQuest.push(id);
        }
      }
    } else {
      invalidQuest.push(id);
    }
  });

  if (invalidQuest.length === 0) {
    let countsCorrectAnswers = 0;
    ids.forEach(id => {
      if (userAnswers[id]) {
        if (userAnswers[id].type === questionVariable.one) {
          const [answer] = userAnswers[id].answer;
          if (answers[id].answer.entities[answer].isChecked) {
            countsCorrectAnswers += 1;
          }
        }
        if (userAnswers[id].type === questionVariable.number) {
          const [answer, nId] = userAnswers[id].answer;
          if (answer === answers[id].answer.entities[nId].value) {
            countsCorrectAnswers += 1;
          }
        }
        if (userAnswers[id].type === questionVariable.some) {
          let isTrue = false;
          const answer = Object.keys(userAnswers[id].answer);
          const trueAnswersLength = answers[id].answer.ids.filter(
            tId => answers[id].answer.entities[tId].isChecked
          );
          if (trueAnswersLength.length === answer.length) {
            isTrue = answer.every(
              res => answers[id].answer.entities[res].isChecked
            );
          }
          if (isTrue) {
            countsCorrectAnswers += 1;
          }
        }
      }
    });
    return countsCorrectAnswers;
  }
  return invalidQuest;
}
