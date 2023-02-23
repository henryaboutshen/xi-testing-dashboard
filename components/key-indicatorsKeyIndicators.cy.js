import React from 'react';
import KeyIndicators from './key-indicators';

describe('<KeyIndicators />', () => {
    it('renders', () => {
        cy.mount(<KeyIndicators indicator={{
            users: 0, rampup: 0, iterations: 0, duration: 0,
        }}/>);
    });
});
