# LWC-Component-COVID19
A LWC Component that can be embedded into Account or Contact record page, which will show all COVID-19 statistics of Account's country or Contact's country. 

COVID-19 statistic data will be updated daily.

## Screenshot

### Account 
![Account](https://raw.githubusercontent.com/arufian/LWC-Component-COVID19/master/screenshots/account.png)

### Contact 
![Contact](https://raw.githubusercontent.com/arufian/LWC-Component-COVID19/master/screenshots/contact.png)

### Data not found 
![Data Not Found](https://raw.githubusercontent.com/arufian/LWC-Component-COVID19/master/screenshots/notfound.png)

## How to use

### Add API endpoint into Trusted Sites

Since this component using API outside Salesforce, first we must add the API endpoint below into our Salesforce Org CSP Trusted Sites. 

API Endpoint : 
`https://covid19-data-aru.herokuapp.com`

If you're not sure how to add this, please see step by step setup [here](http://github.com).

### Deploy these source codes to your Salesforce Org

After you finish added trusted sites, then you deploy source codes in this repository into your Salesforce Org.

If you still don't know how to deploy to your Org, you can learn [from this trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/push-lightning-web-component-files).

### Having any issues

Please [create new issue](https://github.com/arufian/LWC-Component-COVID19/issues/new) to this repository

### Contributing

Any contribution is welcome. Please see this [guidance](CONTRIBUTION.md) before you create a pull request

Created with ❤️ by [Alfian Busyro](https://twitter.com/arufian_b)