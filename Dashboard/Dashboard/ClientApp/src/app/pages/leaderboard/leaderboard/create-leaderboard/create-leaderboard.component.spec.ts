import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaderboardComponent } from './create-leaderboard.component';

describe('CreateLeaderboardComponent', () => {
  let component: CreateLeaderboardComponent;
  let fixture: ComponentFixture<CreateLeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLeaderboardComponent]
    });
    fixture = TestBed.createComponent(CreateLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
