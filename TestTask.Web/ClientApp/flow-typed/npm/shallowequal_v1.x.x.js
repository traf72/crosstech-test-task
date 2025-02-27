declare module 'shallowequal' {
    declare module.exports: <T, U>(
      objA?: ?T,
      objB?: ?U,
      compare?: ?(objValue: any, otherValue: any, key?: string) => boolean | void,
      compareContext?: ?any
    ) => boolean;
}
