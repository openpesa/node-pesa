import { Pesa as PesaSDK } from './../modules/Pesa';
import { Fixture } from '../__mocks__/Fixture';

test('pesa is instantiable', () => {
    expect(
        new PesaSDK(
            {
                api_key: Fixture.apiKey,
                public_key: Fixture.publicKey,
            },
            'sandbox',
        ),
    ).toBeInstanceOf(PesaSDK);
});
