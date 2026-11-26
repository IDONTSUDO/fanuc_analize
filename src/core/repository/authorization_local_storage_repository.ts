import { Result } from "../helper/result";
import type { IUser } from "../model/user";
import { LocalStorageRepository } from "./local_storage_repository";

export class AuthorizationLocalStorageRepository extends LocalStorageRepository {
    getUser = (): Result<any, IUser> =>
        this._getItem<string>("user").map((el) => Result.ok(JSON.parse(el)));
    setUser = (user: IUser) => this._setItem("user", JSON.stringify(user));
    setJwtToken = (token: string) => this._setItem("jwt", token);
    setAuthStatus = (bool: boolean) => this._setItem("auth", String(bool));
    getJwtToken = () => this._getItem<string>("jwt");
    isAuth = () => this._getItem("auth").map((s: any) => Boolean(s));
}