// Copyright 2020 Alfian Busyro (twitter: arufian_b)

/**
 * This component will retrieve Account's or Contact's country or city name, 
 * then retrieve COVID-19 statistics data from API,
 * and lastly show the statistics data in Account's or Contact's record page
 *
 * @author arufian
 */
import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_BILLING_CITY from '@salesforce/schema/Account.BillingCity'
import ACCOUNT_BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry'
import CONTACT_MAILING_CITY from '@salesforce/schema/Contact.MailingCity'
import CONTACT_MAILING_COUNTRY from '@salesforce/schema/Contact.MailingCountry'

const BASE_URL = 'https://covid19-data-aru.herokuapp.com/';

export default class Covid19 extends LightningElement {

  @api recordId;
  @api objectApiName;

  confirmed;
  recovered;
  deaths;
  title = 'COVID-19 Information';
  fields;
  record;
  isLoading;
  error;
  errorMessage;

  @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
  load(result) {
    if (result.data) {
      this.record = result.data.fields;
      this.fetchApi()
    }
  }

  connectedCallback() {
    if (this.objectApiName === 'Account') {
      this.fields = [ACCOUNT_BILLING_CITY, ACCOUNT_BILLING_COUNTRY];
      this.errorMessage = `Please check this Account's Billing City or Country, and fill with correct value`;
    } else {
      this.fields = [CONTACT_MAILING_CITY, CONTACT_MAILING_COUNTRY];
      this.errorMessage = `Please check this Contact's Mailing City or Country, and fill with correct value`;
    }
    this.isLoading = true;
  }

  async fetchApi() {
    const { BillingCity, BillingCountry, MailingCity, MailingCountry } = this.record;
    let param;
    let query = 'country';
    if (this.objectApiName === 'Account') {
      if (BillingCountry.value) param = BillingCountry.value;
      else {
        param = BillingCity.value;
        query = 'city';
      }
    } else {
      if (MailingCountry.value) param = MailingCountry.value;
      else {
        param = MailingCity.value;
        query = 'city';
      }
    }
    this.isLoading = false;
    if (param === null) {
      this.error = true;
      return;
    }
    try {
      const resp = await fetch(`${BASE_URL}?${query}=${param}`);
      const json = await resp.json();
      const { confirmed, recovered, deaths } = json.latest;
      const { flag, name } = json.country_info;
      this.confirmed = confirmed;
      this.recovered = recovered;
      this.deaths = deaths;
      this.title = `${name}'s COVID-19 Information ${flag}`;
    } catch (e) {
      this.error = true;
      this.errorMessage += ' and try to refresh the page';
    }
  }
}