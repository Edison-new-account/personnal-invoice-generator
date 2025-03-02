export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  TIME = "time",
}

export type GenericComplexType =
  | string[]
  | number[]
  | Date[]
  | boolean[]
  | GenericObject[]
  | GenericObject;

export type GenericNullableType = null | undefined;
export type GenericType = string | number | Date | boolean;
export interface GenericObject extends Record<string, unknown> {
  [key: string]: GenericType | GenericComplexType | GenericNullableType;
}
