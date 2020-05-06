import useAction from 'hooks/useAction';
import { setValidQuestion } from 'models/test/reducer';

const useCheckChangeQuest = (id, errorMsg) => {
  const setValidQuest = useAction(setValidQuestion);

  return length => {
    if (errorMsg && length > 1) {
      setValidQuest(id);
    }
  };
};

export default useCheckChangeQuest;
