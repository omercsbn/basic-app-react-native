const { parsePhoneNumberFromString, getCountryCallingCode } = require('libphonenumber-js');

function isValidCepTelefonuNumarasi(phoneNumber, countryCode = 'TR') {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, countryCode);
  
  if(phoneNumberObj && phoneNumberObj.country) {
    const country = phoneNumberObj.country;
    const formattedNumber = phoneNumberObj.formatInternational();
    const isValid = country === countryCode && phoneNumberObj.isValid();

    return {
      isValid: isValid,
      countryCode: '+' + getCountryCallingCode(country),
      country: country,
      formattedNumber
    }
  } else {
    return {
      isValid: false,
      countryCode: null,
      country: null,
      formattedNumber: null
    }
  }
}

module.exports = isValidCepTelefonuNumarasi;
