import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_services/api/auth.service";
import { ConfirmService } from "src/app/_services/helpers/confirm.service";
import { GeneralService } from "src/app/_services/general.service";
import { LocalizationService } from "src/app/_services/helpers/localization.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() moduleName = "";
  showIcon = false as boolean;
  user = {} as any;
  constructor(
    public generalService: GeneralService,
    private confirmService: ConfirmService,
    private localization: LocalizationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generalService.userEvent.subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  toggleSideBar(): void {
    this.generalService.toggleSideBar();
  }
  show(): void {
    this.showIcon = true;
  }

  hide(): void {
    setTimeout(() => {
      this.showIcon = false;
    }, 200);
  }
  module(): string {
    return this.localization.translate(`${this.moduleName}.title`);
  }

  showProfile(): void {
    (document.getElementById("profile") as HTMLDivElement).focus();
  }

  async logout(): Promise<void> {
    this.confirmService.setConfirm({
      accept: () => {
        this.authService.logout().subscribe(() => {
          localStorage.removeItem("credentials");
          this.router.navigateByUrl("/auth");
        });
      },
      title: "Logout!",
      message: "Are you sure you want to exit?",
    });
  }
}
