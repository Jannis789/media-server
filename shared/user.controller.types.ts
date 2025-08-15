// POST -> /User/registration
interface CreateUserResponse {
    status: number;
    message: string;
    data?: {
        session: string;
        expiresAt: Date;
        role: string;
    };
}
// POST -> /User/login
interface LoginUserResponse {
    status: number;
    message: string;
    data?: {
        session: string;
        expiresAt: Date;
    };
}

enum UserPath {
    Registration = "/User/registration",
    Login = "/User/login",
}

export { CreateUserResponse, LoginUserResponse, UserPath };