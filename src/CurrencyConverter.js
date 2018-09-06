import React from 'react';
import lscache from 'lscache';

export default class CurrencyConverter extends React.Component {
  constructor() {
    super();
    this.state = {
      currencySymbol: '',
      amount: '',
      conversionRate: 0,
      result: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  toLocalStorage = (key, value) => {
    lscache.set(key, value, 1)
    this.setState({
      conversionRate: value
    })
  }

  handleChange = (e) => {
    this.setState({ amount: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const fromCurrency = e.target.from.value;
    const toCurrency = e.target.to.value;
    const currencySymbol = `${fromCurrency}_${toCurrency}`;
    const url = `https://free.currencyconverterapi.com/api/v6/convert?q=${currencySymbol}&compact=y`;
    const cachedExchangeRate = lscache.get(currencySymbol);
    if (cachedExchangeRate) {
      this.setState({
        conversionRate: cachedExchangeRate,
        currencySymbol: currencySymbol
      })
      return;
    }
    fetch(url) 
      .then(res => res.json())
      .then(data => {
        this.toLocalStorage(currencySymbol, data[currencySymbol]["val"]);
      });
    
  }

  render() {
    return (
      <div className="wrapper">
        <div id="overlay" />
        <form className="form card container col-md-6 text-white bg-info text-center" onSubmit={this.handleSubmit}>
          <div className="form-group container">
            <h2 className="card-title">convert</h2>
            <label for="amount" className="text-warning">amount</label>
            <input className="form-control container col-sm-4" id="amount" type="text" value={this.state.amount.value} onChange={this.handleChange} />
          </div>
          <div className="form-group row container">
            <select id="inputState" className="form-control container col-sm-2" name="from">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="SGD">SGD</option>
            </select>
            <span className="arrows">&#x21e2;</span>
            <select id="inputState" className="form-control container col-sm-2" name="to">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="SGD">SGD</option>
            </select>
          </div>
          <input className="form-control container col-sm-4" type="text" value={Number(this.state.amount * this.state.conversionRate).toFixed(2)} placeholder="result" readOnly />
          <br />
          <div>
            <p className="exchange-rate">
              exchange rate: {this.state.conversionRate}
            </p>
          </div>
          <input className="btn btn-warning container col-md-2 " type="submit" value="convert" />
        </form>
      </div>
    )
  }
}