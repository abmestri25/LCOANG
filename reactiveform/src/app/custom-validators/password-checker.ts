import { FormGroup } from '@angular/forms';

export function PasswordChecker(
  controlName: string,
  CompareControlName: string
) {
  return (formGroup: FormGroup) => {
      const password = formGroup.controls[controlName]
      const cnfPassword = formGroup.controls[CompareControlName]
      if(password.value !== cnfPassword.value){
        cnfPassword.setErrors({
            mustmatch:true
        })
      }else{
          cnfPassword.setErrors(null)
      }
  };
}
