import { TestBed, async } from '@angular/core/testing';
import { Index_PageComponent } from './Index_Page.component';

describe('Index_PageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Index_PageComponent
      ],
    }).compileComponents();
  }));

  it('should create the Index_Page component', () => {
    const fixture = TestBed.createComponent(Index_PageComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
