const fetch = require('node-fetch')

const config = {
  url: 'https://www.google.com/recaptcha/api/siteverify',
  secret: process.env.CAPTCHA_SECRET,
}

exports.handler = function(event, context, callback) {
  try {
    const body = JSON.parse(event.body)

    // Verify
    fetch(`${config.url}?secret=${config.secret}&response=${body.token}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      if(!data.success) {
        callback('Token verification failed', {
          statusCode: 200,
          body: `[BLOCKED] - ${data['error-codes'][0]}`
        })
        return
      }

      // Continue here
      callback('Success', {
        statusCode: 200,
        body: `[HURRAY] - You've reached the end of the user flow`
      })
    })
  } catch (error) {
    console.error(error)
    callback(error.message, {
      statusCode: 400,
      body: `[ERROR] Invalid JSON - ${error.message}`
    })
    return
  }
}
