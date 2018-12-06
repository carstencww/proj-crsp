import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UseractionService, AuthService } from '../_services';
import { EventComment, Event, User, Comment } from '../_models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  comments: Comment[] = [];
  event: Event = null;
  eventid: number;
  currentusercomment = '';
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private useractionservice: UseractionService,
    private authservice: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventid = params.id;
      this.useractionservice.Event$.subscribe(data => {
        if (!data) { return; }
        for ( const e in data ) {
          if (data[e].program_id === Number(params.id)) {
            this.event = data[e];
            break;
          }
        }
      });
      this.useractionservice
        .getcomment(Number(params.id))
        .subscribe(data => {
          console.log(data);
          if (data === null) {this.comments = []; }
          if (!data) {return; }
          this.comments = data.eventcomments;

        });
    });

    console.log(this.eventid);

  }

  gotoevents() {
    this.router.navigate(['/home/eventslist']);
  }

  onSubmit(f: NgForm) {
    this.useractionservice.leavecomment( this.authservice.loginObject.username  , this.eventid , this.currentusercomment)
    .subscribe( data => {
      if (data.program_id) {
        this.comments = data.eventcomments;
        f.resetForm();
        this.currentusercomment = '';
       }
    });
  }

}
