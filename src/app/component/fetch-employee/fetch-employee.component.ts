import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Employee } from '../../interfaces/employee';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-fetch-employee',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './fetch-employee.component.html',
  styleUrl: './fetch-employee.component.css'
})


export class FetchEmployeeComponent implements OnInit, AfterViewInit {

  search: string = '';
   router = inject(Router); 
   toastr=inject(ToastrService)
  displayedColumns: string[] = ['Id', 'Name', 'Address', 'Email','Contact','Country','Term','Dob','Active','Action'];
  public emp:Employee[] = [];
  ELEMENT_DATA:Employee[]=[];
  dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //dataSource:Employee[] = [];
 
  employee!:Employee;
  id!:number
 
  constructor(private apiService:ApiServiceService,private _liveAnnouncer: LiveAnnouncer )
  {

  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.allRecord();
  }

  allRecord()
  {
    
    this.apiService.fetchRecord().subscribe({
      next:(employee:Employee[])=>{

        this.emp = employee;
        this.dataSource.data=employee
        
            
      },

      error: (e)=> console.log("....",e)
    })
    
  }

  updateRecord(id: number) {
    
    this.router.navigateByUrl('/employee/update/' + id);
    
  }

   deleteRecord(id: number) {
    this.apiService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.toastr.success("Record Deleted successfull", "Success",{
          timeOut: 3000,});
        this.allRecord();
      },

      error: (e)=> console.log("....",e)
    });
  }

  warning(id: number){

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete the record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Record has been deleted.",
          icon: "success",   

        });

        this.deleteRecord(id);
        
      }
    });
  }

 editWarning(id: number){

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Modify it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateRecord(id);
        
      }
    });

  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(value: any) {
    this.dataSource.filter = this.search;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}import { HeaderComponent } from '../header/header.component';

