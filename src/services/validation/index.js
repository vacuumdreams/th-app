import * as yup from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

yup.addMethod(yup.string, 'phone', function (message) {
  return this.test({
    name: 'phone',
    exclusive: true,
    message,
    test: (value) => {
      if (value === '') {
        return true
      }
      try {
        return parsePhoneNumberFromString(value).isValid()
      } catch (err) {
        return false
      }
    }
  })
})

export default yup
