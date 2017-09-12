import Preference from './Preference';
import Home from './Home';

describe('Preference test', ()=> {
       const data = { "language": "Chinese",
                  "timezone": "cst",
                  "currency": "cwon",
                  "privacy": "everyone",
                  "messages" : "everyone",
                  "content": "disable"  };
       const username = "test";

       const readMockFn = sinon.stub(Home, "read").callsFake(()=> Promise.resolve({}));
       const saveMockFn = sinon.stub(Home, "save").callsFake(()=> Promise.resolve({}));
       const editMockFn = sinon.stub(Home, "edit").callsFake(()=> Promise.resolve({}));
       const removeMockFn = sinon.stub(Home, "remove").callsFake(()=> Promise.resolve({}));

       const preference = shallow(<Preference read={readMockFn} currentUser={username}
                                               save={saveMockFn} edit={editMockFn}
                                               remove={removeMockFn} /> );

       it ('renders without pre-stored data', ()  => {
          expect(preference.find('.preference-save-btn').text()).to.equal('Save Preferences');

       });

      it ('when save button click, save function is called', ()  => {

          let promise = Promise.resolve({data});
          let saveStub = sinon.stub(Preference, "save").callsFake(()=> promise);

          preference.find('.preference-save-btn').simulate("click");
          sinon.assert.called(saveMockFn);

       });

       it('renders with stored data', () => {

          preference.setProps({
             data: data,
             isRead: true,
          });

        expect(preference.find('.preference-edit-btn').text()).to.equal('Edit Preferences');
        expect(preference.find('.preference-del-btn').text()).to.equal('Delete Preferences');

       });

       it('when edit/delete button click, edit/delete function is called', () => {

          preference.setProps({
             data: data,
             isRead: true,
          });


          let editPreferences = { "language": "Chinese",
                                   "timezone": "cst",
                                   "currency": "cwon",
                                   "privacy": "everyone",
                                   "messages" : "everyone",
                                   "content": "enable" }

          preference.setState({
             preferences:  editPreferences
          });

          let editPromise = Promise.resolve({editPreferences});
          let editStub = sinon.stub(Preference, "edit").callsFake(()=> editPromise);

          preference.find('.preference-edit-btn').simulate("click");
          sinon.assert.called(editMockFn);

          let removePromise = Promise.resolve({ username});
          let removeStub = sinon.stub(Preference, "remove").callsFake(()=> removePromise);

          preference.find('.preference-del-btn').simulate("click");
          sinon.assert.called(removeMockFn);

       });

})