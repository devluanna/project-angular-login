import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuNavbarComponent } from './submenu-navbar.component';

describe('SubmenuNavbarComponent', () => {
  let component: SubmenuNavbarComponent;
  let fixture: ComponentFixture<SubmenuNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmenuNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
