import { lazy, ComponentType } from "react";

const MIN_DELAY_MS = 400;

function lazyWithDelay<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, MIN_DELAY_MS)),
    ]).then(([module]) => module)
  );
}

export default lazyWithDelay;
