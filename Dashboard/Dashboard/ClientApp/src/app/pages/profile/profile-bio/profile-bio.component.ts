import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-profile-bio',
  templateUrl: './profile-bio.component.html',
  styleUrls: ['./profile-bio.component.scss'],
})
export class ProfileBioComponent {
  @Input() name: string;
  @Input() bio: string;
  @Output() updateBio: EventEmitter<string> = new EventEmitter<string>();
  isEditing = false;

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }
  saveBio() {
    this.updateBio.emit(this.bio);
    this.toggleEditMode();
  }
}
