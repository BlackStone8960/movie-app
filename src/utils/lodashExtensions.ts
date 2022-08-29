import { isNull, isUndefined } from "lodash";

// Check if the passed value is null or undefined
export const isNullOrUndefined = (value: any) =>
  isUndefined(value) || isNull(value);
