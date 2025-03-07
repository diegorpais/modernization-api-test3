import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private users: Map<number, string> = new Map();
  private currentId: number = 1;

  constructor() { }

  createUser(userName: string): Observable<number> {
    const id = this.currentId++;
    this.users.set(id, userName);
    return of(id).pipe(delay(500));
  }

  getUserNameById(id: number): Observable<string> {
    const name = this.users.get(id) || "User";
    return of(name).pipe(delay(500));
  }
}
