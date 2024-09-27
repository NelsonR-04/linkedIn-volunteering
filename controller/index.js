import fetch from "node-fetch"
import QRCode from 'qrcode'

const getLinkedInProfileInfo = async (req, res) => {
  try {
    const url = new URL("https://www.linkedin.com/oauth/v2/authorization")

    url.searchParams.append("client_id", process.env.LINKEDIN_CLIENT_ID)
    url.searchParams.append("response_type", "code")
    url.searchParams.append("redirect_uri", `${process.env.API_BASE_URL}/add-linkedin-volunteering`)
    url.searchParams.append("scope", "profile email openid")

    res.redirect(url)
  } catch (error) {
    console.log(error)
  }
}

const getLinkedInProfileData = async (req, res) => {
  try {
    const { code } = req.query
    
    if (code) {
      const url = new URL('https://www.linkedin.com/oauth/v2/accessToken')
      // const url = new URL('https://api.linkedin.com/rest/')
      url.searchParams.append("grant_type", 'authorization_code')
      url.searchParams.append("client_id", process.env.LINKEDIN_CLIENT_ID)
      url.searchParams.append("client_secret", process.env.LINKEDIN_CLIENT_SECRET)
      url.searchParams.append("redirect_uri", `${process.env.API_BASE_URL}/add-linkedin-volunteering`)
      url.searchParams.append("code", code)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'LinkedIn-Version': '202409',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      const { access_token } = await response.json()
      // res.send(access_token)

      if (access_token) {
        const profileUrl = new URL('https://api.linkedin.com/v2/userinfo')

        const resp = await fetch(profileUrl, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        const { sub } = await resp.json()

        const peopleUrl = new URL(`https://api.linkedin.com/v2/people/id=${sub}/volunteeringExperiences`)
        const responseP = await fetch(peopleUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        const dataP = await responseP.json()
        console.log(dataP)
        res.send({dataP})
      }
    } else {
      res.send(res)
      
      const res = await fetch()
    }

    // const response = await fetch(url)

    // const data = await response.json()
    // console.log(data)
    // return data
  } catch (error) {
    console.log(error)
  }
}

const getLinkedInProfile = async (req, res) => {
  try {
    res.send(res)
  } catch (error) {
    console.log(error)
  }
}

const generateQR = async (req, res) => {
  try {
    const url = `${process.env.API_BASE_URL}`;
    const qrCodeImage = await QRCode.toDataURL(url);
    res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
}

export { getLinkedInProfileInfo, getLinkedInProfileData, getLinkedInProfile, generateQR }