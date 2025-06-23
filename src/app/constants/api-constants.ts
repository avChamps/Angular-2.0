import { InjectionToken } from '@angular/core';
import { Request } from 'express';
import { environment } from '../../environments/environment.development';

let url = environment.APIURL;

export const createAccount = url + '/createAccount';
export const verifyOtpAndRegister = url + '/verifyOtpAndRegister';
export const login = url + '/login';
export const getProfiles = url + '/getProfiles';
export const updateProfile = url + '/updateProfile';
export const getProfile = url + '/getProfile';
export const getCountries = url + '/getCountries';
export const getStates = url + '/getStates';
export const getCities = url + '/getCities';
export const getZipCodes = url + '/getZipCodes';
export const getTrainings = url + '/getTrainings';
export const trainingContactUs = url + '/trainingContactUs';
export const ContactUs = url + '/';
export const postEvents = url + '/postEvents';
export const getEvents = url + '/getEvents';
export const getTools = url + '/getTools'
export const markInterest = url + '/markInterest';
export const addRecentTool = url + '/addRecentTool';
export const getRecentTools = url + '/getRecentTools';
export const postJob = url + '/postJob';
export const getJobs = url + '/getJobs';
export const deleteJob = url + '/deleteJob';
export const getJobStats = url + '/getJobStats';
export const applyJob = url + '/applyJob';