import Preference from './Preference';

describe('Preference test', ()=> {
       const data = { "language": "Chinese",
                  "timezone": "cst",
                  "currency": "cwon",
                  "privacy": "everyone",
                  "messages" : "everyone",
                  "content": "disable" ,
                  "recentlyVisited": {},
                   "username" : "test"};
       const username = "test";

       const readMockFn = sinon.stub().callsFake(()=> Promise.resolve({}));
       const saveMockFn = sinon.stub().callsFake(()=> Promise.resolve({}));
       const editMockFn = sinon.stub().callsFake(()=> Promise.resolve({}));
       const removeMockFn = sinon.stub().callsFake(()=> Promise.resolve({}));

       const preference = mount(<Preference read={readMockFn} currentUser={username}
                                               save={saveMockFn} edit={editMockFn}
                                               remove={removeMockFn} /> );


       it ('renders without pre-stored data', ()  => {
          expect(preference.find('.preference-save-btn').text()).to.equal('Save Preferences');

       });

      it ('when save button click, save function is called', ()  => {
          sinon.assert.calledOnce(readMockFn);
          preference.find('.preference-save-btn').simulate("click");
          sinon.assert.called( saveMockFn );

       });

       it('renders with stored data', () => {

          preference.setProps({
             data: data,
             isRead: true,
             currentUser: username
          });

        expect(preference.find('.preference-edit-btn').text()).to.equal('Edit Preferences');
        expect(preference.find('.preference-del-btn').text()).to.equal('Delete Preferences');

       });

       it('when edit/delete button click, edit/delete function is called', () => {

          preference.setProps({
             data: data,
             isRead: true,
          });

          preference.find('.preference-edit-btn').simulate("click");
          sinon.assert.called(editMockFn);

          preference.find('.preference-del-btn').simulate("click");
          sinon.assert.called(removeMockFn);

       });

})