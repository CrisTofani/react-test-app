import { Maybe } from "../types";

export const isSome = <T>(some: Maybe<T>): some is T => some !== null;
