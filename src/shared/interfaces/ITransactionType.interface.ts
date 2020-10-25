import { ITransactionData } from './ITransactionData.interface';

export interface ITransactionType {
    b2c: ITransactionData;
    c2b: ITransactionData;
    rt: ITransactionData;
    ddc: ITransactionData;
    ddp: ITransactionData;
    query: ITransactionData;
}
