import Preference from './components/Preference';

describe('Preference test', ()=> {
    const info = { "language": "Chinese",
                  "timezone": "cst",
                  "currency": "cwon",
                  "privacy": "everyone",
                  "messages" : "everyone",
                  "content": "disable",
                  "username" : "test1" };

    const preference = shallow(<Preference />);
    console.log(preference.debug());

    it ('Preference Render', done => {
      expect(preference.find('.preference-title').text()).to.equal("Edit Preferences");
      done();
    });


})
