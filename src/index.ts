import { useReducer, Reducer, ReducerState, ReducerAction } from "react";

interface ThunkDispatch<TState, TBasicAction extends ReducerAction<any>> {
  <TReturnType>(
    thunkAction: ThunkAction<TReturnType, TState, TBasicAction>
  ): TReturnType;
  <A extends TBasicAction>(action: A): A;
}

export type ThunkAction<
  TReturnType,
  TState,
  TBasicAction extends ReducerAction<any>
> = (
  dispatch: ThunkDispatch<TState, TBasicAction>,
  getState: () => TState
) => TReturnType;

function useThunk<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];
function useThunk<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];
function useThunk<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];

function useThunk<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R> | I | ReducerState<R>,
  initializer?:
    | ((arg: I & ReducerState<R>) => ReducerState<R>)
    | ((arg: I) => ReducerState<R>)
    | undefined
) {
  const [state, dispatch] = useReducer(
    reducer,
    // @ts-ignore
    initializerArg,
    initializer
  );
  const thunkDispatch = (
    action:
      | ReducerAction<R>
      | ThunkAction<any, ReducerState<R>, ReducerAction<R>>
  ) => {
    if (typeof action === "function") {
      return (action as ThunkAction<any, ReducerState<R>, ReducerAction<R>>)(
        dispatch,
        () => state
      );
    }
    dispatch(action);
    return undefined;
  };
  return [state, thunkDispatch] as [typeof state, typeof thunkDispatch];
}

export default useThunk;
