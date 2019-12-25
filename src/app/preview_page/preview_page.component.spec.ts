import { TestBed, async } from '@angular/core/testing';
import { preview_pageComponent } from './preview_page.component';

describe('preview_pageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        preview_pageComponent
      ],
    }).compileComponents();
  }));

  it('should create the preview_page component', () => {
    const fixture = TestBed.createComponent(preview_pageComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
