import joiImport from 'joi';
import JoiphoneNumberPlugin from 'joi-phone-number';

const joiPhoneNumber = joiImport.extend(
    JoiphoneNumberPlugin
) as typeof joiImport;

const Joi = joiPhoneNumber;

export default Joi;
