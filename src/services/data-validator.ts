import { Validator, Schema } from "jsonschema";
const v = new Validator();

export class DataValidator {
  static isValid(schema: any, payload: any): boolean {
    const result = v.validate(payload, schema as Schema);

    if (result.errors.length == 0) return true;

    return false;
  }
}
