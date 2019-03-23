// flow-typed signature: f5c8ded4091b25e23bc26e943c13b429
// flow-typed version: 6a3fe49a8b/history_v4.x.x/flow_>=v0.25.x

declare module "history/createBrowserHistory" {
  declare function Unblock(): void;

  declare export type Action = "PUSH" | "REPLACE" | "POP";

  declare export type BrowserLocation = {
    pathname: string,
    search: string,
    hash: string,
    // Browser and Memory specific
    state: {},
    key: string,
  };

  declare interface IBrowserHistory {
    length: number,
    location: BrowserLocation,
    action: Action,
    push(path: string, state?: {}): void,
    push(location: $Shape<BrowserLocation>): void,
    replace(path: string, state?: {}): void,
    replace(location: $Shape<BrowserLocation>): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    listen: Function,
    block(message: string): typeof Unblock,
    block((location: BrowserLocation, action: Action) => string): typeof Unblock,
  }

  declare export type BrowserHistory = IBrowserHistory;

  declare type HistoryOpts = {
    basename?: string,
    forceRefresh?: boolean,
    getUserConfirmation?: (
      message: string,
      callback: (willContinue: boolean) => void,
    ) => void,
  };

  declare export default (opts?: HistoryOpts) => BrowserHistory;
}
