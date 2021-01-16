const div=dom.create('<div>newdiv</div>')
console.log(div)
dom.after(test,div)

const div3=dom.create('<div id="parent">parent</div>')//这里id只能用双引号
dom.wrap(test,div3)

const nodes=dom.empty(window.empty)
console.log(nodes)

dom.attr(test,'title','How are you')
const title=dom.attr(test,'title')
console.log(`title:${title}`)//返回值用${}来返回

dom.text(test,'你好，这是新的内容')//改写元素里的文本内容
dom.text(test)

dom.style(test,{border:'1px solid red',color:'blue'})
console.log(dom.style(test,'border'))
dom.style(test,'border','1px solid black')

dom.class.add(test,'red')
dom.class.add(test,'blue')
console.log(dom.class.remove(test,'blue'))

dom.on(test,'click',()=>{
    console.log('点击了')
})


