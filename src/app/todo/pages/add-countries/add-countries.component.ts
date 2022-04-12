import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-countries',
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.scss'],
})
export class AddCountriesComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  countryForm: FormGroup;

  get newCountry(): FormArray {
    return this.countryForm.get('newCountry') as FormArray;
  }

  addNewCountry() {
    const country = this.formBuilder.group({
      name: new FormControl(''),
      abb: new FormControl(''),
      population: new FormControl(''),
      continent: new FormControl(''),
    });

    this.newCountry.push(country);
  }

  submit() {
    console.log(this.countryForm.value);
  }

  createForm() {
    this.countryForm = this.formBuilder.group({
      newCountry: this.formBuilder.array([]),
    });

    console.log(this.countryForm);
  }

  ngOnInit(): void {
    this.createForm();
    this.addNewCountry();
  }
}
