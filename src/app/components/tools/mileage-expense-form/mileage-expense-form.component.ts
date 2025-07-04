import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import SignaturePad from 'signature_pad';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-mileage-expense-form',
  templateUrl: './mileage-expense-form.component.html',
  styleUrls: ['./mileage-expense-form.component.css', '../../tools/tools.component.css', '../../tools/externalTools.css'],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class MileageExpenseFormComponent implements AfterViewInit {
  @ViewChild('preparedCanvas') preparedCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('receivedCanvas') receivedCanvas!: ElementRef<HTMLCanvasElement>;

  mileageForm: FormGroup;
  mileageEntries: FormArray;
  activeTab: string = 'form';
  totalMiles: number = 0;
  totalAmount: number = 0;
  preparedPad!: SignaturePad;
  receivedPad!: SignaturePad;

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

    // const savedData = this.mileageService.getMileageData();

 const savedData = JSON.parse(localStorage.getItem('mileageData') || '');

    if (savedData?.signaturePrepared) this.preparedPad.fromDataURL(savedData.signaturePrepared);
    if (savedData?.signatureReceived) this.receivedPad.fromDataURL(savedData.signatureReceived);
  }

  clearPad(pad: SignaturePad): void {
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
      mileageEntries: this.mileageEntries.value,
      signaturePrepared: this.preparedPad.isEmpty() ? null : this.preparedPad.toDataURL(),
      signatureReceived: this.receivedPad.isEmpty() ? null : this.receivedPad.toDataURL()
    };
    // this.mileageService.saveMileageData(data);
     localStorage.setItem('mileageData', JSON.stringify(data));

    // Generate PDF
    const element = document.createElement('div');
    element.innerHTML = this.generatePrintTemplate(data);
    document.body.appendChild(element);

    const opt = {
      margin: 0.5,
      filename: 'Mileage_Expense_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      document.body.removeChild(element);
    });
  }

  loadSavedData(): void {
    // const savedData = this.mileageService.getMileageData();
     const savedData = JSON.parse(localStorage.getItem('mileageData') || '');
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
    if (Array.isArray(savedData.mileageEntries) && savedData.mileageEntries.length > 0) {
      savedData.mileageEntries.forEach((item: any) => {
        this.mileageEntries.push(this.fb.group({
          date: [item.date || ''],
          description: [item.description || ''],
          startLocation: [item.startLocation || ''],
          destination: [item.destination || ''],
          kms: [item.kms || 0]
        }));
      });
      const rowsToAdd = 3 - savedData.mileageEntries.length;
      for (let i = 0; i < rowsToAdd; i++) this.addMileageEntry();
    } else {
      for (let i = 0; i < 3; i++) this.addMileageEntry();
    }

    this.updateMileageSummary();
  }

  get mileageFormGroups(): FormGroup[] {
    return this.mileageEntries.controls as FormGroup[];
  }

  private generatePrintTemplate(data: any): string {
    const totalKms = this.totalMiles;
    const totalAmount = this.totalAmount;

    return `
      <div style="font-family: Inter, sans-serif; padding: 20px; max-width: 8.5in;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="./assets/images/logo.png" alt="AVChamps Logo" style="width: 100px;">
          <h2>AVChamps - Professional Audio Visual Solutions</h2>
          <h3>Mileage Expense Report</h3>
        </div>

        <div style="margin-bottom: 20px;">
          <h4>Employee Information</h4>
          <p><strong>Employee Name:</strong> ${data.employeeName || 'Not specified'}</p>
          <p><strong>Employee ID:</strong> ${data.employeeId || 'Not specified'}</p>
          <p><strong>Pay Period:</strong> ${data.payPeriodFrom || 'Not specified'} to ${data.payPeriodTo || 'Not specified'}</p>
          <p><strong>Vehicle Type:</strong> ${data.vehicleType || 'Not specified'}</p>
          <p><strong>Report Date:</strong> ${data.reportDate || 'Not specified'}</p>
          <p><strong>Mileage Rate:</strong> ₹${data.mileageRate || 0}/km</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4>Mileage Entries</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Date</th>
                <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">Description</th>
                <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">From</th>
                <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">To</th>
                <th style="border: 1px solid #e0e0e0; padding: 8px; text-align: right;">Miles</th>
              </tr>
            </thead>
            <tbody>
              ${data.mileageEntries && data.mileageEntries.length > 0 ? data.mileageEntries.map((entry: any) => `
                <tr>
                  <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">${entry.date || '-'}</td>
                  <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">${entry.description || '-'}</td>
                  <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">${entry.startLocation || '-'}</td>
                  <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: left;">${entry.destination || '-'}</td>
                  <td style="border: 1px solid #e0e0e0; padding: 8px; text-align: right;">${entry.kms || '-'}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="5" style="border: 1px solid #e0e0e0; padding: 8px; text-align: center;">No entries</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <div style="margin-bottom: 20px;">
          <h4>Mileage Summary</h4>
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p><strong>Total Miles:</strong> ${totalKms.toFixed(2)}</p>
            </div>
            <div>
              <p><strong>Rate per Km:</strong> ₹${data.mileageRate || 0}</p>
            </div>
            <div>
              <p><strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4>Signatures</h4>
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p><strong>Prepared By:</strong></p>
              ${data.signaturePrepared ? `<img src="${data.signaturePrepared}" style="width: 200px; height: 80px;">` : '<p>Not signed</p>'}
            </div>
            <div>
              <p><strong>Received By:</strong></p>
              ${data.signatureReceived ? `<img src="${data.signatureReceived}" style="width: 200px; height: 80px;">` : '<p>Not signed</p>'}
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <p>AVChamps - Professional Audio Visual Solutions</p>
          <p>Be Connected</p>
        </div>
      </div>
    `;
  }
}