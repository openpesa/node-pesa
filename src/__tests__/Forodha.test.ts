import * as PesaSDK from '../index';
import { Forodha } from '../Forodha';
import { Fixture } from '../__mocks__/Fixture';

test('forodha_instantiable', () => {
    expect(
        new PesaSDK.Forodha({
            api_key: Fixture.apiKey,
            public_key: Fixture.publicKey,
        }),
    ).toBeInstanceOf(PesaSDK.Forodha);
});
