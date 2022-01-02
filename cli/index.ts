import * as web3 from '@solana/web3.js'
import {Buffer} from "buffer";
import * as dotenv from 'dotenv'

dotenv.config({})
// const url = web3.clusterApiUrl("devnet")
const connection = new web3.Connection('http://localhost:8899')
const KEY_PAIR = process.env.KEY_PAIR
console.log('----KEY_PAIR=', KEY_PAIR, typeof KEY_PAIR, process.env)
const key = Uint8Array.from(KEY_PAIR.split(',').map(c => +c))
const PROGRAM_ID = process.env.PROGRAM_ID

const main = async () => {
    const signer = web3.Keypair.fromSecretKey(key)
    const pubkey = signer.publicKey
    console.log(await connection.getAccountInfo(pubkey))
    const balance = await connection.getBalance(pubkey)
    console.log("SOL: ", pubkey.toBase58(), balance, balance / web3.LAMPORTS_PER_SOL)

    const programId = new web3.PublicKey(PROGRAM_ID)
    const dataArr = Uint8Array.of(1)
    const buf = Buffer.from(dataArr)
    const transaction = new web3.Transaction().add( new web3.TransactionInstruction({
        keys: [],
        programId,
        data: buf
    }))

    const sig = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    console.log('--- sig = ', sig)

}

const init = async () => {
    try {
        await main()
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

void init()
