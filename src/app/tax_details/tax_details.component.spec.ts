import { TestBed, async } from '@angular/core/testing';
import { tax_detailsComponent } from './tax_details.component';

describe('tax_detailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        tax_detailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the tax_details component', () => {
    const fixture = TestBed.createComponent(tax_detailsComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
