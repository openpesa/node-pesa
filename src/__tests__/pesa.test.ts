import { Pesa as PesaSDK } from './../modules/Pesa';
import { Fixture } from '../__mocks__/Fixture';

test('pesa is instantiable', () => {
    const pesaInstance = new PesaSDK(
        {
            api_key: Fixture.apiKey,
            public_key: Fixture.publicKey,
        },
        'sandbox',
    );
    expect(pesaInstance).toBeInstanceOf(PesaSDK);
});
