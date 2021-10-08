import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() post;
  faThumbsUp = faThumbsUp
  faThumbsDown = faThumbsDown
  faShareSquare = faShareSquare
  uid = null;
  upvote = 0;
  downvote = 0;

  constructor(
    private db:AngularFireDatabase,
    private auth:AuthService
  ) { 
    auth.getUser().subscribe((user) => {
      this.uid  = user?.uid
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    if(this.post.vote){
      Object.values(this.post.vote).map((val:any) => {
        if(val.upvote){
          this.upvote += 1
        }
        if(val.downvote){
          this.downvote += 1
        }
      })
    }
  }

  upvotePost(){
    console.log("UPVOTING");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`)
    .set({
      upvote : 1, 
    })
  }

  downvotePost(){
    console.log("DOWNVOTING");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`)
    .set({
      downvote : 1, 
    })
  }

  getInstaURL(){
    return `https://instagram.com/${this.post.instaId}`
  }

}
