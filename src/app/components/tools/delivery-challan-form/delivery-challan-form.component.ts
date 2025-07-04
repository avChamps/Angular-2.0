import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared/shared.module';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-delivery-challan-form',
  templateUrl: './delivery-challan-form.component.html',
  styleUrls: ['./delivery-challan-form.component.css', '../../tools/tools.component.css', '../../tools/externalTools.css'],
  imports: [CommonModule, RouterModule, SharedModule],
  standalone : true
})
export class DeliveryChallanFormComponent {
 @ViewChild('signaturePadPrepared') signaturePadPrepared!: ElementRef<HTMLCanvasElement>;
  @ViewChild('signaturePadReceived') signaturePadReceived!: ElementRef<HTMLCanvasElement>;

  formData: any = {
    companyName: '',
    companyAddress: '',
    companyPhoneNo: '',
    companyEmail: '',
    companyGstin: '',
    challanNumber: '',
    shippingName: '',
    contactPersonName: '',
    shippingAddress: '',
    shippingPhoneNo: '',
    shippingGstin: '',
    materials: [
      { itemName: '', hsn: '', qty: '', units: '' },
      { itemName: '', hsn: '', qty: '', units: '' },
      { itemName: '', hsn: '', qty: '', units: '' }
    ],
    signaturePrepared: null,
    signatureReceived: null
  };

  activeTab: 'form' | 'preview' = 'form';
  private preparedPad!: SignaturePad;
  private receivedPad!: SignaturePad;


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
    this.formData.materials.push({ itemName: '', hsn: '', qty: '', units: '' });
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
    this.formData.materials = this.formData.materials.filter(
      (material: any) => material.itemName || material.hsn || material.qty || material.units
    );
  }

  printReport() {
    this.formData.signaturePrepared = this.preparedPad.isEmpty() ? null : this.preparedPad.toDataURL();
    this.formData.signatureReceived = this.receivedPad.isEmpty() ? null : this.receivedPad.toDataURL();
    window.location.href = './print-delivery-challan.html';
  }
}
