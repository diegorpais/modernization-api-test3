import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  userName: string = "";

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(): void {
    if (!this.userName) {
      return;
    }
    this.userService.createUser(this.userName).subscribe((id: number) => {
      this.router.navigate(["/welcome", id]);
    });
  }
}
