import useSelector from 'hooks/useSelector';
import { getQuestionErrorMsg } from 'models/test/selectors';
import useAction from 'hooks/useAction';
import { setValidQuestion } from 'models/test/reducer';

const useCheckChangeQuest = id => {
  const errorMsg = useSelector(getQuestionErrorMsg, id);
  const setValidQuest = useAction(setValidQuestion);

  return length => {
    if (errorMsg && length > 1) {
      setValidQuest(id);
    }
  };
};

export default useCheckChangeQuest;
