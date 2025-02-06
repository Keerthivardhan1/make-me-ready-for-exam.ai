export class node {
    
    constructor(key) {
        this.cnt =0;
        this.key = key;
        this.childs = [];
    }

}


export function addNode(root , key){
    let path = key.split(":");
    for(let i=0;i<path.length;i++){
        let nodekey = path[i];
        if(root.childs.include(nodekey)){
            
        }

    }
}