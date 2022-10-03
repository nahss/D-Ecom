export function getConfig(env) {
    switch (env) {
  
      case 'production':
      case 'mainnet':
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          contractName: 'uit-payment-contract.vbidev.near',
          walletUrl: 'https://wallet.near.org',
          helperUrl: 'https://helper.mainnet.near.org',
          explorerUrl: 'https://explorer.mainnet.near.org',
        };
      case 'development':
      case 'testnet':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName: 'uit-payment-contract.vbidev.testnet',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          explorerUrl: 'https://explorer.testnet.near.org',
        };
      default:
        throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
  }