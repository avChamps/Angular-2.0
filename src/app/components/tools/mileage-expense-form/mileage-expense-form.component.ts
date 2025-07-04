import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared/shared.module';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-mileage-expense-form',
  templateUrl: './mileage-expense-form.component.html',
  styleUrls: ['./mileage-expense-form.component.css', '../../tools/tools.component.css', '../../tools/externalTools.css'],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class MileageExpenseFormComponent {
  @ViewChild('preparedCanvas') preparedCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('receivedCanvas') receivedCanvas!: ElementRef<HTMLCanvasElement>;

  mileageForm: FormGroup;
  mileageEntries: FormArray;
  activeTab: string = 'form';
  totalMiles: number = 0;
  totalAmount: number = 0;
  preparedPad: any;
  receivedPad: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.mileageForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      payPeriodFrom: ['', Validators.required],
      payPeriodTo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      reportDate: ['', Validators.required],
      mileageRate: [0, [Validators.required, Validators.min(0)]],
      mileageEntries: this.fb.array([])
    });
    this.mileageEntries = this.mileageForm.get('mileageEntries') as FormArray;
  }

  ngOnInit(): void {
    this.loadSavedData();
    this.mileageForm.get('mileageRate')?.valueChanges.subscribe(() => this.updateMileageSummary());
  }

  ngAfterViewInit(): void {
    this.setupSignaturePads();
  }

  setupSignaturePads(): void {
    const resizeCanvas = (canvas: HTMLCanvasElement) => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
    };

    resizeCanvas(this.preparedCanvas.nativeElement);
    resizeCanvas(this.receivedCanvas.nativeElement);

    this.preparedPad = new SignaturePad(this.preparedCanvas.nativeElement);
    this.receivedPad = new SignaturePad(this.receivedCanvas.nativeElement);

    const savedData = JSON.parse(localStorage.getItem('gatePassData') || '{}');
    if (savedData.signaturePrepared) this.preparedPad.fromDataURL(savedData.signaturePrepared);
    if (savedData.signatureReceived) this.receivedPad.fromDataURL(savedData.signatureReceived);
  }

  clearPad(pad: any): void {
    pad.clear();
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'preview') {
      this.updateMileageSummary();
    }
  }

  addMileageEntry(): void {
    const entry = this.fb.group({
      date: [''],
      description: [''],
      startLocation: [''],
      destination: [''],
      kms: [0]
    });
    this.mileageEntries.push(entry);
  }

  deleteMileageEntry(index: number): void {
    this.mileageEntries.removeAt(index);
    this.updateMileageSummary();
  }

  updateMileageSummary(): void {
    let totalKms = 0;
    this.mileageEntries.controls.forEach((control) => {
      const kms = parseFloat(control.get('kms')?.value || '0');
      if (!isNaN(kms)) totalKms += kms;
    });

    const rate = parseFloat(this.mileageForm.get('mileageRate')?.value || '0');
    this.totalMiles = totalKms;
    this.totalAmount = totalKms * rate;
  }

  previewReport(): void {
    this.updateMileageSummary();
    this.activeTab = 'preview';
  }

  printReport(): void {
    const data = {
      ...this.mileageForm.value,
      materials: this.mileageEntries.value,
      signaturePrepared: this.preparedPad.isEmpty() ? null : this.preparedPad.toDataURL(),
      signatureReceived: this.receivedPad.isEmpty() ? null : this.receivedPad.toDataURL()
    };
    localStorage.setItem('gatePassData', JSON.stringify(data));
    this.router.navigate(['/print-employee-mileage-expense-report']);
  }

  loadSavedData(): void {
    const savedData = JSON.parse(localStorage.getItem('gatePassData') || '{}');
    if (!savedData || Object.keys(savedData).length === 0) {
      for (let i = 0; i < 3; i++) this.addMileageEntry();
      return;
    }

    this.mileageForm.patchValue({
      employeeName: savedData.employeeName || '',
      employeeId: savedData.employeeId || '',
      payPeriodFrom: savedData.payPeriodFrom || '',
      payPeriodTo: savedData.payPeriodTo || '',
      vehicleType: savedData.vehicleType || '',
      reportDate: savedData.reportDate || '',
      mileageRate: savedData.mileageRate || 0
    });

    this.mileageEntries.clear();
    if (Array.isArray(savedData.materials) && savedData.materials.length > 0) {
      savedData.materials.forEach((item: any) => {
        this.mileageEntries.push(this.fb.group({
          date: [item.date || ''],
          description: [item.description || ''],
          startLocation: [item.startLocation || ''],
          destination: [item.destination || ''],
          kms: [item.kms || 0]
        }));
      });
      const rowsToAdd = 3 - savedData.materials.length;
      for (let i = 0; i < rowsToAdd; i++) this.addMileageEntry();
    } else {
      for (let i = 0; i < 3; i++) this.addMileageEntry();
    }

    this.updateMileageSummary();
  }

  get mileageFormGroups(): FormGroup[] {
    return this.mileageEntries.controls as FormGroup[];
  }
}
