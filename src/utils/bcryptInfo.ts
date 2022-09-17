import bcrypt from 'bcrypt';

export async function cryptInfo(info: string) {
    const saltRounds = 10;
    const hash: string = bcrypt.hashSync(info, saltRounds);
    return hash;
}

export async function descryptInfo(info: string, hash: string) {
    return bcrypt.compareSync(info, hash);
}
