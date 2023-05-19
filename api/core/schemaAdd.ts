import Ajv from 'ajv';

export const checkSchema = (schema:any,data:any) =>{
// Define your custom credential type
console.log(schema)
var schemaType:any ={};
for(var i=0;i<schema.length;i++){
    schemaType[schema[i]]={type:'string'}
}
// console.log(schemaType)
// Define your JSON Schema
const credentialSchema= {
  type: 'object',
  properties: schemaType,
  required: schema,
};

// Create an instance of the Ajv validator
const ajv = new Ajv();
const validate = ajv.compile(credentialSchema);
const isValid = validate(data);
if (isValid) {
  console.log('Credential is valid');
} else {
  console.log('Credential is invalid:', validate.errors);
}
}
