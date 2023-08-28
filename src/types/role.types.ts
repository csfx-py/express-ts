export enum RolesEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IRole {
    [key: string]: RolesEnum;
}
