import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.apiUrl+"/api/users")
    }

    getUserById(id: number): Observable<User>{
        return this.http.get<User>(this.apiUrl+`${this.apiUrl}/api/users/${id}`)
    }

    createUser(user: FormData): Observable<any>{
        return this.http.post(this.apiUrl+"/api/users", user)
    }

    updateUser(id: number, user: FormData): Observable<any>{
        return this.http.put(`${this.apiUrl}/api/users/${id}`, user)
    }

    deleteUser(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/users/${id}`)
    }
}