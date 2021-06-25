import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Lists } from '../shared/model/lists';
import { User } from '../shared/model/user';
import { ListsService } from '../shared/service/lists.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  public user: User;
  public profilePictureUrl: string;
  public userLists: Lists[];
  public deletedUser: boolean;

  constructor(private activatedRoute: ActivatedRoute, private listsService: ListsService) { }

  ngOnInit(): void {
    this.deletedUser = this.activatedRoute.snapshot.data.user.username.startsWith("deleted");
    this.user = this.activatedRoute.snapshot.data.user;
    this.profilePictureUrl = environment.backend + '/image/' + this.activatedRoute.snapshot.data.user.image.id;
    this.listsService.getCustomListsByUserId(this.activatedRoute.snapshot.data.user.id).subscribe((data) => {
      this.userLists = data;
      console.log(data);
    });
  }
}
