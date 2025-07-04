import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared/shared.module';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-material-gate-pass-form',
  templateUrl: './material-gate-pass-form.component.html',
  styleUrls: ['./material-gate-pass-form.component.css','../../tools/tools.component.css', '../../tools/externalTools.css'],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class MaterialGatePassFormComponent {
 @ViewChild('signaturePadPrepared') signaturePadPrepared!: ElementRef<HTMLCanvasElement>;
  @ViewChild('signaturePadReceived') signaturePadReceived!: ElementRef<HTMLCanvasElement>;

  formData: any = {
    companyInfo: '',
    companyName: '',
    personName: '',
    gatePassType: 'returnable',
    gatePassNo: '',
    issueDate: '',
    purpose: '',
    materials: [
      { particulars: '', qty: '', problem: '' },
      { particulars: '', qty: '', problem: '' },
      { particulars: '', qty: '', problem: '' }
    ],
    signaturePrepared: null,
    signatureReceived: null
  };

  activeTab: 'form' | 'preview' = 'form';
  private preparedPad!: SignaturePad;
  private receivedPad!: SignaturePad;

  constructor() {
    // const savedData = this.gatePassService.getGatePassData();
    // if (savedData) {
    //   this.formData = { ...this.formData, ...savedData };
    // }
  }

  ngAfterViewInit() {
    this.initializeSignaturePads();
    if (this.formData.signaturePrepared) {
      this.preparedPad.fromDataURL(this.formData.signaturePrepared);
    }
    if (this.formData.signatureReceived) {
      this.receivedPad.fromDataURL(this.formData.signatureReceived);
    }
  }

  private initializeSignaturePads() {
    const resizeCanvas = (canvas: HTMLCanvasElement) => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
    };

    resizeCanvas(this.signaturePadPrepared.nativeElement);
    resizeCanvas(this.signaturePadReceived.nativeElement);

    this.preparedPad = new SignaturePad(this.signaturePadPrepared.nativeElement);
    this.receivedPad = new SignaturePad(this.signaturePadReceived.nativeElement);
  }

  setActiveTab(tab: 'form' | 'preview') {
    this.activeTab = tab;
    if (tab === 'preview') {
      this.updatePreview();
    }
  }

  addMaterial() {
    this.formData.materials.push({ particulars: '', qty: '', problem: '' });
  }

  removeMaterial(index: number) {
    this.formData.materials.splice(index, 1);
  }

  clearPad(type: 'prepared' | 'received') {
    if (type === 'prepared') {
      this.preparedPad.clear();
      this.formData.signaturePrepared = null;
    } else {
      this.receivedPad.clear();
      this.formData.signatureReceived = null;
    }
  }

  previewReport() {
    this.updatePreview();
    this.setActiveTab('preview');
  }

  private updatePreview() {
    // Preview is handled via two-way binding in the template
    this.formData.materials = this.formData.materials.filter(
      (material: any) => material.particulars || material.qty || material.problem
    );
  }

  printReport() {
    this.formData.signaturePrepared = this.preparedPad.isEmpty() ? null : this.preparedPad.toDataURL();
    this.formData.signatureReceived = this.receivedPad.isEmpty() ? null : this.receivedPad.toDataURL();
    
    // this.gatePassService.saveGatePassData(this.formData);
    window.location.href = './print-material-gate-pass-form.html';
  }
}
