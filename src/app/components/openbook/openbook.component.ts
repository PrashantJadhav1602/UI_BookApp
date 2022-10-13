import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-openbook',
  templateUrl: './openbook.component.html',
  styleUrls: ['./openbook.component.css']
})
export class OpenbookComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book:any) { }

  ngOnInit(): void {
  }

}
