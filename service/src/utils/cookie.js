export const setSessionCookie = (res, token) => {
  return res.cookie('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  })
}

export const clearSessionCookie = (res) => {
  return res.clearCookie('session', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  })
}
