// import React from "react";
// import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
// export default function StatisticsPage({ marketPrice, confirmedTransactions }) {
//   return (
//     <section className="statistics">
//       <h1>statistics!</h1>
//       <h3>Market Price</h3>
//       <Sparklines
//         data={marketPrice.values.map((value) => [value.y.toFixed()])}
//         // limit={300}
//         width={200}
//         height={50}
//         margin={5}
//       >
//         <SparklinesLine color="white" />
//       </Sparklines>
//       <h3>Confirmed Transactions</h3>

//       <Sparklines
//         data={confirmedTransactions.values.map((value) => [value.y.toFixed()])}
//         // limit={300}
//         width={200}
//         height={50}
//         margin={5}
//       >
//         <SparklinesLine color="white" style={{ fill: "gold" }} />
//         <SparklinesSpots style={{ fill: "gold" }} />
//       </Sparklines>
//     </section>
//   );
// }

import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import bitcoinService from '../services/bitcoinService';

export default class StatisticsPage extends Component {
  componentDidMount() {
    this.setStatsData();
  }

  state = {
    confirmedTransactions: null,
    marketPrice: null,
  };

  setStatsData = async () => {
    const marketPrice = await bitcoinService.getMarketPrice();
    const confirmedTransactions =
      await bitcoinService.getConfirmedTransactions();
    this.setState({ marketPrice, confirmedTransactions });
  };

  render() {
    const { marketPrice, confirmedTransactions } = this.state;
    if (!marketPrice || !confirmedTransactions)
      return <div className="loader">Loading...</div>;
    return (
      <section className="statistics">
        <h1>statistics!</h1>
        <h3>Market Price</h3>
        <Sparklines
          data={marketPrice.values.map((value) => [value.y.toFixed()])}
          // limit={300}
          width={200}
          height={50}
          margin={5}
        >
          <SparklinesLine color="white" />
        </Sparklines>
        <h3>Confirmed Transactions</h3>

        <Sparklines
          data={confirmedTransactions.values.map((value) => [
            value.y.toFixed(),
          ])}
          // limit={300}
          width={200}
          height={50}
          margin={5}
        >
          <SparklinesLine color="white" style={{ fill: 'gold' }} />
          <SparklinesSpots style={{ fill: 'gold' }} />
        </Sparklines>
      </section>
    );
  }
}
