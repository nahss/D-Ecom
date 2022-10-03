import { Near, Contract, keyStores, utils, WalletConnection } from "near-api-js";
import { getConfig } from "../configs";
import BN from "bn.js";

const nearConfig = getConfig("development");
console.log("Near config: ", nearConfig);
const near = new Near({
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    headers: {},
    ...nearConfig
});

export const getAmount = (amount) => amount? new BN(utils.format.parseNearAmount(amount)) : new BN('0')
export const getGas = (gas) => gas ? new BN(gas) : new BN('100000000000000');

export const wallet = new WalletConnection(near);
const contract = new Contract(wallet.account(), nearConfig.contractName, {
    viewMethods: ['get_order', 'adasd'],
    changeMethods: ['pay_order', '']
});

// Account client n = { publicKey, privateKey}
// Client encrypt 1 data = privateKey, gui public key cho server
// Server validate privateKey.
// Server decrypt = publicKey 

export async function getOrderDetail(order_id) {
    let data = await contract.get_order({order_id});
    return data;
}

export async function payOrderSimple(order_id, amount) {
    let nearAmount = getAmount(amount);
    let response = await contract.pay_order({
            order_id,
            order_amount: nearAmount.toString()
        },
        getGas(),
        nearAmount
    );

    return response;
}

export async function payOrder(order_id, amount) {
    let nearAmount = getAmount(amount);

    let response = await contract.pay_order({
        args: {
            order_id,
            order_amount: nearAmount.toString()
        },
        gas: getGas(),
        attachedDeposit: nearAmount,
        walletMeta: "UIT ecommerce",
        walletCallbackUrl: "http://localhost:3000/api/payment-noti"
    });

    return response;
}

export function signIn() {
    wallet.requestSignIn({
        contractId: nearConfig.contractName
    })
}

export function logout() {
    wallet.signOut();
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
}