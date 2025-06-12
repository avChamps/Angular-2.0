import { InjectionToken } from '@angular/core';
import { Request } from 'express';
import { environment } from '../../environments/environment.development';

let url = environment.APIURL;

export const alertResponseTime = 10000;
export const base64Key = 'RevalKey';
export const createAccount = url + '/createAccount';
export const verifyOtpAndRegister = url + '/verifyOtpAndRegister';
export const login = url + '/login';
export const getProfiles = url + '/getProfiles';