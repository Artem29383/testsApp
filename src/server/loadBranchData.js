import { all, fork, join } from 'redux-saga/effects';

export default (store, branch) => {
  const sagas = branch.reduce(
    (acc, { route: { sagasToRun }, match: { params } }) => {
      if (sagasToRun) {
        return acc.concat(
          sagasToRun.map(saga => {
            if (Array.isArray(saga)) {
              return saga[0].bind(null, saga[1](params));
            }

            return saga;
          })
        );
      }

      return acc;
    },
    []
  );

  return store
    .runSaga(function* runSagas() {
      const tasks = yield all(sagas.map(saga => fork(saga)));
      yield all(tasks.map(task => join(task)));
    })
    .toPromise();
};
