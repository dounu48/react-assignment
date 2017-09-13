import Localization from './Localization';

describe('Localization test', () => {
       const data = { "language": "Chinese",
                  "timezone": "cst",
                  "currency": "cwon" };

       const setLocalFn = sinon.stub();
       const local = shallow(<Localization data={data}
                                           onSetLocalization={setLocalFn}
                                           /> );

      it ('one of props changed, then state is changed',() => {
            const propsData = {
                data: {
                    language: "French"
                },

                language: "French"
            };

            local.setProps({
                language: propsData.language,
                data : propsData.data,
            });

            expect(local.state().language).to.equal('French');
        });

       it('when one of preferences changed, then shouldComponentUpdate is called', () => {
            local.setState({
                  language : "Korean",
                  timezone: "kst",
                  currency: "kwon"
             });

            sinon.assert.called(setLocalFn);

       });
       it ('when one of preference changed with click, then state is changed',() => {
            local.find('.combo-box-language').simulate('change', { target: { value: 'English' }});
            local.find('.combo-box-timezone').simulate('change', { target: { value: 'utc' }});
            local.find('.combo-box-currency').simulate('change', { target: { value: 'dollar' }});

            expect(local.state().language).to.equal('English');
            expect(local.state().timezone).to.equal('utc');
            expect(local.state().currency).to.equal('dollar');


       });
});