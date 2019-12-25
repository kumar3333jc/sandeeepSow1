import { TestBed, async } from '@angular/core/testing';
import { Landing_pageComponent } from './Landing_page.component';

describe('Landing_pageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Landing_pageComponent
      ],
    }).compileComponents();
  }));

  it('should create the Landing_page component', () => {
    const fixture = TestBed.createComponent(Landing_pageComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
