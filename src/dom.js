window.dom={
    //新增节点
    create(string){//用于创建带有内容的元素
        const container=document.createElement("template")//template可以用于插入所有标签
        container.innerHTML=string.trim()//trim可以用于忽略空格和文本元素
        return container.content.firstChild;
    },
   after(node,node2){
       node.parentNode.insertBefore(node2,node.nextsibling)//在节点后面添加一个新的节点，只能用在下一个节点前面添加一个新的节点。
   },
   before(node,node2){
       node.parentNode.insertBefore(node2,node)//在node前面新增一个节点
   },
    append(parent,node){
        parent.appendChild(node)//用于新增一个儿子
    },
    wrap(node,parent){
        dom.before(node,parent)//先把新的节点放在节点的前面或者后面
        dom.append(parent,node)//再把node放到parent的里面，它先前的位置会消失
    },
    //删除
    remove(node){
        node.parentNode.removeChild(node)
        return node //可能还要用
    },
    empty(node){
        //简写const childNodes=node.childNodes===const {childNodes}=node
        const array=[]
        let x=node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x=node.firstChild
        }
        return array
    },
    //改写
    attr(node,name,value){//重载：根据参数个数写不同的代码，叫重载
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)//要返回一个值
        }
    },
    text(node,string){//适配
        if(arguments.length===2){
            if('innerText'in node){
                node.innerText=string   //ie
             }else{
                 node.textContent=string  //火狐,chrome
             }   
        }else if(arguments.length===1){
             if('innerText'in node){
                 return node.innerText
             }else{
                 return node.textContent
             }
        }
    },
    html(node,string){
        if(arguments.length===2){//arugment是函数调用时的实际参数
            node.innerHTML=string
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },
    style(node,name,value){
        if(arguments.length===3){
            //dom.style(div,'color','red')
            node.style[name]=value
        }else if(arguments.length===2){
            if(typeof name==='string'){
                //dom.style(div,'color')
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'})
                const object=name
                for(let key in object){
                    node.style[key]=object[key]
                }
            }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    },
     on(node,eventName,fn){
         node.addEventListener(eventName,fn)
     },
     off(node,eventName,fn){
         node.removeEventListener(eventName,fn)
     },
     find(selector,scope){
         return (scope||document).querySelectorAll(selector)
     },
     parent(node){
         return node.parentNode
     },
     children(node){
         return node.children
     },
     siblings(node){
         return Array.from(node.parentNode.children).filter(n=>n!==node)
     },
     next(node){
         let x=node.nextSibling
         while(x&&x.nodeType===3){
             x=x.nextSibling
         }
         return x
     },
     previous(node){
         let x=node.previousSibling
         while(x&&x.nodeType===3){
            x=x.previousSibling
         }
         return x
     },
     each(nodeList,fn){
         for(let i=0;i<nodeList.length;i++){
             fn.call(null,nodeList[i])
         }
     },
     index(node){
         const list=dom.children(node.parentNode)
         let i
         for(i=0;i<list.length;i++){
             if(list[i]===node){
             break
            }
            }
            return i
          }
         

}
