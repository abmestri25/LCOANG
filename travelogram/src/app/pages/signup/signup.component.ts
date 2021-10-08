import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// angular form
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
// services
import { AuthService } from 'src/app/services/auth.service';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

// browser image resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imgConfig } from 'src/utils/Config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  picture: string = "https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1506810-1278719.png";

  uploadPercent: number = null;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password, name, username, country, bio } = f.form.value;
    // further sanitization do here

    this.auth
      .signUp(email, password)
      .then((res) => {
        console.log(res);
        const { uid } = res.user;

        this.db.object(`/users/${uid}`).set({
          id: uid,
          name: name,
          email: email,
          instaUsername: username,
          country: country,
          bio: bio,
          picture: this.picture,
        });
      })
      .then(() => {
        this.router.navigateByUrl('/signin');
        this.toastr.success('Signup Successful !');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error.message,"",{
          closeButton:true
        })
      });
  }

  async uploadFile(event) {
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file, imgConfig);

    // rename image with uuid
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, resizedImage);

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.toastr.success('Image Uploaded Successfully');
        });
      })
    ).subscribe();
  }
}
