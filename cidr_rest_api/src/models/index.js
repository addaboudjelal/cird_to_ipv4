// let list = {
//         1: {
//             id: "1",
//             ip: "10.10.0.0",
//             status: true,
//         },
//         2: {
//             id: "2",
//             ip: "10.10.0.1",
//             status: false,
//         },
//         3: {
//             id: "3",
//             ip: "10.10.0.2",
//             status: true,
//         },
//         4: {
//             id: "4",
//             ip: "10.10.0.3",
//             status: false,
//         }
// };

let _data = {
        1: {
            id: "1",
            ip: "10.10.0.0",
            status: true,
        },
        2: {
            id: "2",
            ip: "10.10.0.1",
            status: false,
        },
        3: {
            id: "3",
            ip: "10.10.0.2",
            status: true,
        },
        4: {
            id: "4",
            ip: "10.10.0.3",
            status: false,
        }
};

class listClass {

    constructor(){
        this.data = _data;
        return this;
    }
    set(items) {
        this.data = items;
    } 
    get() {
        return this.data;
    }
    update(id,status) {
        this.data[id].status = status;
    } 
}
const list = new listClass();
// Object.freeze(list);

const models = {
    list
}

export default models;