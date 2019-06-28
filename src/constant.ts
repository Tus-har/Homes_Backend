export const saltRounds = 10 ;
export const privateKey = "qwertyuioplkjhgfdsazxcvbnm0987654321" ;
export const JWT_EXPIRATION_SECONDS = 60 * 60 * 24 ;
export enum Message {
    EMAIL_ALREADY_IN_USE = "This email is already in use",
    HOME_UPDATED = "Home updated",
    INVALID_PHONE_NUMBER = "Invalid Phone number",
    NO_PERMISSIONS = "No permission",
    HOME_NOT_FOUND = "Home not found",
    INVALID_EMAIL = "Invalid Email",
    USER_NOT_FOUND = "User not found",
    HOME_CREATED = "Home created",
    INVALID_CREDENTIALS = "Invalid Credentials",
    SIGN_UP_SUCCESSFUL_MESSAGE = "Sign up Successful",
    ACCESS_GRANTED= "Access Granted",
    UNAUTHORIZED_ACCESS = "Unauthorized access",
    AUTHENTICATION_TOKEN_EXPIRED = "Authentication token expired",
}
