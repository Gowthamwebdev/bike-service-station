export interface FormState {
    email: string;
    password: string;
}

export interface ErrorState {
    email?: string;
    password?: string;
    api?: string;
}