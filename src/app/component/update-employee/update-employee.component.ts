import { Component, Input, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatButtonModule } from "@angular/material/button"
import { CombineComponent } from '../combine/combine.component';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../interfaces/employee';


@Component({
  selector: 'app-update-employee',
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
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  isFormSubmitted:boolean = false;
  customerform:any
  route = inject(ActivatedRoute)
  employee!:Employee
  isEdit:boolean=false
  id!:number
  @Input() data:Employee |null = null;
  toastr=inject(ToastrService)

  countrylist = ['India', 'USA', 'Singapore', 'UK']
  termlist = ['15days', '30days', '45days', '60days']


   constructor(
    private builder: FormBuilder,
    private apiService: ApiServiceService,
    
    ){}

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if(this.id)
    {
        this.isEdit = true
        this.apiService.findRecord(this.id).subscribe(employee=>{
          this.customerform.patchValue(employee)
        })
    }

    this.customerform = this.builder.group({
      name: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(6),
      Validators.maxLength(20)])),
      email: this.builder.control('', Validators.compose([Validators.required,Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)])),
      phone: this.builder.control('', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{10}$/)])),
      country: this.builder.control('', Validators.required),
      address: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(6),
        Validators.maxLength(30)])),
      term: this.builder.control('', Validators.required),
      dob:this.builder.control(new Date(2000,3,25)),
      gender: this.builder.control('Male'),
      is_Active: this.builder.control('true'),
    });
    
  }

  updateRecord():void{
    console.log(this.customerform.value);
    const emp: Employee = {
      name: this.customerform.value.name!,
      email: this.customerform.value.email!,
      phone: this.customerform.value.phone!,
      country: this.customerform.value.country!,
      address: this.customerform.value.address!,
      term: this.customerform.value.term!,
      dob: this.customerform.value.dob!,
      gender: this.customerform.value.gender!,
      is_Active: this.customerform.value.is_Active!,
    };
    
    
      if (this.isEdit) {
       
        this.apiService.updateEmployee(this.id,emp)
        .subscribe({
          next: (res:any) => {
            
            if(res.data)
            {
              this.toastr.success("Record Update successfull", "Success",{
                timeOut: 3000,});
              this.customerform.reset();
              
            }
          }
          });

        }
            else{
  
              error: (e:any) => console.error(e)
              
  
            }
            
            
          }
          clearform() {
            this.isFormSubmitted=false;
            this.customerform?.reset();
          }

          saveRecord()
          {
            const emp: Employee = {
              name: this.customerform.value.name!,
              email: this.customerform.value.email!,
              phone: this.customerform.value.phone!,
              country: this.customerform.value.country!,
              address: this.customerform.value.address!,
              term: this.customerform.value.term!,
              dob: this.customerform.value.dob!,
              gender: this.customerform.value.gender!,
              is_Active: this.customerform.value.is_Active!,
            };
            this.apiService.saveEmployee(emp)
          }

  

}
