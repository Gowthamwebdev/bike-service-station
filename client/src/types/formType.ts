export interface FormState {
    email: string;
    password: string;
}

export interface ErrorState {
    name?: string;
    password?: string;
    api?: string;
}