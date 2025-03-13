const serviceTypes = {
  USER_SVC: 'USER_SVC',
  AUTH_SVC: 'AUTH_SVC',
};

export const TYPES = {
  ...serviceTypes,
};

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export type JSONArray = string[] | number[] | boolean[];
