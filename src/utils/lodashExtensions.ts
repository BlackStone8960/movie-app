import { isNull, isUndefined } from "lodash";

export const isNullOrUndefined = (value: any) => {
  return isUndefined(value) || isNull(value);
};

// export const toSafeIntOrDefault = (
//   value: any,
//   def: number | undefined
// ): number | undefined => {
//   try {
//     return toSafeInteger(value)
//   } catch {
//     return def
//   }
// }

// export const valueOrUndefined = (value: any) => {
//   return isNullOrUndefined(value) ? undefined : value
// }
