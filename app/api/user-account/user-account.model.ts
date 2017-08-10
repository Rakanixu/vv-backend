export interface UserAccount {
    id?: number;
    principal_id?: number;
    role_id?: number;
    username?: string;
    email?: string;
    password?: string;
    created_at?: number;
    updated_at?: number;
    language?: string;
    last_login_at?: number;
    last_login_ip?: string;
    last_activity_at?: number;
    last_logout_at?: number;
    deleted_at?: number;
    avatar?: string;
    timezone?: string;
    activation_token?: string;
    activation_date?: string;
    forget_password_token?: string;
}
