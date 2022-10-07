export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
  }

export interface UserAction<T> {
    UsersData: Array<Array<string>>;
    addUser(refer: any): void;
    buttons(e: T): void;
    removeTr(e: T): void;
  }

// export {Role,UserAction};