import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by (fill later) 2023
    </span>
    <div class="socials">
      <a href="https://github.com/ah0912784/FitFriendzy" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}

// fb/twitter/linkin links removed from template
// <a href="#" target="_blank" class="ion ion-social-facebook"></a>
// <a href="#" target="_blank" class="ion ion-social-twitter"></a>
// <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
// 