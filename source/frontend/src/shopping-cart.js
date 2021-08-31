function add(product, qty) {
    if (product.buy_code) {
        let key = product.buy_code
        let info = Object.assign({}, product)
        info.quantity = qty
        let data = JSON.stringify(info)
        sessionStorage.setItem(key, data);
        return true

    } else {
        console.log('An Error has ocurred in the shopping cart-Add')

        return null
    }
}

function remove(buy_code) {
    if (buy_code) {
        sessionStorage.removeItem(buy_code)
        return true

    } else {
        console.log('An Error has ocurred in the shopping cart-remove')

        return null
    }
}

function read() {
    let products = window.sessionStorage;
    let keys = Object.keys(products);
    let result = keys.map(k => {
        return JSON.parse(products[k])
    })
    return result
}

function changeQty(buy_code, qty) {
    let product = sessionStorage.getItem(buy_code);
    if (product === null) {
        console.log("Product do not exist, quantity can not be changed");
        return null
    } else {
        let productObj = JSON.parse(product);
        productObj.quantity = qty;
        sessionStorage.removeItem(buy_code);
        sessionStorage.setItem(buy_code, JSON.stringify(productObj));
        return true
    }
}//end changeQty

function getStock(buy_code) {
    let product = sessionStorage.getItem(buy_code);
    if (product === null) {
        console.log("Product do not exist");
        return null
    } else {
        let productObj = JSON.parse(product);
        let stock = productObj.stock;
        return stock
    }
}//end getStock

function getSummarize() {
    let products = Object.assign({}, window.sessionStorage);
    let keys = Object.keys(products);
    let summarize = keys.map(key => {
        let obj = JSON.parse(products[key]);
        return {
            buy_code: obj.buy_code,
            quantity: obj.quantity,
            price:obj.price
        }
    });//end keys.map
    return summarize
}//end getSummarize

function getTotal(){
 let summarize=getSummarize();
 let total=0;
 for(let i=0;i<summarize.length;i++){
    total+=summarize[i].price*summarize[i].quantity;
 }
 return total
}//end getTotal

export {
    add,
    remove,
    read,
    changeQty,
    getStock,
    getSummarize,
    getTotal
}