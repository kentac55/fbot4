export type Component<P, R, T = undefined> = P extends T
  ? () => R
  : (props: P) => R
