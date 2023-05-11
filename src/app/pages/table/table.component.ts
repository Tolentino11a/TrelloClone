import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/product.model';
import { DataSourceProduct } from './data-source';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  dataSource = new DataSourceProduct();
  columns: string[] = ['#No', 'Name', 'gender','cover', 'actions'];
  total = 0;
  input = new FormControl('', {nonNullable: true })

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Product[]>('https://rickandmortyapi.com/api/character')
    .subscribe((data:any) => {
      this.dataSource.init(data.results);
      // this.total = this.dataSource.getTotal();
    });
    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.dataSource.find(value)
      // console.log(value);
    })
  }

  update(product: Product) {
    this.dataSource.update(product.id, { gender: 'Male' });
  }

}