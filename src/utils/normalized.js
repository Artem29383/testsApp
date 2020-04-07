import { normalize, schema } from 'normalizr';

export const normalized = (data, schemaValue) => {
  const normalizrSchema = new schema.Entity(schemaValue);
  const schemaReady = [normalizrSchema];
  return normalize(data, schemaReady);
};
