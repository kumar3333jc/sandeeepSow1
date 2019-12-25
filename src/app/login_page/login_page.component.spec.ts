import { TestBed, async } from '@angular/core/testing';
import { login_pageComponent } from './login_page.component';

describe('login_pageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        login_pageComponent
      ],
    }).compileComponents();
  }));

  it('should create the login_page component', () => {
    const fixture = TestBed.createComponent(login_pageComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
