import { FormService as FormService } from '../../services/form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup = this.formBuilder.group({});

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,

  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.formService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(
      data => {
        console.log(`Retrieved credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log(`Retrieved credit card years: ${JSON.stringify(data)}`);
        this.creditCardYears = data;
      }
    );

    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handeling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(`The email address is ${this.checkoutFormGroup.get('customer')?.value?.email}`);
  }

  handelMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number = currentYear === selectedYear ? new Date().getMonth() + 1 : 1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    console.log('getStates');
    console.log(`formGroupName=${formGroupName}`);
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    console.log(`formGroup?.value?.country?.code=${formGroup?.value?.country?.code}`);

    this.formService.getStates(formGroup?.value?.country?.code).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}