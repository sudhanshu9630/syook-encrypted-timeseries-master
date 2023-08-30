const crypto = require('crypto')

function encrypt(text, passkey,iv) {
    const cipher = crypto.createCipheriv('aes-256-ctr', passkey, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}


function decrypt(cypher, passkey,iv) {
  const key = passkey
  const ivk = iv
    const decipher = crypto.createDecipheriv('aes-256-ctr', passkey, iv)
    let decrypted = decipher.update(cypher, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

module.exports ={
  encrypt,
  decrypt
}