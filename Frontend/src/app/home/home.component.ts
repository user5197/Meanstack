import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'doctorname','speciality' ,'fee', 'age','patientName','phonenumber',"appointmentDate"];
  displayedColumns2: string[] = ['position', 'doctorname','speciality' ,'fee', 'age','patientName','phonenumber',"appointmentDate"];
  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  appointment: FormGroup;
  @ViewChild(MatPaginator) paginator2: MatPaginator;


  constructor(public api:ApiService,private _formBuilder: FormBuilder) { 
    this.appointment = this._formBuilder.group({
      doctorname: ['steve doctor'],
      speciality: ['Ayeurveda'],
      fee: ['1000'],      
      patientName:[''],
      age:[''],
      phonenumber:['']
    });
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;

    this.api.allapp().then(res =>{
      console.log(res["data"])
      this.dataSource = new MatTableDataSource<any>(res["data"]);
      this.dataSource.paginator = this.paginator;
    })

  }
book(){
  console.log(this.appointment.value)
  this.api.book(this.appointment.value)
  .then(res =>{
    console.log(res)
  }).then(()=>{
    this.api.allapp().then(res =>{
      console.log(res["data"])
      this.dataSource = new MatTableDataSource<any>(res["data"]);
      this.dataSource.paginator = this.paginator;
    })
  })
}
patientdetails(d){  
  this.api.patientapp(d).then(res=>{
    console.log(res)
    this.dataSource2 = new MatTableDataSource<any>(res["data"]);
    this.dataSource2.paginator = this.paginator2;
  })
}
}
