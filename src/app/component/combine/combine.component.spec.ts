import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineComponent } from './combine.component';

describe('CombineComponent', () => {
  let component: CombineComponent;
  let fixture: ComponentFixture<CombineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
