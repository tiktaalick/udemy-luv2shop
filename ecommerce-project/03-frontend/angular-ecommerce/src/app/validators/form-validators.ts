import { FormControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
    static notOnlyWhitespace(control: FormControl): ValidationErrors {
        return (control.value != null) && (control.value.trim().length === 0)
            ? { 'notOnlyWhitespace': true }
            : { 'notOnlyWhitespace': false };
    }
}
