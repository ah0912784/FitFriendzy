import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b>FitFriendzy</b> 2023 &#169;
    </span>
    <div class="socials">
      <a href="https://github.com/ah0912784/FitFriendzy" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
