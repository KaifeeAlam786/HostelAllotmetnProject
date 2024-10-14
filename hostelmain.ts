import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule,MatTableModule,MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HostelAllotment';
  studentForm!: FormGroup; 

  student:any=[];
  hostelData:boolean=false;
  name:string="";
  gender: any="";
  selectedHostel: any; 
  

  paging:any;
  dataSource = new MatTableDataSource<any>(this.student);
  displayedColumns:string[]=['sno','sname','gender','address','allotment'];

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  

  
//Hostel Details
  hostelDatails = [
    { name: 'Hostel 1', totalOccupancy: 10, occupancyCount: 0, type: 'M' },
    { name: 'Hostel 2', totalOccupancy: 10, occupancyCount: 0, type: 'F' },
    { name: 'Hostel 3', totalOccupancy: 10, occupancyCount: 0, type: 'T' },
  ];

  constructor(private fb:FormBuilder){

  }

  ngOnInit(paginator:MatPaginator){
    this.studentForm=this.fb.group({
      sname:['',Validators.required],
      gender:['',Validators.required],
      address:['',Validators.required]
      
      
    })
    this.paging=paginator;

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  //save click
  save() {
    
    const newStudent = {
      ...this.studentForm.value,
      allottedHostel: null // Initialize with no hostel allotted
    };
    
    this.student.push(newStudent);
    this.dataSource.data = this.student;
    this.studentForm.reset();
  }
  

  //Allot click
  AllotClick(data:any){
    
   this.hostelData=true
   this.name=data.sname
   this.gender=data.gender
   
  }


//Selected Hostel
SelectedHostel(hostel: any) {
  if (hostel.type === this.gender) {
    this.selectedHostel = hostel;
  } else {
    alert("Gender not Match");
    this.selectedHostel = null; 
  }
}


//Increase Occupancy Count
incrementOccupancy() {
  if (this.selectedHostel) {
        if (this.selectedHostel.occupancyCount < this.selectedHostel.totalOccupancy) {
      this.selectedHostel.occupancyCount++;

      const studentIndex = this.student.findIndex((s: any) => s.sname === this.name && s.gender === this.gender);
      if (studentIndex !== -1) {
        this.student[studentIndex].allottedHostel = this.selectedHostel.name; 
      }

      alert('hostel allotted');
      this.hostelData = false; 
    } else {
      alert('Room is full');
    }
  } else {
    alert('Please select a valid hostel');
  }
}
}
