import { Reducer, ReducerState, ReducerAction } from "react";
interface ThunkDispatch<TState, TBasicAction extends ReducerAction<any>> {
    <TReturnType>(thunkAction: ThunkAction<TReturnType, TState, TBasicAction>): TReturnType;
    <A extends TBasicAction>(action: A): A;
}
export declare type ThunkAction<TReturnType, TState, TBasicAction extends ReducerAction<any>> = (dispatch: ThunkDispatch<TState, TBasicAction>, getState: () => TState) => TReturnType;
declare function useThunk<R extends Reducer<any, any>, I>(reducer: R, initializerArg: I & ReducerState<R>, initializer: (arg: I & ReducerState<R>) => ReducerState<R>): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];
declare function useThunk<R extends Reducer<any, any>, I>(reducer: R, initializerArg: I, initializer: (arg: I) => ReducerState<R>): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];
declare function useThunk<R extends Reducer<any, any>>(reducer: R, initialState: ReducerState<R>, initializer?: undefined): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>];
export default useThunk;
//# sourceMappingURL=index.d.ts.map