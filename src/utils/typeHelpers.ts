import { Maybe } from "../types";

export const isSome = <T>(some: Maybe<T>): some is T => some !== null;

export const isSomeDefined = <T>(some?: Maybe<T>): some is T =>
  some !== undefined && isSome(some);
