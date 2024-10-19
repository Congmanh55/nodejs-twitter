export enum UserVerifyStatus {
    Unverified, // chua xac thuc email, mac dinh = 0
    Verified,// da xac thuc email
    Banned // bi khoa
}

export enum TokenType {
    AccessToken,
    RefreshToken,
    ForgotPasswordToken,
    EmailVerifyToken
}