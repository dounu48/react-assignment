import Content from './Content';

describe('Content test', () => {

  const contentData = {
          content: 'enable',
          data : { content: 'enable'}
      };
  const setContMockFn = sinon.stub();
  const content = shallow(<Content data={contentData} onSetContent={setContMockFn} />)

  it('props changed, then state is changed', () => {
     const propsData = {
          data: { content: 'disable'},
          content: 'disable'
     };

     content.setProps({
        data: propsData.data,
        content: propsData.content,
     });

     expect(content.state().content).to.equal('disable');

  });

  it ('when content changed, then shouldComponentUpdate is called', () => {
    content.setState({
        content: 'enable',
    });

    sinon.assert.called(setContMockFn);

  });

  it ('when radio button clicked, then state is changed', () => {

     content.setState({
        content: 'disable',
     });

     expect(content.find('input').nodes[0].props.checked).to.be.false;
     expect(content.find('input').nodes[1].props.checked).to.be.true;

  });
});