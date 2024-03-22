import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { CombineComponent } from '../combine/combine.component';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CombineComponent,

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  toastr = inject(ToastrService)
  isFormSubmitted: boolean = false;
  customerform: any
  constructor(
    private builder: FormBuilder,
    private apiService: ApiServiceService,

  ) {

  }
  ngOnInit(): void {

    this.customerform = this.builder.group({
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6),
      Validators.maxLength(20)])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)])),
      phone: this.builder.control('', Validators.compose([Validators.required, Validators.pattern(/^\+?\d{10}$/)])),
      country: this.builder.control('', Validators.required),
      address: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6),
      Validators.maxLength(30)])),
      term: this.builder.control('', Validators.required),
      dob: this.builder.control(new Date(2000, 3, 25)),
      gender: this.builder.control('Male'),
      is_Active: this.builder.control('true'),
    });

  }

  countrylist = ['India', 'USA', 'Singapore', 'UK']
  termlist = ['15days', '30days', '45days', '60days']

  get f(): { [key: string]: AbstractControl } {
    return this.customerform.controls;
  }
  onSubmit(): void {
    if (!this.customerform.valid) {
      this.customerform.markAllAsTouched();
      this.isFormSubmitted = false;
      console.log("first");
    }
    else {
      this.apiService.saveEmployee(this.customerform.value)
        .subscribe({
          next: (res: any) => {
            if (res.data) {

              this.customerform.reset();
              console.log(res);
              this.customerform.valid
              this.isFormSubmitted = true;
              this.toastr.success("Record save successfull", "Success", {
                timeOut: 3000,
              });
              this.customerform?.reset();
            }
            else {

              error: (e: any) => console.error(e)
            
            }


          },
          error: (e: any) => console.error(e)
        });
    }
    // if (this.customerform.invalid) {
    //   return;
    // }
  }

  clearform() {
    this.isFormSubmitted = false;
    this.customerform?.reset();
  }

}
