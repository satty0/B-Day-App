import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable, interval, BehaviorSubject, switchMap, Subscription, timer, catchError, of, filter } from 'rxjs';
import { Employee, groupName } from './employeeInterface';
import { Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  empData$: Observable<Employee[]> | undefined;
  bdayData$: Observable<any> | undefined;
  month: number = new Date().getMonth() + 1;
  date: number = new Date().getDate();
  refreshPage$ = new BehaviorSubject<boolean>(true);
  forHitingApi = interval(60000)
  contactForm: any;
  swipe: number = 0;
  success: boolean = false;
  title: any;
  totalMsg: any;
  groupName: groupName[] = [
    { id: 'd11c0cc0-568c-11ed-bee2-651943bf6750', name: 'Testing for Bday App' },
    { id: '847e7a20-56a4-11ed-8b03-1fa484830070', name: 'Testing for Bday App 2' },
  ]

  subscription!: Subscription;

  constructor(private service: EmployeeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      empId: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      groupName: ['', Validators.required],
    });
       
    this.empData$ = this.refreshPage$.pipe(switchMap(_ => this.service.getEmpData()));
    this.bdayData$ = this.refreshPage$.pipe(switchMap(_ => this.service.getBdayMsg(this.findDate(this.date))));
    this.forHitingApi.subscribe(() => { this.refreshPage$.next(false); });
    //this.sendBdayMsg();
    //this.bdayData$.subscribe();


    // this.subscription = interval(2000)
    // .pipe(
    //   switchMap(() => {
    //     return this.service.getBdayMsg(this.findDate(this.date))
    //       .pipe(catchError(err => {
    //         // Handle errors
    //         console.error(err);
    //         return of(undefined);
    //       }));
    //   }),
    //   filter(data => data !== undefined)
    // )
    // .subscribe(data => {
     
    //   console.log(data, "satish");
    // });
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}






  

  findDate(date: number){
    if(date<=9){ return this.month.toString() + '-0' + this.date.toString(); }
    else{ return this.month.toString() + '-' + this.date.toString(); }
    }
  
  saveEmpData() {
    if (this.contactForm.valid) {
      this.service.saveEmpData(this.contactForm.value).subscribe(() => {
        console.log(this.contactForm.value, "satish")
        this.contactForm.reset({}); this.success = true;
      });
    }
  }

  countNo() { this.swipe = this.swipe + 1; }

  sendBdayMsg() {
    this.bdayData$?.subscribe(res => {
      //console.log(res[0], "yeyyy")
      res.forEach((val: any) => {
        this.totalMsg = {
          "markdown": "Happy BirthDay " + val.fullName,
          "roomId": val.groupName
        }
        this.service.sendMsg(this.totalMsg).subscribe(res => console.log(res, "working"))
             })
    })
  }
}
