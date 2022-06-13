import bcrypt from 'bcrypt'
const saltRounds = 13

export async function convertPasswordToBcrypt(pass: string) {
    const passwordEncrypted = await bcrypt.hash(pass, saltRounds)
    return passwordEncrypted
}