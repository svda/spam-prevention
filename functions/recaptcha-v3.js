const captchaUrl = 'https://www.google.com/recaptcha/api/siteverify'
const captchaSecret = process.env.CAPTCHA_SECRET

let body

exports.handler = function(event, context, callback) {
  // Parse
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.error(error)
    callback(error.message, {
      statusCode: 400,
      body: `[ERROR] Invalid JSON - ${error.message}`
    })
    return
  }

  // Verify
  fetch(captchaUrl, {
    method: 'POST',
    body: JSON.stringify({
      secret: captchaSecret,
      response: body.token,
    }),
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    if(!data.success) {
      callback('Token verification failed', {
        statusCode: 200,
        body: `[BLOCKED] - ${data['error-codes'][0]}`
      })
    }
  })

  // Continue handling the form data
  callback('Success', {
    statusCode: 200,
    body: `[HURRAY] - You've reached the end of the user flow`
  })
}
