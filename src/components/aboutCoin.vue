<template>
  <div class="mui-panel">
    <div class="mui--text-body2">
      <div class="mui--text" id="description"> {{currentCoin}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      aboutCoin: {
        bitcoin:
          "Bitcoin is a cryptocurrency which isn’t managed by a bank or agency but in which transactions are recorded in the blockchain that is public and contains records of each and every transaction that takes place. The cryptocurrency is traded by individuals with cryptographic keys that act as wallets. Bitcoin was first invented in 2009 by an anonymous founder known as Satoshi Nakamoto. Bitcoins are moved in blocks every 10 minutes on a decentralized ledger that connects blocks into a coherent chain dating back to the first genesis block. It was originally described as a peer-to-peer electronic cash but the technology has evolved to emphasize being a settlement layer rather than a payment network. This has left integrated second layer solutions, like Lightning Network, to prioritize that use case. It has remained the largest cryptocurrency by market cap.",
        ethereum:
          "Ethereum is a software system which is part of a decentralised system meaning it is not controlled by any single entity. Ethereum is different to Bitcoin because it expands on its technologies to create a completely new network including an internet browser, coding language and payment system – 'in short, Ethereum is a public, open-source, Blockchain based distributed software platform that allows developers to build and deploy decentralised applications'. The platform’s currency is called Ether. The platform was founded in 2014 by Vitalik Buterin and a team of other developers. The currency is just one aspect/component of Ethereum yet can be mined by individuals more easily than Bitcoin.",
        dash:
          "Dash is derivative of Litecoin, which is a derivative of Bitcoin and was created by Evan Duffield in January of 2014. It was originally known as Darkcoin but later rebranded as Dash in March of 2015. It uses a mix of miners and masternodes to validate transactions. A unique feature of Dash, is that it has has masternodes that stake at least 1000 DASH that have the ability to instantly confirm transactions. Transaction speed can be increased through masternode only validation which excludes miners. Privacy can also be enabled through 'PrivateSend' transactions that mix units. Dash has a voting system in place that can enable quick changes in governance if required rather than having a hard fork",
        eos:
          "EOS is similar to Ethereum in that it is a blockchain platform which allows decentralised apps to be created and developed. The platform should effectively provide its own operating system including cloud storage and has the ability to process one million transactions per second without any fees. A notable distinction is that transaction confirmation is done through a democracy like system where block producers are chosen by the entire EOS ecosystem through voting known as delegated proof of stake (DPoS). Block.one created EOS in September 2017 and it now has over 100 decentralised apps (dapps) with at most 6,000 daily active users.",
        ["bitcoin-cash"]:
          "Bitcoin Cash is a fork of Bitcoin that prioritizes onchain scaling and utility as a peer-to-peer electronic cash system. The 1 megabyte limit on bitcoin blocks meant that there was often a significant delay between transactions being initiated and completing, as well as increased fees due to the limited supply per block. Bitcoin Cash increased and will continue to increase block sizes which thereby increase the potential volume of transactions on the network. On August 1, 2017, Amaury Séchet released the first Bitcoin Cash software implementation. Miners running this software were able to validate a new kind transaction to create a new chain, BCH. This process is known as a 'hard fork' since it created a new version of the BTC chain that followed BCH rules. Today, BCH and BTC share the exact same transaction history up to that point.",
        waves:
          "Waves is a Blockchain platform developed to provide users with the opportunity of creating their own new custom token. Those tokens may be used for loyalty programs, in-app currency creation, and for ICO founding. ... The new token can be traded on Waves decentralized exchange.",
        litecoin:
          "For all intents and purposes, the function of Litecoin is almost identical to that of Bitcoin – it is a decentralised digital currency. It reduced the 10 min block confirmation time to 2.5 minutes which enables faster processing. The currency was created by Charlie Lee in October 2011 as an attempt to make Bitcoin more scalable and quick. During the period of high BTC fees of late 2017, observers suggested users were utilizing LTC as a second layer to send transactions.",
        ["binance-coin"]:
          "Binance Coin is the crypto-coin issued by Binance exchange, and trades with the BNB symbol. Binance coin runs on the Ethereum blockchain with ERC 20 standard, and has a strict limit of maximum 200 million BNB tokens."
      },
      currentCoin: ""
    };
  },
  methods: {
    changeDescription: function(coin) {
        this.currentCoin = this.aboutCoin[coin]
      }
  }
};
</script>
