import { Component, Input } from '@angular/core';


@Component({
  selector: 'ngx-profile-bio',
  templateUrl: './profile-bio.component.html',
})
export class ProfileBioComponent {
  @Input() public name: string;
  @Input() public bio: string;

  isEditing = false;

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }
  updateBio(newBio: string): void  {
    this.bio = newBio;
  }
}
