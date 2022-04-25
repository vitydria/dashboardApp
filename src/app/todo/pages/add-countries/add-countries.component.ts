import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, ComponentFactoryResolver } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-countries',
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.scss'],
})
export class AddCountriesComponent {
  countryForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.countryForm = this.formBuilder.group({
      country: this.formBuilder.array([]),
    });
  }

  hideSubmit() {
    if (this.country.length === 0) return false;
    else return true;
  }

  get country(): FormArray {
    return this.countryForm.get('country') as FormArray;
  }

  newCountry(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      abbreviation: ['', [Validators.required]],
      population: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      continent: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  addCountry() {
    this.country.push(this.newCountry());
  }

  isValid(index: number, field: string): boolean {
    if (field === 'name') {
      if (
        this.countryForm.controls['country']['controls'][index].controls.name
          .errors &&
        this.countryForm.controls['country']['controls'][index].controls.name
          .touched
      )
        return true;
    }

    if (field === 'abbreviation') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .abbreviation.errors &&
        this.countryForm.controls['country']['controls'][index].controls
          .abbreviation.touched
      )
        return true;
    }

    if (field === 'population') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .population.errors &&
        this.countryForm.controls['country']['controls'][index].controls
          .population.touched
      )
        return true;
    }

    if (field === 'continent') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .continent.errors &&
        this.countryForm.controls['country']['controls'][index].controls
          .continent.touched
      )
        return true;
    }

    return false;
  }

  errorMessage(index: number, field: string): string {
    if (field === 'name') {
      if (
        this.countryForm.controls['country']['controls'][index].controls.name
          .errors?.required
      ) {
        return 'is required';
      }
      if (
        this.countryForm.controls['country']['controls'][index].controls.name
          .errors?.minlength
      ) {
        return 'is too short';
      }
    }

    if (field === 'abbreviation') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .abbreviation.errors?.required
      ) {
        return 'is required';
      }
    }

    if (field === 'population') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .population.errors?.required
      ) {
        return 'is required';
      }
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .population.errors?.pattern
      ) {
        return 'must be a number';
      }
    }

    if (field === 'continent') {
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .continent.errors?.required
      ) {
        return 'is required';
      }
      if (
        this.countryForm.controls['country']['controls'][index].controls
          .continent.errors?.minlength
      ) {
        return 'is too short';
      }
    }

    return '';
  }

  removeCountry(i: number) {
    this.country.removeAt(i);
  }

  onSubmit() {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }

    this.todoService.addCountries(this.countryForm.value.country);
    this.countryForm.reset();
    Object.keys(this.country.controls).forEach((key) => {
      this.country.get(key)!.setErrors(null);
    });
  }
}
