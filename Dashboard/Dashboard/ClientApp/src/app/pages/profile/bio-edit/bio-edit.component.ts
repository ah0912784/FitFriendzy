import { Component, Output, EventEmitter } from '@angular/core';
import { ProfileBioComponent } from '../profile-bio/profile-bio.component';

@Component({
  selector: 'ngx-bio-edit',
  templateUrl: './bio-edit.component.html',
})
export class BioEditComponent extends ProfileBioComponent {
  @Output() updateBio: EventEmitter<string> = new EventEmitter<string>();
  private new_bio;
  saveBio() {
    const user_input = document.getElementById('ta_input') as HTMLInputElement;
    this.new_bio = user_input;
    this.updateBio.emit(this.new_bio);
    this.toggleEditMode();
  }
}
