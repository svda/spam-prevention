const captchaUrl = 'https://www.google.com/recaptcha/api/siteverify'
const captchaSecret = process.env.CAPTCHA_SECRET

exports.handler = function(event, context, callback) {
  // Parse
  try {
    const body = JSON.parse(event.body)
    callback(null, {
      statusCode: 200,
      body,
    })
  } catch (error) {
      console.error(error)
    callback(error.message, {
      statusCode: 400,
      body: `[ERROR] Invalid JSON - ${error.message}`
    })
    return
  }

  // Verify
  try {
    const body = parse
    fetch(captchaUrl, {
      method: 'POST',
      body,
    })

  } catch (error) {
    console.error(error)
    callback(error.message, {
      statusCode: 200,
      body: `[BLOCKED] Invalid token`
    })
    return
  }
}
