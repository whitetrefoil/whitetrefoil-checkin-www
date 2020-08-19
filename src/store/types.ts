import { ActionType, PayloadAction, PayloadActionCreator } from 'typesafe-actions'


declare global {
  type RootAction =
    |ActionType<typeof import('./checkin/actions')>
    |ActionType<typeof import('./geo/actions')>
    |ActionType<typeof import('./history/actions')>
    |ActionType<typeof import('./session/actions')>
    // |ActionType<typeof import('./loading/actions')>
    // |ActionType<typeof import('./message/actions')>
    |ActionType<typeof import('~/features/list/actions')>
    // |ActionType<typeof import('~/features/detail/actions')>
    |ActionType<typeof import('~/features/search/actions')>


  interface RootState {
    checkin: import('./checkin/reducer').State
    geo: import('./geo/reducer').State
    history: import('./history/reducer').State
    session: import('./session/reducer').State
    // loading: import('./loading/reducer').State;
    // message: import('./message/reducer').State;
    list: import('~/features/list/reducer').State
    // detail: import('~/features/detail/reducer').State;
    search: import('~/features/search/reducer').State
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type PA<T> = PayloadAction<string, T>
  export type PAC<T> = PayloadActionCreator<string, T>
}
// export type AnyA<R = any> = RootAction|ThunkA<R>;
// export type AnyAC<R = any> = ThunkAC<R>|((...args: any[]) => RootAction);

// export type ThunkD = ThunkDispatch<RootState, void, RootAction>;


declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
  }

  export type NoMeta<T> = [T, never]
}
