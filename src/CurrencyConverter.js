import React from 'react';

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
    localStorage.setItem(key, value);
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
    const cachedExchangeRate = localStorage.getItem(currencySymbol)
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
        // this.setState({
        //   currencySymbol: Object.keys(data)[0],
        //   conversionRate: data[currencySymbol]['val'], 
        //   result: Number(this.state.amount * data[currencySymbol]['val']).toFixed(2)
        // })
      });
    
  }

  render() {
    return <div className="container">
        <h2>Convert</h2>
        <div>
          <p>symbol: {this.state.currencySymbol}</p>
          <p>amount: {this.state.amount}</p>
          <p>Exchange Rate: {this.state.conversionRate}</p>
          <p>
            converted rate {this.state.amount * this.state.conversionRate}
          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.amount.value} onChange={this.handleChange} />
          <select name="from">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="SGD">SGD</option>
          </select>&nbsp;to&nbsp;
          <select name="to">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="SGD">SGD</option>
          </select>
          <input type="submit" value="Convert" />
          <input type="text" value={Number(this.state.amount * this.state.conversionRate).toFixed(2)} placeholder="result" />
        </form>
      </div>;
  }
}