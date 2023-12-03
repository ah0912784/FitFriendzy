import { Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-profile-bio',
  templateUrl: './profile-bio.component.html',
  styleUrls: ['./profile-bio.component.scss'],
})
export class ProfileBioComponent {
  @Input() name: string;
  @Input() bio: string;
  isEditing = false;

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }
  changeBio(newBio) {
    this.bio = newBio;
  }
}
