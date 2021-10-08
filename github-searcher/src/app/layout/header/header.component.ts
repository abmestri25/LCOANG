import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email = null;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    auth.getUser().subscribe(
      (user) => {
        this.email = user?.email;
      },
      (err) => {
        this.toastr.error(err.status, 'Something Went Wrong !');
      }
    );
  }

  ngOnInit(): void {}

  async handleSignOut() {
    try {
      const res = await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login Again to Continue');
      this.email = null;
    } catch (error) {
      console.log(error.message);
      this.toastr.error('Something is wrong !');
    }
  }
}
