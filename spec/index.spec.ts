// import createComponent from '../src/createComponent'

describe('test', () => {
  it('should be true', () => {
    expect(true).toBeTruthy()
  })
})

// describe('test create component', () => {
//   // it('should return an element', () => {
//   //   const div = createComponent('div')
//   //   expect(div).not.toBe(null)
//   //   expect(div).toBeInstanceOf(HTMLDivElement)
//   // })

//   // it('should attach an id attribute', () => {
//   //   const div = createComponent('div', 'myId')
//   //   expect(div).toHaveProperty('id', 'myId')
//   // })

//   // it('should attach class to the element with no id', () => {
//   //   const div = createComponent('div', undefined, ['myClass1', 'myClass2'])
//   //   expect(div.id).toBeFalsy()
//   //   expect(div.classList).not.toBeNull()
//   //   expect(div.classList.contains('myClass2')).toBeTruthy()
//   // })

//   // it('should pass insert content to our div', () => {
//   //   const div = createComponent('div', undefined, undefined, 'Foo')
//   //   expect(div.firstChild).toBeTruthy()
//   //   expect(div.firstChild?.textContent).toBe('Foo')
//   // })

//   // it('should insert an html element into our div', () => {
//   //   const myP = document.createElement('p')
//   //   const div = createComponent('div', undefined, undefined, myP)
//   //   expect(div.firstChild).toBeTruthy()
//   //   expect(div.firstChild).toEqual(myP)
//   // })
// })
