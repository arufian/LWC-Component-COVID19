// Copyright 2020 Alfian Busyro (twitter: arufian_b)

/**
 * This component will retrieve Account's or Contact's country or city name, 
 * retrieve correspondance COVID-19 statistics data from API
 * and show the statistics data in Account's or Contact's record page
 *
 * @author arufian
 */
import { LightningElement, track, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const BASE_URL = 'https://covid19-data-aru.herokuapp.com/';

export default class Covid19 extends LightningElement {

  @api recordId;
  @api objectApiName;

  @track confirmed;
  @track recovered;
  @track deaths;
  @track title = "COVID-19 info";
  @track fields;
  @track record;
  @track isLoading;
  @track error;
  @track errorMessage;

  @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
  load(result) {
    if(result.data) {
      this.record = result.data.fields;
      this.fetchApi()
    }
  }

  connectedCallback() {
    if(this.objectApiName === 'Account') {
      this.fields = ['Account.BillingCity', 'Account.BillingCountry'];
      this.errorMessage = `Please check this Account's Billing City or Country, and fill with correct value`;
    } else {
      this.fields = ['Contact.MailingCity', 'Contact.MailingCountry'];
      this.errorMessage = `Please check this Contact's Mailing City or Country, and fill with correct value`;
    }
    this.isLoading = true;
  }

  async fetchApi() {
    const { BillingCity, BillingCountry, MailingCity, MailingCountry } = this.record;
    let param;
    let query = 'country';
    if(this.objectApiName === 'Account') {
      if(BillingCountry.value) param = BillingCountry.value;
      else {
        param = BillingCity.value;
        query = 'city';
      }
    } else {
      if(MailingCountry.value) param = MailingCountry.value;
      else {
        param = MailingCity.value;
        query = 'city';
      }
    }
    this.isLoading = false;
    if(param === null) {
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
      this.title = `${name}'s COVID-19 information ${flag}`;
    } catch(e) {
      console.error(e, 'fetch api error')
      this.error = true;
      this.errorMessage += ' and try to refresh the page';
    }
  }
}