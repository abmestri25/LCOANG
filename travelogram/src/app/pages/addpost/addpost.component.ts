import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// angular form
import { finalize } from 'rxjs/operators';
// services
import { AuthService } from 'src/app/services/auth.service';

// firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

// browser image resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imgConfig } from 'src/utils/Config';

// uuid
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  locationName: string;
  description: string;
  picture: string;
  user = null;
  uploadPercent: number = null;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.getUser().subscribe((user) => {
      this.db
        .object(`/users/${user.uid}`)
        .valueChanges()
        .subscribe((user) => {
          this.user = user;
        });
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const uid = uuidv4();

    this.db
      .object(`/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaUsername,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success('Post Added Successfully.');
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }

  async uploadFile(event) {
    const file = event.target.files[0];
console.log(file);

    let resizedImg = await readAndCompressImage(file, imgConfig);
    // 
    const filePath = uuidv4();
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, resizedImg);

    task.percentageChanges().subscribe((percent) => {
      this.uploadPercent = percent;
    });

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.picture = url;
            this.toastr.success('Image Uploaded Successfully');
          });
        })
      )
      .subscribe();
  }
}
